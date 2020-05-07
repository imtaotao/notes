

## 常见的系统变量
| 符号 | 介绍 |
|---|-------------|
| $0 | 当前程序的名称 |
| $n | 当前程序的第 n 个参数，n=1,2,...9 |
| $* | 当前程序的所有参数（不包括程序本身） |
| $# | 当前程序的参数个数（不包括程序本身） |
| $? | 命令或程序执行完后的状态，一般返回 0 表示执行成功 |
| $UID | 当前用户的 ID |
| $PWD | 当前所在的目录 |

## if
文件测试符号
| 符号 | 介绍 |
|---|-------------|
| -f | 判断文件是否存在 eg: if [ -f filename ] |
| -d | 判断目录是否存在 eg: if [ -d dir ] |
| -e | 判断文件是否存在 |
| -r | 判断文件是否存在并可读 |
| -s | 判断文件是否存在并且不为空 |
| -w | 判断文件是否存在并可写 |
| -x | 判断文件是否存在并可执行 |

逻辑运算符解析
| 符号 | 介绍 |
|---|-------------|
| -eq | 等于 应用于：整型比较 |
| -ne | 不等于 应用于：整型比较 |
| -lt | 小于 应用于：整型比较 |
| -gt | 大于 应用于：整型比较 |
| -le | 小于或等于 应用于：整型比较 |
| -ge | 大于或等于 应用于：整型比较 |
| -a | 双方都成立（and）逻辑表达式 -a 逻辑表达式 |
| -o | 单方成立（or）逻辑表达式 -o 逻辑表达式
| -z | 空字符串（为空） |
<br/>


+ if 里面俩括号是比较大小（计算之类的）
```shell
if (($n1 > $n2)); then
  echo "thisis $n1 greate $n2"
fi
```

+ 目录是否存在（中括号直接必须有空格，! 之间也要有空格）
```shell
if [ ! -d /tmp/2020/0506 ]; then
  mkdir /tmp/2020/0506
  echo -e "\033[32m 目录创建成功 \033[0m"
else
  echo -e "\033[32m 目录已经存在 \033[0m"
fi
```


+ 测试文件是否存在
  > 两 `>>` 是追加文件内容的意思
  > 一个 `>` 是覆盖
```shell
FILES=/tem/xx.txt

if [ ! -f FILES ]; then
  echo "ok" >> $FILES
else
  cat $FILES
fi
```

## 一键安装 LAMP 脚本
```shell
#!bin/bash

# 定义一些 http 路径
H_FILES=httpd-2.2.27.tar.bz2
H_FILES_DIR=httpd-2.2.27
H_URL=http://mirrors.cnnic.cn/apache/httpd/
H_PREFIX=/usr/local/apache2/

# 给提示
if [ -z "$1" ]; then
  echo -e "\033[32m 菜单选项 \033[0m"
  echo "\033[32m1) 编译安装 Apache 服务器\033[1m"
  echo "2)编译安装 Mysql 服务器"
  echo "3)编译安装 PHP 服务器"
  echo "4)配置 index.php 并启动 LAMP 服务"
  echo -e "\033[32mUsage: { /bin/sh $0 1|2|3|4|help}\033[0m"
  exit
fi


# 下载并解压
if [[ "$1" -eq "1" ]];then
  wget -c $H_URL/$H_FILES &&tar -jxvf $H_FILES && cd $H_FILES_DIR;./configure --prefix=$H_PREFIX

  # make 是用来编译的，它从 Makefile 中读取指令，然后编译。
  # make install 是用来安装的，它也从 Makefile 中读取指令，安装到指定的位置。
  if [ $? -eq 0 ]; then
    make &&make install # make install 要有足够的权限
    echo -e "\033[32m $H_FILES_DIR 安装成功 \033[0m"
  else
    echo -e "\033[32m $H_FILES_DIR 安装失败，请检查 \033[0m"
    exit
  fi
fi

# 后面安装 mysql php 是同样的逻辑，就不写了
```

## for
for 变量 in 字符串
  do
    语句
  done

1. demo
```shell
# seq 命令用于产生从某个数到另外一个数之间的所有整数
for i in `seq 1 15`
do
  echo "$i"
done
```

2. 1 - 100 求和
```shell
j=0

for ((i=1; i<=100; i++))
do
  j=`expr $i + $j`
done

echo $j
```

3. 找到相关 log，然后批量打包
```shell
for i in `find /var/log -name "*.log"|tail -2"`
do
  tar -czvf 2014$i.tgz $i
done
```

## while
`read -p "Input number: " input`，然后通过 `$input` 获取到输入的值
1. demo
```shell
i=0
# 小括号里面用运算符（<），在中括号里面用（-lt）
while (( $i < 10 ))
do
  echo "$i"
  ((i++))
done
```
2. 读文件每一行
```shell
while read line
do
  echo $line
# 读 /etc/hosts 这个文件
done </etc/hosts
```

## until
满足条件后才退出
```shell
a=10
until [[ $a -lt 0 ]]
do
  echo $a
  ((a--))
done
```

## case
```shell
case $1 in
  Apache )
    echo "等待安装 http 服务器..."
    ;;
  Mysql )
    echo "等待安装 mysql 服务器..."
    ;;
  PHP )
    echo "等待安装 php 服务器..."
    ;;
  * ) # * 号就是默认
    echo "Usage: {$0 Apache|Myaql|PHP|help}"
    ;; # 俩分好相当于 break
esac
```

## select
```shell
# shell 脚本中使用 select 时的提示符
PS3="Select your will exec Menu:"

select i in "Apache" "Mysql" "PHP"
do
  case $i in
    Apache )
      echo "等待安装 http 服务器..."
      ;;
    Mysql )
      echo "等待安装 mysql 服务器..."
      ;;
    PHP )
      echo "等待安装 php 服务器..."
      ;;
    * ) # * 号就是默认
      echo "Usage: {$0 Apache|Myaql|PHP|help}"
      ;; # 俩分号相当于 break
  esac
done
```

## 函数
语法
```shell
# 定义
function name () {

}

# 调用
name
```

求两个数的和
```shell
n1=3
n2=4

function sum() {
  res=`expr $n1 + $n2`
  echo "$res"
  return $res
}
sum
result=$?
echo "the sum is $result"
```

## 数组
1. demo
```shell
A=(test1 test2 test3)

# 引用第一个数组变量
echo ${A[0]}

# 显示该数组的所有参数
echo ${A[@]}

# 显示该数组的参数个数
echo ${#A[@]}

# 替换某个数组元素
echo ${A[@]/test2/test5}

# 删除一个数组元素
unset A[2]
echo ${A[@]} # 查看效果
```


## 小 tips
+ 测试脚本有不有问题，`-n xx.bash`
+ 加 x 可以看循环的过程
+ `echo -e \033[32m--------------------------\033[0m` 打印出颜色
+ 在 if 里面一个中括号一般判断文件是否存在之类的，俩中括号判断大小之类的
+ 反引号执行命令 `xxx`，`$()` 也可以
+ 所有循环都有 `break` 和 `continue`
+ `export 变量名=变量值`，将 shell 变量输出为环境变量
+ `(( ))` 及 `[[ ]]`，它们分别是 `[ ] `的针对数学比较表达式和字符串表达式的加强版。其中 `(( ))`，不需要再将表达式里面的大小于符号转义，除了可以使用标准的数学运算符外，还增加了以下符号：<br/>
  `val++`<br/>
  `val--`<br/>
  `++val`<br/>
  `--val`<br/>
  `!`<br/>
  `~`<br/>
  `**`<br/>
  `>>`<br/>
  `<<`<br/>
  `&`<br/>
  `|`<br/>
  `&&`<br/>
  `||`

## 各种链接资料
[知乎上的帖子1](https://www.zhihu.com/search?type=content&q=shell%20%E8%84%9A%E6%9C%AC)
[知乎上的帖子2](https://zhuanlan.zhihu.com/p/123989641)
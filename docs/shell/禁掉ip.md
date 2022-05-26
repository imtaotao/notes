## 禁止恶意访问

```shell
SEC_FILE=/var/log/secure

# 如下为截取 secure 文件而已 ip 远程登录 22 端口，大于等于 4 次就写入防火墙，禁止以后再登录服务器的 22 端口
# egrep -o "([0-9]{1,3}\.){3}[0-9]{1,3}" 是匹配 IP 的意思，[0-9] 表示任意一个数，{1,3} 表示匹配 1~3 次
IP_ADDR=`tail -n 1000 /var/log/secure |grep "Failed password"| egrep -o ([0-9]{1,3}\.){3}[0-9]{1,3} | sort -nr | uniq -c |awk ' $1>=4 {print $2}'`
IPTABLE_CONF=/etc/sysconfig/iptables

echo cat << EOF
  ++++++++++++++ welcome to use ssh login drop failed ip +++++++++++
  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  ++++++++++++++-----------------------------------------+++++++++++
EOF

for i in `echo $IP_ADDR`
do
  # 查看 iptables 配置文件是否含有提取的 IP 信息
  cat $IPTABLE_CONF |grep $1 >/dev/null
  if [ $? -ne 0 ];then
    # 判断 iptables 配置文件里面是否存在已拒绝的 ip，如果不存在，就不再添加相应条目
    # sed a 参数的意思是匹配之后加入行
    sed -i "/lo/a -A INPUT -s $i -m state --state NEW -m tcp -p tcp --dport 22 -j DROP" $IPTABLE_CONF
  else
    # 如果存在的话，就打印提示信息即可
    echo "This is $i is exist in iptables, please exit ......"
  fi
done
# 最后重启 iptables 生效
```
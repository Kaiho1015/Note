---
title: E-mail(电子邮件)
id: 4
---

### 主要组成部分

- 用户代理

  > 又名 “邮件阅读器” 
  >
  > 撰写、编辑和阅读邮件
  >
  > 如Outlook、Foxmail
  >
  > 输出和输入邮件保存在服务器上

- 邮件服务器

  > 邮箱中管理和维护发送给用户的邮件
  >
  > 输出报文队列保持待发送邮件报文
  >
  > 邮件服务器之间的SMTP协议：发送email报文
  >
  > - 客户：发送方邮件服务器
  > - 服务器：接收端邮件服务器

- 简单邮件传输协议：SMTP

  > 使用TCP在客户端和服务器之间传送报文，端口号为25
  >
  > 直接传输：从发送方服务器到接收方服务器
  >
  > 传输的3个阶段
  >
  > - 握手
  > - 传输报文
  > - 关闭
  >
  > 命令/响应交互
  >
  > - 命令：ASCII文本
  > - 响应：状态码和状态信息
  >
  > 报文必须为7位ASCII码
  >
  > 
  >
  > SMTP使用持久连接
  >
  > SMTP要求报文（首部和主体）为7位ASCII编码
  >
  > SMTP服务器使用 CRLF.CRLF决定报文的尾部
  >
  > 
  >
  > 与HTTP比较
  >
  > - HTTP：拉（pull）
  > - SMTP：推（push）
  > - 二者都是ASCII形式的命令/响应交互、状态码
  > - HTTP：每个对象封装在各自的响应报文中
  > - SMTP：多个对象包含在一个报文中



### 邮件报文格式

![image-20210725180008010](/img/Network/计算机网络/应用层/未命名文件.png)

首部行：如

- To:
- From:
- Subject
- 与SMTP命令不同

主体

- 报文，只能是ASCII码字符

报文格式：多媒体扩展，类似编码和解码

- MIME：多媒体邮件扩展（multimedia mail extension）, RFC 2045, 2056

- 在报文首部用额外的行申明MIME内容类型

  ```
  From: alice@crepes.fr 
  To: bob@hamburger.edu 
  Subject: Picture of yummy crepe. 
  MIME-Version: 1.0 								MIME版本
  Content-Transfer-Encoding: base64 				数据的编码方式，如base64
  Content-Type: image/jpeg 						多媒体数据类型、子类型和参数申明
  base64 encoded data ..... 						编码好的数据
  ......................... 
  ......base64 encoded data 
  ```

  

### 邮件访问协议

![image-20210807174408797](/img/Network/计算机网络/应用层/image-20210807174408797.png)

- SMTP: 传送到接收方的邮件服务器
- 邮件访问协议：从服务器访问邮件
  - POP：邮局访问协议（Post Office Protocol）[RFC 1939]
    - 用户身份确认 (代理<-->服务器) 并下载
  - IMAP：Internet邮件访问协议（Internet Mail Access  Protocol）[RFC 1730]
    - 更多特性 (更复杂)
    - 在服务器上处理存储的报文
  - HTTP：Hotmail , Yahoo! Mail等
    - 方便



#### POP3协议

用户特许阶段

- 客户端命令
  - user: 申明用户名
  - pass: 口令
- 服务器响应
  - +OK，指示前面的命令正常
  - -ERR ，指示前面的命令出现错误

事物处理阶段, 客户端

- list：报文号列表
- retr：根据报文号检索报文
- dele：删除
- quit

更新阶段

- 在客户端发出quit命令后，结束POP3会话
- 邮件服务器删除被标记的报文

用户代理方式

- “ 下载并删除”模式
  - 如果改变客户机，用户不能阅读邮件
- “下载并保留”模式
  - 不同客户机上为报文的拷贝



POP3在会话中是无状态的

POP3访问后，本地下载邮件，是在本地管理文件夹



#### IMAP协议

IMAP服务器将每个报文与一个文件夹联系起来

允许用户用目录来组织报文

允许用户读取报文组件

IMAP在会话过程中维护用户状态

- 目录名、报文ID与目录名之间映射

IMAP是远程管理文件夹


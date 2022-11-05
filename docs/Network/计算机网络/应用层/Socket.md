---
title: Socket编程
id: 7
---


应用进程使用传输层提供的服务才能够交换报文，实现应用协议，实现应用

socket：分布式应用进程之间的门，传输层协议提供的端到端服务接口

应用进程使用Socket API访问传输服务

2种传输层服务的socket类型

- TCP: 可靠的、字节流的服务
- UDP: 不可靠（数据UDP数据报）服务

套接字：应用进程与端到端传输协议（TCP或UDP）之间的门户



### TCP套接字编程

TCP服务：从一个进程向另一个进程可靠地传输字节流

TCP连接过程：

服务器首先运行，等待连接建立

1. 服务器进程必须先处于运行状态

   - **创建**欢迎socket

   - 和本地端口**捆绑**

   - 在欢迎socket上阻塞式**等待接收**用户的连接

客户端主动和服务器建立连接

2. 创建客户端本地套接字（隐式捆绑到本地port）
   - 指定服务器进程的IP地址和端口 号，与服务器进程连接
3. 当与客户端连接请求到来时
   - 服务器接受来自用户端的请求 ，解除阻塞式等待，返回一个新的socket（与欢迎socket不一样），与客户端通信
     - 允许服务器与多个客户端通信
     - 使用源IP和源端口来区分不同的客户端
4. 连接API调用有效时，客户端与服务器建立了TCP连接

![未命名文件 (../../../../../嘉兴学院/大三暑假/计算机网络/第2章/应用层.assets/未命名文件 (1).png)](应用层.assets/未命名文件 (1).png)



TCP Socket编程

```C
//IP地址和port捆绑关系的结构体（标示进程的端节点）
struct sockaddr_in {
	short sin_family; 					// AF_INET，地址簇
	u_short sin_port; 					// port
	struct in_addr sin_addr ; 			// IP address, unsigned long
	char sin_zero[8]; 					// align
};


//域名和IP地址的结构体
struct hostent{ 
    char *h_name;						//主机域名 
	char **h_aliases; 					//二维指针，主机别名
	int h_addrtype; 					
	int h_length;                       //地址长度
	char **h_addr_list; 				//IP地址列表
	#define h_addr h_addr_list[0];
};

/*
hostent作为调用域名解析函数时的参数
返回后，将IP地址拷贝到 sockaddr_in的IP地址部分
*/

//C语言编程参考资料PPT
```

```python
//应用程序客户端
from socket import *                                    //该模块形成python中网络通信基础
serverName = 'servername'								//使用服务器的主机名，将自动执行DNS lookup得到服务器的IP地址
serverPort = 12000
clientSocket = socket(AF_INET,SOCK_STREAM)				//创建客户端套接字，第一个参数指定地址簇，AF_INET指示底层网络															 使用IPv4.第二个参数指示该套接字为SOCK_STREAM类型，即为TCP															 套接字，客户端套接字的端口号由OS执行
clientSocket.connect((serverName,serverPort))			//建立TCP连接
sentence = raw_input('Input lowercase sentence:')		//获取用户输入
clientSocket.send(sentence.encode())					//通过客户的套接字进入TCP连接发送字符串sentence
modifiedSentence = clientSocket.recv(1024)			    //接收来自服务器的数据
print('From Server:',modifiedSentence.decode())			//打印数据
clientSocket.close()									//关闭客户套接字，TCP连接
```

```python
//应用程序服务器端
from socket import *                                    //导入套接字模块						
serverPort = 12000	
serverSocket = socket(AF_INET,SOCK_STREAM)				//服务器创建欢迎套接字
serverSocket.bind(('',serverPort))						//将端口号与套接字关联
serverSocket.listen(1)									//等待并接听客户，定义请求连接的最大数（至少为1）
print("The server is ready to receive")
while True:
    connectionSocket,addr = serverSocket.accept()		//创建连接套接字，w
    sentence = connectionSocket.recv(1024).decode()
    capitalizedSentence = sentence.upper()
    connectionSocket.send(capitalizedSentence.encode())
    connectionSocket.close
```



### UDP套接字编程

UDP：在客户端和服务器之间没有连接

- 没有握手
- 发送端在每一个报文中明确地指定目标的IP地址和端口号
- 服务器必须从收到的分组中提取出发送端的IP地址和端口号

UDP: 传送的数据可能乱序，也可能丢失

UDP 为客户端和服务器提供不可靠的字节组的传送服务

![UDP套接字编程](/img/Network/计算机网络/应用层/UDP套接字编程.png)



UDP Socket编程：客户端的数据经由服务器转化为大写

```python
//应用程序客户端
from socket import *                                    //该模块形成python中网络通信基础
serverName = 'hostname'									//使用服务器的主机名，将自动执行DNS lookup得到服务器的IP地址
serverPort = 12000
clientSocket = socket(AF_INET,SOCK_DGRAM)				//创建客户端套接字，第一个参数指定地址簇，AF_INET指示底层网络															 使用IPv4.第二个参数指示该套接字为SOCK_DGRAM类型，即为UDP															套接字，客户端套接字的端口号由OS执行
message = raw_input('Input lowercase sentence:')		//生成发送报文
clientSocket.sendto(message.encode(),(serverNmae,serverPort))		//发送报文
modifiedMessage,serverAddress = clientSocket.recvfrom(2048)			//接收来自服务器的数据
print(modifiedMessage.decode())							//打印数据
clientSocket.close()									//关闭客户套接字
```

```python
//应用程序服务器端
from socket import *                                    //导入套接字模块						
serverPort = 12000										//整数变量设置未12000
serverSocket = socket(AF_INET,SOCK_DGRAM)	
serverSocket.bind(('',serverPort))						//将端口号与服务器套接字绑定
print("The server is ready to receive")
while True:												//循环允许UDPSrever无限期地接收并处理来自客户地分组
    message,clientAddress = serverSocket.recvfrom(2048)	//接收到分组，该分组地数据被放置到变量message中，源地址放置到															 变量clientAddress中。变量clientAddress包含了客户的IP地															址和客户的端口号
    modifiedMseeage = message.decode().upper()			//将报文由decode函数转化为字符串后，获取客户端的行并转换大写
    serverSocket.sendto(modifiedMseeage.encode(),clientAddress) //发送分组，并等待另一个UDP分组到达
```


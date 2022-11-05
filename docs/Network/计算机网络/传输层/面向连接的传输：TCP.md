---
title: 面向连接的传输：TCP
id: 5
---

### TCP：概述

- 点对点：一个发送方，一个接收方
- 可靠的、按顺序的字节流
  - 没有报文边界
- 管道化（流水线）
  - TCP拥塞控制和流量控制设置窗口大小
- 发送和接收缓存
- 全双工数据
  - 在同一连接中数据流双向流动
  - MSS：最大报文段大小
- 面向连接
  - 在数据交换之前，通过握手（交换控制报文）初始化发送方、接收方的状态变量
- 有流量控制
  - 发送方不会淹没接收方



TCP报文段格式：

![image-20210820104619583](/img/Network/计算机网络/传输层/image-20210820104619583.png)

- 序号
  - 报文段首字节的在字节流的编号
- 确认号
  - 期望从另一方收到的下一个字节的序号
  - 累积确认



**TCP往返延时（RTT）和超时**

怎样设置TCP超时

- 比RTT要长，但RTT是变化的
- 太短：太早超时会造成不必要的重传
- 太长：对报文段丢失反应太慢，消极

怎样估计RTT？

- SampleRTT：测量从报文段发出到收到确认的时间

  - 如果有重传，忽略此次测量

- SampleRTT会变化，因此估计的RTT应该比较平滑

  - 对几个最近的测量值求平均，而不是仅用当前的SampleRTT

  - $EstimatedRTT(SampleRTT均值) = (1-\alpha)\times EstimatedRTT + \alpha\times SampleRTT$

    - 指数加权移动平均（Exponential Weighted Moving Average，EWMA）
    - 过去样本的影响呈指数衰减
    - 推荐值：$\alpha= 0.125$

  - SampleRTT会偏离EstimatedRTT多远，即偏差

    $DevRTT =(1-\beta)\times DevRTT+\beta\times|SampleRTT-EstimatedRTT|$

    - 推荐值：$\beta= 0.25$

超时时间间隔设置为： $TimeoutInterval = EstimatedRTT + 4*DevRTT$，初始设置为1s



### 可靠数据传输

- TCP在IP不可靠服务的基础上建立了rdt
  - 管道化的报文段
    - GBN or SR
  - 累积确认（像GBN）
  - 单个重传定时器（像GBN）
  - 对于乱序的，没有规范，可以丢弃或缓存
- 通过以下事件触发重传
  - 超时（只重发那个最早的未确认段：SR）
  - 快速重传：重复的确认，如收到了ACK50，之后又收到3个ACK50



首先考虑简化的TCP发送方

- 忽略重复的确认
- 忽略流量控制和拥塞控制

TCP发送方事件：

- 从应用层接收数据
  - 用nextseq创建报文段
  - 序号nextseq为报文段首字节的字节流编号
  - 如果还没有运行，启动定时器
    - 定时器与最早未确认的报文段关联
    - 过期间隔： TimeOutInterval 
- 超时
  - 重传后沿最老的报文段
  - 重新启动定时器 
- 收到确认
  - 如果是对尚未确认的报文段确认
    - 更新已被确认的报文序号
    - 如果当前还有未被确认的报文段，重新启动定时器



TCP重传情况：

![image-20210820161745890](/img/Network/计算机网络/传输层/image-20210820161745890.png)

![image-20210820161805269](/img/Network/计算机网络/传输层/image-20210820161805269.png)



快速重传

- 超时周期往往太长

  - 在重传丢失报文段之前的延时太长

- 通过重复的ACK来检测报文段丢失

  - 发送方通常连续发送大量报文段
  - 如果报文段丢失，通常会引起多个重复的ACK

- 如果发送方收到同一数据的3个冗余ACK，重传最小序号的段

  - 快速重传：在定时器过时之前重发报文段
  - 它假设跟在被确认的数据后面的数据丢失了
    - 第一个ACK是正常的
    - 收到第二个该段的ACK，表示接收方收到一个该段后的乱序段
    - 收到第3，4个该段的ack，表示接收方收到该段之后的2个 ，3个乱序段，段丢失可能性非常大

- 算法

  ```
  event: ACK received, with ACK field value of y 
  	if (y > SendBase) { 
  		SendBase = y
  	if (there are currently not-yet-acknowledged segments)
  		start timer 
  	} 
  	else { 
  		increment count of dup ACKs received for y
  		if (count of dup ACKs received for y = 3) {
  		resend segment with sequence number y
  }
  ```





### 流量控制

接收方控制发送方，通过**捎带技术**不让发送方发送的太多、太快以至于让接收方的缓冲区溢出

Piggybacking（捎带）：在发送数据的同时携带确认报文



- 接收方在其向发送方的TCP段头部的rwnd字段“通告”其空闲buffer大小
  - RcvBuffer大小通过socket选项设置（典型默认大小为4096 字节）
  - 很多操作系统自动调整 RcvBuffer
- 发送方限制未确认(“in-flight”)字节的个数≤接收方发送过来的 rwnd 值
- 保证接收方不会被淹没





### 连接管理

在正式交换数据之前，发送方和接收方握手建立通信关系

- 同意建立连接（每一方都知道对方愿意建立连接）
- 同意连接参数

2次握手连接建立的问题

- 变化的延迟（连接请求的段没有丢，但可能超时）

- 由于丢失造成的重传

- 报文乱序

- 相互看不到对方

- 存在的情况

  ![image-20210820211326552](/img/Network/计算机网络/传输层/image-20210820211326552.png)



TCP 3次握手

![image-20210820211512381](/img/Network/计算机网络/传输层/image-20210820211512381.png)

3次握手解决：半连接和接收老数据问题

方法：若连接不存在， 没建立起来；连接的序号不在当前连接的范围内，则丢弃数据



TCP：关闭连接

- 客户端，服务器分别关闭它自己这一侧的连接

  - 发送FIN bit = 1的TCP段

    > FIN：关闭连接
    >
    > SYN表示建立连接，FIN表示关闭连接，ACK表示响应

- 一旦接收到FIN，用ACK回应

  - 接到FIN段，ACK可以和它自己发出的FIN段一起发送

- 可以处理同时的FIN交换

  ![image-20210820212852535](/img/Network/计算机网络/传输层/image-20210820212852535.png)
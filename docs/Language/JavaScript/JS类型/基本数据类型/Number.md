---
title: Number
---

JavaScript 的主要数值类型 Number 用于表示整数和近似实数

JavaScript 使用 IEEE 754 标准定义的 64 位浮点格式表示数值

### 数值字面量

- 整数字面量

  - 基数为 10 的整数直接写成数字序列

    ```js
    0
    3
    100000000
    ```

  - 十六进制字面量以 0x 或 0X 开头，后跟一个十六进制数字字符串

    ```JS
    0xff            // => 255
    0xBADCAFE       // => 195939070
    ```

  - 二进制或八进制，分别使用前缀 0b 和 0o（或 0B 和 0O）

    ```js
    0b10101			// => 21
    0o377			// => 255
    ```

- 浮点字面量

  - 浮点字面量实数值有数值整数部分、小数点和数值的小数部分组成

    ```js
    3.14
    2345.6789
    .3333333333333
    ```

  - 指数计数法，实数值后面跟 e（或 E），跟一个可选的加号或减号，在跟一个整数指数

    ```js
    6.02e23
    1.4738223E-32       
    ```

- 数值字面量的分隔符：可以用下划线将数值字面量分隔

  ```js
  let billion = 1_000_000_000;	// 以下划线作为千分位分隔符
  let bytes = 0x89_AB_CD_EF;	// 作为字节分隔符
  let bits = 0b0001_1101_0111;	// 作为半字节分隔符
  let fraction = 0.123_456_789;	// 用于小数分隔
  ```



### 数值算术

JavaScript使用算术操作符来操作数值，如加法（+）、减法（-）、乘法（*）、取模（%），ES6新增取幂（**）

Math对象属性提供一组函数和常量

```js
Math.pow(2,53)				// => 2 的 53 次方
Math.round(.6)				// => 1.0：舍入到最接近的整数
Math.ceil(.6)				// => 1.0：向上舍入到一个整数
Math.floor(.6)				// => 0.0：向下舍入到一个整数
Math.abs(-5)				// => 5：绝对值
Math.max(x,y,z)				// 返回最大的参数
Math.min(x,y,z)				// 返回最小的参数
Math.random				// 伪随机数下，其中 0 ≤ x < 1.0
Math.PI					// Π：圆周率
Math.E					// e：自然对数的底数
Math.sqrt(3)				// => 3 的平方根
Math.pow(3,1/3)				// => 3 的立方根
Math.sin(0)				// 三角函数：还有 Math.cos、Math.aten 等
Math.log(10)				// 10 的自然对数
Math.log(100)/Math.LN10			// 以 10 为底 100 的对数
Math.log(512)/Math.LN2			// 以 2 为底 512 的对数 
Math.exp(3)				// Math.E 的立方
```

ES6 新定义函数

```js
Math.cbrt(27)				// => 3：立方根
Math.hypot(3,4)				// => 5：所有参数平方和的平方根
Math.log10(100)				// => 2：以 10 为底的对数
Math.log2(1024)				// => 10：以 2 为底的对数
Math.log1p(x)				// (1+x) 的自然对数；精确到非常小的x
Math.expm1(x)				// Math.exp(x)-1；Math.log1p() 的逆运算
Math.sign(x)				// 对 <、==或 >0的参数返回 -1、0 或 1
Math.imul(2,3)				// => 6：优化的 32 位整数乘法
Math.clz32(0xf)				// => 28：32 位整数中前导 0 的位数
Math.trunc(3.9)				// => 3：剪掉分数部分得到整数
Math.fround(x)				// 舍入到最接近的 32 位浮点数
Math.sinh(x)				// 双曲线正弦，还有 Math.cosh()、Math.tanh() 
Math.asinh(x)				// 双曲线反正弦，还有 Math.acosh()、Math.atanh() 
```

JavaScript 算术中上溢出结果返回 `Infinity`，某个负数的绝对值超过最大可表示负数的绝对值，返回 `-Infinity`

下溢出发生在数值操作的结果比最小可表示数值更接近 0 的情况下，返回 0 ；若下溢来自负数，返回 -0

被零除返回 `Infinity`或 `-Infinity`，0 除 0 返回非数值 `NaN（Not a Number）`

JavaScript预定义了全局常量 `Infinity` 和 `NaN`，这些值也可以通过 `Number` 对象属性获取

```js
Infinity			// 因为太大而无法表示的整数
1/0				// => Infinity
-Infinity			// 因为太小而无法表示的负数
-Number.MAX_VALUE * 2		// => -Infinity

NaN				// 非数值
Number.NaN			// 同上
Infinity/Infinity		// => NaN

Number.MIN_VALUE/2		// => 0：下溢出
-Number.MIN_VALUE/2		// => -0：负零
-1/Infinity			// => -0：负零

//ES6定义属性
Number.parseInt()		// 同全局parseInt()函数
Number.parseFloat()		// 同全局parseFloat()函数
Number.isNaN()			// 判断 x 是不是 NaN
Number.isFinite()		// 判断 x 是数值还是无穷
Number.isInteger()		// 判断 x 是不是整数
Number.isSafeInteger()		// 
Number.MIN_SAFE_INTEGER		// => -(2**53-1)
Number.MAX_SAFE_INTEGER         // => 2**53-1
Number.EPSILON			// => 2**52：数值与数值之间最小的差
```

非数值与任何值比较都不相等，也不等于自身，即不能通过 `x === NaN` 确定是不是非数值，只能通过 `x != x` 或 `Number.isNaN(x)`

负零值与正零值相等，几乎无法区别



### 二进制浮点数

JavaScript使用的 IEEE-754 浮点表示法是一种二进制表示法，可以精确地表示如 1/2、1/8 和 1/1024 等分数，但不能精确表示如0.1这样地数

虽然JavaScript数值有足够大地精度，但仍然可能导致一些问题

```js
let x = .3 - .2;			// 30美分减20美分
let y = .2 - .1;			// 20美分减10美分
x === y;				// => false：这两个值不一样
x === .1;				// => false：.3-.2 不等于 .1
y === .1;				// => true：.2 -.1 等于 .1
```

若需要使用浮点近似值，可以考虑使用等量整数



### BigInt

ES2020为 JavaScript 定义了一种新的数值类型 BigInt（整数）

BigInt 增加的目的是为了表示 64 位整数，可以兼容很多其他语言和 API。

BigInt 可以满足对大数（可表示数千甚至数百万个数字）的需求，但是 BigInt 地实现不适合加密，没有考虑防止时序攻击

BigInt 字面量写作一串数字后跟小写字母 n 

```js
1234n							// 基数为 10 的 BigInt
0b111111n						// 二进制 BigInt
0o7777n							// 八进制 BigInt
0x8000000000000000n					// => 2n**63n：一个 64 位整数
```

可以用 BigInt() 函数把常规数值或字符串转换为 BigInt 值

```js
BigInt(Number.MAX_SAFE_INTEGER)				// => 9007199254740991n				
let string = "1" + "0".repeat(100);			// 1 后跟 100 个零
BigInt(string)						// => 10n**100n
```

BigInt 值的算术运算与常规 JavaScript 数值类似，只不过**除法会丢弃余数并会向下（向零）舍入**

常规运算操作符可以用于 BigInt ，但不能混用 BigInt 操作数和常规数值操作数

比较操作符允许混合操作数类型

```js
1 < 2n					// => true
2 > 1n					// => true
0 == 0n					// => true
0 === 0n				// => false：=== 也检查类型是否相等
```

位操作符通常可以用于 BigInt 操作数，但 Math对象的任何函数不接收 BigInt 操作数



### 日期和时间

JavaScript 为表示和操作与日期及时间相关的数据定义了 Date 类。Date 是对象，也可以用数值表示形式（自 1970.1.1 起的毫秒数，也叫时间戳）

```js
let timestamp = Date.now();			// 当前时间的时间戳（数值）
let now = new Date();				// 当前时间的日期对象
let ms = now.getTime();				// 转换位毫秒时间戳
let iso = now.toISOString();		        // 转换位标准格式的字符串
```
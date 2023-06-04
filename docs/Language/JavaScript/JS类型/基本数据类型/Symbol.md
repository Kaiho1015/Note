---
title: Symbol
---

ES6 新增的一种原始类型，用作非字符串的属性名

```js
let strname = "string name";			// 可以用作属性名的字符串
let symname = Symbol("propname");		// 可以用作属性名的符号
typeof strname					        // => "string"：strname 是字符串
typeof symname					        // => "symbol"：symname 是符号
let o = {};					            // 创建一个新对象
o[strname] = 1;					        // 使用字符串名定义一个属性
o[symname] = 2;					        // 使用符号名定义一个属性
o[strname]					            // => 1：访问字符串名字的属性
o[symname]					            // => 2：访问符号名字的属性
```

`Symbol` 类型的 "真实值" 无法获取，即**Symbol类型没有对应的字面量**

`Symbol` 值只能通过调用 `Symbol()` 来获取，且返回的都是唯一的值，即使每次传入的参数相同 

通过调用 `toString()` 方法可以返回包含参数的值

```js
let s = Symbol("sym_x");
s.toString						// => "Symbol(sym_x)"
```

为了可以与其他代码共享符号值，JavaScript 定义了一个全局符号注册表

`Symbol.for()` 函数接收一个字符串参数，返回一个与该字符串关联的符号值，若没有关联的符号值，创建返回新符号，可以通过 `Symbol.keyFor()` 得到字符串参数

```js
let s = Symbol.for("shared");
let t = Symbol.for("shared");
s === t						    // => true
s.toString()					// => "Symbol(shared);"
Symbol.keyFor(t)				// => "shared"
```
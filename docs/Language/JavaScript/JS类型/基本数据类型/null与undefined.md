---
title: null与undefined
---

`null` 是关键字，通常用于表示某个值不存在

```js
typeof(null)			// => "object"
```

`null` 可以看作一种特殊对象，表示 ”没对象“

`undefined` 也表示值不存在

```js
typeof(undefined)			// => "undefined"
```

`undefined` 情形

- 变量的值未初始化时
- 查询不存在的对象属性或数组元素
- 没用明确返回值的函数返回值
- 没有传值的函数参数的值



```js
null == undefined			// => true
null === undefined			// => false
```
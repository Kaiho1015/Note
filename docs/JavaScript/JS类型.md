---
title: JS类型
---


## 解构赋值

ES6 实现了一种复合声明与赋值语法，叫做解构赋值（destructuring assignment）

```js
let [x,y] = [1,2];			// 相当于 let x=1, y=2
[x,y] = [x+1,y+1];			// 相当于 x = x + 1, y =y + 1
[x,y] = [y,x];				// 交换两个变量的值
[x,y]					// => [3,2]
```

解构赋值左侧变量的个数不一定与右侧变量相同，左侧多余的会被设为 `undefined` ，右侧多余的会被忽略。左侧的变量列表可以包含额外的逗号，以跳过右侧的某些值

```js
let [x,y] = [1];			// x == 1; y == undefined
[x,y] = [1,2,3];			// x == 1; y == 2
[,x,,y] = [1,2,3,4];			// x == 2; y == 4
```

在解构赋值时，若想把所有未使用或剩余的值收集到一个变量中，可在左侧最后一个变量名前加 3 个点（ ... ）

```js
let [x, ...y] = [1,2,3,4];		// y == [2,3,4]
```

若变量名与对象属性名相同，可以直接赋值，若左侧包含一个不是右侧属性的变量名，该变量被赋值为 `undefined`

```js
// 相当于 const sin=Math.sin, cos=Math.cos, tan=Math.tan
const {sin,cos,tan} = Math;
```

对象解构赋值左侧的每个标识符都可以是一个冒号分隔的标识符对，第一个为要解构其值的属性名，第二个为要把值赋给它的变量名

```js
// 相当于 const cosine=Math.cos, tangent=Math.tan
const { cos:cosine,tan:tangent} = Math;
```


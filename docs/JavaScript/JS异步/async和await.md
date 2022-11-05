ES2017 新增两个关键字 `async` 和 `await`，代表异步 JavaScript 编程范式的迁移

 `async` 和 `await` 接收基于Promise的高效代码并且隐藏Promise，让异步代码像低效阻塞的同步代码一样容易理解和推理

### await表达式

`await` 关键字接收一个Promise并将其转换为一个返回值或一个抛出的异常

通常不会使用 `await` 来接收一个保存Promise的变量，更多的将其放在一个会返回Promise的函数调用前面

```js
let response = await fetch("/api/user/profile");
let profile = await response.json();
```

`await` 关键字并不会导致你的程序阻塞或者在指定的Promise落定前什么都不做，代码依然是异步的，`await` 只是掩盖了这个事实，即任何使用 `await` 的代码本身都是异步的



### async函数

任何使用 `await` 的代码本身都是异步的，因此，只能在以 `async` 关键字声明的函数内部使用 `await` 关键字

```js
// 重写gitHighScore()函数
async function gitHighScore(){
    let response = await fetch("/api/user/profile");
    let profile = await response.json();
    return profile.highScore;
}
```

将函数声明为 `async` 意味着该函数的返回值将是一个Promise，即便函数体中不出现Promise相关的代码

- 若 `async` 函数正常返回，则作为该函数真正返回值的Promise对象将解决为这个明显的返回值
- 若 `async` 函数抛出异常，则返回的Promise对象将以该异常被拒绝

可以对任何函数使用 `async` 关键字



### 等候多个Promise

```js
// 使用async重写getJSON()函数
async function getJSON(url){
    let response = await fetch(url);
    let body = await response.json();
    return body;
}

// 使用这个函数抓取两个JSON值
let value1 = await getJSON(url1);
let value2 = await getJSON(url2);
```

上述代码的问题在于它不必顺序执行，必须等到抓取第一个 URL 的结果之后才会开始抓取第二个 URL 的值

若第二个 URL 并不依赖从第一个 URL 抓取的值，则应该尝试同时抓取两个值

```js
let [value1, value2] = await Promise.all([getJSON(url1), getJSON(url2)]);
```
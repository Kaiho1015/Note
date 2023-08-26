Promise是一个对象，表示异步操作的结果

使用Promise的好处：

- 基于回调的异步编程经常会出现回调多层嵌套的情形，造成代码缩进过多以致难以阅读，Promise让这种嵌套回调以一种更线性的Promise链形式表达
- 基于回调的异步编程难以处理错误。若一个异步函数（或异步调用的回调）抛出异常，该异常没有办法传播到异步操作的发起者，对此，可以使用回调参数严密跟踪和传播错误并返回值，但这样麻烦且易出错，Promise标准化了异步错误处理，通过Promise链提供一种让错误正确传播的途径

Promise表示的是一次异步计算的未来结果，不能使用它们表示重复的异步计算



### 使用Promise

核心 JavaScript 支持Promise后，浏览器也开始实现基于Promise的 API

```js
getJSON(url).then(jsonData => {
    // 这是一个回调函数，在解析得到JSON值
    // 后被异步调用，并接收该JSON值作为参数
})
```

类似上节的 `getText()` 函数，发送异步 HTTP 请求，并将 HTTP 响应体传给以字符串形式指定的一个回调函数

`getJSON()` 不接受回调函数，将 HTTP 响应体解析成 JSON 格式并返回一个Promise，`getJSON()` 向指定 url 发送异步 HTTP 请求，在请求结果待定期间返回一个Promise对象，这个对象有一个实例方法 `then()`，回调函数传给这个 `then()` 方法，当 HTTP 响应到达，响应体被解析为 JSON 格式，解析后的值被传给作为 `then()` 的参数的函数

 `then()` 方法可以想成 `addEventListener()` 方法，若多次调用一个Promise对象的 `then()` 方法，则指定的每个函数都会在预期计算完成后被调用

Promise表示一个计算，每个通过 `then()` 方法注册的函数都只会被调用一次，且即使调用 `then()` 时异步计算已经完成，传给 `then()` 的函数也会被异步调用

通常以动词开头来命名返回Promise的函数以及使用Promise结果的函数

```js
// 假设有一个类似的函数可以显示用户简历
function displayUserProfile(profile) { /* 省略实现细节 */ }

// 在返回Promise的函数中使用这个函数
getJSON("/api/user/profile").then(displayUserProfile);
```



**使用Promise处理错误**

Promise可以通过给 `then()` 方法传第二个函数来实现错误处理

```js
getJSON("/api/user/profile").then(displayUserProfile,handleProfileError);
```

上述代码中，若 `getJSON()` zheng'chang结束，它会将计算结果传给 `displayUserProfile()`，若出现错误（如用户没有登录、服务器下线、用户网络中断、请求超时等），将 Error 对象传给 `handleProfileError()`

实际开发中，更多的使用传统方式

```js
getJSON("/api/user/profile").then(displayUserProfile).catch(handleProfileError);
```



### Promise链

Promise以线性 `then()` 方法调用链的形式表达一连串异步操作，而无需把每个操作嵌套在前一个操作的回调内部

```js
// 示例
fetch(documentURL)                        // 发送HTTP请求
	.then(response => response.json())    // 获取JSON格式的响应体
	.then(document => {                   // 在取得解析后的JSON时
    	return render(document);          // 把文档显示给用户
	})
	.then(rendered => {                   // 在取得渲染的文档后
    	cacheInDatabase(rendered);        // 把它缓存在本地数据库中
	})
	.catch(error => handle(error));       // 处理发生的错误
```

HTTP API 的最简单形式就是函数 `fetch()`，传给它一个 URL，返回一个Promise，这个Promise在 HTTP 响应开始到达且 HTTP 状态和头部可用时兑现

```js
fetch("/api/user/profile").then(response => {
    // 在Promise解决时，可以访问 HTTP 状态和头部
    if(response.ok && response.headers.get("Content-Type") === "application/json"){
        // 还未得到响应体时的操作
    }
});
```

 `fetch()` 返回的Promise兑现时，传给它的 `then()` 方法的函数会被调用，这个函数会收到一个 `Response` 对象，通过这个响应对象可以访问请求状态和头部，也可以通过 `text()` 和 `json()` 方法取得文本和 JSON 格式的响应体。不过，虽然最初的Promise兑现，响应体尚未到达，用于取得响应体的方法本身也返回Promise

```js
fetch("/api/user/profile")
    .then(response => {
    	return response.json();
	})
	.then(profile => {
    	displayUserProfile(profile);
	});
```

若存在方法链，每一个 `then()` 方法调用都返回一个新Promise兑现，这个新Promise对象在传给 `then()` 的函数执行结束才会兑现



### 解决Promise

```js
function c1(response){                // 回调1
    let p4 = response.json();
    return p4;                        // 返回Promise4
}

function c2(profile){                 // 回调2
    displayUserProfile(profile);
}

let p1 = fetch("/api/user/profile");  // Promise1，任务1
let p2 = p1.then(c1);                 // Promise2，任务2
let p3 = p2.then(c2);                 // Promise3，任务3
```

通过Promise抓取 URL 过程，如图所示

<img src="/img/JavaScript/image-20211102204522636.png" alt="image-20211102204522636" style={{zoom:'80%',margin:'0 10%'}} />



当把回调 c 传给 `then()` 方法时，`then()` 返回Promise p，并安排好在将来某个时刻异步调用 c，届时，这个回调执行某些计算并返回一个值 v。当这个回调返回值 v 时，p 就以这个值得到解决

- 当Promise以一个非Promise值解决时，会立即以这个值兑现，即若 c 返回非Promise值，该返回值变为 p 的值，p 兑现，结束
- 若返回值 v 是一个Promise，p 会得到解决但并未兑现，此时，p要等到Promise v 落定后才能落定
  - v 兑现，p 会以相同的值兑现
  - v 被拒绝，p 会以相同的理由被拒绝



### Promise错误

给 `.then()` 方法传第二个回调函数，这个函数会在Promise被拒绝时调用，传给第二个回调函数的参数是一个值（通常是一个 `Error` 对象），表示拒绝理由

在实际编程中，基于Promise的错误一般是通过给Promise链添加一个 `.catch()` 方法调用来处理

在异步代码中，未处理的异常往往不会得到报告，错误只会静默发生，导致极难调试，因此细致的错误处理在异步编程中尤为重要

Promise的 `.catch()` 实际上是对以 `null` 为第一个参数，以错误处理回调为第二个参数的 `.then()` 调用的简写

ES2018 中，Promise对象新增 `.finally()` 方法，类似 `try/catch/fianlly` 语句中的 `finally` 子句，若在Promise链中添加一个 `finally` 调用，那么传给 `.finally()` 的回调会在Promise落定时被调用，无论Promise是兑现还是被拒绝，回调都会被调用，调用时不会给传任何参数

```js
// 接近实际中的URL抓取代码
fetch("/api/user/profile")         // 发送HTTP请求
	.then(response => {            // 在状态和头部就绪时调用
    	if(!response.ok){          // 若遇到404或类似错误
            return null;           // 返回空内容
        }
    
    	// 检测头部以确保服务器发送的是JSON
    	// 若不是，表明服务器失效，是一个严重错误
    	let type = response.headers.get("content-type");
    	if(type !== "application/json"){
            throw new TypeError(`Expected JSON, got ${type}`);
        }
    
    	// 执行到此，说明状态码为2xx，内容类型为JSON
    	// 可以安心返回一个Promise，表示解析响应体之后得到的JSON对象
    	return response.json();
	})
	.then(profile => {             // 调用时传入解析后的响应体或null
    	if(profile){
            displayUserProfile(profile);
        }else{          // 若遇到404错误并返回null
            displayLoggedOutProfilePage();
        }
	})
	.catch(e => {
    	if(e instanceof NerworkError){
            // fetch()在互联网连接故障执行下面代码
            displayErrorMessage("Check your internet connection.");
        }else if(e instanceof TypeError){
            // 若前面抛出TypeError执行下面代码
            displayErrorMessage("Something is wrong with our server!");
        }else{
            // 发生意料之外的错误
            console.error(e);
        }
	});
```

在复杂网络环境下，错误可能以某种概率随机发生，处理这些错误时，可以重新发送异步请求

```js
// 基于Promise的操作来查询数据库
queryDatabase()
	.then(displayTable)
	.catch(displayDatabaaseError);
```

假设瞬间网络负载问题会导致这个查询有 1% 的失败概率

```js
// 重新发送请求
queryDatabase()
	.catch(e => wait(500).then(queryDatabase)) //若失败，等待并重试
	.then(displayTable)
	.catch(displayDatabaaseError);
```

此时，错误率降低



### 并行Promise

若要并行执行多个异步操作，可以使用函数 `Promise.all()`

`Promise.all()` 接收一个Promise对象的数组作为输入，返回一个Promise

- 若输入Promise中的任意一个拒绝，返回的Promise也将拒绝
- 否则，返回的Promise会以每个输入Promise兑现值得数组兑现

```js
// 抓取多个URL文本

// 先定义一个URL数组
const urls = [ /* 零或多个URL */ ];
// 然后将其转换为一个Promise对象的数组
promises = urls.map(url => fetch(url).then(r => r.text()));
// 现在用一个Promise来并行运行数组中的所有Promise
Promise.all(promises)
    .then(bodies => { /* 处理得到的字符串数组 */ })
    .catch(e => console.error(e));
```

`Promise.all()` 输入数组可以包含Promise对象和非Promise值，若为非Promise值，会被当作一个已兑现Promise的值，复制到数组中。由此函数返回的Promise会在任何一个输入Promise被拒绝时拒绝

ES2020中，`Promise.allSettled()` 与 `Promise.all()` 一样，但是，`Promise.allSettled()` 永远不拒绝返回的Promise，而是会等所有输入Promise全部落定后兑现

`Promise.allSettled()` 返回的Promise解决为一个对象数组，其中每个对象都对应一个输入Promise，且都有一个 `status` 属性

- 若属性值为 `fulfilled`，则该对象还会有一个 `value` 属性，包含兑现的值
- 若属性值为 `rejected`，则该对象还会有一个 `reason` 属性，包含对应Promise的错误或拒绝理由

```js
Promise.allSettled([Promise.resolve(1), Promise.reject(2), 3])
    .then(results => {
        results[0]    // => {status: "fulfilled", value: 1}
        results[1]    // => {status: "rejected", reason: 2}
        results[2]    // => {status: "fulfilled", value: 3}
    });
```

若想同时运行多个Promise，但只关心第一个兑现的值，可以使用 `Promise.race()`，`Promise.race()` 返回一个Promise，这个Promise会在输入数组的Promise有一个兑现或拒绝时马上兑现或拒绝（或者，若输入数组中有非Promise值，直接返回第一个非Promise值）



### 创建Promise

前面使用的是浏览器内置的返回Promise的函数，可以创建自己的基于Promise的API

#### 基于其他Promise的Promise

给定一个Promise，调用 `.then()` 就可以创建（并返回）一个新Promise

```js
// 以已有的fetch()函数为起点，实现getJSON()
function getJSON(url){
    return fetch(url).then(response => response.json());
}
```

```js
// 以getJSON()作为初始Promise的来源
function getHighScore(){
    return getJSON("/api/user/profile").then(profile => profile.highScore);
}
```



#### 基于同步值的Promise

若需要实现一个已有的基于Promise的 API，并从一个函数返回Promise，尽管执行的计算不涉及异步操作，在这种情况下，可以使用`Promise.resolve()` 和 `Promise.reject()`

`Promise.resolve()` 接收一个值作为参数，并返回一个会立即（但异步）以该值兑现的Promise

`Promise.reject()` 接收一个参数，并返回一个以该参数作为理由拒绝的Promise

上面两个静态方法返回的Promise在被返回时并未兑现或拒绝，但它们会在当前同步代码块运行结束后立即兑现或拒绝

在一个异步函数中包含同步执行的代码，通过以上两个方法来处理这些同步操作的值是很常见的



#### 从头创建Promise

可以使用 `Promise()` 构造函数来创建一个新Promise对象，而且可以完全控制这个新Promise

```js
// 基于Promise的wait()函数
function wait(duration){
    // 创建并返回新Promise
    return new Promise((resolve, reject) => {   // 这两个函数控制Promise
        // 如果参数无效，拒绝Promise
        if(duration < 0){
            reject(new Error("Time travel not yet implemented"));
        }
        // 否则，异步等待，然后解决Promise
        // setTimeout调用resolve()时未传参，意味着新Promise会以undefined值兑现
        setTimeout(resolve, duration);
    });
}
```

用来控制 `Promise()` 构造函数创建的Promise对象命运的函数为 `resolve()` 和 `reject()`，若把一个Promise传给 `resolve()`，返回的Promise会解决为该新Promise，但是通常这里都传一个非Promise值，这个值会兑现返回的Promise

在 Node 中使用 `getJSON()` 函数

```js
// 异步getJSON()函数
const http = require("http");

function getJSON(url){
    // 创建并返回一个新Promise
    return new Promise((resolve, reject) => {
        // 向指定的URL发送一个HTTP GET请求
        request = http.get(url, response => {   // 收到响应时调用
            // 如果HTTP状态码不对，拒绝这个Promise
            if(response.statusCode !== 200){
                reject(new Error(`HTTP status ${response.statusCode}`));
                response.resume();    // 这样不会导致内存泄漏
            }
            // 如果响应头不对
            else if(response.headers["content-type"] !== "application/json"){
                reject(new Error("Invalid content-type"));
                response.resume();    // 不会造成内存泄漏
            }else{
                // 否则，注册事件处理程序读取响应体
                let body = "";
                response.setEncoding("utf-8");
                response.on("data", chunk => { body += chunk; });
                response.on("end", () => {
                    // 接收完全部响应体后，尝试解析
                    try{
                        let parsed = JSON.parse(body);
                        // 如果解析成功，兑现Promise
                        resolve(parsed);
                    }catch(e){
                        // 若解析失败，拒绝Promise
                        reject(e);
                    }
                });
            }
        });
        // 如果收到响应之前请求失败（如网络故障），拒绝Promise
        request.on("error", error =>{
            reject(error);
        });
    });
}
```



### 串行Promise

若要按顺序运行任意数量的Promise需要动态构建Promise链

```js
// 抓取URL数组，为了避免网络过载，一次只抓取一个URL
function fetchSequentially(urls){
    // 抓取URL时，要把响应体保存在这里
    const bodies = [];
    
    // 这个函数返回一个Promise，它只抓取一个URL响应体
    function fetchOne(url){
        return fetch(url)
            .then(response => response.text())
        	.then(body => {
           		// 把响应体保存在数组，故意省略返回值，返回undefined
            	bodies.push(body);
        	});
    }
    
    // 从一个立即（以undefined值）兑现的Promise开始
    let p = Promise.resolve(undefined);
    
    // 现在循环目标URL，构建任意长度的Promise链
    // 链的每个环节都会拿取一个URL的响应体
    for(url of urls){
        p = p.then(() => fetchOne(url));
    }
    
    // Promise链的最后一个Promise兑现后，响应体数组（bodies）已经就绪
    // 可以将这个bodies数组通过Promise返回，注意，这里为包含任何错误处理程序
    // 希望将错误传播给调用者
    return p.then(() => bodies);
}
```

如上述函数定义后，就可以如前面使用 `Promise.all()` 并行抓取，按顺序依次抓取每个URL

```js
fetchSequentially(urls)
	.then(bodies => { /*处理得到的字符串数组*/ })
	.catch(e => console.error(e));
```

`fetchSequentially()` 函数首先会创建一个返回后立即兑现的Promise，然后基于这个初始Promise构建一个线性的长Promise链并返回链中的最后一个Promise，类似于多米诺骨牌形式的Promise链

还有另一种实现方法，不是事先创建Promise，而是让每个Promise的回调函数创建并返回下一个Promise，类似于俄罗斯套娃的相互嵌套的Promise

```js
// 这个函数接收一个输入值数组和一个promiseMaker函数
// 对输入数组中的任何值x，promiseMaker(x)都应该返回
// 一个兑现为输出值的Promise。这个函数返回一个Promise，该Promise
// 最终会兑现为一个包含计算得到的输出值的数组
//
// promiseSequence()不是一次创建所有Promise然后让它们
// 并行运行，而是每次只运行一个Promise，直到上一个Promise兑现
// 之后，才会调用promiseMaker()计算下一个值
function promiseSequence(inputs, promiseMaker){
    // 为数组创建一个可以修改的私有副本
    inputs = [...inputs];
    
    // 这是要用作Promise回调的函数，它的伪递归魔术是核心逻辑
    function handleNextInput(outputs){
        if(inputs.length === 0){
            // 如果没有输入值了，则返回输出值的数组
            // 这个数组最终兑现这个Promise，以及所有之前
            // 已经解决但尚未兑现的Promise
            return outputs;
        }else{
            // 如果还有要处理的输入值，那么我们将返回
            // 一个Promise对象，把当前Promise解决为一个来自新Promise的未来值
            let nextInput = inputs.shift();     // 取得下一个输入值
            return promiseMaker(nextInput)      // 计算下一个输出值
            	// 然后用这个新输出值创建一个新输出值的数组
           		.then(output => outputs.concat(output))
            	// 然后“递归”，传入新的、更长的输出值的数组
            	.then(handleNextInput);
        }
    }
    
    // 从一个以空数组兑现的Promise开始
    // 使用上面的函数作为它的回调
    return Promise.resolve([]).then(handleNextInput);
}
```

可以使用器抓取多个URL的响应

```js
// 传入一个URL，返回一个以改URL的响应体文本兑现的Promise
function fetchBody(url){ return fetch(url).then(r => r.text()); }
// 使用它依次抓取一批URL的响应体
promiseSequence(urls, fetchBody)
    .then(bodies => { /* 处理字符串数组 */ })
    .catch(console.error);
```
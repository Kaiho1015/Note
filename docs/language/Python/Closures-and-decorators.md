---
id: closures-and-decorators
slug: /python/closures-and-decorators
title: 闭包和装饰器
data: 2023-09-28
authors: Kaiho
tags: [python, language]
keywords: [python, language]
---
## 闭包(Closure)

闭包是函数中的一个概念，满足以下条件时，该函数即为闭包：

1. 必须有一个内嵌函数
2. 内嵌函数必须引用外部函数中的变量
3. 外部函数的返回值必须是内嵌函数的引用

```python
def make_multiplier(x):
    def multiplier(n):
        return x * n
    return multiplier

double = make_multiplier(2)
print(double(5))  # 输出: 10
```

理解闭包的关键是，它能**记住自身被定义时的环境**，一般来说，如果一个函数结束，函数内部的变量、参数会被释放掉；而闭包在**外部函数结束**时，会把内部函数中用到的外部函数的变量、参数保存到内部函数的`__closure__`属性中，以提供给内部函数使用

:::note

闭包用到的变量是外部函数运行结束后保存的变量

```python
# 
def outer():
    funcs = []
    for k in range(3):
        def inner():
            return k * k

        funcs.append(inner)
    return funcs
  
f1, f2, f3 = outer()
print(f1.__closure__[0].cell_contents) # 2
print(f2.__closure__[0].cell_contents) # 2
print(f3.__closure__[0].cell_contents) # 2
print(f1()) # 4
print(f2()) # 4
print(f3()) # 4
```

:::

:::info[属性信息]

自定义函数都会有一个`__closure__`属性，如果不是闭包函数，则返回 `None`

闭包的`__closure__`属性是一个元组，其中包含了为闭包捕获的变量。每个元素都是一个`cell`类型的对象，其中包含实际值。

这个属性提供了一种方式来访问闭包中的自由变量，即那些在外部作用域中定义但在闭包函数内部使用的变量。

```python
def make_adder(x):
    def adder(y):
        return x + y
    return adder

adder5 = make_adder(5)
# 使用闭包
print(adder5(10))  # 输出: 15

# 访问__closure__属性
print(adder5.__closure__[0].cell_contents)  # 输出: 5
```

:::





## 装饰器

装饰器是一种使用其他函数来修改函数的高级Python语法。

装饰器可以是任何可调用的对象，它接受一个函数并返回另一个函数，不改变原来函数作用的，只是在原来函
数上增加些额外的功能

装饰器并不是编码必须性，很多时候使用它是为了以下两个目的：

- 使代码更加优雅，结构更加清晰
- 将实现特定的功能代码封装成装饰器，提高代码复用率



### 不带参数的函数装饰器

最基本的装饰器形式，它不接受除了函数本身以外的参数

```python
def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
```

执行顺序：

1. 定义`my_decorator`函数（装饰器函数），执行到`@my_decorator`装饰器

2. 该函数装饰器没有调用（装饰器后面没有带`()`，即没有被调用），再定义`say_hello`函数（被装饰的函数）

3. `say_hello`函数定义后，作为参数传入装饰器函数并执行，即执行`my_decorator(say_hello)`

4. 返回`wrapper`函数的引用

5. `say_hello()`函数执行，即调用`wrapper()`，`wrapper`函数中又调用了`say_hello`函数

6. 最终输出

   ```shell
   Something is happening before the function is called.
   Hello!
   Something is happening after the function is called.
   ```

   

### 带参数的装饰器

这类装饰器接受除了函数本身之外的参数

```python
def repeat(times):
    def decorator_repeat(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator_repeat

@repeat(times=3)
def greet(name):
    print(f"Hello {name}")

greet("World")
```

执行顺序：

1. 定义`repeat`函数，执行到`@repeat`装饰器

2. 该函数装饰器被调用，执行`repeat`函数

3. 定义`decorator_repeat`函数，返回其引用

4. 再定义`greet`函数

5. `greet`函数定义后，作为参数传入刚刚执行装饰器返回的`decorator_repeat`函数并执行即执`decorator_repeat(greet)`

6. 定义`wrapper`函数，并返回其引用

7. `greet("World")`函数执行，即调用`wrapper("World", times=3)`，`wrapper`函数中又调用了`greet`函数

8. 最终输出

   ```shell
   Hello World
   Hello World
   Hello World
   ```

   

### 不带参数的类装饰器

这种装饰器不接受除了被装饰的函数以外的其他参数。它通常用于修改或增强函数的行为

```python
class MyDecorator:
    def __init__(self, func):
        self.func = func

    def __call__(self, *args, **kwargs):
        print("Before the function call")
        result = self.func(*args, **kwargs)
        print("After the function call")
        return result

@MyDecorator
def say_hello(name):
    print(f"Hello {name}")

say_hello("Alice")
```

执行顺序：

1. 定义`MyDecorator`类
2. 定义`say_hello`函数，函数定义后作为参数传入类装饰器并实例化，即执行`MyDecorator(say_hello)`
3. 实例化调用初始化方法，创建实例变量，`__new__`返回实例对象
4. `say_hello("Alice")`执行，即`MyDecorator(say_hello)("Alice")`，实际上是调用了`MyDecorator`的`__call__`方法。
5. 最终输出

   ```shell
   Before the function call
   Hello Alice
   After the function call
   ```



### 带参数的类装饰器

这种装饰器可以接受参数，用于在装饰器中提供额外的信息或配置

```python
class Repeat:
    def __init__(self, times):
        self.times = times

    def __call__(self, func):
        def wrapper(*args, **kwargs):
            for _ in range(self.times):
                result = func(*args, **kwargs)
            return result
        return wrapper

@Repeat(times=3)
def greet(name):
    print(f"Hello {name}")

greet("World")
```

执行顺序：

1. 定义`Repeat`类，执行到`@Repeat`装饰器
2. 该类装饰器被调用，执行`Repeat`类的构造函数
3. 定义`greet`函数
4. `greet`函数定义后，作为参数传入`Repeat`实例并执行，即执行`Repeat(times=3)(greet)`
5. 在`Repeat`类的`__call__`方法中，定义`wrapper`函数，并返回其引用
6. `greet("World")`函数执行，即调用`wrapper("World")`，`wrapper`函数中又调用了`greet`函数
7. 最终输出：

   ```shell
   Hello World
   Hello World
   Hello World
   ```



### 多个装饰器

```python
def decorator1(func):
    def wrapper(*args, **kwargs):
        print("Decorator 1")
        return func(*args, **kwargs)
    return wrapper

def decorator2(func):
    def wrapper(*args, **kwargs):
        print("Decorator 2")
        return func(*args, **kwargs)
    return wrapper

@decorator1
@decorator2
def greet(name):
    print(f"Hello {name}")

greet("Alice")
```

执行顺序：

1. 定义`decorator1`和`decorator2`装饰器函数
2. 使用`@decorator1`和`@decorator2`装饰`greet`函数。装饰器的应用顺序是**从下往上**，即先应用`decorator2`，再应用`decorator1`
3. 调用`greet("Alice")`时，首先进入`decorator1`的`wrapper`函数，打印"Decorator 1"
4. 然后进入`decorator2`的`wrapper`函数，打印"Decorator 2"
5. 最后执行原始的`greet`函数，打印"Hello Alice"

最终输出：

```shell
Decorator 1
Decorator 2
Hello Alice
```

在这个示例中，`greet`函数被两个装饰器依次装饰，它们的执行顺序是从最接近函数的装饰器开始，逐层向外
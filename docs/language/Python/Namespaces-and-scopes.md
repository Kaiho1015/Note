---
id: namespaces-and-scopes
slug: /python/namespaces-and-scopes
title: 命名空间和作用域
data: 2023-09-24
authors: Kaiho
tags: [Python, language]
keywords: [Python, language]
---
## 命名空间

命名空间（Namespace）是一种将名字与对象映射起来的机制

它的作用是避免名字冲突，确保每个名字都对应一个特定的对象

Python中有三种主要的命名空间，各个命名空间是独立的，所以一个命名空间中不能有重名，但不同的命名空间可以重名

Python的命名空间实现主要**依赖于字典**，其中每个命名空间都是一个字典，键是变量名，值是对应的对象。

`builtins`模块包含了内置命名空间中的名字，它是一个特殊的模块，Python解释器自动为每个模块创建一个对`builtins`模块的引用，因此可以直接访问内置的函数和变量，如`print`、`int`等

```python
import builtins

# 访问内置函数print
print(builtins.print is print)  # 输出: True

# 访问内置类型int
print(builtins.int is int)  # 输出: True
```

### 内置命名空间（Built-in）

- 包含内置函数和异常名字

- 在Python解释器启动时创建，并且永远不会被删除

  ```python
  import builtins
  
  print(dir(builtins))
  ```

:::info[函数信息]

dir([object])

- 不带参数时，返回当前范围内的变量、方法和定义的类型列表
- 带参数时，返回参数的属性、方法列表
- 返回的列表按字母表排序（按照 ASCII 码）
- 如果参数包含方法`__dir__()`，该方法将被调用
- 如果参数不包含`__dir__()`，该方法将最大限度地收集参数信息

:::



### 全局命名空间（Global）

- 包含模块中定义的名称，记录了模块的变量、函数、类、其它导入的模块等
- 在模块被读取时创建，在解释器退出时删除



### 局部命名空间（Local）

- 包含函数中定义的名称，记录了函数的变量、参数等
- 在**函数调用时创建**，在**函数返回或抛出异常时删除**



### 命名空间查找顺序

- 局部命名空间 -> 全局命名空间 -> 内置命名空间



`eval`和`exec`函数在Python中用于执行字符串形式的Python代码，并且与命名空间有紧密的联系

1. **`eval(expression[, globals[, locals]])`**:
    - `eval`用于计算字符串表达式，并返回表达式的值
    - `globals`和`locals`参数是可选的，它们分别用于指定全局和局部命名空间，这些命名空间以字典的形式提供。如果省略这些参数，`eval`将使用当前的全局和局部命名空间
    - 使用`eval`时，要注意安全性问题，因为它可以执行任意代码

2. **`exec(object[, globals[, locals]])`**:
    - `exec`用于执行动态的Python代码，它可以执行包含多条语句的代码块，而不像`eval`只能计算单个表达式
    - `globals`和`locals`参数的作用与`eval`中相同，用于指定执行代码时使用的命名空间
    - `exec`不返回任何值，它直接执行提供的代码

**与命名空间的关系**

- 当使用`eval`或`exec`执行代码时，可以通过`globals`和`locals`参数控制代码执行时的命名空间，从而影响变量的查找和赋值
- 如果想在特定的命名空间中执行代码，可以创建一个字典作为命名空间，并将其传递给`globals`和`locals`参数

```python
# 使用eval计算表达式
result = eval('3 + 4')
print(result)  # 输出: 7

# 使用exec执行语句
exec('x = 5')
print(x)  # 输出: 5

# 指定命名空间
namespace = {'a': 10, 'b': 20}
exec('result = a + b', namespace)
print(namespace['result'])  # 输出: 30
```

在这个示例中，`eval`用于计算表达式`'3 + 4'`，`exec`用于执行赋值语句`'x = 5'`。在使用`exec`指定命名空间的例子中，我们创建了一个包含变量`a`和`b`的字典`namespace`，然后在这个命名空间中执行了表达式`'result = a + b'`，计算结果存储在`namespace`字典中的`result`键中。





## 作用域

作用域是 Python 程序可以直接访问命名空间的正文区域

变量的查找顺序遵循 **LEGB** 规则：首先在局部作用域查找，然后是闭包函数外的函数作用域，接着是全局作用域，最后是内置作用域

在当前作用域如果找不到对应名称，则去更大一级作用域去找，直到最后找不到就会报错

只有**模块（module）、类（class）以及函数（def、lambda）才会引入新的作用域**

### 局部作用域（Local）

函数或类方法内部，不能被外部访问

### 闭包函数外的函数作用域（Enclosing）

嵌套函数中，外层非全局函数的作用域

### 全局作用域（Global）

每个模块的全局命名空间

### 内建作用域（Built-in）

包含内置函数和异常的特殊作用域

```python
x = 'global'  # 全局变量

def outer():
    x = 'outer'  # 闭包函数外的变量
    def inner():
        x = 'inner'  # 局部变量
        print(x)  # 输出 'inner'
    inner()
    print(x)  # 输出 'outer'

outer()
print(x)  # 输出 'global'
```

### 修改作用域变量

`global`和`nonlocal`是Python中的两个关键字，用于在函数内部访问和修改外部作用域的变量

- `global`关键字主要用于修改全局作用域中的变量。
- `nonlocal`关键字主要用于修改嵌套函数外层非全局作用域中的变量。
- 如果没有使用`global`或`nonlocal`关键字，函数内部对变量的赋值将默认创建一个新的局部变量，而不会影响外部作用域中的同名变量

#### `global`关键字

`global`关键字用于在函数内部声明一个变量为全局变量。这意味着函数内部对该变量的修改将影响函数外部的同名变量

```python
x = 10

def update_global_x():
    global x
    x = 20

update_global_x()
print(x)  # 输出: 20
```

#### `nonlocal`关键字

`nonlocal`关键字用于在嵌套函数中声明一个变量为外层非全局作用域的变量。这意味着嵌套函数内部对该变量的修改将影响外层函数作用域中的同名变量

```python
def outer():
    x = 10
    def inner():
        nonlocal x
        x = 20
    inner()
    print(x)  # 输出: 20

outer()
```

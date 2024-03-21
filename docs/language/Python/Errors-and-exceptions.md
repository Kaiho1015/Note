---
id: errors-and-exceptions
slug: /python/errors-and-exceptions
title: 错误和异常
data: 2023-09-26
authors: Kaiho
tags: [python, language]
keywords: [python, language]
---
错误一般可分为两种

- 语法错误：也称解析错误（语法分析器检查到的错误），在程序运行之前被检测到，阻止程序执行
- 异常：在运行时检测到的错误（程序的语法是正确的）

:::info[内置异常]

内置异常查看

```python
import builtins

print(dir(builtins))
```

常见内置异常：

- `ZeroDivisionError`：尝试除以零时引发。

- `NameError`：尝试访问一个未声明/初始化的变量时引发。

- `TypeError`：对类型不合适的操作时引发。

- `IndexError`：在使用序列的索引时，索引超出范围时引发。

  ```py
  # ZeroDivisionError示例
  try:
      1 / 0
  except ZeroDivisionError:
      print("Cannot divide by zero!")
  
  # NameError示例
  try:
      print(undeclared_variable)
  except NameError:
      print("Variable is not defined.")  
  ```

:::



## 异常处理

异常处理是管理和响应程序中异常的过程。

Python使用`try`、`except`语句来实现异常处理。

- 如果在执行 `try` 子句时没有异常发生，则不会执行 `except` 子句
- 如果 `try` 子句发生了异常，则跳过该子句中剩下的部分，执行 `except` 子句
- 如果 `except` 子句没有指定异常类型，则可以处理 `try` 中的所有异常类型
- 如果 `except` 子句指定了异常类型，则只能处理对应的异常类型（指定多个异常类型时，可以用元组来表示）
- 如果一个异常没有与任何的 `except` 匹配，则报错
- `else` 子句必须放在所有的 `except` 子句之后
- `else` 子句将在 `try` 子句没有发生任何异常的时候执行
- 如果 `finally` 子句中包含一个 `return` 语句，则返回值将来自 `finally` 子句中的 `return` 语句的返回值，而非来自 `try` 子句中的 `return` 语句的返回值

```python
try:
    # 尝试执行的代码
    result = 10 / 0
except ZeroDivisionError as e: # as 后面为异常实例对象的名称
    print(isinstance(e, ZeroDivisionError))
    # 如果发生ZeroDivisionError，则执行的代码
    print("Caught an exception")
else:
    # 如果没有异常发生，则执行的代码
    print("No exception caught")
finally:
    # 无论是否发生异常，都会执行的代码
    print("This block is always executed")
```



## 异常抛出

在Python中，可以使用`raise`语句来引发异常，这意味着可以主动抛出一个异常，以便于在特定情况下控制程序流程或提醒错误

raise 后面可以是 异常实例 / 异常类 / 没有内容

```python
# check_age函数检查年龄是否为负数或小于18。
# 如果年龄为负数，函数将抛出ValueError；
# 如果年龄小于18，则抛出PermissionError。
# 在try块中调用check_age函数，并使用except块捕获并处理这些异常
def check_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    elif age < 18:
        raise PermissionError("You are not old enough")
    else:
        print("You are allowed")

try:
    check_age(-1)
except ValueError as e:
    print(e)
except PermissionError as e:
    print(e)
```

异常链是Python 3中引入的一个特性，用于在处理异常时保留原始异常的上下文信息

异常链通过使用`raise ... from ...`语法实现，将一个异常与另一个异常相关联，从而创建一个异常链

```python
# func 函数中的 try 尝试将字符串 'not-a-number' 转换为整数，会引发 ValueError。
# 在 except 中，引发一个新的 TypeError 异常，并通过 from e 将其与原始的 ValueError 相关联。
# 当捕获到 TypeError 异常时，可以通过访问 e.__cause__ 来获取原始的 ValueError 异常
def func():
    try:
        int('not-a-number')
    except ValueError as e:
        # 引发新的异常，并保留原始异常的上下文
        raise TypeError("Value error occurred") from e

try:
    func()
except TypeError as e:
    print(f"TypeError: {e}")
    print(f"Original exception: {e.__cause__}")
```

异常链对于调试和异常处理非常有用，它使得错误报告更加详细，帮助开发者了解异常的根本原因。

当在库或框架中工作时，异常链尤其重要，因为它可以向最终用户提供更多的上下文信息，而不仅仅是表面的错误信息，在设计API或库时，合理使用异常链可以提高代码的可维护性和可用性



## 自定义异常

可以通过继承`Exception`类来定义自己的异常类型

```py
class MyCustomError(Exception):
    pass

try:
    raise MyCustomError("An error occurred")
except MyCustomError as e:
    print(e)
```



## assert断言

`assert`语句用作断言，其目的是确认程序中的某个条件为真。如果条件为真，程序会继续执行；如果条件为假，则会引发一个`AssertionError`异常。

`assert`语句是一种在开发过程中用来快速捕获错误的方式，它可以帮助开发者确保程序在正确的前提下运行

```python
# 基本语法
assert 条件, 错误信息
```

- **条件**：这是一个布尔表达式，程序希望它为真。如果表达式结果为假，`assert`语句将引发异常。
- **错误信息**：这是可选的，提供一个在条件不满足时显示的错误信息。

```
pythonCopy codedef divide(x, y):
    assert y != 0, "分母不能为0"
    return x / y

try:
    result = divide(10, 0)
except AssertionError as e:
    print(e)  # 输出: 分母不能为0
```

使用场景

- **调试**：在开发过程中，`assert`语句可以用来作为调试辅助，帮助开发者确认关键条件是否满足。
- **自我检查**：在函数或方法中，`assert`语句可以用来确保输入参数满足特定条件或类的状态是有效的。
- **单元测试**：在编写单元测试时，`assert`语句常用于验证测试结果是否符合预期。

注意事项

- `assert`语句可以通过传递`-O`（优化）参数给Python解释器来全局禁用。在生产环境中运行代码时，常常会使用这个选项来提升性能，因此不应依赖`assert`语句进行数据验证或执行生产环境中的关键任务。
- 应谨慎使用`assert`语句，避免在处理用户输入或验证程序的关键部分时过度依赖它。

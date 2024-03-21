---
id: magic-method
slug: /python/magic-method
title: 魔术方法
data: 2023-09-27
authors: Kaiho
tags: [python, language]
keywords: [python, language]
---
魔术方法（也称为特殊方法）是一些以双下划线（`__`）开头和结尾的特殊方法，它们提供了一种在类中实现内置类型的操作或自定义行为的方式。

这些方法通常不需要直接调用，而是通过内置的操作或函数（如加法`+`或`len`函数）隐式调用

`__init__(self, [...])`

- 构造方法，在对象创建时被调用，用于初始化对象

`__call__(self [, ...])`

- 当实例对象像函数那样被“调用”时，会调用该方法

```python
class Greeter:
    def __init__(self, name):
        self.name = name
    
    def __call__(self, greeting):
        print(f"{greeting}, {self.name}!")

greeter = Greeter("Alice")
greeter("Hello")  # 调用 __call__ 方法，输出: Hello, Alice!
```



`__getitem__(self, key)`

- 允许类实例使用像字典或列表那样的索引操作

- 当执行 `self[key]` 操作时，会调用该方法

  ```python
  class MyCollection:
      def __init__(self, data):
          self.data = data
      
      def __getitem__(self, key):
          return self.data[key]
  
  col = MyCollection(['a', 'b', 'c'])
  print(col[1])  # 输出: b
  ```

  

`__len__(self)`

- 对实例对象求长度时，会调用该方法，要求必需返回整数类型

`__repr__(self) / __str__(self)`

- 实例对象转字符串时，会调用该方法，要求必需返回字符串类型
-  `__repr__` 旨在提供明确的对象表示，主要面向开发者；
- `__str__` 则提供给终端用户的友好字符串表示
- 如果只实现了 `__repr__`，而没有实现 `__str__`，当调用 `print()` 函数打印对象或使用 `str()` 时，Python 会使用 `__repr__` 的返回值

```py
class BookCollection:
    def __init__(self, books):
        self.books = books
    
    def __len__(self):
        return len(self.books)
    
    def __repr__(self):
        return f"BookCollection({self.books})"
    
    def __str__(self):
        return ", ".join(self.books)

my_books = BookCollection(["Python基础", "深入理解Python", "Python进阶"])
print(len(my_books))  # 调用 __len__，输出: 3
print(repr(my_books))  # 调用 __repr__，输出: BookCollection(['Python基础', '深入理解Python', 'Python进阶'])
print(my_books)  # 调用 __str__，如果未定义，回退到 __repr__，输出: Python基础, 深入理解Python, Python进阶
```



`__add__(self, other)`

- 当使用`+`操作符时，如果左边的对象实现了`__add__`，那么这个方法会被调用

`__radd__(self, other)`

- 右边加法的反射方法，当左边的对象没有实现`__add__`或者在`__add__`中返回`NotImplemented`时调用

```python
class CustomNumber:
    def __init__(self, value):
        self.value = value

    def __add__(self, other):
        if isinstance(other, CustomNumber):
            return CustomNumber(self.value + other.value)
        else:
            return CustomNumber(self.value + other)

    def __radd__(self, other):
        return self.__add__(other)

    def __repr__(self):
        return f"CustomNumber({self.value})"

num1 = CustomNumber(5)
num2 = CustomNumber(3)

print(num1 + num2)  # 使用 __add__，输出: CustomNumber(8)
print(10 + num1)    # 使用 __radd__，因为int类型没有__add__方法处理CustomNumber类型，输出: CustomNumber(15)
```

:::note

当`10`换成另一个有`__add__`方法的对象时，首先会尝试调用左侧对象的`__add__`方法。如果左侧对象的`__add__`方法能够处理右侧对象（即知道如何与右侧对象相加），则使用左侧对象的`__add__`方法。如果左侧对象的`__add__`方法返回`NotImplemented`（意味着它不知道如何处理右侧对象），Python解释器则会尝试调用右侧对象的`__radd__`方法。这是Python实现加法操作的双向调度机制的一部分。

:::

`__sub__(self, other)`

- 实现减法操作（`-`），当一个对象出现在减号的左侧时被调用

`__rsub__(self, other)`

- 减法操作的反射（或反向）方法，当对象出现在减号的右侧且左侧对象不支持相应的减法操作时被调用

```python
class Counter:
    def __init__(self, value):
        self.value = value

    def __sub__(self, other):
        if isinstance(other, Counter):
            return Counter(self.value - other.value)
        else:
            return Counter(self.value - other)

    def __rsub__(self, other):
        if isinstance(other, Counter):
            return Counter(other.value - self.value)
        else:
            return Counter(other - self.value)

counter1 = Counter(10)
counter2 = Counter(3)

print(counter1 - counter2)  # 使用 __sub__，输出: Counter(7)
print(counter1 - 2)         # 使用 __sub__，输出: Counter(8)
print(5 - counter1)         # 使用 __rsub__，输出: Counter(-5)
```

`__mul__(self, other)`

- 实例对象进行乘法操作时会调用该方法，要求乘法右边有当前类的实例对象且左边没有

`__rmul__(self, other)`

- 实例对象进行乘法操作时会调用该方法，要求乘法右边有当前类的实例对象且左边没有

```python
class Multiplier:
    def __init__(self, value):
        self.value = value

    def __mul__(self, other):
        return self.value * other

    def __rmul__(self, other):
        return self.__mul__(other)

number = Multiplier(3)
print(number * 5)  # 输出 15
print(5 * number)  # 输出 15
```

`__truediv__(self, other)`

- 实例对象进行真除法操作`/`时会调用该方法，要求只要除法左边有当前类的实例对象

`__rtruediv__(self, other)`

- 实例对象进行除法操作时会调用该方法，要求除法右边有当前类的实例对象且左边没有

```python
class Fraction:
    def __init__(self, numerator, denominator):
        self.numerator = numerator
        self.denominator = denominator

    def __truediv__(self, other):
        if isinstance(other, Fraction):
            return Fraction(self.numerator * other.denominator, self.denominator * other.numerator)
        else:
            return Fraction(self.numerator, self.denominator * other)

    def __rtruediv__(self, other):
        return Fraction(other * self.denominator, self.numerator)

fraction1 = Fraction(1, 2)
fraction2 = Fraction(3, 4)

# fraction1 / fraction2 使用 __truediv__
result1 = fraction1 / fraction2
print(f"{result1.numerator}/{result1.denominator}")  # 输出: 4/6

# 2 / fraction1 使用 __rtruediv__
result2 = 2 / fraction1
print(f"{result2.numerator}/{result2.denominator}")  # 输出: 4/1
```

`__neg__(self)`

- 实例对象使用一元负号操作符（`-`）时会调用该方法

- 可以用来实现例如向量取反、数值取反等操作

  ```python
  class NegNumber:
      def __init__(self, value):
          self.value = value
      
      def __neg__(self):
          return NegNumber(-self.value)
  
      def __repr__(self):
          return str(self.value)
  
  num = NegNumber(5)
  print(-num)  # 使用 __neg__ 方法，输出: -5
  ```

  


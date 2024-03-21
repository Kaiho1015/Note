---
id: object-oriented
slug: /python/object-oriented
title: 面向对象
data: 2023-09-25
authors: Kaiho
tags: [python, language]
keywords: [python, language]
---
Python的面向对象编程（OOP）是一种编程范式，它使用“对象”来模拟现实世界中的事物

对象是类的实例，类则是对象的蓝图或模板

OOP的核心概念包括类、对象、继承、多态和封装

## 类和对象

**类**（Class）是一种用于创建对象的模板，它定义了对象的属性和方法

**对象（Object）** 是类的实例，包含实际数据和行为

类、类对象通常用**大驼峰法**命名

```python
# object是所有类的父类, 通常省略不写
# class Person(object):
class Person:
    def __init__(self, name, age):  # 构造函数
        self.name = name  # 实例属性
        self.age = age

    def greet(self):  # 实例方法
        return f"Hello, my name is {self.name} and I am {self.age} years old."

# 创建Person类的实例
person1 = Person("Alice", 30)
print(person1.greet())  # Hello, my name is Alice and I am 30 years old.
```

:::info[函数信息]

`__init__`是一个魔术方法，被称为**构造函数**，用于初始化对象的状态。

当创建类的新实例时，`__init__`方法会自动被调用

在`__init__`被调用之前还有一个魔术方法——`__new__(cls, *args, **kwargs)`，用于创建对象并返回对象实例

:::



在Python的面向对象编程中，类属性与实例属性、类方法与静态方法是两对重要的概念，它们分别有不同的用途和特性

### 类属性与实例属性

- **类属性**是属于类的变量，由类的所有实例共享。它们不属于任何一个实例，而是属于类本身
- **实例属性**是属于对象实例的变量，每个对象实例都有自己独立的实例属性
- 区别
  - 类属性被类的所有实例共享
  - 实例属性仅属于特定的实例


```python
class Dog:
    species = "Canis familiaris"  # 类属性

    def __init__(self, name, age):
        self.name = name  # 实例属性
        self.age = age  # 实例属性

# 创建Dog类的实例
dog1 = Dog("Buddy", 5)
dog2 = Dog("Lucy", 3)

# 访问类属性
print(Dog.species)  # Canis familiaris

# 访问实例属性
print(dog1.name, dog1.age)  # Buddy 5
print(dog2.name, dog2.age)  # Lucy 3

# 修改类属性
Dog.species = "Canis lupus"
print(dog1.species)  # Canis lupus
print(dog2.species)  # Canis lupus
```



### 类方法与静态方法

- **类方法**是定义属于类的方法，它们不需要创建类的实例即可被调用。类方法的第一个参数是类本身，通常命名为`cls`。类方法使用`@classmethod`装饰器标记
- **静态方法**是定义在类中的普通函数，它们既不需要访问类属性或方法，也不需要访问实例属性或方法。静态方法使用`@staticmethod`装饰器标记
- 区别
  - 类方法可以访问和修改类状态，适用于需要访问或修改类属性的场景
  - 静态方法则不访问类状态，它的行为就像是在类中定义的普通函数，适用于不需要访问类或实例的数据的场景


```python
class Circle:
    pi = 3.14  # 类属性

    def __init__(self, radius):
        self.radius = radius  # 实例属性

    @classmethod
    def set_pi(cls, new_value):
        # 类方法用于修改类属性
        cls.pi = new_value
    
    @staticmethod
    def compute_distance(x1, y1, x2, y2):
        # 静态方法不直接访问类或实例的任何属性
        return ((x2 - x1)**2 + (y2 - y1)**2)**0.5

    def area(self):
        # 实例方法访问实例属性和类属性
        return Circle.pi * self.radius ** 2

# 创建Circle的实例
circle = Circle(5)

# 使用实例方法计算面积
print(f"Initial area: {circle.area()}")  # 使用初始pi值

# 使用类方法修改类属性pi
Circle.set_pi(3.14159)

# 再次使用实例方法计算面积，注意pi值已经更改
print(f"Updated area: {circle.area()}")  # 使用更新后的pi值

# 使用静态方法计算两点之间的距离
print(f"Distance: {Circle.compute_distance(0, 0, 3, 4)}")
```



### 属性装饰器

属性装饰器（`@property`）是一种用于将实例方法转换为相同名称的**只读属性**的方法，进而实现对属性访问进行控制的机制。

这种方式允许类的使用者通过属性名访问数据，同时仍然可以在后台进行计算或者逻辑检查。

当需要对属性的设置或获取进行特殊处理时，`@property`装饰器就显得非常有用。通过使用`@property`，你可以让一个方法的调用看起来就像是一个简单的属性访问。

```python
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        """获取圆的半径"""
        return self._radius

    @property
    def diameter(self):
        """计算并获取圆的直径"""
        return self._radius * 2

    @property
    def area(self):
        """计算并获取圆的面积"""
        return 3.14 * self._radius ** 2

# 创建一个Circle的实例
circle = Circle(5)
print(circle.radius)  # 输出: 5
print(circle.diameter)  # 输出: 10
print(circle.area)  # 输出: 78.5
```

如果希望用户能够设置属性的值，并在设置属性时执行一些特定逻辑，可以使用`@property`的setter方法

```python
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value >= 0:
            self._radius = value
        else:
            raise ValueError("Radius cannot be negative")

circle = Circle(5)
circle.radius = 10  # 设置新的半径值
print(circle.radius)  # 输出: 10
# circle.radius = -10  # 尝试设置负值，将引发 ValueError
```

通过使用`@property`装饰器和相应的setter方法，你可以对属性的获取和设置进行完全控制，从而使对象的状态更加安全和稳定



## 继承

- **继承**（Inheritance）允许我们定义一个类来继承另一个类的属性和方法
- 所有的类都默认继承 `object`
- 可以重用代码，并增加新的行为，创建具有层次结构的类
- 子类继承父类后，会拥有父类中所有的**非私有属性和方法**
- 继承查找顺序
  - 单继承查找顺序：先找自己的，再去找父类，再去找父类的父类，依此类推
  - 多重继承查找顺序：先找自己的，再按照从左往右的顺序依次找父类的
- 当继承比较复杂时，可以使用`__mro__`属性查看搜索顺序

```python
class Employee(Person):  # 继承Person类
    def __init__(self, name, age, employee_id):
        super().__init__(name, age)  # 调用父类的构造方法
        self.employee_id = employee_id  # 新增属性

    def employee_info(self):  # 新增方法
        return f"{self.greet()} And my employee ID is {self.employee_id}."

employee1 = Employee("Bob", 40, "E123")
print(employee1.employee_info())  # Hello, my name is Bob and I am 40 years old. And my employee ID is E123.
```

:::info[函数信息]

`super()`函数用于调用父类的方法，适用于在子类重写父类方法后，想再使用父类的该方法

在这个例子中，`super().__init__(name, age)`用于调用`Person`类的构造函数

:::



与继承相关的两个内置函数

- `isinstance(object, classinfo)`
  - `object`：实例对象
  - `classinfo`：类名、基本类型或者由它们组成的元组
  - 如果 `object` 是 `classinfo` 的实例或者是其子类的实例，则返回 `True`
  - 如果 `object` 不是给定类型的对象，则返回 `False`
  - 如果 `classinfo` 是类型对象元组，那么如果 `object` 是其中任何一个类型的实例或其子类的实例，就返回True
  - 如果 `classinfo` 既不是类型，也不是类型元组或类型元组的元组，则将引发 `TypeError` 异常

- `issubclass(class, classinfo)`
  - 如果 `class` 是 `classinfo` 的子类则返回 `True`
  - 类会被视作其自身的子类
  - `classinfo` 也可以是类对象的元组，只要 `class` 是其中任何一个类型的子类，就返回 `True`

## 多态

**多态**（Polymorphism）指不同类的对象可以通过相同的接口进行操作，即函数可以使用对象的任何子类，而不需要知道对象的具体类是什么

在Python中，多态是隐式的，因为Python是动态类型的语言

```python
def print_greet(person):
    print(person.greet())

print_greet(person1)   # Hello, my name is Alice and I am 30 years old.
print_greet(employee1) # Hello, my name is Bob and I am 40 years old.
```



## 封装

**封装**（Encapsulation）是将对象的数据（属性）和代码（方法）绑定在一起，并对外隐藏对象的具体实现细节，只暴露有限的接口供外部访问

在Python中，可以通过使用私有属性和方法来实现封装，访问私有属性或私有方法可以通过提供一个非私有方法在类的外部间接访问

:::note

在属性名或方法名前面加两个下划线开头, 声明为私有属性或私有方法

:::

```python
class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.__balance = balance  # 私有属性

    def deposit(self, amount):
        self.__balance += amount
        return self.__balance

    def __calculate_interest(self):  # 私有方法
        return self.__balance * 0.05

account = Account("John", 100)
print(account.deposit(50))
# print(account.__calculate_interest())  # 错误，无法访问私有方法
```

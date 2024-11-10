---
id: derivation
slug: /python/derivation
title: 结构语句和推导式
data: 2023-09-21
authors: Kaiho
tags: [Python, language]
keywords: [Python, language]
---

结构语句主要有条件语句和循环语句，推导式有列表、字典、集合推导式

## 结构语句

结构语句是用于控制程序流程的语句，包括条件语句、循环语句和控制语句



### 条件语句

- `if`：用于判断条件，根据条件的真假执行不同的代码块
- `elif`：用于在`if`语句中添加额外的条件判断
- `else`：用于在`if`语句中提供条件不满足时的默认执行代码块

```python
if condition:
    # 条件为真时执行的代码
elif another_condition:
    # 另一个条件为真时执行的代码
else:
    # 条件都不为真时执行的代码
```



#### 三元表达式（条件表达式）

在条件语句中，还有一种表达式——三元表达式（也称为条件表达式），它允许在一行内根据条件表达式的结果来选择两个值之一，三元表达式的一般形式为：

```python
value_if_true if condition else value_if_false
```

这个表达式首先评估`condition`，如果`condition`为真，则表达式的结果是`value_if_true`，否则结果是`value_if_false`

```python
# 使用三元表达式选择两个数中的较大者
a = 10
b = 20
max_value = a if a > b else b
print(max_value)  # 输出: 20
```

:::tip

三元表达式是一个表达式，而不是一个结构化的代码块

:::



### 循环语句

- `for`：用于遍历可迭代对象（如列表、元组、字典等）
- `while`：在满足条件的情况下重复执行代码块

```python
for item in iterable:
    # 对每个item执行的代码

while condition:
    # 条件为真时重复执行的代码
```



### 控制语句

- `break`：用于立即退出循环
- `continue`：用于跳过当前循环的剩余部分，继续下一次循环
- `pass`：空语句，不执行任何操作，常用作占位符

```python
# 使用 break 退出循环
for i in range(1, 10):
    if i == 5:
        break
    print(i)  # 输出: 1 2 3 4

# 使用 continue 跳过循环中的某次迭代
for i in range(1, 6):
    if i == 3:
        continue
    print(i)  # 输出: 1 2 4 5

# 使用 pass 作为占位符
for i in range(1, 4):
    if i == 2:
        pass  # 这里什么都不做
    else:
        print(i)  # 输出: 1 3
```

:::info[函数信息]

range([start], stop[, step])

- 用于生成一个整数序列，这个序列可以用于控制循环的迭代次数，是不可变序列

- `range(stop)`：生成从0到`stop - 1`的整数序列。

- `range(start, stop)`：生成从`start`到`stop - 1`的整数序列。

- `range(start, stop, step)`：生成从`start`到`stop - 1`的整数序列，其中每个元素之间的间隔为`step`

- `range` 类型相比常规 `list` 或 `tuple` 的优势在于一个 `range` 对象总是占用固定数量的（较小）内存，不论其所表示的范围有多大（因为它只保存了 start，stop 和 step 值）

  ```pytho
  for i in range(5):
      print(i)  # 输出: 0 1 2 3 4
  
  for i in range(2, 6):
      print(i)  # 输出: 2 3 4 5
  
  for i in range(1, 10, 2):
      print(i)  # 输出: 1 3 5 7 9
  ```



enumerate(iterable, start=0)

- 用于将一个可迭代对象（如列表、元组、字符串等）组合为一个索引序列，返回一个`enumerate`对象（迭代器）

- 迭代它会得到一个个的元组，每个元组是索引（从start开始，默认为 0）和索引对应`iterable`的值组成的

- `iterable`：一个可迭代的对象。

- `start`：计数从`start`开始，默认为0

  ```python
  fruits = ['apple', 'banana', 'cherry']
  for index, fruit in enumerate(fruits):
      print(index, fruit)
      # 输出:
      # 0 apple
      # 1 banana
      # 2 cherry
  ```

  

:::







## 推导式

推导式（Comprehensions）提供了一种简洁的方法来创建序列（如列表、字典、集合）或生成器

### 列表推导式

列表推导式用于创建新的列表

```python
# 基本语法
[表达式 for item in 可迭代对象 if 条件]
```

```python
# 创建一个包含0到9每个数平方的列表
squares = [x**2 for x in range(10)]
print(squares)  # 输出: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 创建一个列表，包含0到9之间的偶数
evens = [x for x in range(10) if x % 2 == 0]
print(evens)  # 输出: [0, 2, 4, 6, 8]
```



### 字典推导式

字典推导式用于创建新的字典

```python
# 基本语法
{键表达式: 值表达式 for item in 可迭代对象 if 条件}
```

```python
# 创建一个字典，其中键是0到4，值是该键的平方
square_dict = {x: x**2 for x in range(5)}
print(square_dict)  # 输出: {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```



### 集合推导式

集合推导式用于创建新的集合

```python
# 基本语法
{表达式 for item in 可迭代对象 if 条件}
```

```python
# 创建一个集合，包含字符串'spam'中的唯一字符
unique_chars = {char for char in 'spam'}
print(unique_chars)  # 输出类似于: {'p', 's', 'm', 'a'}
```



### 生成器表达式

生成器表达式类似于列表推导式，但它返回一个生成器对象而不是列表

```python
# 基本语法
(表达式 for item in 可迭代对象 if 条件)
```

```python
# 创建一个生成器，生成0到4每个数的立方
cubes = (x**3 for x in range(5))

# 使用生成器表达式作为函数参数
sum_of_squares = sum(x**2 for x in range(10))
```

什么是生成器？





## random 模块常用函数

Python的`random`模块提供了生成随机数的函数，用于各种随机化操作。以下是一些常用的`random`模块函数：

### `random()`
返回一个0到1之间的随机浮点数。

```python
import random
print(random.random())  # 输出: 0.37444887175646646 (示例值)
```

### `randint(a, b)`
返回一个指定范围内的随机整数，包含端点。

```python
print(random.randint(1, 10))  # 输出: 5 (示例值)
```

### `randrange(start, stop[, step])`
返回指定范围内的一个随机整数，类似于`range()`。

```python
print(random.randrange(0, 101, 2))  # 输出: 42 (示例值)
```

### `choice(seq)`
从非空序列`seq`中返回一个随机元素，如果 `seq` 为空，则引发 `IndexError`

```python
print(random.choice(['apple', 'banana', 'cherry']))  # 输出: 'banana' (示例值)
```

### `shuffle(seq)`
随机打乱序列`seq`中的元素顺序。注意，这会改变原序列。

```python
my_list = [1, 2, 3, 4, 5]
random.shuffle(my_list)
print(my_list)  # 输出: [2, 5, 3, 1, 4] (示例值)
```

### `sample(population, k)`
从总体序列或集合中返回一个长度为`k`的随机元素列表，不重复。

```python
print(random.sample(range(10), 3))  # 输出: [2, 5, 8] (示例值)
```

### `uniform(a, b)`
返回一个指定范围内的随机浮点数。

```python
print(random.uniform(1, 10))  # 输出: 3.1800146073117523 (示例值)
```

### `random.seed(a=None, version=2)`
设置随机数生成器的种子，用于确定随机数序列的起点。如果你使用相同的种子值，那么每次生成的随机数序列将是相同的。

- `a`：种子值，可以是任何哈希类型的对象。如果省略或为`None`，将使用系统时间或操作系统提供的随机源作为种子值。
- `version`：指定种子处理算法的版本，可以是1或2，默认为2。

```python
random.seed(10)  # 设置种子值为10
print(random.random())  # 输出: 0.5714025946899135 (示例值)
```

### 注意事项

- 这些函数依赖于伪随机数生成器，这意味着它们不应用于安全相关的应用，例如密码学。
- 为了使结果可复现，可以使用`random.seed(a=None)`函数设置随机数生成器的种子。

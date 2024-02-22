---
id: python-data-type
slug: /python-data-type
title: Python 标准数据类型
data: 2023-09-17
authors: Kaiho
tags: [python, language]
keywords: [python, language]
---

Python的标准数据类型分为以下几个

- 数字（Number）
- 字符串（String）
- 列表（List）
- 元组（Tuple）
- 字典（Dictionary）
- 集合（Set）



## Number

**`Number` 是不可变数据类型，不是序列**

### 分类

- `int`：整数，例：-127，128，0
- `float`：浮点数，例：1.314，科学计数法：a×10^b 表示为 aEb 或 aeb
- `bool`：布尔值，True / False
- `complex`：复数，有实部和虚部组成，虚部是以 j 或者 J 结尾，例：a = 2 + 1j

### 类型转换

- `int([x], base=10)` 

  - `x `：数字或字符串

  - `base `：进制数，默认十进制（要用其他进制时，`x` 必须为字符串）

  - 将 `x` 转换为整数并返回，如果没有指定 `x`，则返回 0

  - ```python
    # a = int("1.3") # 浮点型的字符串会报错
    
    a = int("0o12", base=8) # 0o是八进制，基于八进制的12转为十进制
    print(a) # 10
    
    a = int("0x16", base=16) # 0x是十六进制, 基于十六进制的16转为十进制
    print(a) # 22
    ```

- `float([x])`

  - `x` ：数字或数字型字符串

  - 将 `x` 转换成浮点数并返回，不传入参数，则返回 `0.0` ，字符串两边有空格不影响

  - ```python
    a = float("1.3")
    print(a) # 1.3
    
    a = float("13")
    print(a) # 13.0
    ```

- `bool([x])`
  - `x` ：将给定参数转换为布尔类型，`True` / `False`
  - 如果没有参数，返回 `False`
  - 不管`x`是什么类型，只要不为空，`None` 或数字 0，`False` 就返回 `True`

- `complex([real[, imag]])`

  - 创建一个值为 `real + imag * j` 的复数或者转化一个字符串（数）为复数

  - 如果没有参数，则返回 `0j`

  - ```python
    # 如果第1个参数是字符串，则它被解释为一个复数，不能传第2个参数
    print(complex("3.14")) # (3.14+0j)
    print(complex("3.14+1j")) # (3.14+1j)，"+"号两边不能有空格，否则报错
    ```







## String

**`String` 是不可变数据类型，是序列**



### 类型转换

- `str(object='')`
- 返回 `object` 的字符串格式，`object` 默认为空字符串，所以不传参时，返回空字符串



### 转义字符

- \\\\：反斜杠符号
- \\\'：单引号
- \\\"：双引号
- \\n：换行符
- \\t：横向制表符（字符和空格一起占 8 个字符）
- \\r：回车，用于在字符串中表示回车（返回到行首）



### RAW字符串

在字符串前面加一个字母 `r`，表示原始字符串，所有转义都不进行，常用于链接

```python
print(r"www.baidu.com\n") # 原始字符串
```



### 字符串格式化

#### 格式化符号

可用于格式化的字符：

- `%s` ：格式化为字符串
- `%d、%i` ：格式化为十进制整数，仅适用于数字
- `%f、%F` ：格式化为浮点数，默认精确到小数点后六位，仅适用于数字
- `%c`  ：格式化为字符（ASCII码），适用于整数和字符
- `%o`  ：格式化为八进制数，仅适用于整数
- `%x、%X` ：格式化为十六进制数，仅适用于整数
- `%e、%E` ：格式化为科学计数法表示，仅适用于数字
- `%g、%G` ：保留6位有效数字，整数部分大于6位则用科学计数法表示，考虑四舍五入，仅适用于数字



`Unicode` 函数：

- `chr(i)` ：返回 `Unicode` 码位为整数 i 的字符，是 `ord()` 的逆函数
- `ord(c)` ：返回单字符对应的 `Unicode` 码位，它是 `chr()` 的逆函数



辅助指令：

- `-` ：左对齐显示，默认是右对齐
- `+` ：在正数前面显示 `+`
- `#` ：在八进制数前面显示 `0o`，在十六进制前面显示 `0x` 或者 `0X`（取决于`#`后跟的是`x`还是`X`）
- `0` ：显示的数字前面填充`0`，而不是默认的空格
- `m.n` ：m和n为整数，可以组合或单独使用
  - 其中m表示最小显示的总宽度，如果超出，则原样输出;
  - n表示可保留的小数点后的位数或者字符串的个数
- `*` ：定义最小显示宽度或者小数位数

```python
PI = 3.1415926

print("%d" % PI) # 3
print("%g" % PI) # 3.14159
print("%#o" % 12) # 0o14

# 定义最小显示宽度为12，%f默认精确到小数点后6位
print("%*f" % (12, PI)) #     3.141593
print("%+f" % PI) # +3.141593
```





#### format函数

- `{}`：占位符，用于插入变量的值
- `{0}`, `{1}`：带有索引的占位符，用于指定要插入的变量的顺序
- `{name}`：带有关键字的占位符，用于通过名称插入变量的值
- `:f`：浮点数格式。例如，`{:.2f}`用于格式化浮点数，保留两位小数
- `:d`：整数格式
- `:s`：字符串格式
- `:b`：二进制格式
- `:o`：八进制格式
- `:x` 或 `:X`：十六进制格式，`x`生成小写字母，`X`生成大写字母
- `:%`：百分比格式，将数值乘以100并显示为百分数，保留小数点后两位
- `:>n`，`:<n`，`:^n`：字符串对齐格式，`n`是指定的宽度，`>`表示右对齐，`<`表示左对齐，`^`表示居中对齐
- `:n`：数字格式，其中`n`是总位数

```python
# 使用索引占位符格式化字符串
"{} {}".format("hello", "world")  # 输出: 'hello world'

# 使用关键字占位符格式化字符串
"{greeting} {name}".format(greeting="Hello", name="John")  # 输出: 'Hello John'

# 格式化浮点数，保留两位小数
"Pi is approximately {:.2f}".format(3.14159)  # 输出: 'Pi is approximately 3.14'

# 格式化整数为二进制
"Binary representation of {0} is {0:b}".format(12)  # 输出: 'Binary representation of 12 is 1100'

# 格式化数字为百分比
"Success rate: {:.2%}".format(0.85)  # 输出: 'Success rate: 85.00%'
```





#### f-string

`f-string`以字母`f`或`F`为前缀，后跟字符串字面值，可以在这些字符串内部的大括号`{}`中直接包含变量和简单的表达式，Python将会自动将它们转换为相应的值

- `{}` 可以填入表达式或函数调用，会求出其结果并填入返回的字符串内
- 支持格式化

```python
name = "Alice"
age = 24
print(f"Hello, {name}. You are {age} years old.") # Hello, Alice. You are 24 years old.

a = 5
b = 10
print(f"Five plus ten is {a + b}, and not {2 * (a + b)}.") # Five plus ten is 15, and not 30.

pi = 3.14159265
print(f"Pi rounded to three decimal places: {pi:.3f}.") # Pi rounded to three decimal places: 3.142.

person = {"name": "Eric", "age": 38}
print(f'{person["name"]} is {person["age"]} years old.') # Eric is 38 years old.

score = 85
result = "passed" if score >= 60 else "failed"
print(f"You have {result} the exam.") # You have passed the exam.
```





### 对象方法

Python中的字符串对象提供了一系列内置的方法，这些方法可以执行各种字符串操作，如搜索、替换、检验和转换等。以下是一些常用的字符串方法：

#### 修改和转换

- `capitalize()`：将字符串的第一个字符转换为大写，其余字符转换为小写

- `upper()`：将字符串中的所有字母字符转换为大写

- `lower()`：将字符串中的所有字母字符转换为小写

- `title()`：将字符串中的每个单词的首字母转换为大写，其余字母转换为小写

- `swapcase()`：将字符串中的小写字母转换为大写字母，大写字母转换为小写字母

  ```python
  text = "hello world"
  print(text.capitalize())  # 输出: 'Hello world'
  print(text.upper())       # 输出: 'HELLO WORLD'
  print(text.title())       # 输出: 'Hello World'
  ```

  

#### 搜索和替换

- `count(sub[, start[, end]])`：返回子字符串`sub`在字符串中出现的次数，可指定起始和结束位置

- `startswith(prefix[, start[, end]])`：检查字符串是否以指定的前缀开始

- `endswith(suffix[, start[, end]])`：检查字符串是否以指定的后缀结束

- `find(sub[, start[, end]])`：返回子字符串`sub`首次出现的索引位置，如果未找到，则返回-1

- `rfind(sub[, start[, end]])`：返回子字符串`sub`最后出现的索引位置，如果未找到，则返回-1

- `index(sub[, start[, end]])`：与`find`类似，但如果`sub`不在字符串中，则抛出`ValueError`

- `rindex(sub[, start[, end]])`：与`rfind`类似，但如果`sub`不在字符串中，则抛出`ValueError`

- `replace(old, new[, count])`：将字符串中的`old`替换为`new`，可以指定替换的最大次数

  ```python
  text = "Hello world, world"
  print(text.count('world'))          # 输出: 2
  print(text.startswith('Hello'))     # 输出: True
  print(text.endswith('world'))       # 输出: True
  print(text.find('world'))           # 输出: 6
  print(text.replace('world', 'Python'))  # 输出: 'Hello Python, Python'
  ```

  

#### 分割和连接

- `split(sep=None, maxsplit=-1)`：使用指定的分隔符`sep`分割字符串。`maxsplit`指定最大分割次数

- `rsplit(sep=None, maxsplit=-1)`：类似于`split`，但从字符串的末尾开始分割

- `splitlines([keepends])`：按照换行符分割字符串，返回一个字符串列表

- `join(iterable)`：将可迭代对象中的字符串连接成一个字符串，使用调用此方法的字符串作为分隔符

- `partition(sep)` ：在指定的分隔符 `sep` 首次出现的位置拆分字符串，返回一个包含三个元素的元组，元素分别是分隔符之前的部分、分隔符本身，以及分隔符之后的部分。 如果分隔符未找到，则返回的元组包含原字符串本身以及两个空字符串

  ```python
  text = "apple,banana,cherry"
  print(text.split(','))              # 输出: ['apple', 'banana', 'cherry']
  
  lines = "First line.\nSecond line."
  print(lines.splitlines())           # 输出: ['First line.', 'Second line.']
  
  words = ['Hello', 'world']
  print(' '.join(words))              # 输出: 'Hello world'
  ```

  

#### 去除空白

- `strip([chars])`：从字符串的开头和结尾去除指定的字符集合。如果未指定`chars`，则去除空白字符

- `lstrip([chars])`：从字符串的开头去除指定的字符集合

- `rstrip([chars])`：从字符串的结尾去除指定的字符集合

  ```python
  text = "  Hello world  "
  print(text.strip())                 # 输出: 'Hello world'
  print(text.lstrip())                # 输出: 'Hello world  '
  print(text.rstrip())                # 输出: '  Hello world'
  ```

  

#### 判断字符串的内容或类型

- `isdigit()`：如果字符串中的所有字符都是数字，并且字符串至少有一个字符，则返回`True`

- `isalpha()`：如果字符串中的所有字符都是字母，并且字符串至少有一个字符，则返回`True`

- `isalnum()`：如果字符串中的所有字符都是字母或数字，并且字符串至少有一个字符，则返回`True`

- `isspace()`：如果字符串中的所有字符都是空白字符，并且字符串至少有一个字符，则返回`True`

- `islower()`：如果字符串中的所有字母字符都是小写，并且至少有一个字母字符，则返回`True`

- `isupper()`：如果字符串中的所有字母字符都是大写，并且至少有一个字母字符，则返回`True`

- `istitle()`：如果字符串是标题化的（即所有单词的首字母大写，其余字母小写），则返回`True`

  ```python
  text = "12345"
  print(text.isdigit())               # 输出: True
  
  text = "HelloWorld"
  print(text.isalpha())               # 输出: True
  
  text = "Hello123"
  print(text.isalnum())               # 输出: True
  
  text = "    "
  print(text.isspace())               # 输出: True
  
  text = "hello world"
  print(text.islower())               # 输出: True
  
  text = "HELLO WORLD"
  print(text.isupper())               # 输出: True
  
  text = "Hello World"
  print(text.istitle())               # 输出: True
  ```

  





## List

**`List` 是可变数据类型，是序列**

列表是可变的，所以可以通过**索引**和**切片**的方式来对列表的元素进行修改



### 类型转换

- `list([iterable])` 

- 将一个`iterable`对象转化为列表并返回，如果没有传入参数返回空的列表

  ```python
  print(list()) # []
  print(list("China")) # ['C', 'h', 'i', 'n', 'a']
  print(list((1, 2, 3))) # [1, 2, 3]
  print(list({1: 2, 3: 4})) # [1, 3]
  print(list({1, 2, 3, 4})) # [1, 2, 3, 4]
  ```

  

### 对象方法

Python中的列表（list）提供了多种方法来进行添加、删除、修改和查询等操作。以下是一些常用的列表对象方法：

#### 添加和合并

- `append(x)`

  - 将一个元素添加到列表的末尾
  - 相当于 `a[len(a):] = [x]`
  - **修改原列表，无返回值**

- `extend(iterable)`：

  - 扩展列表，将一个可迭代对象的所有元素添加到列表的末尾
  - **修改原列表，无返回值**
  - 相当于 `a[len(a):] = iterable`

- `insert(i, x)`

  - 在指定位置插入一个元素
  - `i` ：插入的元素的索引
  - `x`：插入的元素
  - **修改原列表，无返回值**

  ```python
  fruits = ['apple', 'banana']
  fruits.append('cherry')
  print(fruits)  # 输出: ['apple', 'banana', 'cherry']
  
  fruits.extend(['date', 'elderberry'])
  print(fruits)  # 输出: ['apple', 'banana', 'cherry', 'date', 'elderberry']
  
  fruits.insert(1, 'apricot')
  print(fruits)  # 输出: ['apple', 'apricot', 'banana', 'cherry', 'date', 'elderberry']
  ```

  

#### 删除

- `remove(x)`：删除列表中第一个值为`x`的元素。如果没有这样的元素，就会抛出一个`ValueError`
- `pop([i])`：删除列表中指定位置的元素（默认是最后一个元素），并返回这个元素的值
- `clear()`：移除列表中的所有项，等于删除所有元素，等价于 `del a[:]`

  ```python
  fruits.remove('banana')
  print(fruits)  # 输出: ['apple', 'apricot', 'cherry', 'date', 'elderberry']
  
  popped_fruit = fruits.pop(2)
  print(popped_fruit)  # 输出: 'cherry'
  print(fruits)        # 输出: ['apple', 'apricot', 'date', 'elderberry']
  
  fruits.clear()
  print(fruits)  # 输出: []
  ```

  

#### 查询和排序

- `index(x[, start[, end]])`：
  - 返回列表中第一个值为`x`的元素的索引
  - 可以指定搜索的起始和结束位置
  - 找不到则抛出 `ValueError` 异常

- `count(x)`：返回`x`在列表中出现的次数
- `sort(key=None, reverse=False)`
  - `key`：指定一个函数，在排序之前，列表每个元素先应用这个函数之后再对原数据进行排序
  - `reverse`：默认为 `False`，代表升序，指定为 `True` 则降序


:::note

内置函数`sorted(iterable, [key], reverse=False)`

- `iterable`：可迭代对象（字符串，列表，元组，字典，集合等）
- `key`：指定一个函数，在排序之前，每个元素都先应用这个函数之后再排序
- `reverse`：默认为 `False`，代表升序，指定为 `True` 则降序
- 对可迭代对象进行排序（不对原数据进行操作），以列表形式返回

`sorted` 可以对所有可迭代的对象进行排序，不对原数据操作，有返回值，是内置函数

:::

- `reverse()`：倒排列表中的元素，无返回值

  ```python
  fruits = ['apple', 'banana', 'cherry', 'date', 'banana']
  print(fruits.index('banana'))  # 输出: 1
  print(fruits.count('banana'))  # 输出: 2
  
  fruits.sort(reverse=True)
  print(fruits)  # 输出: ['date', 'cherry', 'banana', 'banana', 'apple']
  
  fruits.reverse()
  print(fruits)  # 输出: ['apple', 'banana', 'banana', 'cherry', 'date']
  ```


:::note

内置函数`reversed(seq)`

- 对给定序列返回一个反向迭代器

reversed 是针对序列的，不对原数据操作，返回一个反向迭代器，是内置函数

:::

#### 复制

- `copy()`：返回列表的**浅拷贝**，等价于 `a[:]`

  ```python
  fruits_copy = fruits.copy()
  print(fruits_copy)  # 输出: ['apple', 'banana', 'banana', 'cherry', 'date']
  ```





## Tuple

**与 List 类似，也是序列，但 Tuple 是不可变的**

:::note

Tuple 是不可变的，但是 Tuple 中的列表是可变的

:::



### 类型转换

- `tuple([iterable])`
- 返回一个新的 `tuple` 对象，其元素来自于 `iterable`，如果未指定 `iterable`，则返回空元组



### 对象方法

Python中的元组（tuple）是一种不可变序列，一旦创建就不能修改。这意味着元组没有提供添加、删除或修改其元素的方法。不过，元组提供了一些方法来进行查询和计数，以及其他一些操作。由于元组的不可变性，这些方法比列表的要少。下面是元组可用的一些方法：

#### 查询

- `index(x[, start[, end]])`：返回元组中第一个值为`x`的元素的索引。可以指定搜索的起始和结束位置。如果没有找到元素，会抛出`ValueError`

- `count(x)`：返回`x`在元组中出现的次数

  ```python
  # 创建一个元组
  t = (1, 2, 3, 2, 4, 2)
  
  # 计数
  count = t.count(2)
  print(f"Number 2 appears {count} times in the tuple.")  # 输出: Number 2 appears 3 times in the tuple.
  
  # 索引
  index = t.index(3)
  print(f"The index of number 3 in the tuple is {index}.")  # 输出: The index of number 3 in the tuple is 2.\
  ```

由于元组是不可变的，它们主要用于那些不应该改变的数据场景中。这种不可变性给元组带来了一些优势，例如它可以用作字典的键（与列表不同，列表是不可哈希的，因此不能用作字典键）。此外，元组在某些情况下，相比列表有更小的内存占用和更好的性能特性，尤其是在创建大量小元组的场景中。







## Dictionary

**Dictionary 是可变的，不是序列**



### 特性

- 键和键包含的内容都必须为不可变类型（如数字，字符串或元组）
- 如果键重复，那么重复键对应的值后面会把前面的值覆盖掉，但是位置还是原来的位置
- 值的数据类型没有严格的限制，并且可以重复



### 创建字典

创建Python字典有多种方法，这提供了灵活性来根据不同的场景和需求选择最合适的方式。以下是创建字典的六种常用方式：

#### 1. 使用花括号

直接使用花括号`{}`创建字典，指定键值对。

```python
my_dict = {'name': 'John', 'age': 30, 'city': 'New York'}
print(my_dict)  # 输出: {'name': 'John', 'age': 30, 'city': 'New York'}
```

#### 2. 使用`dict()`构造函数

利用`dict()`构造函数创建字典，传入键值对作为参数。

```python
my_dict = dict(name='John', age=30, city='New York') # 这里用元组/列表/集合都是可以
的
print(my_dict)  # 输出: {'name': 'John', 'age': 30, 'city': 'New York'}
```

:::note

`dict(**kwarg) / dict(mapping) / dict(iterable)`构造方法，用于创建一个字典并返回

:::

#### 3. 通过键值对列表

将键值对作为元组放在列表中，然后用`dict()`转换。

```python
pairs = [('name', 'John'), ('age', 30), ('city', 'New York')]
my_dict = dict(pairs)
print(my_dict)  # 输出: {'name': 'John', 'age': 30, 'city': 'New York'}
```

#### 4. 从两个并行序列创建

使用`zip()`函数将两个列表（或任何序列）合并成一个字典。

```python
keys = ['name', 'age', 'city']
values = ['John', 30, 'New York']
my_dict = dict(zip(keys, values))
print(my_dict)  # 输出: {'name': 'John', 'age': 30, 'city': 'New York'}
```

:::note

`zip(*iterables)`

- 返回一个元组的迭代器，其中的第 i 个元组包含来自每个可迭代对象的第 i 个元素
- 当所输入可迭代对象中最短的一个被耗尽时，迭代器将停止迭代
- 不带参数时，它将返回一个空迭代器
- 当只有一个可迭代对象参数时，它将返回一个单元组的迭代器

:::

#### 5. 字典推导

使用字典推导式从任何形式的可迭代对象创建字典。

```python
keys = ['name', 'age', 'city']
values = ['John', 30, 'New York']
my_dict = {k: v for k, v in zip(keys, values)}
print(my_dict)  # 输出: {'name': 'John', 'age': 30, 'city': 'New York'}
```

#### 6. 使用`fromkeys()`

使用`dict.fromkeys()`方法从键列表创建字典，所有键的初始值都相同。

```python
keys = ['name', 'age', 'city']
default_value = None
my_dict = dict.fromkeys(keys, default_value)
print(my_dict)  # 输出: {'name': None, 'age': None, 'city': None}
```

:::note

`fromkeys(iterable[, value])`，创建一个新字典，以 `iterable` 的元素作为键，`value` 作为值，`value` 默认为 `None`

:::

每种方法有其适用场景，例如，直接使用花括号或`dict()`构造函数适合少量键值对的情况，而`zip()`或字典推导更适合于动态生成键值对的场景。`fromkeys()`方法适用于需要初始化字典的键，而所有键共享相同的初始值时。



### 对象方法

Python字典是一种可变的容器，可以存储任意类型对象，其中每个元素由一个键和一个值组成。字典的键必须是不可变类型，比如字符串、数字或元组。Python字典提供了丰富的方法来进行操作，以下是一些常用的字典对象方法：

#### 查看和访问元素

- `get(key[, default])`：返回指定键的值。如果键不在字典中，返回`default`值

- `keys()`：返回一个视图对象，显示字典的所有键

- `values()`：返回一个视图对象，显示字典的所有值

- `items()`：返回一个视图对象，包含字典的键值对

  :::note

  视图对象

  - **动态**：视图对象与原字典是动态链接的。这意味着如果更改了原字典，视图对象也会相应地显示新的内容

  - **可迭代**：虽然视图对象不能通过索引访问，但它们是可迭代的，可以使用for循环遍历

  - **大小**：视图对象不占用原字典内容的额外内存，它们只是原字典数据的一个接口或窗口

  - **常见用法**：进行迭代操作或者在需要字典键、值列表的地方使用

    ```python
    # 遍历字典的键
    for key in my_dict.keys():
        print(key)
    
    # 遍历字典的值
    for value in my_dict.values():
        print(value)
    
    # 遍历字典的键值对
    for key, value in my_dict.items():
        print(f"{key}: {value}")
    ```

  :::

#### 添加和修改

- `update([other])`
  - 使用另一个字典的键值对更新字典，也可以用键值对作为参数进行更新
  - `other`：可以是另一个字典对象；一个包含键/值对的可迭代对象；关键字参数

- `setdefault(key[, default])`：如果字典存在指定的键，则返回其值。如果不存在，则插入键值对，值为`default`

#### 删除

- `pop(key[, default])`：删除指定键的元素，返回该元素的值。如果键不存在，则返回`default`值，如果`default`未提供，则抛出`KeyError`
- `popitem()`：随机移除一个键值对，并以元组形式返回
- `clear()`：清空字典中的所有项

#### 复制

- `copy()`：返回字典的浅拷贝

#### 其他方法

- `fromkeys(seq[, value])`：创建一个新字典，以序列`seq`中元素做键，以`value`做所有键的值

#### 示例

```python
# 创建字典
my_dict = {'name': 'John', 'age': 30, 'city': 'New York'}

# 访问元素
print(my_dict.get('name'))  # 输出: John
print(my_dict.keys())       # 输出字典所有的键
print(my_dict.values())     # 输出字典所有的值
print(my_dict.items())      # 输出字典所有的键值对

# 添加和修改
my_dict.update({'country': 'USA', 'age': 31})
print(my_dict)  # 更新后的字典

# 删除
removed_value = my_dict.pop('city')
print(removed_value)  # 输出: New York
print(my_dict)        # 删除'city'键后的字典

# 复制
new_dict = my_dict.copy()
print(new_dict)  # 输出复制的字典

# 从keys创建新字典
new_from_keys = dict.fromkeys(['a', 'b', 'c'], 1)
print(new_from_keys)  # 输出: {'a': 1, 'b': 1, 'c': 1}
```

这些方法使得字典在Python中成为非常强大且灵活的数据结构，适用于存储和管理键值对数据







## Set

**Set 可以改变，不是序列**



### 特性

- 无序性
- 不重复性
- 集合里只能包含不可变的数据类型
- 可以使用花括号 { } 或者 set() 函数创建集合
- 创建空集合必须用 set()，因为 { } 是用来创建空字典的



在Python中，`set`和`frozenset`都是集合类型，用于存储不重复的元素。它们之间的主要区别在于`set`是可变的，而`frozenset`是不可变的。这意味着你可以修改`set`（如添加或删除元素），但不能修改`frozenset`。由于这个特性，`frozenset`可以作为字典的键或另一个集合的元素，而`set`则不能。



### Set和Frozenset

`set([iterable])`：返回一个新的 set 对象，其元素来自于 `iterable`，如果未指定 `iterable`，则将返回空集合

**创建和基本操作示例：**

```python
# 创建一个set
s = {1, 2, 3}
print(s)  # 输出: {1, 2, 3}

# 添加元素
s.add(4)
print(s)  # 输出: {1, 2, 3, 4}

# 移除元素
s.remove(2)
print(s)  # 输出: {1, 3, 4}

# 检查元素是否存在
print(3 in s)  # 输出: True
```

`frozenset`是不可变集合，一旦创建就不能更改。这使得它适用于作为其他集合的元素或字典的键。`frozenset`可以进行类似`set`的操作，如并集、交集等，但不能进行添加或删除元素的操作。

**创建和基本操作示例：**

```python
# 创建一个frozenset
fs = frozenset([1, 2, 3])
print(fs)  # 输出: frozenset({1, 2, 3})

# 尝试修改frozenset（以下操作会抛出异常）
# fs.add(4)  # AttributeError: 'frozenset' object has no attribute 'add'

# 检查元素是否存在
print(2 in fs)  # 输出: True
```

由于不可变性，`frozenset`可以用作字典的键或集合的元素，而`set`则不能



### 集合关系

- 交集（Intersection）
- 并集（Union）
- 差集（Difference）
- 对称差集（Symmetric Difference）
- 子集（Subset）和超集（Superset）

#### 交集（Intersection）

交集操作返回两个或多个集合中都存在的元素

- 使用方法：`set1.intersection(set2, ...)`
- 使用运算符：`set1 & set2 & ...`

```python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a.intersection(b))  # 输出: {3, 4}
print(a & b)              # 输出: {3, 4}
```

#### 并集（Union）

并集操作返回两个或多个集合中所有的元素，重复的只会出现一次

- 使用方法：`set1.union(set2, ...)`
- 使用运算符：`set1 | set2 | ...`

```python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a.union(b))  # 输出: {1, 2, 3, 4, 5, 6}
print(a | b)       # 输出: {1, 2, 3, 4, 5, 6}
```

#### 差集（Difference）

差集操作返回存在于第一个集合但不在其他集合中的元素

- 使用方法：`set1.difference(set2, ...)`
- 使用运算符：`set1 - set2 - ...`

```python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a.difference(b))  # 输出: {1, 2}
print(a - b)            # 输出: {1, 2}
```

#### 对称差集（Symmetric Difference）

对称差集操作返回两个集合中不重复的元素，即存在于一个集合但不同时存在于两个集合中的元素

- 使用方法：`set1.symmetric_difference(set2)`
- 使用运算符：`set1 ^ set2`

```python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a.symmetric_difference(b))  # 输出: {1, 2, 5, 6}
print(a ^ b)                      # 输出: {1, 2, 5, 6}
```

#### 子集（Subset）和超集（Superset）

- 子集检查：`set1.issubset(set2)`，如果`set1`中的所有元素都在`set2`中，则`set1`是`set2`的子集
- 超集检查：`set1.issuperset(set2)`，如果`set2`中的所有元素都在`set1`中，则`set1`是`set2`的超集

```python
a = {1, 2}
b = {1, 2, 3, 4}
print(a.issubset(b))   # 输出: True
print(b.issuperset(a)) # 输出: True
```



### 对象方法

对于`set`和`frozenset`在Python中的使用，主要区别在于`set`是可变的，而`frozenset`是不可变的。这种区别导致某些方法只适用于`set`，而不适用于`frozenset`。以下是两者通用的方法以及只对`set`适用的方法的区分：

#### `set`和`frozenset`都可用的方法

这些方法主要是进行查询或比较，不会修改集合的内容：

- `copy()`：返回集合的一个浅拷贝
- `isdisjoint(other)`：判断集合与指定集合是否不相交
- 集合关系方法

#### 只对`set`适用的方法

由于`frozenset`是不可变的，以下方法只适用于`set`，因为它们会修改集合的内容：

- `add(elem)`：向集合添加一个元素
- `clear()`：移除集合中的所有元素
- `discard(elem)`：从集合中移除一个元素，如果元素不存在，则不做任何操作
- `pop()`：随机移除集合中的一个元素并返回它。如果集合为空，抛出`KeyError`
- `remove(elem)`：从集合中移除一个元素；如果元素不存在，则抛出`KeyError`
- `update(other, ...)`：更新集合，添加来自 `others` 中的所有元素
- `intersection_update(other, ...)`：更新集合，只保留其中在所有 `others` 中也存在的元素
- `difference_update(other, ...)`：更新集合，移除其中也存在于任意一个 `others` 中的元素
- `symmetric_difference_update(other)`：更新集合，只保留存在于一方而非共同存在的元素

```python
# 创建集合
s = {1, 2, 3}

# 添加元素
s.add(4)
print(s)  # 输出: {1, 2, 3, 4}

# 删除元素
s.remove(2)
print(s)  # 输出: {1, 3, 4}

# 集合运算
s1 = {1, 2, 3}
s2 = {2, 3, 4}
print(s1.union(s2))  # 输出: {1, 2, 3, 4}
print(s1.intersection(s2))  # 输出: {2, 3}

# 集合更新
s1.update(s2)
print(s1)  # 输出: {1, 2, 3, 4}

# 成员检查
print({1, 2}.issubset(s1))  # 输出: True
```


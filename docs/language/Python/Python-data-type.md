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

Python中的字符串对象提供了一系列内置的方法，这些方法可以执行各种字符串操作，如搜索、替换、检验和转换等。以下是一些常用字符串方法的简介：

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

Python中的列表（list）是一种可变序列，能够存储不同类型的值。列表提供了多种方法来进行添加、删除、修改和查询等操作。

以下是一些常用的列表对象方法：

#### 添加和合并

- `append(x)`：将一个元素添加到列表的末尾
- `extend(iterable)`：扩展列表，将一个可迭代对象的所有元素添加到列表的末尾
- `insert(i, x)`：在指定位置插入一个元素。第一个参数是准备插入到其前面的元素的索引

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
- `clear()`：移除列表中的所有项，等于删除所有元素

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

- `index(x[, start[, end]])`：返回列表中第一个值为`x`的元素的索引。可以指定搜索的起始和结束位置
- `count(x)`：返回`x`在列表中出现的次数
- `sort(key=None, reverse=False)`：对列表中的元素进行排序（参数`reverse=True`表示降序排序）
- `reverse()`：倒排列表中的元素

  ```python
  fruits = ['apple', 'banana', 'cherry', 'date', 'banana']
  print(fruits.index('banana'))  # 输出: 1
  print(fruits.count('banana'))  # 输出: 2
  
  fruits.sort(reverse=True)
  print(fruits)  # 输出: ['date', 'cherry', 'banana', 'banana', 'apple']
  
  fruits.reverse()
  print(fruits)  # 输出: ['apple', 'banana', 'banana', 'cherry', 'date']
  ```

  

#### 复制

- `copy()`：返回列表的浅复制

  ```python
  fruits_copy = fruits.copy()
  print(fruits_copy)  # 输出: ['apple', 'banana', 'banana', 'cherry', 'date']
  ```

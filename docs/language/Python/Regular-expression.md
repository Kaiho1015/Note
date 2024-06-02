---
id: regular-expression
slug: /python/regular-expression
title: 正则表达式
data: 2023-09-31
authors: Kaiho
tags: [python, language]
keywords: [python, language]
---
正则表达式（Regular Expression），是对字符串操作的一种"逻辑公式"，由一些特定的字符组成的一个"匹配规则"，可以对字符串进行复杂的搜索、替换和分析操作



## 字符匹配

对要匹配的字符串的元素挨个判断是否与 "规则" 匹配



### 普通字符

- 大部分字母和字符都会和自身匹配，直接匹配具体字符

  ```py
  import re
  pattern = r'1024' 
  text = 'this is 1024'
  match = re.search(pattern, text)
  print(match.group())  # 输出: '1024'
  ```

  

### 元字符

有些字符它们和自身并不匹配，而是匹配一些与众不同的东西或者影响正则表达式的其他部分（对其重复或改变含义）

**`.`**

- 匹配除换行符外的任何单个字符

- DOTALL 模式下，它将匹配包括换行符的任意一个字符

   ```python
   re.search(r'p.t', 'pat')  # 匹配'pat'
   ```

   

   

   

   

   **`^`**

   匹配输入字符串的开始。

   ```python
   re.search(r'^Hello', 'Hello World')  # 匹配以'Hello'开始的字符串
   ```

- **`$`**：匹配输入字符串的结束。
   ```python
   re.search(r'World$', 'Hello World')  # 匹配以'World'结束的字符串
   ```

- **`*`**：匹配前一个字符零次或多次。
   ```python
   re.search(r'bo*', 'boooo')  # 匹配'b'后跟任意数量的'o'
   ```

- **`+`**：匹配前一个字符一次或多次。
   ```python
   re.search(r'bo+', 'boooo')  # 匹配'b'后跟至少一个'o'
   ```

- **`?`**：匹配前一个字符零次或一次。
   ```python
   re.search(r'bo?', 'boooo')  # 匹配'b'后跟零个或一个'o'
   ```

- **`{m,n}`**：匹配前一个字符至少m次，最多n次。
   ```python
   re.search(r'a{2,3}', 'aaaa')  # 匹配至少2次至多3次的'a'
   ```

- **`[]`**：字符类，匹配方括号中的任意字符。
   ```python
   re.search(r'[aeiou]', 'hello')  # 匹配任意一个元音字母
   ```

- **`|`**：选择，匹配`|`前后的任意一个表达式。
   ```python
   re.search(r'cat|dog', 'dog')  # 匹配'cat'或'dog'
   ```

- **`()`**：分组，将括号中的表达式作为一个整体进行处理。
  ```python
  re.search(r'(ab)+', 'ababab')  # 匹配一个或多个重复的'ab'
  ```

这些元字符是构建正则表达式的基础，使你能够创建复杂的模式来匹配、搜索和替换文本中的数据。







### 转义字符








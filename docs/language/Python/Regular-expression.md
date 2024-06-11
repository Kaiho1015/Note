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

- DOTALL 模式下，将匹配包括换行符的任意一个字符

  ```python
  re.search(r'p.t', 'pat')  # 匹配'pat'
  
  text = "hello\nworld"
  result = re.search(r'hello.world', text, re.DOTALL)
  print(result)
  ```



**`^`**

- 匹配字符串的开头

- MULTILINE 模式下，会继续匹配换行后的开头

  ```py
  import re
  
  text = "start of line 1\nstart of line 2\nanother line"
  
  # 不使用MULTILINE模式
  result1 = re.findall(r'^start', text)
  print(result1)  # 输出: ['start']
  
  # 使用MULTILINE模式
  result2 = re.findall(r'^start', text, re.MULTILINE)
  print(result2)  # 输出: ['start', 'start']
  ```



**`$`**

- 匹配字符串的末尾

- MULTILINE 模式下，会匹配换行符之前的末尾（换行符可以不在字符串末尾）

  ```py
  import re
  
  text = "line ends here\nanother line ends\nno end here"
  
  # 不使用 MULTILINE 模式
  result1 = re.findall(r'ends$', text)
  print(result1)  # 输出: []，因为"ends"后面有" here"，所以不匹配末尾
  
  # 使用 MULTILINE 模式
  result2 = re.findall(r'ends$', text, re.MULTILINE)
  print(result2)  # 输出: ['ends']，因为第二行的"ends"确实在行的末尾
  ```



**`*`**

- 对它前面的正则表达式匹配**0到任意次**重复， 尽量多的匹配（贪婪）

  ```py
  import re
  
  text = "The moon is beautiful tonight, soooo beautiful!"
  pattern = r'so*'
  
  # 搜索文本
  matches = re.findall(pattern, text)
  print(matches)  # 输出: ['s', 'soooo']
  
  # 使用 * 以贪婪模式匹配 'o'
  pattern_greedy = r'be.*ful'
  match_greedy = re.search(pattern_greedy, text)
  print(match_greedy.group())  # 输出: 'beautiful tonight, soooo beautiful'
  ```



**`+`**

- 对它前面的正则表达式匹配**1到任意次**重复， 尽量多的匹配（贪婪）

  ```py
  import re
  
  text = "The moon is beautiful tonight, soooo beautiful!"
  pattern = r'so+'
  
  # 搜索文本
  matches = re.findall(pattern, text)
  print(matches)  # 输出: ['soooo']
  
  # 使用 + 以贪婪模式匹配 'o'
  pattern_greedy = r'be.+ful'
  match_greedy = re.search(pattern_greedy, text)
  print(match_greedy.group())  # 输出: 'beautiful tonight, soooo beautiful'
  ```



**`?`**

- 对它前面的正则表达式匹配**0次或1次**，尽量多的匹配（贪婪）

  ```py
  import re
  
  text = "The moon is beautiful tonight, so beautiful!"
  
  # 对 'so' 后面的 'o' 匹配零次或一次
  pattern = r'so?'
  matches = re.findall(pattern, text)
  print(matches)  # 输出: ['s', 'so']
  ```



**`?? +? ??`**

- `*?`, `+?`, 和 `??` 在正则表达式中表示**非贪婪（懒惰）匹配**的量词

- `*?`：匹配前一个字符零次或多次，但尽可能少地匹配。

- `+?`：匹配前一个字符一次或多次，但尽可能少地匹配。

- `??`：匹配前一个字符零次或一次，但尽可能少地匹配。

  ```py
  import re
  
  text = "The moon is beautiful tonight, soooo beautiful!"
  
  # 使用 *? 进行非贪婪匹配
  pattern_star_non_greedy = r'so*?'
  matches_star_non_greedy = re.findall(pattern_star_non_greedy, text)
  print(matches_star_non_greedy)  # 输出: ['s', 's']
  
  # 使用 +? 进行非贪婪匹配
  pattern_plus_non_greedy = r'so+?'
  matches_plus_non_greedy = re.findall(pattern_plus_non_greedy, text)
  print(matches_plus_non_greedy)  # 输出: ['so']
  
  # 使用 ?? 进行非贪婪匹配
  pattern_question_non_greedy = r'so??'
  matches_question_non_greedy = re.findall(pattern_question_non_greedy, text)
  print(matches_question_non_greedy)  # 输出: ['s', 's']
  ```



**`{m}`**

- 指定之前的正则表达式重复匹配 `m` 次

  ```py
  import re
  
  text = "helloooo"
  
  # 使用 {m} 精确匹配 'o' 3次
  pattern = r'o{3}'
  match = re.search(pattern, text)
  print(match.group())  # 输出: 'ooo'
  ```



**`{m,n}`**

- 指定之前的正则表达式至少匹配 `m` 次，最多匹配 `n` 次，尽量多的匹配（贪婪方式）

- 忽略 `m` 则下限默认为 0，忽略 `n` 则上限默认为无限次（逗号不能省略）

  ```py
  import re
  
  text = "ooooooh!"
  
  # 省略 m，表示下限为 0，上限为 3
  pattern1 = r'o{,3}'
  matches1 = re.findall(pattern1, text)
  print(matches1)  # 输出: ['ooo', 'ooo', '', '', '']
  
  # 省略 n，表示至少匹配2次，上限为无限
  pattern2 = r'o{2,}'
  matches2 = re.findall(pattern2, text)
  print(matches2)  # 输出: ['oooooo']
  ```

  :::note

  在字符串的最末尾，也会进行一次匹配尝试，所以会有三个空字符串

  在一些正则表达式中，开头和末尾可能会匹配空字符串，是常见现象，需要注意

  :::



**`{m,n}?`**

- `{m,n}`的非贪婪模式

  ```py
  import re
  
  text = "hellooooo"
  
  # 使用 {1,4}? 进行非贪婪匹配 'o'，尽量少地匹配但至少匹配1次，最多4次
  pattern = r'o{1,4}?'
  matches = re.findall(pattern, text)
  print(matches)  # 输出: ['o', 'o', 'o', 'o', 'o']
  ```



**`|`**

- 任意个正则表达式可以用 `|` 连接，如 `A|B` 表示匹配正则表达式 A 或者 B，一旦有一个先匹配成功，另外的就不会再进行匹配，`|` 绝不贪婪

  ```py
  import re
  
  text = "cat or dog"
  
  # 使用 | 匹配 'cat' 或 'dog'
  pattern = r'cat|dog'
  matches = re.findall(pattern, text)
  print(matches)  # 输出: ['cat', 'dog']
  ```



**`[]`**

- 用于创建一个字符集，这个字符集可以匹配方括号内的任何单一字符

- 匹配列出的单个字符

  ```py
  import re
  text = "Hello, world!"
  pattern = r'[aeiou]'
  matches = re.findall(pattern, text)
  print(matches)  # 输出：['e', 'o', 'o']
  ```

- 匹配一定范围的字符

  ```py
  # 匹配所有小写字母
  pattern = r'[a-z]'
  # 匹配所有大写字母
  pattern = r'[A-Z]'
  # 匹配所有字母
  pattern = r'[a-zA-Z]'
  # 匹配所有数字
  pattern = r'[0-9]'
  ```

- 可以使用转义字符

  ```py
  import re
  
  text = "Room 101: Contains 4 beds, 2 sofas."
  
  # 在字符集中使用 \d 匹配所有数字
  pattern_digits = r'[\d]'
  matches_digits = re.findall(pattern_digits, text)
  print(matches_digits)  # 输出：['1', '0', '1', '4', '2']
  
  # 在字符集中使用 \s 匹配所有空白字符
  pattern_spaces = r'[\s]'
  matches_spaces = re.findall(pattern_spaces, text)
  print(matches_spaces)  # 输出：[' ', ' ', ' ', ' ', ' ', ' ']
  ```

- 元字符在字符集中失去原来的含义，当作普通字符处理

  ```py
  import re
  
  text = "Find all: .,*,+,?,^,-"
  
  # 使用字符集匹配特殊字符
  pattern = r'[.*+?^-]'
  matches = re.findall(pattern, text)
  print(matches)  # 输出：['.', '*', '+', '?', '^', '-']
  ```

- 排除特定字符使用`^`，仅在字符集首字符为`^`有取反作用，在其他位置没有特殊含义

  ```py
  import re
  
  text = "hello, world!"
  
  # 排除特定字符：匹配非元音字母
  pattern_exclusion = r'[^aeiou]'
  matches_exclusion = re.findall(pattern_exclusion, text)
  print(matches_exclusion)  # 输出: ['h', 'l', 'l', ',', ' ', 'w', 'r', 'l', 'd', '!']
  
  # 字面意义的 '^'
  pattern_literal = r'[a^]'
  matches_literal = re.findall(pattern_literal, text)
  print(matches_literal)  # 输出: ['a']
  ```

  

**`(...)`**

- 捕获分组，匹配括号内的任意正则表达式，括号内的任何匹配都可以作为一个整体进行操作和引用

- 捕获的分组从1开始编号，编号顺序是根据左括号的出现顺序

- 组0是一个特殊的组，代表了整个匹配的字符串

- 这些分组可以在正则表达式的后续部分通过 `\number` 引用

  ```py
  import re
  
  text = "The number 42 is important."
  pattern = r'The number (\d+) is important.'
  match = re.search(pattern, text)
  if match:
      print(match.group(0))  # 输出整个匹配字符串
      print(match.group(1))  # 输出第一个捕获组的内容, 即 '42'
  ```

  









### 转义字符

`\`：转义特殊字符，对于想要匹配特殊字符的原来字符，可以使用转义字符

```py
import re

text = "a * b + c ? d"

# 匹配 * 号
pattern_star = r'\*'
match_star = re.findall(pattern_star, text)
print(match_star)  # 输出: ['*']

# 匹配 + 号
pattern_plus = r'\+'
match_plus = re.findall(pattern_plus, text)
print(match_plus)  # 输出: ['+']

# 匹配 ? 号
pattern_question = r'\?'
match_question = re.findall(pattern_question, text)
print(match_question)  # 输出: ['?']
```



通过`\`和一个字符组成可以作为一个特殊序列

`\number`

- 引用先前定义的捕获组





## 正则表达式使用

`re.compile(pattern, flags=0)`

- 将一个正则表达式的模式文本编译成一个正则表达式对象（`Pattern`对象）。
- `flags`：可选，用来控制正则表达式的匹配行为。常见的标志包括：
  - `re.IGNORECASE`（或 `re.I`）：使匹配对大小写不敏感
  - `re.MULTILINE`（或 `re.M`）：使`^`和`$`可以匹配每一行的开头和结尾
  - `re.DOTALL`（或 `re.S`）：使`.`能匹配任何字符，包括换行符

```python
import re

pattern = re.compile(r'\d+')
matches = pattern.findall('这里有123个数字')
print(matches)  # 输出：['123']
```



### `Pattern`对象方法

`Pattern.search(string[, pos[, endpos]])`

- `string`：要匹配的字符串

- `pos`：搜索的起始位置，默认为0

- `endpos`：搜索的结束位置，默认为字符串的长度

- 返回一个`Match`对象，如果找到匹配，则包含相关信息；如果没有找到，则返回`None`

  ```py
  import re
  
  pattern = re.compile(r'\d+')
  text = "Example 1234"
  match = pattern.search(text)
  if match:
      print("Found:", match.group())  # 输出: Found: 1234
  ```

  

`Pattern.match(string[, pos[, endpos]])`

- 从字符串的**起始部分**尝试匹配正则表达式的方法

  ```py
  import re
  
  pattern = re.compile(r'\d+')
  text = "1234 is an example"
  match = pattern.match(text)
  if match:
      print("Found:", match.group())  # 输出: Found: 1234
  ```



`Pattern.fullmatch(string[, pos[, endpos]])`

- 检查整个字符串是否完全符合正则表达式的模式

  ```py
  import re
  
  pattern = re.compile(r'\d+')
  text = "1234"
  match = pattern.fullmatch(text)
  if match:
      print("完全匹配:", match.group())  # 输出: 完全匹配: 1234
  ```



`Pattern.findall(string[, pos[, endpos]])`

- 对字符串从左往右扫描，找到所有不重复匹配，以列表的形式返回（保存子串），如果有多个组（至少两个子组），则返回元组列表，如果没有找到匹配的，则返回空列表

  ```python
  import re
  
  pattern = re.compile(r'\d+')
  text = "12 abc 34 def 56"
  matches = pattern.findall(text)
  print(matches)  # 输出: ['12', '34', '56']
  ```

  

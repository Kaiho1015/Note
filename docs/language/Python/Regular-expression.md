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




`(?:...)`

- 非捕获分组，所匹配的子字符串不能在执行匹配后被获取或是之后在模式中被引用

- 常用于优化正则表达式的性能，或者当需要使用分组进行逻辑组合但不需要捕获分组内容时使用

  ```py
  import re
  
  pattern = re.compile(r'(?:\d+)[a-z]')
  text = "123abc"
  match = pattern.search(text)
  if match:
      print(match.group())  # 输出: '3a'
  ```

  

`(?=...)`

- 前向肯定界定符（前瞻断言）

- 仅用于检查其后的字符是否符合断言内的正则表达式

- 如果符合，正则表达式继续匹配后面的内容；如果不符合，则匹配失败，即使到目前为止的匹配是成功的

  ```py
  import re
  
  # (?= euros) 表示匹配的数字后面必须紧跟着 " euros" 文本，但 " euros" 不会包括在匹配结果中。
  pattern = re.compile(r'\d+(?= euros)')
  text = "100 euros"
  match = pattern.search(text)
  if match:
      print(match.group())  # 输出: '100'
  ```



`(?!...)`

- 前向否定界定符（否定前瞻断言）

- 检查后续的字符**不符合**断言内的正则表达式

- 如果后续字符不符合断言内的正则，匹配继续；如果符合，则整个匹配失败

  ```py
  import re
  
  pattern = re.compile(r'\d+(?! euros)')
  text = "100 dollars"
  match = pattern.search(text)
  if match:
      print(match.group())  # 输出: '100'
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

- 引用先前定义的捕获组，匹配number代表的分组里面的内容

- 在 [ 和 ] 字符集内，任何数字转义都被看作是字符

  ```py
  import re
  
  pattern = re.compile(r'(\w+) \1')
  text = "hello hello"
  match = pattern.search(text)
  if match:
      print(match.group())  # 输出: 'hello hello'
  ```





`\A`

- 匹配字符串的开始

- 与 `^` 类似，但 `\A` 严格匹配整个字符串的起始位置，不受多行模式 (`re.M` 或 `re.MULTILINE`) 的影响，而 `^` 在多行模式下可以匹配每一行的起始位置

  ```py
  import re
  
  pattern = re.compile(r'\AThe')
  text = "The start of a text"
  match = pattern.search(text)
  if match:
      print("Match found at the start of the string")  # 输出: Match found at the start of the string
  ```

  

`\b`

- 单词边界锚点，它用来匹配一个单词字符与一个非单词字符之间的位置

  ```py
  import re
  
  pattern = re.compile(r'\bword\b')
  text = "word and wordy"
  match = pattern.findall(text)
  print(match)  # 输出: ['word']
  ```



`\B` 

- 匹配非单词边界的位置

- 匹配位于单词字符之间的位置，而不是单词与非单词字符之间的边界

  ```py
  import re
  
  pattern = re.compile(r'\Bion\B')
  text = "The ionosphere layer is significant."
  matches = pattern.findall(text)
  print(matches)  # 输出: ['ion']
  ```



`\d`

- 匹配任何阿拉伯数字字符，等同于 `[0-9]`

  ```py
  import re
  
  pattern = re.compile(r'\d+')
  text = "The year 2021"
  matches = pattern.findall(text)
  print(matches)  # 输出: ['2021']
  ```



`\D`

- 匹配任何非数字字符，当于 `[^0-9]`

  ```py
  import re
  
  pattern = re.compile(r'\D+')
  text = "Room 101"
  matches = pattern.findall(text)
  print(matches)  # 输出: ['Room ']
  ```



`\s`

- 匹配任何空白字符，包括空格、制表符、换行符等，相当于字符集 `[ \t\n\r\f\v]`，

  ```py
  import re
  
  pattern = re.compile(r'\s+')
  text = "Hello, World! How are you?"
  matches = pattern.findall(text)
  print(matches)  # 输出: [' ', ' ', ' ', ' ']
  ```



`\S`

- 匹配任何非空白字符

  ```py
  import re
  
  pattern = re.compile(r'\S+')
  text = "Hello, World! How are you?"
  matches = pattern.findall(text)
  print(matches)  # 输出: ['Hello,', 'World!', 'How', 'are', 'you?']
  ```



`\w`

- 匹配任何单词字符，包括字母、数字和下划线，相当于字符集 `[a-zA-Z0-9_]`



`\W`

- `\W` 用于匹配任何非单词字符，是 `\w` 的反义，相当于 `[^a-zA-Z0-9_]`

  ```py
  import re
  
  pattern_w = re.compile(r'\w+')
  pattern_W = re.compile(r'\W+')
  
  text = "Hello, World! How_are_you?"
  
  matches_w = pattern_w.findall(text)
  matches_W = pattern_W.findall(text)
  
  print("Word characters:", matches_w)  # 输出: ['Hello', 'World', 'How_are_you']
  print("Non-word characters:", matches_W)  # 输出: [', ', '! ', '?']
  ```



`\Z`

- 匹配字符串的结束位置，与 `$` 类似，但在多行模式下，`\Z` 仅匹配整个字符串的最末尾，而不是每一行的末尾

  ```py
  import re
  
  pattern = re.compile(r'end\Z')
  text = "This is the end"
  match = pattern.search(text)
  if match:
      print("Match found at the end of the string")  # 输出: Match found at the end of the string
  ```



`\n \t \\ \' \"`

- Python的标准转义字符也被正则表达式分析器支持





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

- 对字符串从左往右扫描，找到所有匹配正则表达式的非重叠匹配项，以列表的形式返回（保存子串），如果有多个组（至少两个子组），则返回元组列表，如果没有找到匹配的，则返回空列表

- 如果有捕获分组，找子组匹配的内容；如果没有捕获分组，找0组匹配的内容

  ```python
  import re
  
  pattern = re.compile(r'\d+')
  text = "12 abc 34 def 56"
  matches = pattern.findall(text)
  print(matches)  # 输出: ['12', '34', '56']
  ```



`Pattern.finditer(string[, pos[, endpos]])`

- 同`findall`，以迭代器形式返回

- 每个匹配项都是一个`Match`对象，包含匹配的详细信息

  ```py
  import re
  
  pattern = re.compile(r'\d+')
  text = "Example 1234 with more numbers 5678"
  matches = pattern.finditer(text)
  for match in matches:
      print(match.group(), match.start(), match.end())
  ```



`Pattern.split(string, maxsplit=0)`

- `maxsplit`：指定最大分割次数，如果为0（默认值），则表示不限制分割次数

- 如果正则表达式中包含捕获分组，那么分割结果中将包括这些捕获分组匹配到的内容，如果匹配到字符串的开始或者结尾，则会存在空字符串

- 按照匹配的子串将字符串分割，以列表形式返回

  ```py
  import re
  
  pattern = re.compile(r'(\d+)')
  text = "Hello123world456bye"
  result = pattern.split(text)
  print(result)  # 输出: ['Hello', '123', 'world', '456', 'bye']
  ```

  

`Pattern.sub(repl, string, count=0)`

- `repl`：替换用的字符串或一个函数。

  - 如果是字符串，可以包含反向引用如`\1`等；
  - 如果是函数，则该函数接收一个`Match`对象作为参数，并返回一个字符串

- `string`：要进行替换操作的原始字符串。

- `count`：最大替换次数，默认为0，表示替换所有匹配项

  ```py
  import re
  
  pattern = re.compile(r'\d+')
  text = "There are 123 apples and 456 oranges"
  replacement = "many"
  result = pattern.sub(replacement, text)
  print(result)  # 输出: "There are many apples and many oranges"
  
  
  def repl_func(match):
      # 将匹配的数字乘以 2
      return str(int(match.group(0)) * 2)
  
  
  result = pattern.sub(repl_func, text)
  print(result)  # 输出: "There are 246 apples and 912 oranges"
  ```

  

`Pattern.subn(repl, string, count=0)`

- 同`Pattern.sub()`，返回一个元组，其中第一个元素是替换后的字符串，第二个元素是实际进行的替换次数

  ```py
  import re
  
  pattern = re.compile(r'\d+')
  text = "There are 123 apples and 456 oranges"
  replacement = "many"
  result, num_subs = pattern.subn(replacement, text)
  print(result)  # 输出: "There are many apples and many oranges"
  print("Number of substitutions made:", num_subs)  # 输出: Number of substitutions made: 2
  ```

  



### `Match`对象方法

`Match.group([group1, ...])`

- `groupN`：对应的组号，默认为 0，返回整个匹配结果

- 如果指定了一个或多个组号，返回这些组对应的内容，如果有多个参数，结果就是一个元组

  ```py
  import re
  
  pattern = re.compile(r'(\d+).(\d+)')
  match = pattern.search("The numbers are 123.456")
  print(match.group())  # 输出: '123.456'
  print(match.group(1))  # 输出: '123'
  print(match.group(2))  # 输出: '456'
  print(match.group(1, 2))  # 输出: ('123', '456')
  ```

  

`Match.groups(default=None)`

- 返回一个包含所有捕获组内容的元组

- 如果某个组没有在匹配的文本中找到匹配项，那么对应的元组位置将填充为`None`，若指定了`default`参数，这时未匹配的组将填充为`default`指定的值

  ```py
  import re
  
  pattern = re.compile(r'(\d+).(\d+)?')
  match = pattern.search("The number is 123")
  print(match.groups())  # 输出: ('123', None) 因为第二个组没有匹配
  print(match.groups(default="Not matched"))  # 输出: ('123', 'Not matched')
  ```



`Match.start([group])`

- 返回指定组匹配的起始位置的索引

- 如果没有指定组号，默认为0，即返回整个匹配的起始位置

- 如果指定的组没有找到匹配，则返回`-1`

  ```py
  import re
  
  pattern = re.compile(r'(\d+).(\d+)')
  match = pattern.search("The numbers are 123.456")
  print(match.start())  # 输出: 17
  print(match.start(1))  # 输出: 17
  print(match.start(2))  # 输出: 21
  ```



`Match.end([group])`

- 返回指定组匹配的结束位置的索引

  ```py
  import re
  
  pattern = re.compile(r'(\d+).(\d+)')
  match = pattern.search("The numbers are 123.456")
  print(match.end())  # 输出: 22
  print(match.end(1))  # 输出: 20
  print(match.end(2))  # 输出: 22
  ```

  

`Match.span([group])`

- 返回一个元组，其中包含了指定组匹配的起始和结束位置的索引

  ```py
  import re
  
  pattern = re.compile(r'(\d+).(\d+)')
  match = pattern.search("The numbers are 123.456")
  print(match.span())  # 输出: (17, 22)
  print(match.span(1))  # 输出: (17, 20)
  print(match.span(2))  # 输出: (21, 22)
  ```

  

### 编译标志

在Python的正则表达式中，编译标志（flags）用于修改匹配行为，在编译时通过`re.compile(flages=re.M)`函数设置

常见的编译标志包括：

- `re.IGNORECASE`（或 `re.I`）：使匹配对大小写不敏感。

- `re.MULTILINE`（或 `re.M`）：使 `^` 和 `$` 能够分别匹配每行的开始和结束。

- `re.DOTALL`（或 `re.S`）：使点号（`.`）能够匹配包括换行符在内的所有字符。

- `re.ASCII`（或 `re.A`）：使 `\w`, `\W`, `\b`, `\B`, `\d`, `\D`, `\s` 和 `\S` 只匹配ASCII字符。

- `re.X` （或 `re.VERBOSE`）：可以编写更加清晰和易于理解的正则表达式，可以在正则表达式中添加空格、缩进和注释，这些都会在处理正则表达式时被忽略掉，不影响其功能

  ```py
  import re
  
  pattern = re.compile(r"""
      ^(\d{3})     # 区号
      [- ]?        # 可选的分隔符
      (\d{3})      # 前三位数字
      [- ]?        # 可选的分隔符
      (\d{4})      # 后四位数字
      $            # 字符串结束
      """, re.X)
  
  text = "123-456-7890"
  match = pattern.search(text)
  if match:
      print(match.groups())  # 输出: ('123', '456', '7890')
  ```

  

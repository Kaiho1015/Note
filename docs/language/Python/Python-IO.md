---
id: python-io
slug: /python/python-io
title: 文件
data: 2023-09-30
authors: Kaiho
tags: [python, language]
keywords: [python, language]
---
## 文件操作

文件编码方式分类：

- 文本文件
  - txt
  - html
  - json
  - ……
- 二进制文件
  - 图片
  - 音频
  - 视频
  - ……



在计算机中，所有文件都是以二进制形式存放，文本文件可以以二进制格式读取，而二进制文件不可以以文本格式读取

文件读取方法：`open(file, mode='r', encoding=None)`

- file：文件路径（相对路径或绝对路径）

- mode：文件打开的模式，默认为 'r' 模式

- encoding：编码方式（只用在文本模式下），默认依赖平台，通常设置为 'UTF-8'

- 打开 file 对应的文件，返回一个文件对象；如果该文件不能被打开，则引发 `OSError`

  ```python
  file = open(r'./first.txt', mode='w')
  ```

:::info[函数说明]

mode 常用模式：

| 模式 | 描述                                                         |
| :--: | :----------------------------------------------------------- |
|  r   | 以只读方式打开文件。文件的指针将会放在文件的开头             |
|  w   | 打开一个文件只用于写入。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新的文件再写入 |
|  x   | 新建一个文件只用于写入，如果该文件已存在则会报错             |
|  a   | 打开一个文件用于**追加**。如果该文件已存在，文件指针将会放在文件的结尾，即新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。 |
|  +   | 如果要以读写模式打开，加上 + 即可，比如：r+、w+、x+、a+      |
|  b   | 默认为文本模式，如果要以二进制模式打开，加上 b 即可，比如：rb、rb+、wb、wb+ |

:::



使用`open`打开文件如果在调用 `write` 的过程中出现了异常，则会导致 `close` 方法无法被正常调用，导致资源占用的浪费

```py
file = open(r'./t01.txt', mode='w')
file.write('hello world')
file.close() # 假设发生异常
```

这时可以有两种方法处理：

1. ```py
   file = open(r'example.txt', mode='w')
   try:
   	file.write('hello world')
   finally:
   	file.close()
   ```

2. `with`语句会创建一个上下文环境，当离开这个环境时，无论是由于代码块正常结束还是由于发生了异常，都会自动调用文件的`close()`方法

   ```py
   try:
       with open('example.txt', 'w') as file:
           file.write("Hello, world!")
           raise ValueError("Oops! Something went wrong.")
   except ValueError as e:
       print("Caught an exception:", e)
   # 文件在这里已经自动关闭，即使发生了异常
   ```

   





## fail对象常用方法

### `file.read(size=-1)`

- 从 file 中读取至多 `size` 个字符并返回

- 如果 `size` 为负值或 `None`，则读取至 EOF（End Of File）

  ```python
  with open('example.txt', 'r') as file:
      content = file.read()
      print(content)
  ```



### `file.readable()`

- 判断 file 是否可读，返回 `True` 或 `False`

  ```py
  with open('example.txt', 'r') as file:
      print(file.readable())  # 输出 True
  ```



### `file.readline(size=-1)`

- 从文件中读取并返回一行，`size`参数可以限制读取的字符数

  ```py
  with open('example.txt', 'r') as file:
      line = file.readline()
      print(line)
  ```



### `file.readlines(hint=-1)`

- 从文件中读取并返回包含多行的列表

- `hint`：默认为 -1，代表读取所有行（也可以指定读取的字符数，如果要读取的字符数超过一行，则按照两行读取，超过两行则按照三行读取，依次类推）

  ```python
  with open('example.txt', 'r') as file:
      lines = file.readlines()
      lines_two = file.readlines(11)
      print(lines,lines_two)
  ```

  

### `file.write(string)`

- 将字符串 `string` 写入到流并返回写入的字符数

  ```py
  with open('example.txt', 'w') as file:
      file.write("Hello, world!")
  ```



### `file.writable()`

- 判断 file 是否可写，返回 True 或 False

  ```py
  with open('example.txt', 'w') as file:
      print(file.writable())  # 输出 True
  ```



### `file.writelines(lines)`

- `lines`：`Iterable[str]`

- 写入一个字符串列表到文件中，不自动添加换行符

  ```py
  with open('example.txt', 'w') as file:
      lines = ["Hello, world!", "Welcome to Python."]
      file.writelines(lines)
  ```

  

### `file.flush()`

- 刷新文件的内部缓冲区，即将缓冲区中的数据立即写入文件，而不是等到自动刷新

- 控制数据写入时间在处理实时数据或确保关键数据及时保存到磁盘的应用中非常重要

  ```py
  # 模拟数据采集过程并实时写入文件
  data_points = ["data1", "data2", "data3", "data4", "data5"]
  
  with open('log.txt', 'w') as file:
      for data in data_points:
          file.write(f'{data}\n')  # 写入数据点
          file.flush()  # 立即将缓冲区内容写入文件
          print(f'Written {data} to file.')
          time.sleep(1)  # 模拟数据采集间隔
  ```

  在这个例子中，每采集到一个数据点，就立即写入到日志文件`log.txt`并通过调用`flush()`方法强制刷新缓冲区，确保即使在发生突然的程序中断时，所有已采集的数据也已安全写入磁盘

:::info

一般情况下，文件关闭后会自动刷新缓冲区

:::



### `file.close()`

- 刷新缓冲区并关闭该文件。如果文件已经关闭，则此方法无效
- 文件关闭后，对文件的任何操作（如：读取或写入）都会引发 `ValueError`
- 通常不需要直接调用，因为用`with`语句打开文件会在结束时自动关闭文件



### `file.seek(offset, whence=io.SEEK_SET)`

- 移动文件指针到新的位置

- `offset`：偏移量，即从参考点移动多少字节。

- `whence`：参考点

  - `io.SEEK_SET / 0`（文件开头，默认），`offset` 应为零或正值
  - `io.SEEK_CUR / 1`（当前位置），`offset` 可以为负值
  - `io.SEEK_END / 2`（文件末尾），`offset` 通常为负值

- 在文本文件和二进制文件中使用有所不同

  - **文本文件**：在文本模式 (`'r'`, `'w'`, `'a'` 等模式加 `'t'` 或默认不加) 中打开的文件，使用 `file.seek()` 时通常只允许从文件开头进行搜索（即 `offset` 必须是从文件开头开始计算的绝对位置）。尝试从当前位置或文件末尾进行相对搜索可能会引发异常或行为不符合预期，因为文本文件中的字符编码可能会导致跳转到错误的位置
  - **二进制文件**：在二进制模式 (`'rb'`, `'wb'`, `'ab'`) 中打开的文件，`file.seek()` 可以接受任何位置作为起点（包括从当前位置和文件末尾进行相对定位）。这是因为二进制文件中的数据以字节为单位进行精确控制。

  ```python
  # 二进制文件中使用 file.seek()
  with open('example.bin', 'rb+') as file:
      file.seek(10, io.SEEK_SET)  # 从文件开头向后移动10个字节
      file.seek(5, io.SEEK_CUR)   # 从当前位置再向后移动5个字节
      file.seek(-3, io.SEEK_END)  # 从文件末尾向前移动3个字节
  ```

  

### `file.tell()`

- 返回当前文件指针的位置（一个整数，表示从文件开头到当前位置的字节偏移量）

  ```py
  # 打开文件并读取一些数据
  with open('example.txt', 'r') as file:
      data = file.read(10)
      position = file.tell()  # 获取当前位置
      print('Current position:', position)
  ```

  

## 路径操作

在Python中，路径操作主要涉及使用`os.path`模块和`pathlib`模块来处理文件和目录的路径。

1. **`os.path`模块**：
   - 提供了一系列处理文件名和路径的函数，如`os.path.join()`用于路径拼接，`os.path.exists()`检查路径是否存在，`os.path.isdir()`和`os.path.isfile()`分别检查路径是不是目录和文件。
2. **`pathlib`模块**：
   - 从Python 3.4开始引入，提供了面向对象的文件系统路径操作。它封装了很多`os.path`的功能，并通过`Path`类提供了更直观和易于使用的API。



`Path.cwd()`

- 返回一个表示当前工作目录的 `Path` 对象

  ```py
  from pathlib import Path
  
  # 获取当前工作目录
  current_path = Path.cwd()
  print(current_path)
  ```

  

`Path.iterdir()`

- 列出目录下的所有项

  ```py
  from pathlib import Path
  p = Path('/some/directory')
  for entry in p.iterdir():
      print(entry.name)
  ```



`Path.mkdir()`

- 创建目录

- `parents`参数为`True`会递归创建目录，默认为`False`，如果父目录不存在，将会抛出一个 `FileNotFoundError`。

  ```py
  from pathlib import Path
  p1 = Path('/some/directory/new_folder')
  p1.mkdir(parents=True, exist_ok=True)  # 递归创建目录，如果已存在不抛出错误
  
  # 尝试创建一个新目录，不递归创建父目录
  p2 = Path('/some/directory/new_folder')
  p2.mkdir(parents=False, exist_ok=True)  # 如果目录已存在，不会抛出错误，如果父目录不存在，会抛出错误
  ```

  

`Path.unlink()`

- 删除单个文件

  ```py
  from pathlib import Path
  p = Path('/path/to/file')
  p.unlink()  # 删除文件
  ```

  

`Path.rmdir()`

- 删除空目录
- 如果尝试删除一个不为空的目录，会抛出一个 `OSError` 异常
- 如果需要删除一个不为空的目录（包括其所有子目录和文件），可以使用 `shutil.rmtree()` 函数，递归地删除目录及其所有内容

  ```python
  from pathlib import Path
  p = Path('/path/to/empty_directory')
  
  # 如果目录存在且不为空，使用shutil.rmtree()删除，否则使用rmdir()
  if path.exists():
    shutil.rmtree(path)
  else:
    p.rmdir()
  ```



`Path.rename(target)`

  - 重命名文件或移动文件和目录

  - 不会自动创建中间目录

    ```py
    from pathlib import Path
    
    old_path = Path('/path/to/old')
    new_path = Path('/new/path/to/new')
    
    # 确保新路径的父目录存在
    new_path.parent.mkdir(parents=True, exist_ok=True)
    
    # 重命名或移动文件
    old_path.rename(new_path)
    ```

    

`Path.absolute()`

- 获取文件的绝对路径

  ```python
  from pathlib import Path
  p = Path('example.txt')
  print(p.absolute())
  ```



`Path.name`

- 获取路径中的文件名。

  ```python
  p = Path('/path/to/example.txt')
  print(p.name)  # 输出 'example.txt'
  ```



`Path.parent`

- 获取路径中的目录名。

  ```python
  p = Path('/path/to/example.txt')
  print(p.parent)  # 输出 '/path/to'
  ```



`Path.parts`

- 返回一个路径的各个组成部分的元组

  ```python
  p = Path('/path/to/example.txt')
  print(p.parts)  # 输出 ('/', 'path', 'to', 'example.txt')
  ```



`Path.suffix`

- 获取文件的扩展名

  ```python
  from pathlib import Path
  p = Path('/path/to/file.txt')
  print(p.suffix)  # 输出 '.txt'
  ```



`Path.exists()`

- 检查路径是否存在。

  ```python
  p = Path('/path/to/file.txt')
  print(p.exists())  # 返回 True 或 False
  ```



`Path.is_absolute()`

- 检查路径是否是绝对路径

  ```python
  p = Path('/path/to/file.txt')
  print(p.is_absolute())  # 返回 True
  ```



`Path.is_file()`

- 检查路径是否指向一个文件

  ```python
  p = Path('/path/to/file.txt')
  print(p.is_file())  # 返回 True 或 False
  ```



`Path.is_dir()`

- 检查路径是否指向一个目录。

  ```python
  from pathlib import Path
  p = Path('/path/to/directory')
  print(p.is_dir())  # 返回 True 或 False
  ```



`Path.joinpath(*other)`

- 将多个路径组件合并成一个路径。

  ```python
  from pathlib import Path
  p = Path('/path/to')
  full_path = p.joinpath('directory', 'file.txt')
  print(full_path)  # 输出 '/path/to/directory/file.txt'
  ```



## 文件格式

### JSON格式

在Python中处理JSON数据，可以使用内置的`json`模块。这个模块提供了简单的方法来编码和解码JSON数据

1. **加载JSON**: 将JSON字符串转换为Python字典（反序列化）

   ```python
   import json
   json_str = '{"name": "John", "age": 30, "city": "New York"}'
   data = json.loads(json_str)  # 将JSON字符串转换为字典
   print(data)
   ```

2. **导出JSON**: 将Python字典转换为JSON字符串（序列化）

   ```python
   data = {'name': 'John', 'age': 30, 'city': 'New York'}
   json_str = json.dumps(data)  # 将字典转换为JSON格式字符串
   print(json_str)
   ```

3. **读取JSON文件**: 从文件中读取JSON数据

   ```python
   with open('data.json', 'r') as file:
       data = json.load(file)  # 读取JSON文件内容到字典
   ```

4. **写入JSON文件**: 将数据写入JSON格式的文件

   ```python
   data = {'name': 'John', 'age': 30, 'city': 'New York'}
   with open('output.json', 'w') as file:
       json.dump(data, file)  # 写入字典到JSON文件
   ```

这些方法使得在Python中处理JSON数据变得非常简单和直接。



### Pickle格式

使用`pickle`模块可以序列化和反序列化Python对象，可以处理几乎所有的Python数据类型，包括自定义的类。

可以将Python对象保存到文件中，并在需要时重新加载它们。这对于持久化Python数据或在网络上传输Python对象非常有用。

1. 序列化（保存）

   ```py
   import pickle
   
   data = {'key': 'value', 'num': 42}
   with open('data.pkl', 'wb') as file:
       pickle.dump(data, file)  # 将字典对象保存到文件
   ```

2. 反序列化（加载）

   ```py
   import pickle
   
   with open('data.pkl', 'rb') as file:
       data = pickle.load(file)  # 从文件中加载字典对象
       print(data)
   ```

使用 `pickle` 时应小心，因为反序列化不可信的或不安全的数据可以执行恶意代码。因此，只对可信源的数据进行 `pickle` 操作。



### XML格式

XML（Extensible Markup Language）是一种标记语言，设计用来存储和传输数据。

通过标签来定义数据的结构，XML文档的第一句是声明语句，紧接着声明后面建立的第一个元素是根元素（有且只有一个），其他元素都是这个根元素的子元素，每个XML元素包括一个开始标签，一个结束标签，以及两个标签之间的内容，每个元素还可以存在对应的属性

1. 解析XML

   ```py
   import xml.etree.ElementTree as ET
   
   # 解析XML字符串
   xml_data = '<data><item>Hello</item></data>'
   root = ET.fromstring(xml_data)
   
   # 解析XML文件
   tree = ET.parse('data.xml')
   root = tree.getroot()
   ```

2. 访问数据

   ```python
   for child in root:
       print(child.tag, child.text)
   ```

3. 创建XML

   ```py
   root = ET.Element("root")
   child = ET.SubElement(root, "child")
   child.text = "This is a child element"
   
   # 将XML内容写入文件
   tree = ET.ElementTree(root)
   tree.write("output.xml")
   ```

4. 示例

   ```py
   import xml.etree.ElementTree as ET
   
   # 解析XML文档并获取根元素
   tree = ET.parse('./TestFile.xml')
   root = tree.getroot()
   
   # 检查root是否为ET.Element对象
   print(isinstance(root, ET.Element))  # 输出: True
   print('__getitem__' in dir(ET.Element))  # 检查是否可以使用索引访问，输出: True
   
   # 寻找特定元素并打印其属性和子元素的文本和标签
   obj = root.find('outputs/object')
   for i in obj:
       bndbox = i.find('bndbox')
       print(bndbox.attrib)  # 打印元素的属性字典
       for coord in bndbox:
           print(coord.text)  # 打印文本内容
           print(coord.tag)  # 打印标签名
   
   # 使用iterfind来遍历所有匹配的元素并打印详细信息
   for i in root.iterfind('outputs/object/item/bndbox'):
       print(i.findtext('xmin'))
       print(i.findtext('ymin'))
       print(i.findtext('xmax'))
       print(i.findtext('ymax'))
       print(i.get('number'))  # 打印元素的属性
   ```
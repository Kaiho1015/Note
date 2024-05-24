---
id: module-and-package
slug: /python/module-and-package
title: 模块与包
data: 2023-09-30
authors: Kaiho
tags: [python, language]
keywords: [python, language]
---
## 模块

模块是一个包含Python定义和语句的文件

模块可以包括函数、类和变量的定义，以及可执行的代码。

模块是Python对象具有随机名称属性的一个文件，这些名称即模块定义中的函数、类和变量。

创建模块最简单的方法是创建一个包含Python代码的文件，并且文件以`.py`为扩展名。



### 模块导入

模块导入主要通过`import`语句实现，允许在当前的命名空间中访问模块内的函数、类和变量

导入方式：

- `import module_name`
- `import module_name as alias`
- `from module_name import function_name`
- `from module_name import *`
  - 不推荐使用，可能会导致命名冲突



### 搜索路径

当导入一个模块时，解释器按照一定的顺序搜索模块，这个顺序定义在**模块搜索路径**中

模块搜索路径可以通过查看`sys.path`，其中包含以下位置：

1. 当前目录：Python首先搜索脚本的运行目录。
2. `PYTHONPATH`：环境变量，可以包含多个目录。
3. 标准库目录：Python的安装中包含的标准库。
4. 第三方包目录：通常是在`site-packages`目录下。
5. 如果这些路径都找不到，则会报错：`ModuleNotFoundError: Nomodule named 'xxx'`

可以动态修改`sys.path`来添加或修改搜索路径，这使得Python能够导入在非标准位置的模块。

```python
import sys
print(sys.path)  # 输出当前Python解释器的模块搜索路径
```



### `__name__`属性

`__name__` 是一个内置属性，存储一个模块的名称

- 每个模块都有一个`__name__`属性，当其值是 '`__main__`' 时，说明该模块自身在运行，否则说明该模块被导入，其值为模块名
- 这个属性常用于判断当前脚本是被导入为模块使用还是作为主程序直接执行

在完成一个模块的编写之前，我们一般会对模块中的功能进行测试，看看各项功能是否正常运行。对于这些测试的代码，我们希望只在直接运行这个py文件的时候执行，而在用其他的程序导入这个模块的时候不要执行。这个时候就可以借助`__name__`属性来实现

```python
if __name__ == "__main__":
    # 这段代码只有在文件作为主程序运行时才会执行，一般用于测试使用
    print("This script is running as the main program.")
else:
    # 这段代码在文件作为模块被导入时执行
    print("This script has been imported as a module.")
```





## 包

**包**是一个包含一个或多个模块的目录，并且必须包含一个`__init__.py`文件（即使是空的），这标志着这个目录可以被视为一个包

:::info[示例]

```shell
mypackage/
│
├── __init__.py
├── submodule1.py
└── submodule2.py
```

:::

### 包的导入

-  `import package_name` 
-  `from package_name import module_name` 
-  `from package_name.module_name import function_name` 
-  `import package_name.module_name as alias` 
-  `from package_name.module_name import *` 




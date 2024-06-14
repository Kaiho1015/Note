---
id: numpy
slug: /python/numpy
title: Numpy
data: 2023-10-1
authors: Kaiho
tags: [python, language]
keywords: [python, language]

---
NumPy（Numerical Python）是 Python 进行科学计算的一个扩展库，提供了大量的函数和操作，主要用于对**多维数组**执行计算，它比 Python 自身的嵌套列表结构要高效的多

NumPy 数组和Python列表区别：

1. **性能**：NumPy 数组提供更高的性能。它们在内存中存储为连续块，支持并行操作，速度通常远快于Python列表。
   
2. **存储效率**：NumPy 数组由于固定类型，占用的空间通常比Python列表小。
   
3. **功能**：NumPy 提供了大量用于数值计算的函数和操作，这在Python标准列表中不可用。
   
4. **元素类型**：Python 列表可以包含不同类型的元素；而NumPy 数组要求所有元素类型相同，这有助于进行高效的向量化计算。

5. **多维支持**：NumPy 数组可以是多维的，而Python列表通常是一维的，但可以嵌套以模拟多维数组。



## 创建数组

1. 从现有的数据创建
2. 从形状或值创建
3. 从数值范围创建数组



### 从现有的数据创建

`np.array(object, dtype=None)`

- `object`：`array_like`，类似于数组的对象。如果`object`是标量，则返回包含`object`的0维数组
- `dtype`：`data-type`，数组所需的数据类型。如果没有给出，会从输入数据推断数据类型
- 创建一个数组对象并返回（`ndarray`实例对象）

:::note

`array_like`包括：

- 列表（List）：如 `[1, 2, 3]`
- 元组（Tuple）：如 `(1, 2, 3)`
- 数组（Array）：如另一个NumPy数组
- 其他类数组对象：包括嵌套的列表或元组
- 标量：单个数字也可以转换成0维数组

这些对象在传递给NumPy的函数如 `np.array()` 时，会被自动转换成NumPy数组。

| `dtype` 常用值 | 说明                                   | `ndarray` 属性 | 说明                       |
| :------------- | :------------------------------------- | :------------- | :------------------------- |
| `np.int`       | 整数，根据系统环境是32位或64位         | `.shape`       | 数组的维度                 |
| `np.float`     | 浮点数，默认为双精度float64            | `.size`        | 数组中元素的总数           |
| `np.complex`   | 复数类型，如 `complex64`, `complex128` | `.ndim`        | 数组的轴数，即维度的数量   |
| `np.bool`      | 布尔类型，True 或 False                | `.dtype`       | 数组元素的数据类型         |
| `np.object`    | Python对象类型                         | `.itemsize`    | 数组中每个元素的字节大小   |
| np.`string_`   | 字符串类型，固定长度                   | `.data`        | 指向数组数据的Python缓冲区 |

:::



`np.copy(a)`

- `a`：`array_like`

- 创建一个深拷贝

  ```py
  import numpy as np
  
  original_array = np.array([1, 2, 3])
  copied_array = np.copy(original_array)
  print("Original:", original_array)
  print("Copied:", copied_array)
  ```



`ndarray.copy()`

- 对象方法，返回数组的副本

  ```py
  import numpy as np
  
  original_array = np.array([1, 2, 3])
  copied_array = original_array.copy()
  print("Original:", original_array)
  print("Copied:", copied_array)
  ```



### 从形状或值创建

`np.empty(shape, dtype=None)`

- 创建一个指定形状 (`shape`) 和数据类型 (`dtype`) 的新数组，但不初始化数组中的任何值

  ```py
  import numpy as np
  
  # 创建一个形状为 (2, 3) 的未初始化数组
  empty_array = np.empty((2, 3), dtype=np.float64)
  print(empty_array)
  ```



`np.empty_like(a, dtype=None)`

- 创建一个新数组，其**形状和数据类型**与指定的 `a` （`array_like`）相同

- 如果提供了 `dtype` 参数，新数组将使用这个指定的数据类型，否则，默认使用 `a` 的数据类型

  ```py
  import numpy as np
  
  prototype_array = np.array([1, 2, 3])
  empty_like_array = np.empty_like(prototype_array)
  print(empty_like_array)
  ```

  

`np.zeros(shape, dtype=np.float64)`

- 创建一个指定形状 (`shape`) 的新数组，数组中的所有元素初始值为0

- `dtype` 参数指定了数组元素的数据类型，默认为 `np.float64`

  ```py
  import numpy as np
  
  # 创建一个形状为 (3, 4) 的零数组，默认数据类型为 float64
  zero_array = np.zeros((3, 4))
  print(zero_array)
  ```



`np.zeros_like(a, dtype=None)`

- 创建一个新数组，其形状与给定的数组 `a` 相同，并且所有元素的初始值为0

  ```py
  import numpy as np
  
  a = np.array([[1, 2, 3], [4, 5, 6]])
  zero_like_array = np.zeros_like(a)
  print(zero_like_array)
  ```



`np.ones(shape, dtype=np.float64)`

- 创建一个指定形状 (`shape`) 的新数组，数组中的所有元素初始值为1



`np.ones_like(a, dtype=None)`

- 创建一个新数组，其形状与给定数组 `a` 相同，并且所有元素的初始值为1



`np.full(shape, fill_value, dtype=None)`

- 创建一个特定形状 (`shape`) 和数据类型 (`dtype`) 的数组，其中每个元素都被初始化为 `fill_value`

  ```py
  import numpy as np
  
  # 创建一个形状为 (3, 2) 的数组，每个元素初始化为 7
  full_array = np.full((3, 2), 7)
  print(full_array)
  ```



`np.full_like(a, fill_value, dtype=None)`

- 用于创建一个新数组，其形状和数据类型与给定数组 `a` 相同，并且所有元素的初始值为 `fill_value`



`np.eye(N, M=None, k=0, dtype=np.float64)`

- 用于创建一个 N×M 维的单位矩阵（identity matrix）

- N：输出数组的行数

- M：输出数组的列数。如果为None，则默认为N

- k：对角线的索引，默认为0，表示主对角线，正值表示上对角线，负值表示下对角线

- dtype：数组的数据类型，默认为 `np.float64`

- 对角线为1，其他地方为0（单位矩阵）

  ```py
  import numpy as np
  
  # 创建一个3x3的单位矩阵
  identity_matrix = np.eye(3, dtype=np.float64)
  print(identity_matrix)
  ```



### 从数值范围创建数组

`np.arange([start,] stop[, step,], dtype=None)`

- 生成一个包含等间隔值的数组类似于 Python 的内置 `range` 函数，但返回的是一个 NumPy 数组


- `start`：可选参数，表示序列的起始值。默认值为0。

- `stop`：必须参数，表示序列的结束值（不包括该值）。

- `step`：可选参数，表示两个连续值之间的间隔。默认值为1。

  ```py
  import numpy as np
  
  # 生成一个从0到9的数组
  arr1 = np.arange(10)
  print(arr1)  # 输出: [0 1 2 3 4 5 6 7 8 9]
  
  # 生成一个从1到9的数组，步长为2
  arr2 = np.arange(1, 10, 2)
  print(arr2)  # 输出: [1 3 5 7 9]
  
  # 生成一个浮点数组
  arr3 = np.arange(0, 1, 0.1)
  print(arr3)  # 输出: [0.  0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9]
  ```



`np.linspace(start, stop, num=50, endpoint=True, retstep=False, dtype=None)`

- 用于生成指定范围内均匀分布的数字序列


- `start`：序列的起始值。

- `stop`：序列的结束值。

- `num`：要生成的等间隔样本数，默认为50。

- `endpoint`：如果为True，`stop`将包含在输出数组中。如果为False，`stop`不包含在输出数组中，默认值为True。

- `retstep`：如果为True，则返回（样本，步长），其中步长是样本之间的间距。默认值为False。

  ```py
  import numpy as np
  
  # 生成从0到1的50个等间隔值
  arr1 = np.linspace(0, 1, 50)
  print(arr1)
  
  # 生成从0到1的5个等间隔值，不包含1
  arr2 = np.linspace(0, 1, 5, endpoint=False)
  print(arr2)
  
  # 生成从0到1的5个等间隔值，并返回步长
  arr3, step = np.linspace(0, 1, 5, retstep=True)
  print(arr3)
  print("Step size:", step)
  ```

  

`numpy.logspace(start, stop, num=50, endpoint=True, base=10.0, dtype=None)` 

- 用于生成等比数列，返回在对数刻度上均匀分布的数值

- `start`：序列的起始值，为 `base` 的幂指数。

- `stop`：序列的结束值，为 `base` 的幂指数。

- `num`：要生成的数值数量，默认为50。

- `endpoint`：如果为True，`stop`值包含在序列中。默认值为True。

- `base`：对数空间的基数，默认值为10。

- `dtype`：输出数组的数据类型。如果未指定，将从输入推断数据类型

  ```py
  import numpy as np
  
  # 生成从10^0到10^2的50个等比值
  arr1 = np.logspace(0, 2, 50)
  print(arr1)
  
  # 生成从2^0到2^10的10个等比值
  arr2 = np.logspace(0, 10, num=10, base=2)
  print(arr2)
  
  # 生成从10^0到10^2的5个等比值，不包含10^2
  arr3 = np.logspace(0, 2, num=5, endpoint=False)
  print(arr3)
  ```

  

## 基本运算

在NumPy中，算术和比较操作在`ndarrays`（多维数组）上被定义为**逐元素操作**

### 算术操作
```python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

# 加法
c = a + b
print(c)  # 输出: [5 7 9]

# 减法
d = a - b
print(d)  # 输出: [-3 -3 -3]

# 乘法
e = a * b
print(e)  # 输出: [4 10 18]

# 除法
f = a / b
print(f)  # 输出: [0.25 0.4  0.5]
```

### 比较操作
```python
# 大于
g = a > b
print(g)  # 输出: [False False False]

# 小于
h = a < b
print(h)  # 输出: [ True  True  True]

# 等于
i = a == b
print(i)  # 输出: [False False False]
```



## 广播机制

广播机制（broadcasting）是NumPy中一个强大的功能，它允许不同形状的数组在算术运算中进行有效的组合。

广播机制遵循一定的规则，自动将较小的数组“扩展”到与较大的数组形状相同，从而使得这些数组能够进行逐元素操作。

规则：

1. 如果两个数组的维度数不同，将形状较小的数组在左边填充1直到两者维度相同。
2. 如果两个数组在某个维度的长度不同，且其中一个维度的长度为1，则将长度为1的维度扩展为另一个数组在该维度的长度。
3. 如果两个数组在任何一个维度的长度不同且不为1，则无法进行广播。

```python
import numpy as np

# 创建一个1x3的数组
a = np.array([1, 2, 3])

# 创建一个3x1的数组
b = np.array([[4], [5], [6]])

# 通过广播机制，使得a和b可以进行逐元素相加
c = a + b
print(c)
```

输出：数组 `a` 的形状是 `(3,)`，数组 `b` 的形状是 `(3, 1)`。通过广播机制，`a` 被扩展为 `(1, 3)`，然后通过广播变成 `(3, 3)`，从而可以与 `b` 进行逐元素相加操作。
```lua
[[ 5  6  7]
 [ 6  7  8]
 [ 7  8  9]]
```





## 索引和切片

NumPy数组的索引和切片与Python中的序列（如列表、元组）的索引和切片操作非常相似，但也有一些重要的不同点：

1. **多维数组支持**：
   - Python序列只能处理一维数据，NumPy数组可以处理多维数据。
   - 例如，二维数组可以使用 `arr2d[i, j]` 形式进行索引，而不需要像列表那样的嵌套 `arr2d[i][j]`

2. **支持布尔索引**：
   
   - NumPy数组允许使用布尔索引来选择满足条件的元素，而Python列表不支持这种操作。
   ```python
   arr = np.array([1, 2, 3, 4, 5])
   print(arr[arr > 3])  # 输出: [4 5]
   ```
   
3. **花式索引**：
   - NumPy支持花式索引，可以通过指定索引列表来选择多个元素。
   ```python
   arr = np.array([1, 2, 3, 4, 5])
   print(arr[[0, 2, 4]])  # 输出: [1 3 5]
   ```

4. **切片返回视图**：
   - NumPy的切片操作返回的是**原数组的视图**，而不是一个新的独立副本。即对切片的修改会影响到原数组。
   ```python
   arr = np.array([1, 2, 3, 4, 5])
   slice_arr = arr[1:4]
   slice_arr[0] = 99
   print(arr)  # 输出: [ 1 99  3  4  5]
   ```



### 高阶索引

- 高阶索引（如布尔索引和花式索引）会导致数组降维，但维度实际上并没有变化，因为结果数组中的元素**堆叠**在一起，相当于在结果数组上增加了一维
- 当基础索引和高阶索引一起使用时，**基础索引会广播**，以便与高阶索引的结果相匹配
- 多个高阶索引被基本切片分隔开，则针对各个轴操作可以确定数据，但是数据最后的`shape`是把高阶索引放在基本切片的前面的

```python
# 一维数组的索引和切片
import numpy as np

# 创建一维数组
arr = np.array([1, 2, 3, 4, 5])

# 索引单个元素
print(arr[0])  # 输出: 1

# 切片
print(arr[1:4])  # 输出: [2 3 4]

# 步长切片
print(arr[::2])  # 输出: [1 3 5]
```

```python
# 二维数组的索引和切片

# 创建二维数组
arr2d = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# 索引单个元素
print(arr2d[0, 1])  # 输出: 2

# 切片
print(arr2d[1:, 1:])  # 输出: [[5 6]
                      #       [8 9]]

# 获取特定行或列
print(arr2d[:, 1])  # 输出: [2 5 8] (第二列)
print(arr2d[1, :])  # 输出: [4 5 6] (第二行)
```

```python
# 布尔索引

# 创建数组
arr = np.array([1, 2, 3, 4, 5])
print(arr[arr > 3])  # 输出: [4 5]

# 创建一个示例数组
arr = np.array([[[1, 2, 3, 4], [5, 6, 7, 8]],
                [[9, 10, 11, 12], [13, 14, 15, 16]],
                [[17, 18, 19, 20], [21, 22, 23, 24]]])

# 创建一个形状为 (3, 2, 4) 的布尔索引数组
bool_index = np.array([[[True, False, True, False], [False, True, False, True]],
                       [[True, True, False, False], [False, False, True, True]],
                       [[True, False, True, False], [False, True, False, True]]])

# 使用布尔索引对标量进行操作
result = arr[bool_index]
print(result)	# [ 1  3  6  8  9 10 15 16 17 19 22 24]
```

```python
# 花式索引

# 创建数组
arr = np.array([1, 2, 3, 4, 5])
print(arr[[0, 2, 4]])  # 输出: [1 3 5]

# 创建一个3x3数组
arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# 复杂的花式索引，会将结果堆叠（相当于维度+1）
row_indices = np.array([[0, 1], [1, 2]])
col_indices = np.array([[2, 1], [0, 2]])

# 索引结果为数组中对应位置的元素
result = arr[row_indices, col_indices]
print(result)  # 输出: [[3 5]
               #       [4 9]]
```

索引运算符 `...`（省略号）用于表示尽可能多的冒号（`:`），以简化多维数组的切片操作。

可以用在切片中，代表剩余的所有维度。

```python
import numpy as np

# 创建一个 3x3x3 的数组
arr = np.arange(27).reshape(3, 3, 3)

# 使用 ... 索引
print(arr[0, ...])  # 输出第一个二维数组
print(arr[..., 0])  # 输出每个二维数组的第一列
```

输出

```python
# arr[0, ...] 输出:
[[ 0  1  2]
 [ 3  4  5]
 [ 6  7  8]]

# arr[..., 0] 输出:
[[ 0  3  6]
 [ 9 12 15]
 [18 21 24]]
```

在第一个例子中，`0, ...` 等同于 `0, : , :`，选择第一个二维数组。在第二个例子中，`..., 0` 等同于 `:, :, 0`，选择每个二维数组的第一列。这样可以简化代码，提高可读性。





## 常用方法

`np.reshape(a, newshape)`

- `a`：需要改变形状的原数组

- `newshape`：新的形状，可以是整数或元组。如果是整数，数组将变为一维数组

- 新形状的乘积必须等于原数组的元素数量

- 可以使用 `-1` 作为一个维度，NumPy 会自动计算该维度的大小

  ```py
  import numpy as np
  
  # 创建一个 1x9 的数组
  arr = np.arange(9)
  
  # 重塑为 3x3 的数组
  reshaped_arr = np.reshape(arr, (3, 3))
  print(reshaped_arr)	# [[0 1 2]
   										#	 [3 4 5]
   										#	 [6 7 8]]
  
  
  # 自动计算列数，使数组成为 2 行
  reshaped_arr = np.reshape(arr, (2, -1))
  print(reshaped_arr)	# [[0 1 2 3 4]
   										#	[5 6 7 8]]
  ```

  

`ndarray.flatten()`

- 将多维数组扁平化到一维数组，返回一个新的一维数组

  ```py
  import numpy as np
  
  # 创建一个 2x3 的数组
  arr = np.array([[1, 2, 3], [4, 5, 6]])
  
  # 展平成一维数组
  flattened_arr = arr.flatten()
  print(flattened_arr)	# [1 2 3 4 5 6]
  ```



`ndarray.T`

- 返回数组的转置视图

- `ndarray.T` 是一个属性，不是一个方法，不需要括号

- 对于二维数组，转置操作交换数组的行和列

- 对于多维数组，它会交换数组的所有轴

  ```py
  import numpy as np
  
  # 创建一个 2x3 的数组
  arr = np.array([[1, 2, 3], [4, 5, 6]])
  
  # 获取数组的转置
  transposed_arr = arr.T
  print(transposed_arr)	# [[1 4]
   												 [2 5]
  												 [3 6]]
  ```

  

`np.swapaxes(a, axis1, axis2)`

- 交换数组的两个轴

- 该函数返回一个视图，不会修改原始数组

  ```py
  import numpy as np
  
  # 创建一个 2x3x4 的数组
  arr = np.arange(24).reshape(2, 3, 4)
  print("原始数组:")
  print(arr)
  
  # 交换轴 0 和 2
  swapped_arr = np.swapaxes(arr, 0, 2)
  print("交换轴 0 和 2 后的数组:")
  print(swapped_arr)
  ```

  输出：

  ```py
  原始数组:
  [[[ 0  1  2  3]
    [ 4  5  6  7]
    [ 8  9 10 11]]
  
   [[12 13 14 15]
    [16 17 18 19]
    [20 21 22 23]]]
  
  交换轴 0 和 2 后的数组:
  [[[ 0 12]
    [ 4 16]
    [ 8 20]]
  
   [[ 1 13]
    [ 5 17]
    [ 9 21]]
  
   [[ 2 14]
    [ 6 18]
    [10 22]]
  
   [[ 3 15]
    [ 7 19]
    [11 23]]]
  ```

  

`np.transpose(a, axes=None)`

- 返回输入数组的转置视图，允许根据指定的轴顺序重新排列维度

- `axes`：用于指定轴的新顺序（相当于排列数组的`shape`）。如果未指定，则 `transpose(a).shape == a.shape[::-1]`即转置

  ```py
  import numpy as np
  
  # 创建一个 2x3x4 的数组
  arr = np.arange(24).reshape(2, 3, 4)
  print("原始数组:")
  print(arr)
  
  # 默认转置（反转所有轴）
  transposed_arr = np.transpose(arr)
  print("默认转置后的数组:")
  print(transposed_arr)
  
  # 按指定轴顺序转置
  transposed_axes_arr = np.transpose(arr, axes=(1, 0, 2))
  print("按 (1, 0, 2) 轴顺序转置后的数组:")
  print(transposed_axes_arr)
  ```

  输出：

  ```py
  原始数组:
  [[[ 0  1  2  3]
    [ 4  5  6  7]
    [ 8  9 10 11]]
  
   [[12 13 14 15]
    [16 17 18 19]
    [20 21 22 23]]]
  
  默认转置后的数组:
  [[[ 0 12]
    [ 4 16]
    [ 8 20]]
  
   [[ 1 13]
    [ 5 17]
    [ 9 21]]
  
   [[ 2 14]
    [ 6 18]
    [10 22]]
  
   [[ 3 15]
    [ 7 19]
    [11 23]]]
  
  按 (1, 0, 2) 轴顺序转置后的数组:
  [[[ 0  1  2  3]
    [12 13 14 15]]
  
   [[ 4  5  6  7]
    [16 17 18 19]]
  
   [[ 8  9 10 11]
    [20 21 22 23]]]
  ```



`np.expand_dims(a, axis)`

- 在指定的轴位置插入一个新的维度，从而扩展数组的形状

- 新的维度大小为1

  ```py
  import numpy as np
  
  # 创建一个形状为 (2, 3) 的数组
  arr = np.array([[1, 2, 3], [4, 5, 6]])
  print("原始数组:")
  print(arr)
  print("原始数组形状:", arr.shape)
  
  # 在轴 0 插入一个新的维度
  expanded_arr = np.expand_dims(arr, axis=0)
  print("在轴 0 插入一个新的维度后:")
  print(expanded_arr)
  print("新数组形状:", expanded_arr.shape)
  
  # 在轴 1 插入一个新的维度
  expanded_arr = np.expand_dims(arr, axis=1)
  print("在轴 1 插入一个新的维度后:")
  print(expanded_arr)
  print("新数组形状:", expanded_arr.shape)
  
  # 在轴 2 插入一个新的维度
  expanded_arr = np.expand_dims(arr, axis=2)
  print("在轴 2 插入一个新的维度后:")
  print(expanded_arr)
  print("新数组形状:", expanded_arr.shape)
  ```

  输出：

  ```py
  原始数组:
  [[1 2 3]
   [4 5 6]]
  原始数组形状: (2, 3)
  
  在轴 0 插入一个新的维度后:
  [[[1 2 3]
    [4 5 6]]]
  新数组形状: (1, 2, 3)
  
  在轴 1 插入一个新的维度后:
  [[[1 2 3]]
   [[4 5 6]]]
  新数组形状: (2, 1, 3)
  
  在轴 2 插入一个新的维度后:
  [[[1]
    [2]
    [3]]
  
   [[4]
    [5]
    [6]]]
  新数组形状: (2, 3, 1)
  ```

  

`np.squeeze(a, axis=None)`

- 删除数组中大小为1的轴

- `axis` 参数可以指定要删除的轴，如果未指定，则删除所有大小为1的轴

  ```py
  import numpy as np
  
  # 创建一个形状为 (1, 2, 1, 3) 的数组
  arr = np.array([[[[1, 2, 3]], [[4, 5, 6]]]])
  print("原始数组形状:", arr.shape)
  
  # 删除所有大小为1的轴
  squeezed_arr = np.squeeze(arr)
  print("删除所有大小为1的轴后的数组形状:", squeezed_arr.shape)
  
  # 只删除指定轴的大小为1的轴
  squeezed_arr_axis0 = np.squeeze(arr, axis=0)
  print("删除轴0的大小为1的轴后的数组形状:", squeezed_arr_axis0.shape)
  
  squeezed_arr_axis2 = np.squeeze(arr, axis=2)
  print("删除轴2的大小为1的轴后的数组形状:", squeezed_arr_axis2.shape)
  ```



`np.concatenate((a1, a2, ...), axis=0)`

- 沿指定轴连接多个数组，将多个数组合并成一个数组

- 沿轴 0 连接时，数组在垂直方向上合并，行数增加，shape 0轴 + 1

- 沿轴 1 连接时，数组在水平方向上合并，列数增加，shape 1轴 + 1

- `axis`：沿着哪个轴进行连接，默认值为 0，如果为`None`，则数组在使用前会被扁平化，只有在所有数组除了要拼接的轴之外的形状都相同或可以广播的情况下，才能进行连接

  ```py
  import numpy as np
  
  # 创建两个示例数组
  arr1 = np.array([[1, 2, 3], [4, 5, 6]])
  arr2 = np.array([[7, 8, 9], [10, 11, 12]])
  
  # 沿轴 0 进行连接（垂直连接）
  concatenated_arr0 = np.concatenate((arr1, arr2), axis=0)
  print("沿轴 0 连接后的数组:")
  print(concatenated_arr0)
  
  # 沿轴 1 进行连接（水平连接）
  concatenated_arr1 = np.concatenate((arr1, arr2), axis=1)
  print("沿轴 1 连接后的数组:")
  print(concatenated_arr1)
  
  # 沿轴 None 进行连接（扁平化后连接）
  concatenated_arr_none = np.concatenate((arr1, arr2), axis=None)
  print("沿轴 None 连接后的数组:")
  print(concatenated_arr_none)
  ```

  

`np.stack(arrays, axis=0)`

- `arrays`：`Sequence[ArrayLike]`

- 沿新的轴连接一系列数组的函数

- 与 `np.concatenate` 不同，`np.stack` 需要所有输入数组形状完全相同

  ```py
  import numpy as np
  
  # 创建三个形状相同的一维数组
  arr1 = np.array([1, 2, 3])
  arr2 = np.array([4, 5, 6])
  arr3 = np.array([7, 8, 9])
  
  # 沿新的轴 0 进行堆叠
  stacked_arr0 = np.stack((arr1, arr2, arr3), axis=0)
  print("沿轴 0 堆叠后的数组:")
  print(stacked_arr0)
  
  # 沿新的轴 1 进行堆叠
  stacked_arr1 = np.stack((arr1, arr2, arr3), axis=1)
  print("沿轴 1 堆叠后的数组:")
  print(stacked_arr1)
  ```

  输出：

  ```py
  沿轴 0 堆叠后的数组:
  [[1 2 3]
   [4 5 6]
   [7 8 9]]
  
  沿轴 1 堆叠后的数组:
  [[1 4 7]
   [2 5 8]
   [3 6 9]]
  ```

"""note

拼接操作不会增加维度，堆叠操作会增加维度

"""



`np.hstack(arrays)`

- 水平堆叠（水平合并）一系列数组的函数，本质是拼接，不会增加维度

- 沿`1`轴（第二个轴）连接数组

- 处理一维数组时，将一维数组合并为一个更长的一维数组

  ```py
  import numpy as np
  
  # 创建两个二维数组
  arr1 = np.array([[1, 2, 3], [4, 5, 6]])
  arr2 = np.array([[7, 8, 9], [10, 11, 12]])
  
  # 水平堆叠
  hstacked_arr = np.hstack((arr1, arr2))
  print("水平堆叠后的数组:")
  print(hstacked_arr)
  ```

  输出：

  ```py
  水平堆叠后的数组:
  [[ 1  2  3  7  8  9]
   [ 4  5  6 10 11 12]]
  ```



`np.vstack(arrays)`

- 垂直堆叠（竖直合并）一系列数组

- 沿着数组的第一个轴（垂直）进行堆叠

- 处理一维数组时，将一维数组堆叠成一个二维数组，每个一维数组变成新数组中的一行

  ```py
  import numpy as np
  
  # 创建两个二维数组
  arr1 = np.array([[1, 2, 3], [4, 5, 6]])
  arr2 = np.array([[7, 8, 9], [10, 11, 12]])
  
  # 垂直堆叠
  vstacked_arr = np.vstack((arr1, arr2))
  print("垂直堆叠后的数组:")
  print(vstacked_arr)
  ```

  输出：

  ```py
  垂直堆叠后的数组:
  [[ 1  2  3]
   [ 4  5  6]
   [ 7  8  9]
   [10 11 12]]
  ```

  

`np.repeat(a, repeats, axis=None)`

- 重复数组元素

- `repeats`：重复次数

- `axis`：指定沿着哪个轴重复元素。如果为 `None`，则数组会先被展平，然后再重复

  ```py
  import numpy as np
  
  # 创建一个二维数组
  arr = np.array([[1, 2], [3, 4]])
  
  # 没有指定轴，展平数组后重复每个元素两次
  repeated_arr_flat = np.repeat(arr, 2)
  print("展平数组后重复每个元素两次:")
  print(repeated_arr_flat)
  
  # 沿着轴 0 重复每个元素两次
  repeated_arr_axis0 = np.repeat(arr, 2, axis=0)
  print("沿着轴 0 重复每个元素两次:")
  print(repeated_arr_axis0)
  
  # 沿着轴 1 重复每个元素两次
  repeated_arr_axis1 = np.repeat(arr, 2, axis=1)
  print("沿着轴 1 重复每个元素两次:")
  print(repeated_arr_axis1)
  ```
  
  输出：
  
  ```py
  展平数组后重复每个元素两次:
  [1 1 2 2 3 3 4 4]
  
  沿着轴 0 重复每个元素两次:
  [[1 2]
   [1 2]
   [3 4]
   [3 4]]
  
  沿着轴 1 重复每个元素两次:
  [[1 1 2 2]
   [3 3 4 4]]
  ```
  
  

`np.dot(a, b)`

- 两个数组的点积

- 对于一维数组，它计算向量的点积；

- 对于二维数组，它计算矩阵乘积；

- 对于更高维度的数组，它计算沿指定轴的和的乘积

  ```py
  import numpy as np
  
  # 创建两个一维数组
  a = np.array([1, 2, 3])
  b = np.array([4, 5, 6])
  
  # 计算向量的点积
  dot_product = np.dot(a, b)
  print("向量的点积:", dot_product)
  
  # 创建两个二维数组
  a = np.array([[1, 2], [3, 4]])
  b = np.array([[5, 6], [7, 8]])
  
  # 计算矩阵乘积
  matrix_product = np.dot(a, b)
  print("矩阵乘积:")
  print(matrix_product)
  ```

  

`np.matmul(x1, x2) / @`

- 矩阵乘法

- 区别

  - 处理标量：
    - `np.matmul` 不支持标量操作。
    - `@` 操作符可以处理标量，返回的是标量的乘积
  - 高维数组的广播：
    - `np.matmul` 不进行广播，只对最后两个维度执行矩阵乘法。
    - `@` 操作符支持高维数组，并对所有维度进行广播

  ```py
  import numpy as np
  
  # 创建两个二维数组
  a = np.array([[1, 2], [3, 4]])
  b = np.array([[5, 6], [7, 8]])
  
  # 使用 np.matmul 进行矩阵乘法
  matmul_product = np.matmul(a, b)
  print("使用 np.matmul 进行矩阵乘法:")
  print(matmul_product)
  
  # 使用 @ 操作符进行矩阵乘法
  at_product = a @ b
  print("使用 @ 操作符进行矩阵乘法:")
  print(at_product)
  ```

  

`np.greater(x1, x2)`

- 逐元素比较两个数组

- 如果 `x1` 中的元素大于 `x2` 中的对应元素，则返回 `True`，否则返回 `False`

- 返回一个与输入数组形状相同的布尔数组

- x1，x2的形状必须相同，或者可以广播

  ```py
  import numpy as np
  
  # 创建两个数组
  x1 = np.array([1, 4, 3])
  x2 = np.array([2, 3, 3])
  
  # 逐元素比较
  result = np.greater(x1, x2)
  print(result)
  ```

  

`np.greater_equal(x1, x2)`

- 逐元素比较两个数组
- 同`np.greater(x1, x2)`，但是按元素判断 x1 >= x2 的结果



`np.less(x1, x2)`

- 逐元素比较两个数组
- 同`np.greater(x1, x2)`，但是按元素判断 x1 < x2 的结果



`np.less_equal(x1, x2)`

- 逐元素比较两个数组
- 同`np.greater(x1, x2)`，但是按元素判断 x1 <= x2 的结果



`np.equal(x1, x2)`

- 逐元素比较两个数组
- 同`np.greater(x1, x2)`，但是按元素判断 x1 == x2 的结果



`np.not_equal(x1, x2)`

- 逐元素比较两个数组
- 同`np.greater(x1, x2)`，但是按元素判断 x1 != x2 的结果



`np.sin(x)`

- 计算数组元素的正弦值

  ```py
  import numpy as np
  print(np.sin(np.pi/2))
  print(np.sin(np.array((0, 30, 90)) * np.pi / 180))
  ```



`np.cos(x)`

- 计算数组元素的余弦值



`np.tan(x)`

- 计算数组元素的正切值



`np.arcsin(x)`

- 计算数组元素的反正弦值



`np.arccos(x)`

- 计算数组元素的反余弦值



`np.arctan(x)`

- 计算数组元素的反正切值



`np.floor(x)`

- 计算数组中每个元素向下取整

- 返回一个包含每个元素的向下取整值的新数组

  ```py
  import numpy as np
  
  # 创建一个包含浮点数的数组
  arr = np.array([1.7, 2.3, -3.9, -4.1, 0.0])
  
  # 计算每个元素的向下取整值
  floored_arr = np.floor(arr)
  print(floored_arr)
  ```

  

`np.ceil(x)`

- 计算数组中每个元素向上取整的函数
- 返回一个包含每个元素向上取整值的新数组



`ndarray.max(axis=None, keepdims=False)`

- 计算数组沿指定轴的最大值

- `axis=None` 时，计算整个数组的最大值

- `axis=0` 时，计算每列的最大值

- `axis=1` 时，计算每行的最大值

- `keepdims=True` 时，结果数组保留原数组的维度，默认值为 `False`，即结果数组将丢弃减少的维度

  ```py
  import numpy as np
  
  # 创建一个三维数组
  arr = np.array([[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11, 12]], [[13, 14, 15], [16, 17, 18]]])
  
  # 计算整个数组的最大值
  max_value = arr.max()
  print("数组的最大值:", max_value)
  
  # 计算沿轴 0 的最大值
  max_value_axis0 = arr.max(axis=0)
  print("沿轴 0 的最大值:\n", max_value_axis0)
  
  # 计算沿轴 1 的最大值
  max_value_axis1 = arr.max(axis=1)
  print("沿轴 1 的最大值:\n", max_value_axis1)
  
  # 计算沿轴 2 的最大值
  max_value_axis2 = arr.max(axis=2)
  print("沿轴 2 的最大值:\n", max_value_axis2)
  
  # 计算沿轴 0 的最大值，并保持原数组的维度
  max_value_axis0_keepdims = arr.max(axis=0, keepdims=True)
  print("沿轴 0 的最大值（保持维度）:\n", max_value_axis0_keepdims)
  ```

  输出：

  ```py
  数组的最大值: 18
  沿轴 0 的最大值:
   [[13 14 15]
    [16 17 18]]
  沿轴 1 的最大值:
   [[ 4  5  6]
    [10 11 12]
    [16 17 18]]
  沿轴 2 的最大值:
   [[ 3  6]
    [ 9 12]
    [15 18]]
  沿轴 0 的最大值（保持维度）:
   [[[13 14 15]
    [16 17 18]]]
  ```



`ndarray.min(axis=None, keepdims=False)`

- 计算数组沿指定轴的最小值



`ndarray.mean(axis=None, keepdims=False)`

- 计算数组沿指定轴的平均值



`ndarray.var(axis=None, keepdims=False)`

- 计算数组沿指定轴的方差



`ndarray.std(axis=None, keepdims=False)`

- 计算数组沿指定轴的标准差



`np.prod(a, axis=None, keepdims=np._NoValue, initial=np._NoValue)`

- 计算数组沿指定轴的元素乘积

- `axis`：要计算乘积的轴。默认情况下，计算整个数组的乘积

- `keepdims`：是否保持原数组的维度。默认值为 `np._NoValue`，即结果数组将丢弃减少的维度。如果设置为 `True`，则结果将保留原数组的维度

- `initial`：用于乘积计算的初始值。默认值为 `np._NoValue`

  ```py
  import numpy as np
  
  # 创建一个一维数组
  arr = np.array([1, 2, 3, 4])
  
  # 计算整个数组的乘积
  prod_all = np.prod(arr)
  print("数组所有元素的乘积:", prod_all)
  
  # 计算沿轴的乘积（对于一维数组没有意义）
  prod_axis0 = np.prod(arr, axis=0)
  print("沿轴 0 计算的乘积:", prod_axis0)
  
  # 计算带初始值的乘积
  prod_initial = np.prod(arr, initial=2)
  print("带初始值 2 的乘积:", prod_initial)
  
  # 创建一个二维数组
  arr2d = np.array([[1, 2, 3], [4, 5, 6]])
  
  # 计算整个数组的乘积
  prod_all_2d = np.prod(arr2d)
  print("二维数组所有元素的乘积:", prod_all_2d)
  
  # 计算沿轴 0 的乘积
  prod_axis0_2d = np.prod(arr2d, axis=0)
  print("沿轴 0 计算的乘积:\n", prod_axis0_2d)
  
  # 计算沿轴 1 的乘积
  prod_axis1_2d = np.prod(arr2d, axis=1)
  print("沿轴 1 计算的乘积:\n", prod_axis1_2d)
  
  # 计算沿轴 0 的乘积并保持维度
  prod_axis0_keepdims = np.prod(arr2d, axis=0, keepdims=True)
  print("沿轴 0 计算并保持维度的乘积:\n", prod_axis0_keepdims)
  ```

  输出：

  ```lua
  数组所有元素的乘积: 24
  沿轴 0 计算的乘积: 24
  带初始值 2 的乘积: 48
  二维数组所有元素的乘积: 720
  沿轴 0 计算的乘积:
   [ 4 10 18]
  沿轴 1 计算的乘积:
   [ 6 120]
  沿轴 0 计算并保持维度的乘积:
   [[ 4 10 18]]
  ```



`np.sum(a, axis=None, keepdims=np._NoValue, initial=np._NoValue)`

- 计算数组沿指定轴的元素和



`np.exp(x)`

- 计算 e 的 x 幂次方

  ```py
  import numpy as np
  
  # 创建一个包含元素的数组
  arr = np.array([0, 1, 2, 3])
  
  # 计算每个元素的指数值
  exp_arr = np.exp(arr)
  print(exp_arr)
  ```



`np.log(x)`

- 计算 x 的自然对数（以 e 为底）

  ```py
  import numpy as np
  
  # 创建一个包含元素的数组
  arr = np.array([1, np.e, np.e**2, np.e**3])
  
  # 计算每个元素的自然对数值
  log_arr = np.log(arr)
  print(log_arr)	# [0. 1. 2. 3.]
  ```

  

`np.log2(x)`

- 计算 x 的以 2 为底的对数



`np.log2(x)`

- 计算 x 的以 10 为底的对数



`np.nonzero(a)`

- 返回一个元组，其中包含每个维度的非零元素的索引数组

  ```py
  import numpy as np
  
  # 创建一个包含零和非零元素的二维数组
  arr = np.array([[0, 1, 0], [2, 0, 3]])
  
  # 获取所有非零元素的索引
  nonzero_indices = np.nonzero(arr)
  print(nonzero_indices)	# (array([0, 1, 1]), array([1, 0, 2]))
  
  # 获取所有非零元素
  nonzero_elements = arr[np.nonzero(arr)]
  print(nonzero_elements)	# [1 2 3]
  ```

  解释：

  这个输出表示：

  - `array([0, 1, 1])` 是行索引
  - `array([1, 0, 2])` 是列索引

  即非零元素在以下位置：

  - `(0, 1)` 对应元素 `1`
  - `(1, 0)` 对应元素 `2`
  - `(1, 2)` 对应元素 `3`



`np.where(condition, x=None, y=None)`

- 返回满足条件的元素的索引，或根据条件从两个数组中选择元素

- `condition`：一个布尔数组，指定要测试的条件

- `x`：当 `condition` 为 `True` 时选择的值或数组。如果未提供，则返回满足条件的索引

- `y`：当 `condition` 为 `False` 时选择的值或数组

- 如果只提供 `condition` 参数，`np.where` 返回满足条件的元素的索引

- 如果提供了 `x` 和 `y` 参数，`np.where` 返回一个数组，其中每个元素根据 `condition` 从 `x` 或 `y` 中选择

  ```py
  import numpy as np
  
  # 创建一个包含零和非零元素的数组
  arr = np.array([0, 1, 2, 0, 3, 0, 4])
  
  # 获取所有非零元素的索引
  nonzero_indices = np.where(arr != 0)
  print(nonzero_indices)	# (array([1, 2, 4, 6]),)
  
  # 创建两个数组
  x = np.array([10, 20, 30, 40, 50])
  y = np.array([1, 2, 3, 4, 5])
  
  # 根据条件选择元素
  condition = np.array([True, False, True, False, True])
  result = np.where(condition, x, y)
  print(result)	# [10  2 30  4 50]
  ```

  

`np.argwhere(a)`

- 找出数组中按元素分组的非零元素的索引

- 与 `np.nonzero(a)` 类似，但 `np.argwhere(a)` 返回的索引是一个二维数组，每行包含一个满足条件的元素的多维索引

  ```py
  import numpy as np
  
  # 创建一个包含零和非零元素的二维数组
  arr = np.array([[0, 1, 0], [2, 0, 3]])
  
  # 获取所有非零元素的索引
  argwhere_indices = np.argwhere(arr)
  print(argwhere_indices)	# [[0 1]
   												#	 [1 0]
  												#	 [1 2]]
  ```

  

np.maximum(x1, x2)

- 逐元素比较两个数组，并返回对应位置最大值

- 返回一个包含元素最大值的新数组

  ```py
  import numpy as np
  
  # 创建两个数组
  x1 = np.array([1, 4, 3])
  x2 = np.array([2, 3, 5])
  
  # 逐元素比较并返回最大值
  max_arr = np.maximum(x1, x2)
  print(max_arr)
  ```



`np.minimum(x1, x2)`

- 逐元素比较两个数组，并返回对应位置最小值
- 返回一个包含元素最小值的新数组



`np.argmax(a, axis=None)`

- 返回数组中最大值的索引的函数。可以沿指定的轴查找最大值的索引

  ```py
  import numpy as np
  
  # 创建一个一维数组
  arr = np.array([1, 3, 2, 7, 5])
  
  # 查找数组中最大值的索引
  max_index = np.argmax(arr)
  print("一维数组中最大值的索引:", max_index)
  
  # 创建一个二维数组
  arr2d = np.array([[1, 2, 3], [6, 5, 4]])
  
  # 沿轴 0 查找最大值的索引
  max_index_axis0 = np.argmax(arr2d, axis=0)
  print("沿轴 0 查找最大值的索引:", max_index_axis0)
  
  # 沿轴 1 查找最大值的索引
  max_index_axis1 = np.argmax(arr2d, axis=1)
  print("沿轴 1 查找最大值的索引:", max_index_axis1)
  ```



`np.argmin(a, axis=None)`

- 返回数组中最小值的索引的函数。可以沿指定的轴查找最小值的索引



`np.random.normal(loc=0.0, scale=1.0, size=None)`

- 生成符合正态（高斯）分布的随机数，返回一个包含随机数的数组，这些随机数服从指定的均值（loc）和标准差（scale）

- `loc`：浮点数，分布的均值（中心），默认值为0.0

- `scale`：浮点数，分布的标准差（宽度），默认值为1.0

- `size`：整数或元组，输出数组的**形状**。如果为 `None`，则返回一个标量

- 使用默认参数（均值为0，标准差为1）时，生成的随机数服从标准正态分布

  ```py
  import numpy as np
  
  # 生成一个服从标准正态分布的随机数
  random_number = np.random.normal()
  print(random_number)
  
  # 生成一个包含5个随机数的一维数组
  random_array = np.random.normal(loc=0.0, scale=1.0, size=5)
  print(random_array)
  
  # 生成一个包含3x3个随机数的二维数组
  random_matrix = np.random.normal(loc=0.0, scale=1.0, size=(3, 3))
  print(random_matrix)
  ```

  输出：

  ```py
  # 生成一个随机数的示例输出
  0.123456789
  
  # 生成一个一维数组的示例输出
  [ 0.94125918 -1.33886456  0.43824628 -0.30256176  1.50233829]
  
  # 生成一个二维数组的示例输出
  [[ 0.27402173  0.04085912 -1.17992483]
   [-0.74542948  1.02958968 -0.67137471]
   [ 0.32165267 -1.20722282  0.87610762]]
  ```



`np.random.randn(d0, d1, ..., dn)`

- 生成标准正态分布（均值为 0，标准差为 1）随机数数组的函数

- 参数 `d0, d1, ..., dn` 决定生成数组的形状

  ```py
  import numpy as np
  
  # 生成一个服从标准正态分布的随机数
  random_number = np.random.randn()
  print(random_number)
  
  # 生成一个包含5个随机数的一维数组
  random_array = np.random.randn(5)
  print(random_array)
  
  # 生成一个包含3x3个随机数的二维数组
  random_matrix = np.random.randn(3, 3)
  print(random_matrix)
  ```

  输出：

  ```py
  # 生成一个随机数的示例输出
  -0.28293783
  
  # 生成一个一维数组的示例输出
  [-1.07553129  0.46730343 -0.11670725  0.23761197 -0.19157972]
  
  # 生成一个二维数组的示例输出
  [[ 0.27567288  1.40840997 -0.76814024]
   [-1.08185921  0.75804662 -0.34549326]
   [-0.08598697  0.74547148  1.24365079]]
  ```



`np.random.rand(d0, d1, ..., dn)`

- 生成指定形状的数组，数组中的元素服从`[0, 1)`均匀分布的随机数



`np.random.randint(low, high=None, size=None)`

- 生成在 `[low, high)` 区间内离散均匀分布的随机整数

- 返回一个给定形状的数组，数组中的每个元素都是指定范围内的随机整数

- `low`：生成随机数的下界（包括），如果没有指定 `high` 参数，则 `low` 表示上界（不包括）

- `high`：生成随机数的上界（不包括）。如果没有指定，则 `low` 表示上界，范围是 `[0, low)``

- `size`：输出数组的形状。如果没有指定，则返回单个整数

  ```py
  import numpy as np
  
  # 生成一个在 [0, 10) 区间内的随机整数
  random_int = np.random.randint(10)
  print(random_int)
  
  # 生成一个包含5个在 [0, 10) 区间内的随机整数的一维数组
  random_array = np.random.randint(0, 10, size=5)
  print(random_array)
  
  # 生成一个包含2x3个在 [10, 20) 区间内的随机整数的二维数组
  random_matrix = np.random.randint(10, 20, size=(2, 3))
  print(random_matrix)
  ```

  输出：

  ```py
  # 生成单个随机整数的示例输出
  7
  
  # 生成一维数组的示例输出
  [1 4 7 3 8]
  
  # 生成二维数组的示例输出
  [[15 17 12]
   [13 19 11]]
  ```



`np.random.uniform(low=0.0, high=1.0, size=None)`

- 生成在 `[low, high)` 区间内均匀分布的随机浮点数



`np.random.permutation(x)`

- 返回一个随机排列的数组

- 对整数进行随机排列，或对输入数组进行随机排列

- 如果 `x` 是一个整数，返回一个随机排列的整数数组，范围是从 0 到 `x-1`

- 如果 `x` 是一个数组，将返回一个随机排列的数组。原数组不会被改变

  ```py
  import numpy as np
  
  # 生成一个随机排列的整数数组，范围是 0 到 9
  random_permutation = np.random.permutation(10)
  print(random_permutation)	# [3 7 5 1 0 6 9 2 8 4]
  
  # 创建一个数组
  arr = np.array([1, 2, 3, 4, 5])
  
  # 对数组进行随机排列
  shuffled_arr = np.random.permutation(arr)
  print(shuffled_arr)	# [4 1 3 5 2]
  ```

  

`np.random.seed([x])`

- 设置随机数生成器的种子，以确保生成的随机数是可重复的
- 设置种子后，每次运行代码时生成的随机数序列将保持不变
- `x`：用于设置种子的整数或整数数组。如果不指定，种子将根据系统时钟初始化
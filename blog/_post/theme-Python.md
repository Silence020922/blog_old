---
title: python 入门
cover: 
date: 2022-09-30
---
# 数据科学导论课程
## 编译器选用
目前使用的是VScode，个人感觉PYcharm太吃配置，散热直接拉满，不喜。且VScode还可用于写Tex，进行远程资源管理等功能。
## 数据类型
* 复数(complex)    
虚部带字符j
```
c = 3+2.7j
```
* 字符串(str)    
利用单引或双引括起来。若用三个双引号首尾括起来，可以用若干行字符串常量。
```
s1 = 'hello' 
s2 = "hello"
s3 = """hello
world"""
```
字符串打印
```
print s1 #打印整个字符串
print s1[0:3]  #打印0 1 2 
print s1 + 'TEST' #打印helloTEST
print s1*2 #将s1打印两次
```
* 列表(list)
['abcd', 77, 2.23 ]    
**命令**    
删除命令
```
.pop() #删除末尾
.pop(i) #删除指定位置
```
插入命令
```
.insert(n,' ') #在相应位置插入元素 
.append(' ') #在最后位置追加元素
```
* 元组(tuple)    
('abcd', 123, 220.2)    
元组的元素为不可变的，可视为一个read-only列表。
* 字典(dict)
dict = ['name':'John', ;'age':17,'code':1122]    
打印命令
```
print dict['name'] #打印name对应的value
print age in dict #打印True
print dict.keys() #打印所有key
```
删除命令
```
dict.pop(key) #删除key及对应的value
```
* 集合(set)
s1 = set([1, 2, 3])    
s2 = set([2, 3, 4])    
```
print s1 & s2 #交
print s1 | s2 #并
```
同样可用.add 及 .remove 删除元素，利用print key in set判断是否包含某元素
## 程序结构
* 顺序结构
* 分支结构(if elif else )
* 循环结构(for while )

## 常用库
### [Matplotlib](https://matplotlib.org/2.0.2/examples/index.html)

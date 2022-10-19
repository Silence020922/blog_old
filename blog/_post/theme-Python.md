---
title: python 入门
date: 2022-09-30
tag: note
---
# 数据科学导论课程
## 编译器选用
目前使用的是[VScode](https://code.visualstudio.com/)，个人感觉PYcharm太吃配置，散热直接拉满，不喜。且VScode还可用于写Tex，进行远程资源管理等功能。当然，VScode对于宏包不具备PY的自动安装功能，需在电脑终端pip。
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
**介绍**    
* Matplotlib是一个绘图库。用户可以使用matplotlib生成高质量(达到出版精度, Publication 
Quality)的图形，并且可以以多样化的格式进行输出，比如以Postscript的格式输出，然后包
含在Tex文件中，进而生成PDF文档。    
* Matplotlib是用Python语言编写的，它使用了NumPy及其它函数库，并且经过优化，即便对
于比较大的数组，进行图形化绘制，其性能也是可以接受的。
* Matplotlib提供了众多的图形类型，供用户选择，包括柱状图(Bar Chart)、误差图(Error
Chart)、散点图(Scatter Plot)、功率谱图(Power Spectra)、直方图(Histogram)等    
#### 折线图(line plot)
```
import numpy as np
import matplotlib.pyplot as plt
x = [1, 2, 3, 4, 5]
y = [1, 4, 9, 16, 25]
plt.plot(x,y) #绘制折线图
plt.show() #显示绘制结果
```
#### 散点图(scatter plot)
```
plt.plot(x,y,'o') #绘制散点图
```
#### 柱状图与饼图(bar chart & pie chart)
```
plt.xlabel(' ') #设定x轴的标签
plt.xticks((0,1),('man','woman') #设定x轴各个刻度的标签
plt.bar(left = (0,1), height = (0.75,0.25),width = 0.35,color = 'red') 
plt.show()

plt.pie(data,explode = [0, 0, 2, 0, 0]) #绘制饼图其中第三个部分突出
```
#### 属性设置的注释
```
font = ['famaliy':'Vera Sans', 
'weight':'bold',
'size':14] #字体属性

matplotlib.rc('font',**font) #使用font字体
plot1 = plt.plot(x1,y1,'r--*',label = 'red line') #颜色red, 线型虚线
pit.legend(loc='best', shadow=True,ncol=2) #显示图例，显示两个plot的label

subplot #绘制多子图
plt.savefig(' .png or pdf') #导出PDF或图像文件
```
### [Numpy](https://docs.scipy.org/doc/numpy/reference/)
**介绍**    
安装
```
pip install numpy
import numpy as np
```
#### 数组
* array
```
arr1 = np.array([1,2,3]) #将列表转化为数组
arr2 = np.array((1,2)) #将元组转化为数组
arr3 = np.array([ ],[ ]) #创建一个二维数组
```
* arange
创建数组：numpy.arange(start,stop,step,dtype = None)    
>start表示数组开始生成位置，且包含
>stop表示数组终值，不包含
>step默认为1
* linspace
生成等差数组：np.linspace(start,stop,num=50,endpoint = True,retstep = Flase,dype = None,axis = 0)
>start起始值无默认
>stop结束值五默认
>num生成样本数，默认50

* logspace    
**介绍**    
在对数尺度上返回隔离均匀的数字，参考linspace，不同参base--底数。
 #### Numpy矩阵
 ```
matr1 = np.mat("1 2 3;4 5 6") #利用mat创建矩阵
matr2 = np.matrix([1,2,3],[4,5,6],[7,8,9]) #利用matrix创建
m1*m2 or np.dot(m1,m2) #矩阵相乘
np.muitiply(m1,m2) #矩阵对应元素相乘
 ```
 #### 常用统计函数
 >mean 数组均值
 >std 数组标准差
 >var 数组方差
 >min(max) 最小（大）值
 >argmin(max) 返回最小元索引
 >cumsum 计算所有元素的累计和
 >cumprod 计算所有元素的累计积
### Pandas
**介绍**
* pandas 是 Python 语言的一个扩展程序库，用于数据分析。 ➢ pandas 名字衍生自术语 "panel data"（面板数据）和 "Python data analysis"（Python 数据分析）。    
* pandas 一个强大的分析结构化数据的工具集，基础是 Numpy（提供高性能的矩阵运算）。    
* pandas 可以从各种文件格式比如 CSV、JSON、SQL、Microsoft Excel 导入数据。    
* pandas 可以对各种数据进行运算操作，比如归并、再成形、选择，还有数据清洗和数据加工特征。    
* pandas 广泛应用在学术、金融、统计学等各个数据分析领域。    
* pandas常用的两种数据存储结构Series、DataFrame    
#### Series
pandas.series(data, index, dtype, name, copy) #只能存储一维数据  
>注释  
>data：一组数据(ndarray、list)。    
>index：数据索引标签，如果不指定，默认从 0 开始。    
>dtype：数据类型，默认会自己判断。    
>name：设置名称。    
>copy：拷贝数据，默认为 False。
创建Series
```
data1=pd.Series([1,3,5,np.nan]) 
data2=pd.Series(range(5),index=list('abcde')) 
dict1 = {1: “Google”, 2: “Runoob”, 3: “Wiki”}
data3 = pd.Series(dict1)
```
Series基本操作
```
data2=pd.Series(range(5),index=list('abcde'))
print(data2.index) #获取索引
print(data2.values)#获取数据
print(data2[3])#获取指定位置数据
```
#### DataFrame
**介绍**
DataFrame 是一个表格型的数据结构，它含有一组有序的列，每列可以是不同的值类型（数值、字符串、布尔型值）。DataFrame 既有行索引也有列索引，它可以被看做由 Series 组成的字典（共同用一个索引）

* 创建DataFrame    
[例1](https://surplus-1311636487.cos.ap-beijing.myqcloud.com/eg.png)
```
import pandas as pd
data = [['Google',10],['Runoob',12],['Wiki',13]]
df = pd.DataFrame(data,columns=['Site','Age'],dtype=float)
print(df)
```
[例2](https://surplus-1311636487.cos.ap-beijing.myqcloud.com/eg1.png)
```
import numpy as np
import pandas as pd
df=pd.DataFrame({'A':np.random.randint(1,100,6),
'B':pd.date_range(start='20180301',periods=6,freq='D'),
'C':[1,2,3,4,5,6],
'D':np.array([3]*6,dtype='int32'),
'E':['test','train','test','train','test','train'],
'F':'foo'},
index=['zhang','li','zhou',’wang',’zhao',’liu'])
print(df)
```
* 查看数据
```
print(df.head())#默认显示前五行     
print(df.head(3))#查看前三行     
print(df.tail(2))#查看最后两行
print(df.index) #查看索引 
print(df.columns)#查看列名
print(df.values)#查看值
```
* 查看统计信息
```
print(df.describe())
```
* DataFrame排序
```
df.sort_index(axis=0,ascending=False)#对索引降序排序
df.sort_index(axis=0,ascending=True) #对索引升序排序
df.sort_index(axis=1,ascending=False) #对列降序排序
df.sort_index(axis=1,ascending=True) #对列升序排序
df.sort_values(by='A’) #按A列对数据升序排序
df.sort_values(by=['E','C’]) #先按E列升序，再按C列升序
```
* DataFrame选择与访问    
直接调用
```
df['A'] #选择某一列
df[0:2] #选择多行
```
loc函数：基于行标签index和列标签column进行索引调用
```
df.loc[:,['A','C']] #选择多列
df.loc[['zhang','zhou'],['A','D','E']] #同时指定多行多列
df.loc['zhang',['A','D','E']] #查看'zhang'的三列数据
```
iloc函数：基于行和列的位置进行索引调用
```
df.iloc[0,1] #查询第0行第1列位置的数据
df.iloc[3] #查看第三行数据
df.iloc[0:3,0:4] #查看前3行、前4列数据
df.iloc[[0,2,3],[0,4]] #查看指定的多行、多列
```
* 根据条件调用
```
df[df['A']>50] #查询A列大于50的所有行
df[df['E']=='test'] #查询E列为'test'的所有行
df[df['A'].isin([45,60])]
```
* 缺失值处理
```
df.loc['zhang','C']=np.nan
print(df.dropna()) #返回不包含缺失值的数据
df['C'].fillna(1,inplace=True) #使用指定值填充缺失值
```
* 重复值处理
```
df=pd.DataFrame({'k1':['one']*3+['two']*4,'k2':[1,1,2,3,3,4,4]})
df.drop_duplicates() #删除重复行，返回新数组
df.drop_duplicates(['k1'])#删除k1列的重复数据
df.drop_duplicates(['k1'],keep='last') #对于重复数据，只保留最后一个
```
### [turtle](https://docs.python.org/zh-cn/3/library/turtle.html)
**介绍**    
turtle又叫海龟画图，作为入门级的图形绘制函数库，诞生于1969年。一个小海龟在画布上爬行，便生成了图案。在这里，你可以改变画笔颜色，大小，速度，轨迹等等。    
**主要函数**    
```
import turtle #引入turtle库
turtle.setup(300 , 300) #设置画布大小300*300像素 turtle.setup(width, height[, startx, starty])
turtle.shape(name='turtle') #设置画笔的形状为“海龟”
turtle.color('red', 'red') #设置背景及前景颜色为红色
turtle.penup() #抬笔
turtle.goto(-100 , 0) #移动画笔至（-100，0）位置
turtle.pendown() #落笔
turtle.begin_fill() #开始填充颜色
for i in range(5): #循环，i分别取0、1、2、3、4，控制循环执行5次
turtle.fd(200) #向前移动（爬行）200
turtle.rt(144) #右旋144度
turtle.end_fill() #结束填充颜色
turtle.done() #结束绘图
```
### [random](https://docs.python.org/3/library/random.html)
**介绍**    
random库在生成随机数方面具有广泛应用    
**主要函数**    
```
seed(a=None) #初始化随机数种子，默认值为当前系统时间    
random() #生成一个[0.0, 1.0)之间的随机小数        
randint(a, b) #生成一个[a,b]之间的整数        
getrandbits(k) #生成一个k比特长度的随机整数    
randrange(start, stop[, step]) #生成一个[start, stop)之间以step为步数的随机整数    
uniform(a, b) #生成一个[a, b]之间的随机小数    
choice(seq) #从序列类型(例如：列表)中随机返回一个元素    
shuffle(seq) #将序列类型中元素随机排列，返回打乱后的序列    
sample(pop, k) #从pop类型中随机选取k个元素，以列表类型返回    
```



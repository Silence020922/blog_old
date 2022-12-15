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
#### matplotlib 实战
输出本机可用语言，解决matplotlib无法显示汉字的问题
```
import matplotlib
print(matplotlib.matplotlib_fname())
from matplotlib.font_manager import FontManager
import subprocess

fm = FontManager()
mat_fonts = set(f.name for f in fm.ttflist)
print (mat_fonts)
output = subprocess.check_output('fc-list :lang=zh -f "%{family}\n"', shell=True)
print ('*' * 10, '系统可用的中文字体', '*' * 10)
print (output)
zh_fonts = set(f.split(',', 1)[0] for f in output.decode().split('\n'))
available = mat_fonts & zh_fonts
print ('*' * 10, '可用的字体', '*' * 10)
for f in available:
    print(f)
```
对济南15-22年二手房成交情况文件中提取数据并实现数据可视化
```
import csv
import numpy as np
import re
import matplotlib.pyplot as plt
from matplotlib import font_manager
pic, axes = plt.subplots(nrows=2, ncols=2)  # 初始化画布
axes[0, 0].set(title='济南市各区总单数',  ylabel='成交数目')
axes[0, 1].set(title='济南市二手房成交周期')
axes[1, 0].set(title='济南市二手房年成交总量',ylabel = '年份')
axes[1, 1].set(title='济南市二手房年交易均价',ylabel = '年份')

plt.rcParams['font.sans-serif'] = ['WenQuanYi Zen Hei']


def readCSV(path):
    with open(path, "r", encoding='UTF-8') as file:
        data = csv.reader(file)
        list = []
        for row in data:
            list.append(row)
    return list


data_list = readCSV("/home/surplus/Downloads/secpond_price.csv")


# 地区交易总额
region_list = []  # 录入地区名(无重)
for i in np.arange(int(len(data_list)/10)):
    if data_list[i*10 + 1][1] not in region_list:
        region_list.append(data_list[i*10 + 1][1])


region_deal = [i[1] for i in data_list[1:]] # 录入地区名(有重)

total_deal = []# 计算地区交易总量
for i in region_list:
    total_deal.append(region_deal.count(i))

for i in range(len(region_list)): #绘图
    p1 = axes[0, 0].bar(region_list[i], total_deal[i], label='value')
    axes[0, 0].bar_label(p1, label_type='edge')

# 观察总体成交周期
deal_cycle_str = [re.sub('[\u4e00-\u9fa5]', '', i[17]) for i in data_list[1:]]
deal_cycle_int = [int(i) for i in deal_cycle_str] # 转化为整型
cycle_class = ['一个月以内','一个月至半年','半年以上','一年以上']
deal_cycle = [len([i for i in deal_cycle_int if i <=30]),
    len([i for i in deal_cycle_int if i > 30 and i<=180 ]),
    len([i for i in deal_cycle_int if i >180 and i<= 365]),
    len([i for i in deal_cycle_int if i >365])]
axes[0,1].pie(deal_cycle,
        labels=cycle_class, # 设置饼图标签
        colors=["#d5695d", "#5d8ca8", "#65a479", "#a564c9"], # 设置饼图颜色
        autopct='%.2f%%', # 格式化输出百分比,
        explode=(0, 0, 0, 0.2)
       )

#年份均价走势图
money_str = [re.sub('[\u4e00-\u9fa5,/]', '', i[10]) for i in data_list[1:]]
money_int = [int(i) for i in money_str]
deal_time_str = [re.sub('[\u4e00-\u9fa5]', '', i[8][0:4]) for i in data_list[1:]]
deal_time_int = [int(i) for i in deal_time_str]

zipped = zip(deal_time_int,money_int)  # 执行同步排序
sort_zip = sorted(zipped,key = lambda x:(x[0],x[1]))
uzip = zip(*sort_zip)
time_year, money = [list(x) for x in uzip]
year_total_num = []
for i in np.arange(time_year[0],time_year[-1] + 1):
    year_total_num.append(time_year.count(i))
 
axes[1,0].plot(np.arange(time_year[0],time_year[-1] + 1), year_total_num,label = '年成交总量 ',c =  'g') #年成交总量绘图
axes[1,0].legend()
year_mean_money = []

temp = 0
for j in year_total_num:
    year_mean_money.append(sum(money[temp:temp + j])/j)
    temp += j

axes[1,1].plot(np.arange(time_year[0],time_year[-1] + 1),year_mean_money,label = '年平均单价 元\平米',c = 'r') #年成交均价绘图
axes[1,1].legend()

plt.show()
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
#### turtle实战—绘制小楼房
    利用turtle函数绘制楼房月亮及流动的星空。同时使用random库实现窗户随机开关灯的动态效果。
```
from turtle import *
from random import random,randint
bgcolor("black")
mode("standard")
home()
speed(0)

# Bottom rectangle
color("saddlebrown")
penup()
goto(-200, -285)
pendown()
begin_fill()
for i in range(2):
    forward(400)
    left(90)
    forward(20)
    left(90)
end_fill()

# Second from bottom rectangle
penup()
goto(-175, -265)
pendown()
color("chocolate")
begin_fill()
for i in range(2):
    forward(350)
    left(90)
    forward(20)
    left(90)
end_fill()

# Main part of building
penup()
goto(-150, -245)
pendown()
color("sandybrown")
begin_fill()
for i in range(2):
    forward(300)
    left(90)
    forward(335)
    left(90)
end_fill()

# Second from top rectangle
penup()
goto(-175, 90)
pendown()
color("chocolate")
begin_fill()
for i in range(2):
    forward(350)
    left(90)
    forward(20)
    left(90)
end_fill()

# Top rectangle
penup()
goto(-150, 110)
pendown()
color("sienna")
begin_fill()
for i in range(2):
    forward(300)
    left(90)
    forward(20)
    left(90)
end_fill()

# Windows
x = -125
y = 30
light_color = ['black','khaki']
def window():
    global x # Ensures that x can be used inside of this function
    color(light_color[round(random()+0.3)])
    penup()
    home()
    goto(x, y)
    pendown()
    begin_fill()
    for i in range(4):
        forward(40)
        left(90)
    end_fill()
    x = x + 70 

hideturtle()
delay(0)
temp = 1
while temp<2:
    temp += 1
    y=30
    for i in range(4): # This loop will draw 4 rows of windows
        for i in range(4): # This loop will draw one row of 4 windows
            window()
        x = -125 # Ensures all rows of windows start from the same x-position
        y = y - 85 # Moves the next row of windows down lower than the previous
# fill other landscapes
# draw moon
width,height = 800,200
penup()
home()
delay(0)
setx(width/2-150)
sety(height/2+50)
pendown()
color("red","yellow")
hideturtle()
begin_fill()
circle(50,180)
right(30)
circle(58,-120)
end_fill()

# under blinking stars
t = Turtle(visible = False,shape='circle')
t.pencolor("white")
t.fillcolor("white")
t.penup()
t.setheading(-90)
t.goto(width/2,randint(-height/2,height/2))
stars = []
for i in range(50):
    star = t.clone()
    s =random() /3
    star.shapesize(s,s)
    star.speed(int(s*30))
    star.setx(width/2 + randint(1,width))
    star.sety( randint(height-70,height+100))
    star.showturtle()
    stars.append(star)
while True:
    y=30
    for i in range(randint(1,4)): # This loop will draw 4 rows of windows
        for i in range(randint(1,4)): # This loop will draw one row of 4 windows
            window()
        x = -125 # Ensures all rows of windows start from the same x-position
        y = y - 85 # Moves the next row of windows down lower than the previous
    for star in stars:
        star.setx(star.xcor() - 3 * star.speed())
        if star.xcor()<-width/2:
            star.hideturtle()
            star.setx(width/2 + randint(1,width))
            star.sety( randint(height-70,height+100))
            star.showturtle()


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
### jieba
#### jieba实例
通过调用jieba、wordcloud库对二十大报告全文关键词进行频次统计并绘制词云。
```
import jieba
from matplotlib import pyplot as plt
from wordcloud import WordCloud
from PIL import Image
import numpy as np

def tcg(texts):
    cut = jieba.cut(texts)  #分词
    string = ' '.join(cut)
    return string

jieba.load_userdict(r"C:\python学习\userdict.txt")
txt = open("C:\python学习\二十大报告全文.txt",'r',encoding='utf-8').read()
st = open('C:/python学习/stopwords.txt','r',encoding='utf-8')
string=tcg(txt)
img = Image.open('C:/Users/carefree/Desktop/project1.png') #打开图片
img_array = np.array(img) #将图片装换为数组
stop_words = [line.strip('\n') for line in st.readlines()]
words = jieba.lcut(txt)
counts = {}
for word in words:
    if len(word) == 1: #排除单个字符（汉字）的分词结果
        if word not in stop_words:
            stop_words.append(word)
        continue
    else:
        if word not in stop_words:
            counts[word] = counts.get(word,0) + 1

#排序
items = list(counts.items())
items.sort(key=lambda x:x[1], reverse=True)      #排序
# 输出前20的高频词
for i in range(20):                              #输出前20个词
    word, count = items[i]
    print ("{0:<10}{1:>5}".format(word, count))

wc = WordCloud(
    background_color='white',
    width=800,
    height=600,
    mask=img_array, #设置背景图片
    font_path='C:/Windows/Fonts/simkai.ttf',
    stopwords=stop_words
)
wc.generate_from_text(string)#绘制图片
plt.imshow(wc)
plt.axis('off')
plt.show()  #显示图片
```
### BeautifulSoup
```
python.exe -m pip install --upgrade pip #更新pip版本
pip install beautifulsoup4 #安装BeautifulSoup
```
#### 使用的函数库
```
from urllib.request import urlopen
from urllib.parse import urlparse
from xml.etree.ElementInclude import include
from bs4 import BeautifulSoup 
from urllib.error import URLError
from urllib.error import HTTPError
import re
import time # 由于3.9以上版本random.seed支持格式改变，暂用time库平替。
import random
```
#### 示例函数
* 解析函数    
        很多情况下BeautifulSoup()需要被使用,且在需要反复执行解析命令的情况下容易由某些错误或者返回值缺失导致整个程序崩溃,引入try同时定义为函数可方便使用。
```
def bs4_pre(url):
    try:
        html = urlopen(url)
    except HTTPError as e:
        return None
    except URLError as e :
        return  None
    try:
        bs = BeautifulSoup(html.read(),'html.parser')
    except AttributeError as e:
        return None
    return bs
```
* 搜索学院通知专栏信息    
        很多情况下我们需要标题与链接两种信息，在该函数中我将这两种信息综合为字典，最终以key:value \n的形式进行输出。
```
def getmathweb():
    startingPage = ''
    bs = bs4_pre(startingPage)
    mainsite = '{}://{}'.format(urlparse(startingPage).scheme,urlparse(startingPage).netloc)
    allthing = bs.find_all('ul',{'class':'list'})
    linklist = []
    for thing in allthing:
            alllink = re.findall(r"href=\"(.*?)\"",thing.prettify())
            thinglist = thing.get_text().split('\n')	
    thinglist.pop(0)
    for link in alllink:
        if re.match('info',link) == None:
            link = link.replace('&amp;','&')
            linklist.append(link)
        else:
            link = mainsite + '/' + link
            linklist.append(link)
    dictionary = dict(zip(thinglist, linklist))
    for i,j in dictionary.items():
        print(i,j)

```
```
def geteconweb():
    linklist = []
    alink = []
    thinglist = []
    startPage = ''
    bs = bs4_pre(startPage)
    mainweb = '{}://{}'.format(urlparse(startPage).scheme,urlparse(startPage).netloc)
    allthing = bs.find('div',{'id':'list'}).find_all('li')
    for thing in allthing:
        thinglist.append(thing.get_text())
    for thing  in allthing:
        temp = re.findall(r"href=\"(.*?)\"",thing.prettify())
        alink.append(temp)
    for link in alink:
        if re.match('..',link[1]) == None:
            link = link[1].replace('&amp;','&')
            linklist.append(link)
        else:
            link = link[1].replace('..','')
            link = mainweb + link
            linklist.append(link)
    dictionary = dict(zip(thinglist, linklist))
    for i,j in dictionary.items():
        print(i,j)
```
* 获取内链列表    
        很多情况下函数可以很好得执行，但不排除个别网站内链并非以.or/作为开头
```
def getInternalLinks(bs,includeUrl):
    includeUrl = '{}://{}'.format(urlparse(includeUrl).scheme,
        urlparse(includeUrl).netloc)
    internalLinks = []
    for link in bs.find_all('a',href=re.compile('^(/|.*'+includeUrl+')')): 
        if link.attrs['href'] is not None:
            if link.attrs['href'] not in internalLinks:
                if(link.attrs['href'].startswith('/')):
                    internalLinks.append(includeUrl+link.attrs['href'])
                else:
                    internalLinks.append(link.attrs['href'])
    return internalLinks
```
* 获取外链列表
```
def getExternalLinks(bs,excludeUrl):
    externalLinks = []
    for link in bs.find_all('a',href=re.compile('^(http|www)((?!'+excludeUrl+').)*$')):
        if link.attrs['href'] is not None:
            if link.attrs['href'] not in externalLinks:
                externalLinks.append(link.attrs['href'])
    return externalLinks
```
* 输出某个外链    
        在测试阶段发现有个别网站既没有外链又没有内链，于是添加判定使得无外链时自动前往内链进行外链搜索，若无内链则返回主站。
```
def getRandomExternalLink(startingPage):
    bs = bs4_pre(startingPage)
    externalLinks = getExternalLinks(bs,urlparse(startingPage).netloc)
    if len(externalLinks) == 0:
        print('No external links, looking around the site for one')
        domain = '{}://{}'.format(urlparse(startingPage).scheme,urlparse(startingPage).netloc) 
        internalLinks = getInternalLinks(bs,domain)
        if len(internalLinks) == 0:
            print('This is a single website,you could say home page:')
            return domain
        else:
            return getRandomExternalLink(internalLinks[random.randint(0,
            len(internalLinks)-1)])
    else:
        return externalLinks[random.randint(0, len(externalLinks)-1)]
```
* 收集网站上发现得所有链接
```
allExtLinks = set()
allIntLinks = set()
def getAllExternalLinks(siteUrl):
    html = urlopen(siteUrl)
    domain = '{}://{}'.format(urlparse(siteUrl).scheme,urlparse(siteUrl).netloc)
    bs = BeautifulSoup(html, 'html.parser')
    internalLinks = getInternalLinks(bs, domain)
    externalLinks = getExternalLinks(bs, domain)
    for link in externalLinks:
        if link not in allExtLinks:
            allExtLinks.add(link)
            print(link)
    for link in internalLinks:
        if link not in allIntLinks:
            allIntLinks.add(link)
        getAllExternalLinks(link)
```
#### RSS
很多网站具有良好的反爬功能，对于小白想要快速定位所需信息并不容易。对于这类网站，RSS订阅能够有效实现信息搜集功能。    
目前利用RSShub/feed43+feeder实现订阅功能。    
* feeder作为常规订阅器，可在firefox上下载feeder插件完成电脑端使用，或下载feeder移动端完成移动端上的订阅。    
* 大多数网站可以通过交互式命令进行RSS订阅，但不排除有些网站不具备该功能键，此时考虑RSS hub利用配置好的文件直接进行订阅。    
* 某些小站可能不会被RSShub收录，可使用feed43生成feed后自行订阅。具体可参考[这里](https://feed43.com/faq.html)
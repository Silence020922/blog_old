---
title: R实战入门
date: 2022-10-17
tag: note
---
>R这门语言是一门专业课，在这里使用的参考书目是《R语言实战(第二版)》
## 安装R及配置编译器
### radian
这是我在linux系统上使用的编译器    
```
sudo pacman -S r #用于安装R
sudo pacman -S pythohn-pip #安装pip
pip install -U radian #在此使用radian 作为R的编译器
```
具体配置文档参考[这里](https://github.com/randy3k/radian)     
*注意*：与其他编译器不同的是,radian不再使用.Rhistory存储，反而自动存储于.radian_histor中供全局或者本地使用。    
### RStudio
这是在windows上图方便用的    
直接前往[官方](https://www.rstudio.com/)下载，下载免费版即可。当然需先安装[R](https://www.r-project.org/)
## 作业1
```
Q1:    
I <- matrix(rep(1:5,times =5),nrow = 5,byrow = F)
J <- matrix(rep(1:5,times=5),nrow = 5,byrow = T)
A <- 0.5^(abs(I-J))
Q2:    
I <- matrix(rep(1:100,times =100),nrow = 100,byrow = F)
J <- matrix(rep(1:100,times=100),nrow = 100,byrow = T)
A <- 0.5^(abs(I-J))
Q3:    
function.Q3 <- function(n){     #不会声明未知变量选择使用函数形参代替
I <- matrix(rep(1:n,times =n),nrow = n,byrow = F)            
J <- matrix(rep(1:n,times=n),nrow = n,byrow = T)    
A <- 0.5^(abs(I-J))     
}    
```
## 作业2
```
rm(list = ls())
getwd() #获取当前工作目录
setwd("C:/Users/ASUS/Desktop/R")  #调整工作目录到我的文件所在地址，按照题目要求应为"D:/"
getwd()
list_new <- list()   
file_name <- list.files("zuoye2")
dir <- paste("./zuoye2/",file_name,sep="") #通过粘结将文件名配置为当前目录下可直接调用
n <- length(dir)
for (i in 1:n){
    sec_file = list.files(dir[i],pattern = "^sfnwmrda.*rest_1") #利用正则表达式优先导入sfnwmrda开头且包含rest_1的文件
    if (length(sec_file) == 0){         #在sec_file无导入文件的情况下再次导入sfnwmrda开头且包含rest_1的文件
        sec_file = list.files(dir[i],pattern = "^sfnwmrda.*rest_2")
    }
    if(length(sec_file) == 0){      #当这两种文件都未找到直接输出并结束任务
        print(paste("The folder ",dir[i]," has no file that meets the requirements"))
    }
    else{       #否则我们求文件中数据矩阵的均值
    file = paste(dir[i],"/",sec_file,sep = "")
    data = read.table(file)     #数据的导入
    A<-as.matrix(data)  #接下来五行是将数据由矩阵文本转化为数据文本并除掉一些不必要的行列
    A<-A[-1,] # 接下来三行是针对该数据特征将标题等文本信息去除
    A<-A[,-1]
    A<-A[,-1]
    B <- apply(A,2,as.numeric)   #之后对题目要求理解出现问题，再三考虑后决定采用下两行而将首次代码注释掉。
     list_new[[(length(list_new))+ 1]]<- B}
     ans <- Reduce("+",list_new)/length(list_new) #Reduce代替apply可实现保留结果连续求值
    # ans = mean(B)
    # print(paste("The average of the data ",file," is ",ans))}
}
```
## 作业3
>首先需要说明的是，严格来讲并没有完全复刻示例图片，但个人已将认为比较重要的    
>数据详尽的表示了出来，最终效果图可以查看[这里](https://surplus-1311636487.cos.ap-beijing.myqcloud.com/R-3.jpg)

代码如下
```
load("Download/zuoye3.rdata") #更改为自己文件所在的地址
library(ggplot2) #主要库
library(ggpubr) #基于ggplot2用于组合展示
function1 <-function(groupV,s){  # 将p差值转化为标签*
         for (i in 1:7){
             if (groupV[i,1] <0.01){
                     s[i] = '**'
                 }else if(groupV[i,1]<0.05){
                         s[i] = '*'
                     }else {s[i] = ' '}}
         for (j in 1:7){
                 if (groupV[j,2]<0.01){
                         s[j+7] = '**'
                     }else if (groupV[j,2]<0.05){
                             s[j+7] = '*'
                         }else {s[j+7] = ' '}}
         return(s)
    }
function2 <-function(groupV,s){  # 将p值转化为标签*
         for (i in 1:14){
             if (groupV[i,4] <0.01){
                     s[i] = '**'
                 }else if(groupV[i,4]<0.05){
                         s[i] = '*'
                     }else {s[i] = ' '}}
         return(s)
    }
labelA <- c();labelB <- c();labelA_B <- c() # 用于存储标签属性
pd <- position_dodge(0.1)
labelA <- function2(dataA,labelA);labelB <- function2(dataB,labelB);labelA_B <- function1(groupPvlue,labelA_B) # 生成标签
pic1 <- ggplot(dataA, aes(XX, y, colour=group, group = group),angle = 45) +  # 绘制图(A)
    geom_errorbar(aes(ymin=low, ymax=up), width=.2, position=pd) +
    geom_point(aes(colour = group, shape = factor(group)),position=pd, size = 3) +
    xlab("XX") + 
    ylab("y-value") + 
    ggtitle("(A)") + 
    scale_colour_gradient(low = 'red',high = 'blue') + 
    geom_text(aes(XX+.2,y,label = labelA)) + 
    geom_label(aes(XX + .02,y + 1,label = labelA_B[1:7]),data = dataA[1:7,1:6])
pic2 <- ggplot(dataB, aes(XX, y, colour=group, group = group),angle = 45) + # 绘制图(B)
    geom_errorbar(aes(ymin=low, ymax=up), width=.2, position=pd) +
    geom_point(aes(colour = group, shape = factor(group)),position=pd, size = 3) +
    xlab("XX") + 
    ylab("y-value") + 
    ggtitle("(B)") + 
    theme(axis.text.x = element_text(angle = 45, hjust = 1, vjust = 1)) +
    scale_colour_gradient(low = 'red',high = 'blue') + 
    geom_text(aes(XX+.2,y,label = labelB)) + 
    geom_label(aes(XX + .02,y + 1,label = labelA_B[8:14]),data = dataB[1:7,1:6])
pic <- ggarrange(pic1,pic2) # 组合展示
ggsave(pic,file = 'pic_name.pdf',width = 20,height = 10) #保存
```
## 初级绘图
### 绘图参数
参数     | 描述
-------- | -----
pch| 指定绘制点时使用的符号
cex  | 指定符号的大小，默认值为1表示放大为默认值的1倍
lty   | 指定线条类型
lwd | 指定线条宽度，默认值为1，同cex。    
### 颜色参数
参数     | 描述
-------- | -----
col| 默认的绘图颜色。一般来说指定col为单独颜色或为一个向量，注意，一般情况下需要保证向量与所绘制的点or线维度相同，当然，在一些函数(lines、pie)也可不相同，此时会自动循环调用颜色向量
col.axis  | 坐标轴刻度文字的颜色
col.lab   | 坐标轴标签的颜色
col.main | 标题颜色    
col.sub | 副标题颜色
fg | 图形的前景色
bg|  图形的背景色

`colors()`可以返回当前可用的所有颜色
### 文本属性
* 用于指定文本大小    

参数| 描述
-------- | -----
cex |  ...
cex.axis | ...
cex.lab | ...
cex.main | ...
cex.sub | ...
* 用于指定字体、字号、字样

参数 | 描述
-------- | -----
font  |  整数。1=常规、2=粗体、3=斜体、4=粗斜体、5=符号字体
font.axis(lab\main\sub)  | ...
ps  |  字体磅值。文本最终大小为ps*cex
family | 标准取值为serif(衬线)、sans(无衬线)、mono(等宽)

### 图形尺寸和边界大小
参数  |  描述
----- | ------
pin  | 英寸表示图形的尺寸(宽和高)
mai  | 数值向量表示边界的大小，顺序为下左上右，英寸
mar  | 数值向量表示边界大小，顺序同上，英分

`par(pin = c(4,3),mar = c(5,4,4,3))` 例

### 添加文本、自定义坐标轴和图例
`main`标题、`sub`副标题、`xlab,ylab`坐标轴标签、`xlim,ylim`坐标轴范围。某些高级绘图函数已经包含了默认的标题和标签。通过`ann = FALSE`移除他们。

* 标题    
`title(main = '',sub = '',col.main ='',col.sub = '',xlab = '',ylab='',col.lab ='',cex.lab='')`    

* 坐标轴    
`axis(side,at=,labels=,pos=,lty=,col=,las=,tck=,...)`    

参数 | 描述
------|------
side | 一个整数，表示在图形哪边绘制坐标轴(1\2\3\4 下\左\上\右) 
at | 数值形向量，表示需要绘制刻度线的位置
labels | 字符形向量，表示置于刻度线旁边的文字标签
pos | 坐标轴线绘制位置的坐标(与另一条相交的位置)
lty | 线条类型
col |...
las | 坐标标签平行(0)垂直(2)坐标轴
tck | 刻度线的长度，以相对于绘图区域大小的分数表示(负表示在图形外侧，正表示在图形内侧，0禁用刻度，1绘制网格线)

自定义坐标轴需要禁用自动生成的坐标轴`axes = FALSE`。参数xaxt = 'n'和yaxt='n'将分别禁用X和Y轴(留下框架线，只去除刻度)

### 参考线
`abline(h=yvalues,v=xvalues,...)`
### 图例
legend(location, title, legend,...)

选项 | 描述
------|------
location | 有许多方式可以指定图例的位置。你可以直接给定图例左上角的x、y坐标，也可以执行locator(1)，然后通过鼠标点击给出图例位置，或使用关键字放置图例。如果你使用了以上某个关键字，那么可以同时使用参数inset=指定图例向图形内测移动的大小
title | 图例标题的字符串
legend | 图例标签组成的字符形向量

### 文本标注
`text(location,"text to place",pos,...)`    
`mtext("text to place",side,line=n,...)`    

text()和mtext()选项

选项|描述
-----|-----
location | 文本的位置参数。可为一对x,y坐标，也可通过指定location为locator(1)使用鼠标交互式确定摆放位置
pos|文本相对于位置参数的方位。1=下、2=左、3=上、4=右。如果指定了pos，就可以同时指定 offset = 作为偏移量
side | 指定用来放置文本的边。1\2\3\4同...

### 图形的组合
* 示例1    

`attach(data_name)`    
`opar <- par(no.readonly = TRUE)`    
`par(mfrow = c(2,2))`   # 创建子图两行两列

* 示例2

`layout(matrix(c(1,1,2,3),2,2,byrow = TRUE)) # 图形123，1放在第一行，2、3放在第二行。    

## 基本数据管理
### 创建新变量
在数据框中添加变量的三种方法
```
mydata<-data.frame(x1 = c(2, 2, 6, 4),
        x2 = c(3, 4, 2, 8)) # 创建数据框
# 方法一
mydata$sumx <- mydata$x1 + mydata$x2
mydata$meanx <- (mydata$x1 + mydata$x2)/2

#方法二
attach(mydata)
mydata$sumx <- x1 + x2
mydata$meanx <- (x1 + x2)/2
detach(mydata)

#方法三     
mydata <- transform(mydata,
        sumx = x1 + x2,
        meanx = (x1 + x2)/2)
```
### 变量的重编码
运算符|描述
-----|-----
<|小于
<=|小于或等于
>|大于
>=|大于或等于
==|严格等于1
!=|不等于
!x|非x
x ｜ y|x或 y
x & y|x和 y
isTRUE(x)|测试x是否为TRUE
```
#创建数据框mydata，x1和x2是mydata的两个列向量
mydata <- data.frame(x1 = c(2, 2, 6, 4), x2 = c(3, 4, 2, 8))

#利用transform函数对数据框mydata增加两个变量（列向量）sumx和meanx，并把结果存储在数据框mydata中
mydata <- transform(mydata, sumx = x1 + x2, meanx = (x1 + x2)/2)

#利用within函数，expr表达式执行一条语句占一行，执行多条语句需要换行
mydata <- within(mydata, {sumx = x1 + x2
                         meanx = (x1 + x2)/2})

#或者多条语句在同一行，则中间应当用分号;隔开
mydata <- within(mydata, {sumx = x1 + x2; meanx = (x1 + x2)/2})
```
### 变量的重命名
`fix(frame_name)`进行交互式操作。    
`names(frame_name)[2] <- "new_name"`对列标题进行重命名，当然使用names也可以进行批量处理，例如`names(leadership)[6:10] <- c("item1", "item2", "item3", "item4", "item5")`    
另外提供一种方法，`rename()`,需要导入plyr包。
### 缺失值
R中缺失值使用符号NA(Not Available)表示。缺失值被认为是不可比较的,即便是与缺失值自身的比较。这意味着无法使用比较运算符来检测缺失值是否存在。例如,逻辑测试`myvar == NA`的结果永远不会为TRUE。R提供了一些函数,用于识别包含缺失值的观测。函数 is.na()允许你检测缺失值是否存在。假设你有一个向量:`y <- c(1, 2, 3, NA)`然后使用函数:`is.na(y)`,将返回`c(FALSE, FALSE, FALSE, TRUE)`。

第二,R 并不把无限的或者不可能出现的数值标记成缺失值。正无穷和负无穷分别用 Inf和–Inf所标记。因此5/0返回Inf。不可能的值(比如说,sin(Inf))用NaN符号来标记(not a number,不是一个数)。若要识别这些数值,你需要用到 `is.infinite()`或`is.nan()`。

**排除缺失值**    
含有缺失值的算术表达式和函数的计算结果也是缺失值。
```
x <- c(1, 2, NA, 3)
y <- x[1] + x[2] + x[3] + x[4] # 输出NA
z <- sum(x) # 输出NA
s <- sum(x,na.rm = TRUE) # 输出6
```
在数据框中，我们可以使用`na.omit(frame_name)`删除不完整的观测数据。注意，由于直接进行行删除，所以要确保删除的行仅占一小部分。
### 日期值
日期值通常以字符串的形式输入到R中,然后转化为以数值形式存储的日期变量。函数`as.Date()` 用于执行这种转化。其语法为`as.Date(x, "input_format")`,其中x是字符型数据,input_format则给出了用于读入日期的适当格式.日期值的默认输入格式为yyyy-mm-dd。语句:`mydates <- as.Date(c("2007-06-22", "2004-02-13"))`。

符号|含义|示例
----|----|----
%d|数字表示的日期(0~31)|01~31
%a|缩写的星期名|Mon
%A|非缩写星期名|Monday
%m|月份(00~12)|00~12
%b|缩写的月份|Jan
%B|非缩写月份|January
%y|两位数的年份|07
%Y|四位数的年份|2007

```
strDates <- c("01/05/1965", "08/16/1975")
dates <- as.Date(strDates, "%m/%d/%Y")
mydates
# output "1965-01-05" "1975-08-16"
```
Sys.Date()可以返回当天的日期,而date()则返回当前的日期和时间
```
r$> Sys.Date()
[1] "2022-12-01"
r$> date()
[1] "Thu Dec  1 19:36:02 2022"
```
你可以使用函数format(x, format="output_format")来输出指定格式的日期值,并且
可以提取日期值中的某些部分:
```
> today <- Sys.Date()
> format(today, format="%B %d %Y")
[1] "November 27 2014"
> format(today, format="%A")
[1] "Thursday"
```
此外，日期之间可以进行算术运算，也可以使用函数`difftime(today, dob, units="weeks")`来计算时间间隔,并以星期、天、时、分、秒来表示。

**将日期转化为字符型**    
函数`as.character()` 可将日期值转换为字符型


### 类型转换函数
    名为is.datatype()这样的函数返回TRUE或FALSE,而as.datatype()这样的函数则将其参数转换为对应的类型。
判断|转换
----|-----
is.numeric()|as.numeric()
is.character()| as.character()
is.vector()| as.vector()
is.matrix()| as.matrix()
is.data.frame()| as.data.frame()
is.factor()|as.factor()
is.logical()|as.logical()

### 数据排序
`order()`函数可以对一个数据框进行排序，默认升序，在变量前加 - 按照降序排列。
```
attach(leadership)
newdata <-leadership[order(gender, -age),] #先按照性别，同性别按照年龄降序
detach(leadership)

```
### 数据合并
如果要直接横向合并两个矩阵或数据框,并且不需要指定一个公共索引,那么可以直接使用`cbind()`函数.    
要横向合并两个数据框(数据集),也可使用 merge()函数。在多数情况下,两个数据框是通过一个或多个共有变量进行联结的(即一种内联结,inner join).
```
r$> mydata <- data.frame(x1 = c(1,2,3),x2 = c(1,2,3),l = c(1,1,1))

r$> mydata2 <- data.frame(x1 = c(2,3,4),x2 = c(2,3,4),s = c(2,2,2))

r$> merge(mydata,mydata2,"x1")
  x1 x2.x l x2.y s
1  2    2 1    2 2
2  3    3 1    3 2  #注意只有x1处值相同才能够串联

```
要纵向合并两个数据框(数据集),请使用`rbind()` 函数:`total <- rbind(dataframeA, dataframeB)`两个数据框必须拥有相同的变量,不过它们的顺序不必一定相同。若变量不同,可删除多余变量或在缺失变量处创建并追加NA值    
### 数据集取子集
`dataframe[row indices, column indices]`,如果某位值取空,代表行(列)全取    
**剔除数据集**   
``` 
myvars <- names(leadership) %in% c("q3", "q4")
newdata <- leadership[!myvars]
```

>(1) names(leadership) 生 成 了 一 个 包 含 所 有 变 量 名 的 字 符 型 向 量 :
>c("managerID","testDate","country","gender","age","q1", "q2","q3","q4","q5") 。    
>(2) names(leadership) %in% c("q3", "q4") 返 回 了 一 个 逻 辑 型 向 量 ,
>names(leadership)中每个匹配q3或q4的元素的值为TRUE ,反之为FALSE: c(FALSE, FALSE,
>FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, FALSE)。    
>(3) 运算符非(!)将逻辑值反转: c(TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE,
>FALSE, TRUE)。    
>(4) leadership[c(TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE,
>TRUE)]选择了逻辑值为TRUE的列,于是q3和q4被剔除了。     

在知道q3和q4是第8个和第9个变量的情况下,可以使用语句:`newdata <- leadership[c(-8,-9)]`将它们剔除。这种方式的工作原理是,在某一列的下标之前加一个减号(–)就会剔除那一列。

最后,相同的变量删除工作亦可通过:`leadership$q3 <- leadership$q4 <- NULL`来完成。这回你将 q3 和 q4 两列设为了未定义( NULL )。注意, NULL 与 NA (表示缺失)是不
同的。

**subset()函数**    
```
newdata <- subset(leadership, age >= 35 | age < 24,
        select=c(q1, q2, q3, q4))
newdata <- subset(leadership, gender=="M" & age > 25,
        select=gender:q4)
```
**随机采样**    
`mysample <- frame_name[sample(1:nrow(leadership), 3, replace=FALSE),]` 样本数据3的无放回抽样




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

## 高级数据管理
### 数值和字符处理函数
数学函数|描述
----|-----
abs(x)| 绝对值
sqrt(x)| 平方根
ceiling(x)|  不小于 x 的最小整数
floor(x)|  不大于 x 的最大整数
trunc(x)|向 0 的方向截取的 x 中的整数部分,trunc(5.99)返回值为 5
round(x, digits=n)|将 x 舍入为指定位的小数
signif(x, digits=n)|将 x 舍入为指定的有效数字位数
cos(x)、 sin(x)、tan(x)、acos(x)、asin(x)、atan(x)、cosh(x)、sinh(x)、tanh(x)、acosh(x)、asinh(x)、atanh(x)|余弦、反余弦，双曲余弦、反双曲余弦
exp(x)|指数函数
log(x,base=n)|对 x 取以 n 为底的对数

统计函数|描述
---|-----------------
mean(x)| 平均数
median(x)|中位数
sd(x)| 标准差
var(x)|方差
mad(x)|绝对中位差(数据到中位数的偏差的绝对值的中位数)
quantile(x,probs)|求分位数。其中 x 为待求分位数的数值型向量,probs 为一个由[0,1]之间的概率值组成的数值向量
range(x)|求值域
sum(x)|求和
diff(x, lag=n)|滞后差分,lag 用以指定滞后几项。默认的 lag 值为 1,x<- c(1, 5, 23, 29),diff(x)返回值为 c(4, 18, 6)
min(x)|求最小值
max(x)| 求最大值
scale(x,center=TRUE,scale=TRUE)|为数据对象 x 按列进行中心化(center=TRUE)或标准化(center=TRUE,scale=TRUE),默认情况将数据标准化为均值0方差1;

**概率函数**    
在R中,概率函数形如 :`[dpqr] + 分布缩写()`
>其中第一个字母表示其所指分布的某一方面:    
>d = 密度函数(density)，p = 分布函数(distribution function)，q = 分位数函数(quantile function)，r = 生成随机数(随机偏差)

例如`qnorm(.9, mean=500, sd=100) #均值为 500,标准差为 100 的正态分布的 0.9 分位点值`,`pnorm(1.96) #位于 z=1.96 左侧的标准正态曲线下方面积`。

在R中生成伪随机数时，函数会每次调用不同种子，通过set.seed()可以指定这个种子，可使结果重现。

字符处理函数|描述
-----|--------
toupper(x)|大写转换
tolower(x)|小写转换
paste(..., sep="")|连接字符串,分隔符为 sep,例如，paste('today is ',date(),sep = ' ')
strsplit(x, split,fixed=FALSE)|在 split 处分割字符向量 x 中的元素。若 fixed=FALSE,则 pattern 为一个正则表达式。若 fixed=TRUE,则 pattern 为一个文本字符串
nchar(x)|计算 x 中的字符数量,  x <- 'good',length(x) = 1,nchat(x) = 4
substr(x, start, stop)|提取或替换一个字符向量中的子串,substr(x, 2, 4) <- "22222"(x 将变成"a222ef")
grep(pattern, x, ignore.case=FALSE, fixed=FALSE)|在 x 中搜索某种模式。若 fixed=FALSE,则 pattern 为一个正则表达式。若fixed=TRUE,则 pattern 为一个文本字符串。返回值为匹配的下标
sub(pattern, replacement,x, ignore.case=FALSE,fixed=FALSE)|在 x 中搜索 pattern,并以文本 replacement 将其替换。若 fixed=FALSE,则pattern 为一个正则表达式。若 fixed=TRUE,则 pattern 为一个文本字符串。

其他使用函数|描述
--------|--------
seq(from, to, by)|生成一个序列
rep(x, n)|将 x 重复 n 次,y <- rep(1:3, 2),y 的值为 c(1, 2, 3, 1, 2, 3)
pretty(x, n)|创建美观的分割点。通过选取 n+1 个等间距的取整值,将一个连续型变量x分割为n个区间。绘图中常用

### apply()
R中提供了一个 apply()函数,可将一个任意函数“应用”到矩阵、数组、数据框的任何维度上。apply()函数的使用格式为:`apply(x, MARGIN, FUN, ...)`。MARGIN=1表示行，2表示列，...部分表示传递给FUN的参数。

### 综合示例
将学生的各科考试成绩组合为单一的成绩衡量指标,基于相对名次
(前20%、下20%、等等)给出从A到F的评分,根据学生姓氏和名字的首字母对花名册进行排序。
```
Student <- c("John Davis", "Angela Williams", "Bullwinkle Moose",
    "David Jones", "Janice Markhammer", "Cheryl Cushing",
    "Reuven Ytzrhak", "Greg Knox", "Joel England",
    "Mary Rayburn")
    Math <- c(502, 600, 412, 358, 495, 512, 410, 625, 573, 522)
    Science <- c(95, 99, 80, 82, 75, 85, 80, 95, 89, 86)
    English <- c(25, 22, 18, 15, 20, 28, 15, 30, 27, 18)
    roster <- data.frame(Student, Math, Science, English,
    stringsAsFactors=FALSE) #录入数据
\\ 数据显示如下
             Student Math Science English
1         John Davis  502      95      25
2    Angela Williams  600      99      22
3   Bullwinkle Moose  412      80      18
4        David Jones  358      82      15
5  Janice Markhammer  495      75      20
6     Cheryl Cushing  512      85      28
7     Reuven Ytzrhak  410      80      15
8          Greg Knox  625      95      30
9       Joel England  573      89      27
10      Mary Rayburn  522      86      18 \\

z <- scale(roster[,2:4]) 分数进行标准化
score <- apply(z,MARGIN = 1,mean) # 求标准化成绩后的成绩均值
roster <- cbind(roster,score) #合并
y <- quantile(score, c(.8,.6,.4,.2)) #求.8,-.2的分位数
roster$grade[score >= y[1]] <- "A"
roster$grade[score < y[1] & score >= y[2]] <- "B"
roster$grade[score < y[2] & score >= y[3]] <- "C"
roster$grade[score < y[3] & score >= y[4]] <- "D"
roster$grade[score < y[4]] <- "F" # 按照.2间隔给予评分
Firstname <- sapply(name, "[", 1) #sapply()在这提取列表中第一个元素
Lastname <- sapply(name, "[", 2)
roster <- cbind(Firstname, Lastname, roster[,-1]) #-1意为除掉第一个列
roster[order(Lastname,Firstname),] # 根据姓名排序
```

### 控制流
if,while,for 略
```
# 关于switch
> feelings <- c("sad", "afraid")
> for (i in feelings)
print(
switch(i,
happy = "I am glad you are happy",
afraid = "There is nothing to fear",
sad
 = "Cheer up",
angry = "Calm down now"
)
)
[1] "Cheer up"
[1] "There is nothing to fear"
```
```
关于ifelse()
ifelse(score > 0.5, print("Passed"), print("Failed"))
```

### 整合与重构数据
t()对数据框进行转置

**数据整合**    
```
对于如下数据
mtcars
                     mpg cyl  disp  hp drat   wt qsec vs am gear carb
Mazda RX4           21.0   6 160.0 110 3.90 2.62 16.5  0  1    4    4
Mazda RX4 Wag       21.0   6 160.0 110 3.90 2.88 17.0  0  1    4    4
Datsun 710          22.8   4 108.0  93 3.85 2.32 18.6  1  1    4    1
Hornet 4 Drive      21.4   6 258.0 110 3.08 3.21 19.4  1  0    3    1
Hornet Sportabout   18.7   8 360.0 175 3.15 3.44 17.0  0  0    3    2
Valiant             18.1   6 225.0 105 2.76 3.46 20.2  1  0    3    1
Duster 360          14.3   8 360.0 245 3.21 3.57 15.8  0  0    3    4
Merc 240D           24.4   4 146.7  62 3.69 3.19 20.0  1  0    4    2
Merc 230            22.8   4 140.8  95 3.92 3.15 22.9  1  0    4    2
Merc 280            19.2   6 167.6 123 3.92 3.44 18.3  1  0    4    4
Merc 280C           17.8   6 167.6 123 3.92 3.44 18.9  1  0    4    4
Merc 450SE          16.4   8 275.8 180 3.07 4.07 17.4  0  0    3    3
Merc 450SL          17.3   8 275.8 180 3.07 3.73 17.6  0  0    3    3
Merc 450SLC         15.2   8 275.8 180 3.07 3.78 18.0  0  0    3    3
Cadillac Fleetwood  10.4   8 472.0 205 2.93 5.25 18.0  0  0    3    4
Lincoln Continental 10.4   8 460.0 215 3.00 5.42 17.8  0  0    3    4
Chrysler Imperial   14.7   8 440.0 230 3.23 5.34 17.4  0  0    3    4
Fiat 128            32.4   4  78.7  66 4.08 2.20 19.5  1  1    4    1
Honda Civic         30.4   4  75.7  52 4.93 1.61 18.5  1  1    4    2
Toyota Corolla      33.9   4  71.1  65 4.22 1.83 19.9  1  1    4    1
Toyota Corona       21.5   4 120.1  97 3.70 2.46 20.0  1  0    3    1
Dodge Challenger    15.5   8 318.0 150 2.76 3.52 16.9  0  0    3    2
AMC Javelin         15.2   8 304.0 150 3.15 3.44 17.3  0  0    3    2
Camaro Z28          13.3   8 350.0 245 3.73 3.84 15.4  0  0    3    4
Pontiac Firebird    19.2   8 400.0 175 3.08 3.85 17.1  0  0    3    2
Fiat X1-9           27.3   4  79.0  66 4.08 1.94 18.9  1  1    4    1
Porsche 914-2       26.0   4 120.3  91 4.43 2.14 16.7  0  1    5    2
Lotus Europa        30.4   4  95.1 113 3.77 1.51 16.9  1  1    5    2
Ford Pantera L      15.8   8 351.0 264 4.22 3.17 14.5  0  1    5    4
Ferrari Dino        19.7   6 145.0 175 3.62 2.77 15.5  0  1    5    6
Maserati Bora       15.0   8 301.0 335 3.54 3.57 14.6  0  1    5    8
Volvo 142E          21.4   4 121.0 109 4.11 2.78 18.6  1  1    4    2

```
通过`aggdata <-aggregate(mtcars, by=list(cyl,gear), FUN=mean, na.rm=TRUE)
`,实现对mtcars数据按照cyl,gear进行分类并返回各个数值类型的均值。返回结果如下
```
aggdata
  Group.1 Group.2  mpg cyl disp  hp drat   wt qsec  vs   am gear carb
1       4       3 21.5   4  120  97 3.70 2.46 20.0 1.0 0.00    3 1.00
2       6       3 19.8   6  242 108 2.92 3.34 19.8 1.0 0.00    3 1.00
3       8       3 15.1   8  358 194 3.12 4.10 17.1 0.0 0.00    3 3.08
4       4       4 26.9   4  103  76 4.11 2.38 19.6 1.0 0.75    4 1.50
5       6       4 19.8   6  164 116 3.91 3.09 17.7 0.5 0.50    4 4.00
6       4       5 28.2   4  108 102 4.10 1.83 16.8 0.5 1.00    5 2.00
7       6       5 19.7   6  145 175 3.62 2.77 15.5 0.0 1.00    5 6.00
8       8       5 15.4   8  326 300 3.88 3.37 14.6 0.0 1.00    5 6.00
```
在结果中, Group.1表示汽缸数量(4、6或8), Group.2代表挡位数(3、4或5)。举例第一行数据,拥有4个汽缸和3个挡位车型的每加仑汽油行驶英里数(mpg)均值为21.5。    

对于更加高级的数据整合方法，可利用reshape2包实现。


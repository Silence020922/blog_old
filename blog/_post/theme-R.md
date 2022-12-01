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



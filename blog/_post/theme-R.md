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

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

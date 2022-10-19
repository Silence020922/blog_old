---
title: R实战入门
date: 2022-10-17
tag: note
---
>R这门语言是一门专业课，在这里使用的参考书目是《R语言实战(第二版)》
## 安装R及配置编译器
```
sudo pacman -S r #用于安装R
pip install -U radian #在此使用radian 作为R的编译器
```
具体配置文档参考[这里](https://github.com/randy3k/radian)
```
search() #查看可用包
install.packages("") #执行包下载命令
library() #导入R命令窗口进行使用
<- #数据存储命令 新版本可用=

```
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
function.Q3 <- function(n){    
I <- matrix(rep(1:n,times =n),nrow = n,byrow = F)            
J <- matrix(rep(1:n,times=n),nrow = n,byrow = T)    
A <- 0.5^(abs(I-J))    
```

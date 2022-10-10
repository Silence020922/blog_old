---
title: VIM入门
date: 2022-10-10
tag: note
---
# VIM入门
>本专题仅为个人人无事做的学习记录
## 配置vim为默认编辑器
```
vim ~/.bash_profile #使用vim编辑该文件
```
在适当位置插入以下内容
```
export EDITOR='vim'
esc + :wq #保存并退出
```
## 基本介绍
vim具有四个基本模式，分别为    
>1. 正常模式(normal mode)     
>2. 可视模式(Visual mode)      
>3. 插入模式(insert mode)    
>4. 命令模式（command mode)

终端内
```
vim + file-name 
```
进入vim窗口，默认为正常模式。    
在默认模式按下
>v 进入可视模式    
>i 进入插入模式
>: 进入命令模式    
>在以上三种模式中按下<esc>OR ctrl+[ 可返回正常模式
## 基本命令
```
vim file1 file2 ... #可同时打开多个文件
vim -On file1 file2 ... #对打开的文件执行左右分屏操作，n为具体文件数目
vim -on file1 file2... #上下分屏
```
# vim命令
## 正常模式
### 分屏
* 按住ctrl+w后按下s,可上下分屏     
* ctrl+w后按下v可左右分屏    
* :sp file 打开新文件并与正在编辑文件上下分屏     
* :vsp file 打开新文件并左右分屏    
* hjkl分别对应了光标向左下上右移动，同样    
* ctrl+w 后录入 hjkl可以使得当前光标移动到对应位置的分屏，录入HJKL可使得分屏位置发生改变    
* ctrl+w 后按下c即可关闭分屏    
* 直接键入:q也可退出当前分屏    
### 基操 
* :ls 展示当前打开文件的编号及名称    
* :bn 编辑编号为n的文件    
* ：q 退出文件且不保存
* :qa! 退出所有文件且不保存
* :w 保存修改 搭配:wq 保存且推出
* :w! 强制保存
* :e! 放弃对文件的所有修改恢复文件到上次位置
* :saveas file 另存为
## 插入模式
### 模式进入



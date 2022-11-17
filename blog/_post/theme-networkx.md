---
title: A project
date: 2022-11-17
tag: note
---
linux系统下执行数据可视化遇到的问题及解决方法。
```
sudo pacman -Syy #更新pacman路径 
sudo pacman -S python-gobject #解决模块gi无可视化属性的问题
sudo pacman -S appmenu-gtk-module #解决无法载入gtk模块的错误
sudo pacman -S tk #安装python-tkinter，解决Agg不能显示图片的问题
```

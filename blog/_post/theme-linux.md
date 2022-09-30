---
title: linux 入门 
date: 2022-09-29
tag: note
---
Tips:建议虚拟机,使用版本[manjaro](https://manjaro.org/download/)        
1.[VMware Workstation Player](https://www.vmware.com/cn/products/workstation-player/workstation-player-evaluation.html)VMware公司为Windows用于非商业用途。

2.[VMware Fusion Player](https://customerconnect.vmware.com/evalcenter?p=fusion-player-personal)
VMware公司为macO平台推出非商用软件。

3.[VirtualBox](https://www.virtualbox.org/wiki/Downloads)甲骨文公司发行的通用虚拟机管理系统，支持 Windows 和 macOS,且遵循GPLv2开源。    
# 命令(基于pacman)
## 安装具体的软件包(Insalling package)
```
# pacman -S package_name1 package_name2 ...
```
**示例**        
1.安装输入法
```
sudo pacman -S fcitx5-im # 输入法基包组
sudo pacman -S fcitx5-chinese-addons # 官方中文输入引擎
sudo pacman -S fcitx5-material-color # 输入法主题
```
2.升级系统中全部包
```
pacman -Syuu
```
3.下载vim编辑器
```
sudo pacman -S vim
```
4.安装PDF阅读器
```
sudo pacman -S okular
```
5.安装firefox chromium
```
sudo pacman -S firefox
```
6.安装百度网盘
```
yay -S baidunetdisk-bin
```
## 移除安装包(Removing packages)
**操作命令**    
删除一个包，保留其依赖项
```
pacman -R package_name
```
删除包及现存包所不需要的依赖项
```
pacman -Rs package_name
```
如遭遇阻止尝试
```
pacman -Rsu package_name
```
## 移除安装包残留
**操作命令**

删除所有安装和未安装的包但保留近三个版本
```
paccache -r
```
保留近x版本删除
```
paccache -rkx
```
添加u可限制命令仅在未安装的包中执行
```
paccache -ruk0
```
## 额外指令(additional commands)
**命令**    
仅下载但不进行安装
```
pacman -Sw package_name
```
执行本地安装
```
pacman -U /path/to/package/package_name-version.pkg.tar.zst
```
远程安装(调用网络文件)
```
pacman -U http://www.example.com/repo/example.pkg.tar.zst
```
## (解)压缩命令    
### tar    
压缩文件file1和目录dir2到test.tar.gz
```
tar -zcvf test.tar.gz file1 dir2
```
解压文件
```
tar -zxvf test.tar.gz
```
列出压缩文件的内容 
```
tar -ztvf test.tar.gz
```
**解释**    
> -z : 使用 gzip 来压缩和解压文件    
> -v : --verbose 详细的列出处理的文件    
> -f : --file=ARCHIVE 使用档案文件或设备，这个选项通常是必选的    
> -c : --create 创建一个新的归档（压缩包）    
> -x : 从压缩包中解出文件    

### rar
压缩文件
```
rar a -r test.rar file 
```
解压文件
```
unrar x test.rar 
```
**解释**
>a : 添加到压缩文件    
>-r : 递归处理    
>x : 以绝对路径解压文件    

### zip
压缩文件
```
zip -r test.zip file #-r意味递归处理
```
解压文件
```
unzip test.zip
```

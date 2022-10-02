---
title: linux 入门 
date: 2022-09-29
tag: note
---
# linux杂谈
## 发行版本
首先为读者介绍当前主流的发行版分支：
### Debian分支
Debian 是一个完全由自由软件构成的类 UNIX 操作系统，第一个版本发布于 1993 年 9 月 15 日，迄今仍在维护，是最早的发行版之一。其以坚持自由软件精神和生态环境优良而出名，拥有庞大的用户群体，甚至自己也成为了一个主流的子框架，称为“Debian GNU/Linux”。    
Debian GNU/Linux 也派生了很多发行版，其中最为著名的便是 Ubuntu（官方译名“友邦拓”）。Ubuntu 由英国的 Canonical 公司主导创立，是一个主打桌面应用的操作系统。其为一般用户提供了一个时新且稳定的由自由软件构成的操作系统，且拥有庞大的社群力量和资源，十分适合普通用户使用。
### Red Hat分支
Red Hat Linux 是美国的 Red Hat 公司发行的一个发行版，第一个版本发布于 1994 年 11 月 3 日，也是一个历史悠久的发行版。它曾经也广为使用，但在 2003 年 Red Hat 公司停止了对它的维护，转而将精力都投身于其企业版 Red Hat Enterprise Linux（简称 RHEL）上，Red Hat Linux 自此完结，而商业市场导向的 RHEL 维护至今。    
在 Red Hat Linux 在停止官方更新后，由社群启动的 Fedora 项目接管了其源代码并构筑了自己的更新，演变成了如今的 Fedora 发行版。Fedora 是一套功能完备且更新迅速的系统，且本身计划也受到了 Red Hat 公司的赞助，成为了公司测试新技术的平台。    
虽然 RHEL 是一个收费的、商业化的系统，但是其遵循 GNU 通用公共许可证，因此会开放源代码。编译这些源代码可以重新得到一个可以使用的操作系统，即一个新的发行版：CentOS（Community Enterprise Operating System，社区版企业操作系统）。因为 CentOS 几乎完全编译自 RHEL 的代码，所以其也像 RHEL 一样具有企业级别的稳定性，适合在要求高度稳定的服务器上运行。

2020 年 12 月，CentOS 社区在其博客中宣布未来的重点转向 CentOS Stream，这是一个全新的滚动发行版。在此之前，RHEL 的上游为 Fedora，而 CentOS 的上游为 RHEL；在推出 CentOS Stream 之后，它就成为了 RHEL 的上游发行版。与此同时，CentOS 8 的支持期限被缩短至 2021 年底，且不再推出新的非 Stream 的 CentOS 版本。不满于该决定的人们也组织了新的社区，推出了诸如 AlmaLinux、Rocky Linux 等发行版。


### Arch Linux分支
Arch Linux 是一个基于 x86-64 架构的 Linux 发行版，不过因为其内核默认就包含了部分非自由的模块，所以其未受到 GNU 计划的官方支持。即便如此，Arch Linux 也因其“简单、现代、实在、人本、万能”的宗旨赢得了 Linux 中坚用户的广泛青睐。不过，Arch Linux 对这个宗旨的定义和其它发行版有所区别。通常的操作系统为了方便用户快速上手，都是尽可能隐藏底层细节，从而避免用户了解操作系统的运行知识即可直接使用。但是 Arch Linux 则是重在构建优雅、极简的代码结构，这方便了使用者去理解系统，但不可避免地要求使用者自身愿意去了解操作系统的运作方式。某种程度上说，它的“简单”和“人本”注重的是方便用户通过了解而去最大化地利用它，而不是采取屏蔽工作原理的方式来降低使用门槛。因此，本书不建议初学者直接上手 Arch Linux，但十分推荐在读者对 Linux 有进一步了解之后去探索它。    
Arch Linux 拥有强大的功能，但因其特殊的理念使得用户不易使用。为了能让一般用户也能用上 Arch Linux 的强大功能，它的变种 Manjaro 发行版于 2011 年问世。Manjaro 发行版基于 Arch Linux，但更注重易用，因而更适合一般用户。    

**Tips**:    
建议虚拟机,使用版本[manjaro](https://manjaro.org/download/)        
1.[VMware Workstation Player](https://www.vmware.com/cn/products/workstation-player/workstation-player-evaluation.html)VMware公司为Windows用于非商业用途。

2.[VMware Fusion Player](https://customerconnect.vmware.com/evalcenter?p=fusion-player-personal)
VMware公司为macO平台推出非商用软件。

3.[VirtualBox](https://www.virtualbox.org/wiki/Downloads)甲骨文公司发行的通用虚拟机管理系统，支持 Windows 和 macOS,且遵循GPLv2开源。    
# 命令(基于pacman)
## 利用neofetch查看本机信息
## 安装具体的软件包(Insalling package)
```
# pacman -S package_name1 package_name2 ...
```
而有些情况下，所安装的包属于一个可以同时安装的包组，在进行具体软件包的选择上，除却逐一按照序号输入外，尚可
```
Enter a selection (default=all): 1-10 15 #选择序号1-10和15
Enter a selection (default=all): ^5-8 ^2 #除却5-8和2其余全体
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
删除一个包，保留其全部已经安装的依赖项
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
pacman在删除时会备份重要配置文件，在其后加上*.pacsave扩展名。-n可以避免备份
```
pacman -Rn package-name
```

## 移除安装残留(clening the package cache)
pacman将下载的软件包保存在/var/cache/pacman/pkg中，且不会自动移除旧和未安装版本的软件包。    
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
当然，如果您高度洁癖，可以尝试用pacman命令代替paccache命令进行使用，这回会更加的极端，但显然您的电脑将会得到更高度的清理。    
删除目前没有安装的所有缓存的包，和没有被使用的同步数据库
```
sudo pacman -Sc
```
要删除缓存的所有文件，使用两次-c
```
sudo pacman -Scc
```
## 查询数据包库(querying package databases)
pacman使用-Q参数查询本地软件包数据，-S查询同步数据库以及-F查询文件数据库。    
在数据中-s查询包，查询包括软件包名字及其描述
```
pacman -Ss string1 string2
```
查询包并显示其详细信息-i
```
pacman -Si package_name
```
使用两个-i可以同时显示备份文件和修改状态
```
pacman -Qii package_name
```
查看已安装文件包所含的文件列表-l
```
pacamn -Ql package_name
```
检查软件包安装的文件是否都存在
```
pacman -Qk package_name
```
查询数据库获取某个文件那个软件包
```
pacman -Qo fail_path
```
罗列所有不再作为依赖的软件包
```
pacman -Qdt
```
## 其他指令(additional commands)
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
# 配置(Configuration)
pacman具体配置文件应存在于/etc/pacman.conf,对起进行相应的配置可实现并行下载、显示新旧版本、跳过升级指定包组文件等功能,but在我的Manjaro上没有找到对应的配置文件,只看到了pacman-mirror.conf以及pacman.d,paman,conf等,有待学习。

# 故障排除(Troubleshooting)
## 任务提交失败
### 文件冲突(conflicting files)
错误报告如下
>error: could not prepare transaction    
>error: failed to commit transaction (conflicting files)    
>package: /path/to/file exists in filesystem    
>Errors occurred, no packages were upgraded.    

当遇到以上情况，pacman将不会重写该文件。这是由其设定所决定，为解决该情况，可    
1、查找是否有其他安装包含有该文件名
```
pacman -Qo /path/to/file
```
若有此情况，可提交错误报告
2、若不在其他安装包内包含，可在改名后重新执行更新命令。
3、若你没有通过pacman安装了一个软件，此时必须将软件连同它的所有文件一起移除。利用
```
find /etc /usr /opt | LC_ALL=C pacman -Qqo - 2>&1 >&- >/dev/null | cut -d ' ' -f 5-
```
找出所有不包含在任何包内的文件，进行选择删除。

### 安装包损坏或无效(invalid or corrupted package)
查看/var/cache/pacman/pkg是否含有*.part的文件，这些是未完全下载的文件，删除并重新执行更新。
```
 find /var/cache/pacman/pkg/ -iname "*.part" -delete
```
查看并删除。
## pacman崩溃或者更新失败
建议直接重新装机，不要做无谓的挣扎。
查看损坏的安装包
```
find /mnt/usr/lib -size 0
```
对损坏的安装包进行重装
```
pacman --sysroot /mnt -S package
```
## 其他问题
### error:GPGME error:No data
无法更新包并出现如上代码，尝试
```
rm -r /var/lib/pacman/sync/
```
再次更新
### PackageName: signature from "User <email@archlinux.org>" is invalid
显示如下错误报告
>error: PackageName: signature from "User <email@archlinux.org>" is invalid    
>error: failed to commit transaction (invalid or corrupted package (PGP signature))    
>Errors occured, no packages were upgraded.     

利用
```
sudo ntpd -qg 
sudo hwclock -w
```
矫正系统时间后重试


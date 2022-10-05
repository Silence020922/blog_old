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
## 文件存储结构
![概况](https://surplus-1311636487.cos.ap-beijing.myqcloud.com/file-name.png)
# 装机命令(基于pacman)
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
7.安装截图工具    
这里用到的是flameshot,是一款编辑能力较强的自由截图工具。
```
sudo pacman -S flameshot 
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
## 其他(additional commands)    
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

# 日用命令
## 文档与文件管理
### 简介
>pwd 显示当前工作目录    
>ls 显示工作目录中的文件信息    
>cd file_name 切换工作目录        
>mkdir string 创建空白目录        
>cp 用于复制文件或目录    
>mv 剪切文件或者重命名    
>rm 删除文件或目录    
>rmdir 删除空的文件或目录    
>shred 粉碎文件    
>find 查找文件
### ls
```
ls -a #显示所有文件
ls -l #将文件名、权限、文件型态、拥有者、文件大小等列出
ls -lh #同时显示文件大小    
ls -t #按照更新顺序近到远    
```
### cp
```
cp /* /*
-v #详细显示命令操作过程
-i #若目标文件存在则询问是否覆盖
-f #直接覆盖
-r #递归复制目录和文件
```
### mv
```
mv file_name1 as file_name2 #将文件重命名为name2
mv dir1 dir2 #移动文件
```
### rm
```
rm -rf #递归删除且忽略不存在文件
rm -v #显示详细信息
```
### find
```
find -name ‘’ -delete  #按照名称查找并删除
sudo find .  -ctime -1 #找到一天内，内容变化的文件
sudo find . -atime -1 #找到一天内被访问access过的文件
sudo find . -atime 2 #找到恰为两天
sudo find , -atime +2 #超过两天
-maxdepth -mindepth #设置最大最小目录层级
-size +10 #寻找大于10M大小的文件
！ #取反 
```
## 文档编辑命令
### 摘要
>cat 用于查看纯文本文件，用于其他类型文件查看将会出现乱码    
>tac 如cat,但反向读取文件    
>more 纯文本且内容较多    
>less 纯文本文件可向后翻页    
>head 用于查看纯文本文件前N行    
>tail 检测新内容或查看后N行        
>tr 替换文本文件中字符    
>wc 统计文本行数、字数、字节数    
>stat 查看文件存储、时间信息    
>cut 按列提取文本字符    
>touch 创建文件或设置文件时间    
>sort 排序文件并输出    
>find 查找文件    
>uniq 去除文件中重复行    

### cat
基本语法
```
cat -参数 file_name
cat --help 显示帮助信息
cat --version 显示版本信息
```
参数
```
-n #显示编号
-s #显示编号且多个空行一个编号
-b #显示行数空行无编号
```
### more
在使用more时，如判断非text文件将不执行命令，返回提示，这点与cat不同。同时，more可以执行分屏显示，命令内用space进行翻页操作，具体参数如下
```
-num #指定每行显示的行数
-s #多个空行压缩成一个空行展示
-f #计算实际行数而非自动换行的行数
-p #先清屏再显示文本文件剩余内容
```
当位于命令内部，可执行如下操作
```
space: 显示下一屏的内容
enter: 下辖n行，默认为1
= : 输出当前的行号
ctrl B: 返回上一屏
V: 调用Vi编译器
B: 显示上一屏内容 
```
### less
less可使用pageup与pagedown实现翻页功能。推出此程序按Q键。
```
less -s #显示连续空行为一行
less -S #在单行显示较长内容，而不换行显示
```
命令内部操作
```
b:向后翻一页
d:向后半页
Q:推出less
u:向前滚动半页
y:向前滚动一行
space:滚动一页
enter:滚动一行
```
### head
head -x file-name 仅查看前x行
### tail
tail -x file-name 查看后x行    
对于tail，有多数命令并没有完全搞懂，暂时无用，用得到再查吧。当然， --help仍然可以查官方文档。
### tr
```
tr string1 string2
tr -s #删除所有重复出现的字符序列，保留一个
```

### wc
基本命令
```
wc 参数 文件
```
参数
```
-w:统计字数
-word:只显示字数
-c:统计字节数
-l:统计行数
-lines:只显示列数
-m:统计字符数
-L:打印最长行长度

```
### stat
```
stat -t file-name #以简介方式输出
stat -f file-name #显示文件系统的信息
```
### uniq
注意这里是检查每行的唯一性。
```
uniq -c file-name  #打印每行在文本中出现的次数，并放在每行开头位置
uniq -d file-name #只显示有重复的记录，且出现一次
-u #只显示没有重复的记录
```
## 磁盘管理(不常用)
### fdisk
磁盘分区工具
```
fdisk [参数]
```
>-l 列出指定外围设备分区表状况    
>-b 指定每个分区大小    
>-s 将指定的分区大小输出到标准输出上，单位为区块    
     
当输入
```
sudo fdisk /dev/sda #进入A盘对A进行分区
```
终端内容显示

>Welcome to fdisk (util-linux 2.38.1).    
>Changes will remain in memory only, until you decide to write them.    
>Be careful before using the write command.

>This disk is currently in use - repartitioning is probably a bad idea.    
>It's recommended to umount all file systems, and swapoff all swap    
>partitions on this disk.

```
Command (m for help): m
```
Help:

  DOS (MBR)
```
   a   toggle a bootable flag
   b   edit nested BSD disklabel
   c   toggle the dos compatibility flag
```
  Generic
```
   d   delete a partition #删除已有分区
   F   list free unpartitioned space
   l   list known partition types
   n   add a new partition #创建新分区
   p   print the partition table #打印现有分区信息
   t   change a partition type
   v   verify the partition table
   i   print information about a partition
```
  Misc
```
   m   print this menu
   u   change display/entry units
   x   extra functionality (experts only)
```
  Script
```
   I   load disk layout from sfdisk script file
   O   dump disk layout to sfdisk script file
```
  Save & Exit
```
   w   write table to disk and exit #保存并退出
   q   quit without saving changes #不保存退出
```  
Create a new label
```
   g   create a new empty GPT partition table #创建GPT分区
   G   create a new empty SGI (IRIX) partition table
   o   create a new empty DOS partition table
   s   create a new empty Sun partition table
```
在执行分区命令后可选择reboot重启机器以更新列表，也可选择使用partprobe重新读取硬盘分区表，利用partx -a /dev/sda输出分区查看是否更新完毕。

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
>a : 添加到压缩文件>-r : 递归处理    
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
## 开关机命令
### shutdown
```
shutdown -r #关机后重新启动
shutdown -h now #立刻关机亦可指定其他时间
shutdown -h #默认一分钟后关机若想取消可以用 shutdown -c 进行取消
```
### poweroff
```
poweroff -n #关闭操作系统时不执行sync
poweroff -f #强制关闭
poweroff -i #关闭操作系统前关闭所有网络接口
```
### reboot 
重启计算机

## 查找搜索
### which
用于查找某个系统命令是否存在，或者找出执行命令所对应的具体位置。    
基本语法
```
which 参数 文件
```

### whereis
查找命令所在根文件夹方便进行更改，感觉上和where没什么区别

### df 
查看磁盘使用情况
```
df -k #以KiB为单位，且只显示数字
df -m #以MiB为单位，且只显示数字
df -h #显示单位，且为1024
df -H #显示单位，且为1000
df --hlep #查看帮助文档
```

### top
查看内存使用情况，窗口内信息如下
>PID:当前运行进程的ID
>USER:进程用户
>PR:优先级
>NInice:静态优先级，取值越小
>VIRT:进程占用的虚拟内存
>RES:进程占用的物理内存
>SHR:进程占用的共享内存
>S:进程状态，S-休眠 R-正在运行 Z-僵死 N优先级为负数
>%CPU:占用CPU使用率
>%MEM:使用的物理内存与总内存百分比
>TIME+:该进程累积CPU使用时间
>COMMAND:进程名称
```
top -d x #设定x秒更新一次
top -n 2 #更新两次后退出
top -p 进程号 #监控当前进程的信息
```

窗口内
>z打开/关闭颜色    
>k终止一个进程    
>i忽略闲置和僵死程序    
>m切换显示内存信息    
>t切换显示进程和CPU信息    
### htop
top升级版、支持交互式操作，可利用鼠标选中实现kill进程。打开方式
```
htop + 参数
```
参数信息
```
-u #指定用户
-C #指定单色配色方案
-d #设置更新延迟
### ps
用于显示进程状态，查看部分信息等

单用PS可查看第一列PID编号，配合kill可杀死进程。其基本语法
```
ps 参数
```
参数如下
```
-e #显示所有程序
-f #显示UID PPIP C 与STIME栏位
-ef|grep 进程名称  #搜索名称进程并显示进程信息
-u #指定用户进程

```
交互式界面下
```
space 标记进程
U 取消所有标记
u 呼出侧栏选择查看指定用户
M 按照内存排序
T 按照时长排序
输入数字可查找对应PID进程
```

### pgrep
视为ps与grep的结合体，以输出进程号为主，作用范围不大。
```
pgrep 名称  #输出进程号
```

---
title: 添翼工程
date: 2022-10-23
tag: note
---
# C
### C语言类型
$$ 数据=\left\{
\begin{matrix}
 数值
 \left\{
\begin{matrix}
    长整型int(long)\\
    短整型short\\
    单精度float \\
    双精度double
\end{matrix}
\right.
 \\
 文本字符  char
\end{matrix}
\right.
$$
$$
\left\{
\begin{matrix}
    逻辑类型bool \\
    指针\\
    自定义类型(unsigned无符号类型) 
\end{matrix}
\right.
$$
#### 字符类型(char)
    由字母下划线数字构成且不得以数字开头

```
char c;
c = '1'; #利用单引号表示字符
printf("%d",c) # c = 49 ASCALL值
---
char c;
scanf("%c",&c);
printf("%d\n",c)#将字符转化为ASCALL
```
* 输入输出使用%c    
* "也是一个字符,只能用'表示字符    
* scanf中 "%d %c" 和 "%d%c" 不同
```
scanf("%d %c",&c,&d) #将正确接收12A、12 A、12  A...
scanf("%d%c",&c,&d) #仅接受12A，对于12 A将会将空格作为字符传入d
```
* 字符的计算    
![ASCALL对照表](https://img2018.cnblogs.com/i-beta/1479352/201911/1479352-20191104170445328-1887164546.png)

```
char c;
scanf("%c",c);
printf("%c\n",c+32) #大写变小写
printf("%c\n",c-32) #小写变大写
```
* \ 作为转义字符    
* 块注释/*开头 */结尾    
* 行注释  //    

#### 各类型区别
    int的长度与计算机字长(寄存器可读取or连接CPU和内存的总线可传输的长度)有关
* 输入输出格式化上:%d表示整数类型、%f表示小数类型、%ld表示longlong、%lf表示双精度类型、%e表示科学浮点数    
*  所表达的数据范围不同:     
>char:一个字母    
>short:$-2^{15} \ 到  \ \  2^{15} -1$
>int:$-2^{31} \ 到 \  \ 2^{31}-1$
>float:默认保留6位小数 $10^{-37} \ 到 \ \ 10^{+38}$    
>double:至多保留小数点后16位 $10^{-307} \ 到 \ \ 10^{+308}$
>超出表示范围的浮点数:inf 无穷大；nan 不存在    
* 占用内存空间不同(sizeof)    
char(1B = 8位) > short(2B) > int(4B) > float(4B) >double(8B)    
```
* sizeof
* 用途：计算某个类型或者变量在内存中所占用的字节数    
* 命令：sizeof(类型 or 变量)    
* 示例    
printf('该类型or变量的长度为: %d\n',sizeof( ))
---
char c = 255
int a  = 255
printf("c = %d\n,a=%d\n",c,a) #c = -1,a = 255
---
```
#### 负数的表示
* 使用标志位:以高位0or1代表正or负    
* 取中间数（eg:1 0000 0000)，若比中间数大则正    
* 补码
### 8/16进制数
#### 数字字面量
* 八进制：以0开头    
* 十六进制：以0x开头 （1-9，a-f）
#### 输入输出格式
* 八进制： %o    
* 十六进制：%x or %X    

### 函数
#### sizeof
```
* sizeof
* 用途：计算某个类型或者变量在内存中所占用的字节数    
* 命令：sizeof(类型 or 变量)    
* 示例    
printf('该类型or变量的长度为: %d\n',sizeof( ))
---
```
#### scanf
```
* scanf
* 用途:输入函数
* 命令:scanf("类型",变量)
* 示例
double i 
scanf("i = %lf\n",&i)
print("&.xf\n",i) #.xf为设置输出格式为小数点后x位
```
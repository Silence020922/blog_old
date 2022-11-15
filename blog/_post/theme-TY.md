---
title: C/Cpp
date: 2022-10-23
tag: note
---
## 关于为什么选择这门课(杂谈)
    作为一名平日无所事事的数学系学生，总感觉与社会格格不入，仔细一想是揣了算法一大堆却    
    不知道如何使用，另外半路出家计算机基础也一塌糊涂。于是在开《计算机网络》这本书补基    
    础的同时想搞门编程语言实战一下。由于目的性并不明确，索性报一门课程探索一下。探索期    
    间发现学C还是有一定的收益，后来学了一点C后想既然C++兼容C，干脆学Cpp吧，目前正在开    
    《C++语言程序设计》若以后有时间可以翻一下 C++ primer。      
    由于添翼工程需要提交作业，故将学习过程记录于此。     
## 作业要求之学习截图
![](https://surplus-1311636487.cos.ap-beijing.myqcloud.com/添翼工程-1.jpg)
## C/Cpp 编译器选择-Arch linux
同样利用g++搭配VScode实现对cpp文件的编译。    
VScode下载看[这里](https://aur.archlinux.org/packages/visual-studio-code-bin)，安装完成后在VScode中下载C++插件，写一个cpp文件F5调试即可。
## C/CPP 编译器选择-Win11
贪图方便，直接利用电脑现存的VScode进行环境配置后充当编译器使用，在此采用gcc/g++编译c/c++，VScode相关配置如下：
### MinGW
前往MinGW官网下载对应系统的安装包进行安装。这里要注意的是如果是win系统，下载压缩文件后直接解压缩是不会自动试别系统路径的。在这时我们需要下载完成后首先定位下载位置x:/xx/xx。前往此电脑--属性--高级设置--环境变量--path进行路径添加。    
在上述操作就绪后，以win系统为例。打开电脑cmd窗口输入：
```
gcc -v -E -x c++ - #查看下载位置，复制位置供VScode配置栏目使用
```
### 创建文件夹
首先需要创建一个文件夹，要注意其路径一般不要出现空格、汉字，或以.作为开头，避免windows权限不足无法调用或收获奇怪的报错。如此，这个文件便作为我们日常的工作文件夹，用于储放我们的cpp文件和调试产生的exe文件，在此称文件夹为TEST。
### VScode配置
在TEST目录下创建.vscode文件夹，并创建且完善以下三个文件：    
* 文件1：c_cpp_properties.json
```
{
    "configurations": [
        {
            "name": "Win32",
            "includePath": [
                "${workspaceRoot}",
                // 以下7行需要修改
                "D:/mingw64/include/**",
                "D:/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/8.1.0/../../../../include",
                "D:/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/8.1.0/include/c++",
                "D:/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/8.1.0/include/c++/x86_64-w64-mingw32",
                "D:/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/8.1.0/include/c++/backward",
                "D:/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/8.1.0/include",
                "D:/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/8.1.0/include-fixed"
            ],
            "defines": [
                "_DEBUG",
                "UNICODE",
                "__GNUC__=6",
                "__cdecl=__attribute__((__cdecl__))"
            ],
            "intelliSenseMode": "msvc-x64",
            "browse": {
                "limitSymbolsToIncludedHeaders": true,
                "databaseFilename": "",
                "path": [
                    "${workspaceRoot}",
                    // 以下7行需要修改
                    "D:/mingw64/include/**",
                    "D:/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/8.1.0/../../../../include",
                    "D:/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/8.1.0/include/c++",
                    "D:/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/8.1.0/include/c++/x86_64-w64-mingw32",
                    "D:/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/8.1.0/include/c++/backward",
                    "D:/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/8.1.0/include",
                    "D:/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/8.1.0/include-fixed"
                ]
            }
        }
    ],
    "version": 4
}
```
* 文件2：launch.json    
```
{  
    "version": "0.2.0",  
    "configurations": [  
        {  
            "name": "(gdb) Launch", // 配置名称，将会在启动配置的下拉菜单中显示  
            "type": "cppdbg",       // 配置类型，这里只能为cppdbg  
            "request": "launch",    // 请求配置类型，可以为launch（启动）或attach（附加）  
            "program": "${workspaceFolder}/${fileBasenameNoExtension}.exe",// 这里配合tasks文件生成的路经进行使用
            "args": [],             // 程序调试时传递给程序的命令行参数，一般设为空即可  
            "stopAtEntry": false,   // 设为true时程序将暂停在程序入口处，一般设置为false  
            "cwd": "${workspaceFolder}", // 调试程序时的工作目录，一般为${workspaceFolder}即代码所在目录  
            "environment": [],  
            "externalConsole": true, // 调试时是否显示控制台窗口，一般设置为true显示控制台  
            "MIMode": "gdb",  
 
 
            // 这里的路径需要修改。改成自己的路径
            "miDebuggerPath": "D:/mingw64/bin/gdb.exe",
 
 
 
            "preLaunchTask": "g++", // 调试会话开始前执行的任务，一般为编译程序，c++为g++, c为gcc  
            "setupCommands": [  
                {   
		    "description": "Enable pretty-printing for gdb",  
                    "text": "-enable-pretty-printing",  
                    "ignoreFailures": true  
                }  
            ]  
        }  
    ]  
}
```
* 文件3：tasks.json
```
{
    "version": "2.0.0",
    "command": "g++",
    "args": [
        "-g",
        "${file}",
        "-o",
        "${workspaceFolder}/${fileBasenameNoExtension}.exe"
    ],  \\配合launch中路径使用
    "problemMatcher": {
        "owner": "cpp",
        "fileLocation": [
            "relative",
            "\\"
        ],
        "pattern": {
            "regexp": "^(.*):(\\d+):(\\d+):\\s+(warning|error):\\s+(.*)$",
            "file": 1,
            "line": 2,
            "column": 3,
            "severity": 4,
            "message": 5
        }
    },
    "tasks": [
        {
            "type": "cppbuild",
            "label": "C/C++: g++.exe 生成活动文件",
            "command": "D:\\mingw64\\bin\\g++.exe",
            "args": [
                "-fdiagnostics-color=always",
                "-g",
                "${file}",
                "-o",
                "${fileDirname}\\${fileBasenameNoExtension}.exe"
            ], 
            "options": {
                "cwd": "${fileDirname}"
            },
            "problemMatcher": [
                "$gcc"
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "detail": "调试器生成的任务。"
        }
    ]
}
```
### 测试
于TEST文件中创建test0.cpp文件，录入
```
#include <iostream>
using namespace std;
 
int main(int argc, char const *argv[])
{
    cout << "hello world" << endl;
    system("pause");
    return 0;
}
```
单击F5进行测试，可根据error进一步调试。
## C语言学习
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
printf("%d",c) # c = 49 ASCII值
---
char c;
scanf("%c",&c);
printf("%d\n",c)#将字符转化为ASCII
```
* 输入输出使用%c    
* "也是一个字符,只能用'表示字符    
* scanf中 "%d %c" 和 "%d%c" 不同
```
scanf("%d %c",&c,&d) #将正确接收12A、12 A、12  A...
scanf("%d%c",&c,&d) #仅接受12A，对于12 A将会将空格作为字符传入d
```
* 字符的计算    
![](https://pic1.zhimg.com/80/v2-b040dc2bb679cea471ce66282e92c808_720w.webp)

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

## C艹的学习
### 绪论
参考资料 [网站1](https://en.cppreference.com/)    
#### 二进制的编码表示
* 原码    
概略：符号-绝对值
示例：$X = +0101011 \rightarrow [X]_{原} = 00101011$    
$X = -0101011 \rightarrow [X]_{原} = 10101011$    
特殊：面对带符号的纯小数可以用小数点左一位代表正负    
缺点：零的二义性、运算规则复杂    
* 反码    
概略：对于正数反码与原码相同，负数符号位与原码相同而其他位置取反    
示例：$X = +0101011 \rightarrow [X]_{原} = 00101011 \rightarrow [X]_{反} = 00101011$    
$X = -0101011 \rightarrow [X]_{原} = 10101011 \rightarrow [X]_{反} = 11010100$    
* 补码
模数：如果有n位整数(包括符号位),他的模数为$2^n$,若有n位小数，小数点前为符号位，则模数为2    
概略：负数补码=模数+真值、对于正数补码反码原码相同        
特殊：对于一个负数，补码由该数反码最末尾加一得到。对补码取补码可得到原码    
示例：$X = -0101011 \rightarrow [X]_{原} = 10101011 \rightarrow [X]_{反} = 11010100 \rightarrow [X]_{补} = 11010101$    
优点：采用补码的好处是运算方便。由于符号位可参与运算，可将减法转化为加法运算。    
#### 数的表示范围
一个m位整数，其原码和反码能表示的范围在[$-2^{m-1}-1,2^{m-1} -1$],而对于补码范围 则在[$-2^{m-1},2^{m-1}-1$]    

### 简单程序设计
#### 示例 "Hello,C++!"
```
# include <iostream>
using namespace std;
int main(){
    cout<<"Hello"<<endl;
    cout<<"Welcome to C++"<<endl;
    system("pause");
    return 0;
}
```
main为主函数名，函数体用一对大括号包围。函数是C++中最小功能单位，C++程序有且只有一个名为main的函数，它表示程序开始的点。main前的int表示main函数返回值类型。程序由语句组成，每条语句由分号(;)作为结束符。cout是一个输出流对象，输出操作<<来表达，将紧随其后的双引号中的字符输出到显示器上。endl为换行符。    
\# include 部分为预处理，其中<..>为头文件    
#### 语言概述
**字符集**    
* 关键字    
* 标识符     
>C++标识符中构成规则如下     
>以大小写字母或下划线开始    
>由大小写字母、下划线、数字组成    
>C++关键字    
* 文字    
* 操作符    
* 分隔符    
* 空白    


**注释方法**    
在C++中，注释方法有二，一种是沿用C，利用/* */括住注释文字；另一种是利用 // 将其后至行尾的文字注释掉
#### 基本数据类型和表达式
**基本数据类型**    
C++中基本数据类型包括bool、char、int、float、doule。    
一般情况下对一个整数所占字节数和取值范围没有特殊的要求，使用unsigned int为宜（通常有最高的处理效率 ）     
**转义序列**     
![](https://surplus-1311636487.cos.ap-beijing.myqcloud.com/表2-2.png)      
**变量声明**    
结构:数据类型 变量名1，变量名2，...，变量名n；    
当然，在定义变量的同时可以赋予初值，如：    
    int a(3);  or int a=3;    
**常量声明**    
结构：const 数据类型 常量名=常量值 or 数据类型 const 常量名=常量值    
注意：符号常量的声明一定要在最初赋值，声明后其值无法更改
**运算符**    
* %是取余运算，a%b是a被b除的余数    
* 特殊：C++中有++(自增)，--(自减)函数，自增自减可以放在值前或者后。但注意，当自增自减操作需要配合后续操作前置与后置会有所区别，例如(假设i=1)：
    cout << i++; i自增为2，输出1    
    cout << ++i; i自增为2，输出2    
* 二元运算符：+=，%=，*=...    
* 逗号运算符：
    使用形式：表达式1，表达式2
    如：a=3*5,a*4  最终结果60
* 关系运算符：
    < 小于，<=小于等于，！=不等于，==等于    
* 逻辑运算符：    
    ！(非) &&(与) ||(或)    
* 条件运算符(?)：
    形式：表达式 1?  表达式 2：表达式 3 此时表达式1需为bool类型，若true输出表达式2，否则输出表达式3    
* sizeof 运算符    
* 位运算    
    - 按位与(&)  3(00000011)&5(00000101) = 00000001   将对应二进制位进行逻辑与操作    
    - 按位或(|)  3(00000011)|5(00000101) = 00000111    
    - 按位异或(^)  3(00000011)^5(00000101) = 00000110 若对应位相同返回0对应位不同*返回1    
    -  按位取反(~) ~2    
    -  移位    
* 混合运算时数据类型的转变    
![](https://surplus-1311636487.cos.ap-beijing.myqcloud.com/heightlow.png)
#### 数据的输入和输出
**屏幕输出**
<< 是预定义的插入符，作用在流类对象cout上可简单实现屏幕输出，格式：cout<< 表达式1<< 表达式2...    
例如： 
```
cout<<"a+b="<<a+b
```
**键盘输入**    
```
cin>>表达式1>>表达式2>>... #基本格式    
int a,b; 
cin>>a>>b;
```
#### 算法的控制结构
##### 分支结构   
* 二分类    
```
# include <iostream>
using namespace std;  //导入iostream头文件后需写入
int main() {
    int year;
    bool isLeapyear;

    cout<<"Enter the year:";
    cin>>year;
    isLeapyear = ((year%4==0)&&(year%100!=0))||(year%400==0);

    if (isLeapyear)
        cout<<year<<" is a leap year"<<endl;
    else
        cout<<year<<" is  not a leap year"<<endl;
    system("pause");
    return 0;
}
```
* 多重分支    
    *嵌套if语句*
```
# include <iostream>
using namespace std;
int main() {
    int x,y;
    cout<<"plese input x and y:"<<endl;
    cin>>x>>y;

    if (x!=y)
        if (x>y)
            cout<<"x>y"<<endl;
        else
            cout<<"x<y"<<endl;
    else
        cout<<"x=y"<<endl;
    system("pause");
    return 0;
}
```

*if...else if语句*    
    
*switch*    

```
switch (表达式)
    {   case 常量表达式1:语句1
        case 常量表达式2:语句2

        default:语句 n+1
    }
```

```
# include <iostream>
using namespace std;
int main() {
    int day;
    cout<<"please input 0-6:";
    cin>>day;
    switch (day) {
    case 0:
        cout<<"Sun"<<endl;
        break;
    case 1:
        cout<<"Mon"<<endl;
        break;
    case 2:
        cout<<"Tue"<<endl;
        break;
    case 3:
        cout<<"Wed"<<endl;
        break;
    case 4:
        cout<<"Thu"<<endl;
        break;
    case 5:
        cout<<"Fri"<<endl;
        break;
    case 6:
        cout<<"Sat"<<endl;
        break;
    default:
        cout<<"Day out of range"<<endl;
        break;
    }
    system("pause");
    return 0;
    }
```
##### 循环结构
**while**    
* 语法形式:while (表达式) 语句    
* while和do  while结构在首次判定为真时执行循环相同，但首次判定为假时do while仍会执行一次    
**do while**    
```
# include <iostream>
using namespace std;

int main(){
    int n,right_num;

    cout<<"please input a number:";
    cin>>n;
    
    do {
        right_num = n%10;
        cout<<right_num;
        n /= 10;
    } while(n != 0);
    cout<<endl;
    system("pause");
    return 0;
}
```
**for**    
```
for (初始语句;表达式1;表达式2)
语句
```
* 注意：其初始语句表达式1、2都可以省略但分号不可省略，for(;;)将陷入死循环，表达式1一般是条件
```
# include <iostream>
using namespace std;
int main(){
    int n;
    cout<<"Enter a positive integer:";
    cin>>n;
    cout<<"number "<<n<<" factors ";
    for(int k=1;k<=n;k++){
        if (n%k == 0)
            cout<<k<<" ";
    }
cout<<endl;
    system("pause");
    return 0;
}
```
##### 循环与分支的嵌套
eg：读取一系列整数，输出其正整数和负整数的个数，遇到0则结束程序    
```
# include <iostream>
using namespace std;
int main() {
    int x=0,y=0,n;
    cout<<"Plese enter some integers(enter 0 to quit): ";
    cin>>n;
    while (n != 0){
    if (n<0)
        x += 1;
    else
        y += 1;
    cout<<"Plese enter some integers(enter 0 to quit): ";
    cin>>n;
    }
    cout<<"positive integers :"<<y<<endl;
    cout<<"negative integers :"<<x<<endl;
    system("pause");
    return 0;
}
```
##### 其他
* break : 出现在switch或循环体中，跳出循环结构    
* continue : 可以出现在循环体中，作用为结束本次循环并判断是否继续下一次    
* goto 
#### 自定义数据类型
**typedef**    
typedef 已有 新类别; 其中新类别可以用多个名称识别，如
```
typedef double adc,apc;
adc v;
apc w;
```
**enum**    
enum 枚举类型名 {变量值列表};
```
enum WeekDay{Sun,Mon,Tue,Wed,Thu,Fri,Sat}; //枚举视为常量，创建后无法再次赋值
```
### 函数
#### 函数的定义与使用
**函数的定义**
```
类型说明符 函数名{含类型说明的形式参数表}
[
    语句序列
]
```
**函数的返回值**    
return 表达式    
一方面return将main函数的返回值返回到系统，另一方面return可结束当前函数的调用    
**函数的调用**    
将8位的二进制数转化为十进制数并进行输出    
```
# include <iostream>
using namespace std;

double power(double x,int n){
    double val = 1.0;
    while (n--) {  //实际上是等价于while(n>=0) n--
        val *= x;
    }
    return val;
}

int main() {
    int value =0;
    cout<<"Please Enter an 8 bit binary number : ";
    for (int i=7;i>=0;i--){
        char ch;
        cin>>ch;
        if(ch == '1') 
            value += static_cast<int>(power(2,i)); \\强制数据类型转换
    }
    cout<<"Decimal Value is "<<value<<endl;
    system("pause");
    return 0;
}
```
掷骰子小游戏
```
# include <iostream>
# include <cstdlib>
# include <time.h>
using namespace std;
/*一个简单的掷骰子游戏，第一轮若得7 11 则胜利，2 12 失败，其他情况进
行第二轮，第二轮中若得到与第一轮点数和相同则胜利，和为7则失败，重复直
到结果出现*/
int roll(){  //建立投骰子函数
    int num1 = 1 + rand()%6; //取值 1- 6
    int num2 = 1 + rand()%6;
    int sum = num1 + num2;

    cout<<"Play rolled "<<num1<<"+"<<num2<<"="<<sum<<endl;
    return sum;
}

enum GameStatus {WIN,LOSE,PALY};
int main(){
    int sum,myPoint;
    GameStatus status;
    srand((unsigned)time(NULL));  //传入随机种子
    cout<<"game start"<<endl;

    sum = roll();
    switch (sum)
    {
    case 7 /* constant-expression */:
    case 11:
        status = WIN;
        break;
    case 2:
    case 12:
        status = LOSE;
        break;
    default: //游戏暂时无果
        myPoint = sum;
        cout<<"Now you can't win until you could roll "<<myPoint<<endl;
        status = PALY;
        break;
    }

    while(status == PALY){
        sum = roll();
        if(sum == myPoint)
            status = WIN;
        else if(sum == 7)
            status = LOSE;
    }
    if(status = WIN){
        cout<<"Player win"<<endl;
    }
    else
        cout<<"Player lose"<<endl;
    system("pause");
    return 0;
}
```
从n个人中选出k个的组合数
```
# include <iostream>
using namespace std;
int comm(int n,int k){
    if (k>n)
        return 0;
    else if (k==n||k==0)
        return 1;
    else 
        return comm(n-1,k-1) + comm(n-1,k);
}

int main(){
    int n,k;
    cout<<"Please enter two integers n and k: ";
    cin>>n>>k;
    cout<<"C(n,k) = "<<comm(n,k)<<endl;
    system("pause");
    return 0;
}
```
**函数值得传递**    
解释:函数具有形参和实参，在函数为被调用时，形参不占有实际内存空间，也没有实际的 值，只有被调用时才为其分配存储单元，并将实参与形参结合。函数参数传递分为值传递和引用传递。    
* 值传递    
此时若将t=a，a作为实参值会改变t形参值，但是单项作用，并不会对实参产生影响。在这种情况下，`int a(3),b(5); int t;t=a;a=b;b=t;`将不会更改ab的值。    
* 引用传递    
    - 声明引用`int &ri=i` 声明引用ri同时进行初始化指向已存在的变量i    
    - 而将引用作为形参时，对其任何直接操作也会作用于实参，如：
```
# include <iostream>
using namespace std;
void  swap(int &a,int &b ){ //利用 & 创建引用变量
    int t = a;
    a = b;
    b = t;
}
int main(){
    int x,y;
    cout<<"enter two integers x and y: ";
    cin>>x>>y;
    swap(x,y);
    cout<<"now  x = "<<x<<endl<<"now  y = "<<y<<endl;
    system("pause");
    return 0;

}
```
#### 内联函数
* 语法：`inline 类型说明符 函数名(){}`    
* 特点：对于一些功能简单、规模较小又使用频繁的函数可以设定为内联函数。在编译时编译器会直接将函数代码放于调用处，可以减少参数传递所消耗的时间。注意在部分编译器中当定义函数大于一行将自动忽视`inline`命令。    
#### 带默认形参值的函数
在定义函数时可以设置默认值，调用时若给出实参则使用实参值，否则自动填充默认值。注意，在定义默认值时需要放于最后，即    
`int add(int x,int y = 2,int z = 0);` √    
`int add(int x,int y=2,int z );` ×
#### 函数重载
* 理解:在定义函数时有些情况下为方便我们将会定义重名函数，例如对于浮点数加法与整数加法若分开定义则过于繁琐，在调用时，编译器可根据参数自动选取最适合的函数。
### 类与对象
    在我们熟悉的现实世界中，一切事物皆为对象
#### 类和对象
**类的定义**    
```
class 类名称
{
    public:
        外部接口
    protected:
        保护型成员
    private:
        私有成员
};
```
例如，当我们创建一个时钟类
```
#include <iostream>
using namespace std;
class clock{
    public:
        void setTime(int H,int M,int S);
        void showTime();
    private:
        int hour,minute,second;
    
};
```
**类成员访问控制**    
访问权限有以下三种：公有类型(public)、私有类型(private)、保护类型(protected)    
公有类型是类的外部接口，外部只能通过公有类型来观察了解类，如通过setTime改变事件和showTime显示时间    
私有类型只能被类中函数访问，保证了数据的安全性。    
 **对象**    
 声明一个对象和变量的方式相同，为`类型名 对象名`    
 访问对象成员采用操作符`.`，例如`clock myclock;`,`clock.shouTime()`    
 **类的成员函数**    
 函数的原型声明要写在类体中，但其具体实现写于类体之外，与普通函数不同在于，在实现成员函数要表明类的名称如`void clock::showTime()`    
 * 同样成员函数有默认值的设定和内联函数    
 * 内联函数分为隐式声明(直接放于类体内)和显式声明    
 
 **示例**
```
#include <iostream>
using namespace std;
class clock{
    public:
        void setTime(int H= 0,int M = 0,int S = 0); //设置函数初始值
        void showTime();
    private:
        int hour,minute,second;
    
};
void clock::setTime(int H,int M, int S){
    hour = H;
    minute = M;
    second = S;
}
inline void clock::showTime(){
    cout<<hour<<":"<<minute<<":"<<second<<endl;

};
int main(){
    clock myclock;
    int x,y,z;
    cout<<"the priminal set is "<<endl;
    myclock.setTime();
    myclock.showTime();
    cout<<"you could set time as h/m/s "<<endl;
    cin>>x>>y>>z;
    myclock.setTime(x,y,z);
    cout<<"Now the time is "<<endl;
    myclock.showTime();
    system("pause");
    return 0;
}
```
#### 构造函数
构造函数存在于类体中，在上例clock定义中未定义构造函数，此时系统会自动生成一个空函数，`clock(){}`，要注意，若在类体定义中给出构造函数和形参需在创建对象时填写对应参数，例如，若给出
```
class clock{
    public:
        clock(int h,int m ,int s);
    ......
}
```
则在之后定义类对象时需使用`clock time(x,y,z)`参数则成为了必需品，利用这个特点，可完成重载函数调用， 例如若同时给出`clock(){hour = 0;minute = 0;second=0;}`和`clock(int h,int m,int s)`则在调用`clock a`则会自动选择2
**~~复制构造函数~~**    
声明和复制构造函数的一般方法 
```
class 类名
{
    public:
        类名(形参表);
        类名(类名 & 对象名); //复制构造函数
        ...
}
类名::类名(类名 & 对象名); //复制构造函数的实现
{函数体
}
```
示例
```
class point{
    public:
        point(int xx=0,int yy=0){
            x = xx;
            y = yy;
        }
        point(point &p);
            int getX(){
                return x;
            }
            int getY(){
                return y;
            }
    private:
        int x,y;
};

//成员函数的实现
point::point(point &p){
    x = p.x;
    y = p.y;
    cout<<"Calling the copy constructor"<<endl;
}
// 形参为point类的函数
void f1(point p){
    cout<<p.getX()<<endl;
}
//返回值为point类的函数
point f2(){
    point a(1,2);
    return a ;
}
int main(){
    point a(4,5);
    point b  = a;//在利用a初始化b调用复制构造函数
    cout<<b.getX()<<endl;
    f1(b); //在b作为f1的实参时，调用复制构造函数
    b = f2();//函数返回值为类的对象，调用复制构造函数
    cout<<b.getX()<<endl;
    return 0;

}
```
#### 前向引用声明
在C++中一般我们需要完整的定义一个类之后再去使用它，但不排除有时候我们需要互相引用。如
```
class A { 
    public: 
        void f(B b);  //尚未定义B 会报错
};
class B{
    public:
        void g(A a);
};
```
需要在class A 上一行加入 class B，前向引用声明
#### UML简单标识认识
* 类由一个矩形表示，分为三部分，最顶上为类名，数据成员于中层，函数成员位于底层    
* 静态数据成员往往在数据成员下加下划线表示    
* 除了类名部分其他部分可不显示    
* UML中数据成员语法`[访问控制属性] 名称 [重数] [:类型][=默认值] [{约束特征}]`    
* [访问控制属性]包括public(+),private(-),protected(#)    
* 约束特征:例如`{只读}`说明其只有可读属性    
* 函数成员的语法:`[访问控制属性] 名称[(参数表)][:返回类型][{约束特征}]`    
* UML中一个矩形代表一个对象，对象名字需加下划线。对象名位于图形上部，格式为`对象名:类名`    
**几种关系**    
* 依赖关系:UML图形把依赖关系绘制为一条指向被依赖的事物的虚线    
* 作用关系——关联：利用实线及重数，重数A代表对方对象B向A中多少对象发生作用     
* 包含关系——聚集和组合：聚集为空心菱形，组合为实心。    
* 继承关系——泛化：带三角形的直线，三角的一个尖指向父类，对边上的线指向子类    
#### 联合体
联合体可以定义多个变量成员，但同时只能有一个是有意义的，例如，使用联合体保存成绩信息，并输出。
```
# include <iostream>
# include <string>
using namespace std;

class ExamInfo{
    public:
    ExamInfo(string name,char grade):name(name),mode(GRADE),grade(grade){};
    ExamInfo(string name,bool pass):name(name),mode(PASS),pass(pass){};
    ExamInfo(string name,int percent):name(name),mode(PERCENTAGE),percent(percent){};
    void show();
    private:
        string name;
        enum {GRADE,PASS,PERCENTAGE}mode; //定义枚举变量 与定义枚举类型 enum mode {}区别
        union 
        {
            char grade;
            bool pass;
            int percent;
            /* data */
        };
};
    void ExamInfo::show(){
        cout<<name<<":";
        switch (mode)
        {
        case GRADE/* constant-expression */:
            cout<<grade<<endl;/* code */
            break;
        case PASS:
            cout<<(pass?"PASS":"FALL")<<endl;
            break;
        case PERCENTAGE:
            cout<<percent<<endl;
        default:
            break;
        }
    }
    int main(){
        ExamInfo course1("English",'A');
        ExamInfo course2("Chinese",true);
        ExamInfo course3("Math",100);
        course1.show();
        course2.show();
        course3.show();
        system("pause");
        return 0;
    }
```
#### 综合示例
```
# include <iostream>

# include <cmath>

// 做一个个人银行账户存储管理系统

using namespace std;

class Savingaccount{

private:

    int id; //账号

    double balance; //余额

    double rate; //利率

    int lastDate;  //上次余额变更日期

    double accumulation;  //余额累加之和

    void record(int date,double amount); //记录一笔账

    double accumulate(int date) const{  //对余额进行日累计，获得指定日期为止的余额累积。利用一年中的日平均求年利息

    return accumulation + balance*(date - lastDate);

    };

public:

    Savingaccount(int date,int id,double rate);  //创建构造函数

    int getID(){return id;}; //返回id

    double getBalance(){return balance;};  //返回当前余额

    double getRate(){return rate;};  //返回年利率

    void show(); 

    void deposite(int date,double amount); //存入

    void withdraw(int date,double amount); //取出

    void settle(int date); //结算利息

};

//Savingaccount类函数的实现

Savingaccount::Savingaccount(int date,int id, double rate)

    :id(id),balance(0),rate(rate),lastDate(date),accumulation(0){

        cout<<date<<"\t"<<id<<"\t"<<"is create"<<endl;

}

void Savingaccount::record(int date,double amount){

    accumulation = accumulate(date);

    lastDate = date;

    amount = floor(100*amount+0.5)/100; //四舍五入的保留两位小数

    balance += amount;

    cout<<id<<"\t"<<date<<"\t"<<amount<<"\t"<<balance<<endl;

}

void Savingaccount::deposite(int date,double amount){

    record(date, amount);

}

void Savingaccount::withdraw(int date ,double amount){

    if (amount > balance){

        cout<<"your account has not enough money";

    }

    else

    {record(date,-amount);}}

void Savingaccount::settle(int date){

    double interest = accumulate(date)*rate/365;

    if(interest != 0)

        record(date,interest);

    accumulation = 0;   

}

void Savingaccount::show(){

    cout<<"#"<<id<<"\tBanlance: "<<balance<<endl;

}

int main(){

    Savingaccount zero(1,5369845,0.015);

    zero.deposite(5,5000);

    zero.deposite(45,5500);

    zero.settle(90);

    zero.show();

    system("pause");

    return 0;

}
```
#### other
* 位域    
在各种基本数据类型中，长度最小的char和bool在内存中占据一个字节。但对于某些数据几个二进制位就可以解决。例如，对于一个枚举`enum Example{A,B,C,D}; `此时两个二进制位便可以表示。而对Example定义一个类型变量至少需要一个字节(8个二进制位)，为了解决该问题，C++允许在类中声明位域，语法`数据类型说明符 成员名:位数;` 需要注意的是
> * 只有int、bool、enum、char的成员才能定义位域     
> * 对于打包方式C++并没有特殊规定，这会导致在不同编译器下执行的操作有所不同    
> * 定义位域会导致打包和解包等额外操作，可能耗费时间    
### 数据的共享与保护
#### 标识符的作用域和可见性
**作用域**     
作用域即标识符在程序正文中有效的区域    
* 函数原型作用域    
我们在声明函数原型时需要同时规定形参类型，例如`int add(int a,int b);`此时a就仅作用于()之间。    
*  局部作用域    
一般来说在函数体形参声明中声明的标识符作用到函数体结束。且在一些块中，如if，函数体中声明的形参都会作用到块结束。    
* 类作用域(先鸽了)    
* 命名空间作用域    
命名空间顾名思义就是该名称只此空间范围内有意义。在开发过程很多模块可能分专人负责，这就导致不可避免地命名重复。    
命名空间的语法
```
namespace 命名空间名{
    命名空间内的各种声明{函数声明、类声明...}
}
```
命名空间决定了作用域，在该空间内如需要调用其他空间的标识符，需要 `其他空间名::标识符名` 总这样使用会使得限定冗长，可使用 `using`语句
```
using 命名空间名::标识符名; //将该标识符暴露于当前空间可直接调用
using namespace 命名空间名;  //将空间内所有标识符都暴露于当前空间
```
命名空间允许嵌套`namespace A{namespace B{class C{...};}}`此时调用C需要`A::B::C`    
**可见性**    
规则一般如下    
- 标识符声明在前 调用在后    
- 同一作用域不能有同名标识符    
- 无互相包含关系的不同作用域中声明互不干涉    
- 包含关系若具有同名则外层不可见    
#### 对象的生存期
* 静态生存期(若对象的生存期与程序运行期相同)    
命名空间作用域中定义的对象都具有静态生存期，函数体中可利用关键字`static`    
* 动态生存期(除了上述两种情况外)    
#### 类的静态成员
    先插入一段杂谈，近期赶各种DDL赶到不行，一方面是专业课的作业，一方面是入党
    材料提交，再加上最近转了半天转回了最熟悉的python搞了点东西，学习进度极慢。

**需求点**    
静态成员主要面向同一类不同对象的数据和函数共享问题。举个例子，例如我们定义了一个员工类`class Employee`，想要统计员工数量，若我们采用类定义之外的函数进行统计，则无法实现数据的隐藏，而若定义类体之内，则面临各个对象都将存有该数据导致冗余且易出现更新不同步的现象。    
**静态数据成员**    
如果某个属性为整个类所共有而不为任何具体对象所有，则采用static关键字声明为静态成员。    
静态成员在每个类中仅有一个副本，如此该类的所有对象将共同维护和使用，并实现不同对象的数据共享。    
由于并不属于某个具体对象，故通过`类名::标识符`进行访问。
```
# include <iostream>
using namespace std;

class point{
    public:
    point(int x=0,int y=0):x(x),y(y){
        count++;
    }
    point(point &p){ //复制构造函数 
        x = p.x;
        y = p.y;
        count ++;
    }
    ~point(){count--;} //用于减少一个计数
    int getX(){return x;}
    int getY(){return y;}
    void showCount(){
        cout<<"Object count = "<<count<<endl;
    }
    private:
        int x,y;
        static int count; //设置静态变量

};
int point::count = 0; //利用类名限制进行初始化     

int main(){
    point a(4,5);
    a.showCount();
    point b(a);
    b.showCount();
    system("pause");
    return 0;
}
```
**静态函数成员**    
静态函数成员同样利用关键字static，但作为静态函数，访问非静态数据只能通过对象来访问，故其作用一般用于访问同一个类的静态数据成员。    
#### 类的友元
**需求点**    
一方面，在程序调用上其他类无法直接访问该类私有成员将产生不便，另一方面有时一个函数不属于两对象或该类，无法简单存放于某类之中。    
**友元函数**    
利用friend关键词修饰非成员函数，使其具有访问类中私有数据。例如，计算两点间的距离
```
# include <iostream>
# include <cmath>
using namespace std;

class point{
private:
    int x,y;
public:
    point(int x=0,int y=9):x(x),y(y){};
    int getX(){return x;}
    int getY(){return y;}
    friend float dist(point &a,point &b);
};
float dist(point &p1,point &p2){
float x = p1.x - p2.x;
float y = p1.y - p2.y;
return static_cast<float>(sqrt(x*x+y*y)); //
};
int main(){
    point a(1,2);
    point b(4,3);
    cout<<dist(a,b)<<endl;
    system("pause");
    return 0;
}
```
**友元类**    
若A为B友元类，则A类所有成员函数都是B的友元函数。
#### 共享数据的保护
我们一般将既需要共享又不可改变的数据声明为常量，利用const关键字修饰。    
**常成员函数**    
`类型说明符 函数名(参数)const` 常对象只能调用他的常成员函数，而无论是否通过常对象调用常成员函数，在函数调用期间该对象视为常对象。const也可用于重载函数的区分，对于无需改变对象状态的函数都应使用const。    
**常数据成员**    
类成员中的静态变量和常量都应在类外进行定义。    
**常引用**    
const 类型说明符 &引用名; 在不需改变其值的参数，传递常引用为宜。\

#### 外部变量与外部函数
利用`extern`关键字进行声明，可引用外部文件中的函数或变量。    
而避免重名情况，一般我们希望将其限制在编译单元内，在匿名空间中定义的变量和函数不会暴露给其他编译元。

#### 编译预处理
```
# include <头文件> or "文件名"
# define 符号 (值)  定义符号常量
# undef
```
**一些条件编译指令**
```
# ifndef str1 //如果没有定义str1
# define str1 3
# endif
```
#### 综合实战演练
```
// account.h
#ifndef _ACCOUNT_H_  //避免重复引用文件导致类名冲突
#define _ACCOUNT_H_
class  Savingaccount
{
private:
    int id;
    double balance; //账户余额
    double rate;
    int lastDate;
    double accumulation;
    static double total; //类静态成员,银行总金额
    void record(int date,double amount);
    double accumulate(int date) const{
    return accumulation + balance*(date - lastDate);
    };
public:
    Savingaccount(int date,int id,double rate); //构造函数
    double getBalance() const {return balance;}
    int getId() const {return id;}
    double getRate() const {return rate;}
    void show() const;
    void deposit(int date,double amount);
    void withdraw(int date, double amount);
    void settle(int date); //结算利息函数，每年调用一次
    static double getTotle () {return total;}
};
#endif //_ACCOUNT_H_

```
```
//account.cpp
#include <iostream>
# include <cmath>
# include "account.h"
using namespace std;

double Savingaccount::total = 0;
Savingaccount::Savingaccount(int date,int id,double rate):lastDate(date),id(id),rate(rate),balance(0),accumulation(0){
    cout<<date<<"\t#"<<id<<" is created"<<endl;
};
void Savingaccount::record(int date,double amount){
    accumulation = accumulate(date);
    lastDate = date;
    amount = floor(100*amount+0.5)/100; //实现四舍五入
    balance += amount;
    total += amount;
    cout<<date<<"\t#"<<id<<"\t"<<amount<<"t"<<balance<<endl;
}
void Savingaccount::withdraw(int date,double amount){
    if (amount > getBalance())
    {cout<<"sorry,you don't have enough money"<<endl;}
    else
    record(date,-amount);
}
void Savingaccount::deposit(int date,double amount){
    record(date,amount);
}
void Savingaccount::settle(int date){
    double interest = accumulate(date)*rate/365;
    if (interest != 0)
    {record(date,interest);
    accumulation = 0;}
}
void Savingaccount::show() const{
    cout<<lastDate<<"\t#"<<id<<"\t"<<balance<<endl;
}

```
```
//main_file.cpp
# include "account.h"
# include <iostream>
using namespace std;
int main() {
    Savingaccount t0(1,21325302,0.015);
    Savingaccount t1(1,58320212,0.015);
    t0.deposit(5,5000);
    t1.deposit(25,10000);
    t0.deposit(45,5500);
    t1.withdraw(60,4000);
    t0.settle(90);
    t1.settle(90);
    t0.show();
    t1.show();
    cout<<"Total: "<<Savingaccount::getTotle()<<endl;
    return 0 ;
}
```
#### 如何使用VScode调试多个cpp文件
在使用过程中无意发现如果直接F5执行调试，VScode将仅进行该cpp文件，原因是在task文件中，任务默认执行{file}。只需要将{file}更改为{fileDirname}/*.cpp通配该文件目录下所有cpp文件可解决这个问题。
```
{
    "tasks": [
        {
            "type": "cppbuild",
            "label": "C/C++: g++ build active file",
            "command": "/usr/bin/g++",
            "args": [
                "-fdiagnostics-color=always",
                "-g",
                "${fileDirname}/*.cpp",
                "-o",
                "${fileDirname}/${fileBasenameNoExtension}"
            ],
            "options": {
                "cwd": "${fileDirname}"
            },
            "problemMatcher": [
                "$gcc"
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "detail": "Task generated by Debugger."
        }
    ],
    "version": "2.0.0"
}
```
#### other
在本章提到的常函数成员，旨在不改变对象状态时进行声明以确保数据安全性。在有些情况下，常函数会对对象属性的值发生变化但却并不改变对象的状态。例如，在line类中，
```
class line{
    public:
    double getLen();
    line(const Point &p1,const Point &p2):p1(p1),p2(p2),len(-1){};
    private:
    Point p1,p2;
    double len;
}
double line::getLen(){
    if (len<0){
        double x=p1.getX() - p2.getX();
        double y=p1.getY() - p2.getY();
        len = sqrt(x*x + y*y);}
    return len;

}
```
我们将len属性放在getLen中进行求解，这样如果len不被需要我们可以省去计算距离的时间。为避免重复计算,getLIne将计算值储存到len中。    
此时getLine()并不会改变对象的状态(由于两点便会确定直线，而getLine并没有使对象直线本身发生变化)，但此时定义`getLine() const`则会报错，原因是将对象的值len发生了改变。针对这种情况可使用mutable关键字，`mutable len`就可以将getLine()声明为常成员函数了。
### 数组、指针、字符串
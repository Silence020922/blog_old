---
title: 计算机入门——添翼课程
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

## C/CPP 编译器选择
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



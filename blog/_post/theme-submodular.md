---
title: submodular function 初步
date: 2022-10-12
tag: note
---
>本人为某末流大学的本科生，对该方面不甚了解，本文浮于表面，仅供了解。
# 杂谈
## 对次模函数的了解？
次模函数在通常意义下，与边际效益递减函数等价。指在一般情况下在其他投入固定不变时，连续地增加某一投入，所新增的产出或收益反而会逐渐减少。    
举例来看，当你恨饿的情况下，吃一盘菜，或许你第一口、第二口会得到极大的满足，但接下来，同样的菜，给你带来的满足感会逐渐减少。当然，这也是为什么你觉得你对女朋友的爱不减当年但她总怀疑你是不是不爱她了的原因。    
## 研究思路
在经典次模分析中，我们一般默认空间为布尔空间，但由于格(lattice) 除了阶(orders)的概念外，还具有其他的性质。例如向量空间、拓扑空间、范数空间、度量空间、解析空间等。于是，我们在研究格上的meet-join时，将其转化到$R^{n}$空间，以此使得更多领域的知识得以运用。
## 寻找平衡？
>万物存在于均衡之间    

寻找何种平衡呢，简单来说就是在加条件上选择平衡。条件加的多了，自然可以在学术上做出很漂亮的结论，但同时现实情况或许会难以"套用"。所以，尽管现在很多人在研究各种扩域上的sub，但由于经典sub约束不强应用范围广还是值得关注的。搞搞离散凸分析玩玩就算了。
## 作何用途？
次模函数在经济学领域及优化、数据挖掘、机器学习、博弈等方面有很多的应用。可见，研究次模的人从各个领域来。    
> 亚模\超模是量化任意格中边际效用递减\递增直观的一种方法    
> 利用凹凸性量化任意凸向量空间中边际效益递减\增加的另一种直观方法    
## 简例？
举一个二次型的例子简单的说明次模、超模、凸凹性    
>$f(x) = x^{T} \sum x$,$\forall$ x $\in R^n$    
> 利用凸二次函数来说明sub和sup    
>考虑n个资产的投资组合x $\in$ $R^n$ ,其协方差矩阵 $\sum$ $\geq$ 0 (这里我们假设允许卖空和举债经营，且资产是可分的)则w方差为    
>$\sigma ^2(x) = x^{T} \sum x , \forall x \in R^n$    
>当然，我们知道其所有非对角线元素$\leq$0，这等价于$x^{T} \sum x$ 为一个次模    
>对于投资组合x的标准差(standard deviation)，x$\in$$R^n$,for $\sum$ > 0 ,$\sigma$(x) : $[0,1]^n \rightarrow R_{+}$ is sub $\Leftrightarrow$ either $\sum$ is diagonal or n=2    
>对于不可见财产情况，标准差 $\sum$ $\geq$ 0 ,$\sigma$(x) : $B^n \rightarrow R_{+}$ is sub either one of the following :    
>
>> $\sum$ = I or $\sum$ = $1 1^T$ or $n =2$ 

# 正文
## 定义介绍
>在这里提到了三个定义，分别为submodular function,decreasing differences(DD),diminishing returns(DR),在经典次模理论中是不加区分的，但若是在$R^{n}$仍需注意。且此后，若提及次模函数且不说明其定义域的情况，一概判定为耍流氓。同时，注意值域中是否含有±∞和其有(无)限维的问题    

### submodular
A function f : $L$ $\rightarrow$ $R$ from a lattice (L,$\leq$) to the real-line is submodular if:

$f(x) + f(y) \geq f(x \bigwedge y) + f(x \bigvee y),\forall x,y \in L$    

where:

$x \bigwedge y = \underset{L}{inf} \{x,y\} = sup\{z:z \leq x, z \leq y \} \in L$(meet)    
$x \bigvee y = \underset{L}{sup} \{x,y\} = inf\{z: x \leq z , y \leq z \} \in L$ (join)    

> 在boolean lattice $B^n$ 中也可定义 $f(A \cup B) + f(A \cup C) \geq f(A) + f(A \cup B \cup C)$
### DD
A function $L^{n} \rightarrow R$ has decresing differences, if $\forall x \in L^n$ and distinct $i,j \in \{1,...n\}$ ,we have    
$f(x_{-ij},x_{i}^{H},x_{j}^{H})-f(x_{-ij},x_{i}^{L},x_{j}^{H}) \leq f(x_{-ij},x_{i}^{H},x_{j}^{L}-f(x_{-ij},x_{i}^{L},x_{j}^{L})$    
where $x_{i}^{H} \geq x_{i}^{L} , x_{j}^{H} \geq x_{j}^{L}$
 
### DR
A function f: $L^n \rightarrow \  R \ is \ DR \ if \forall x,y \  \in \  L^n \  with \  x \leq y \ and \ a_{i} \in L_{+}$:    
$f(x + a_{i}e_{i}) - f(x) \geq f(y + a_{i}e_{i}) - f(y)$

### submodular DD DR 
function f $L^n \rightarrow R$    
* 当L为全序(chain）,我们可以说 DD $\Leftrightarrow$ submodular        
> $\forall x_1 \geq y_1 \ and \ y_2 \geq x_2$    
> $y = (y_1,y_2) ; x = (x_1,x_2)$    
> $x \bigvee y = (x_1,y_2); x \bigwedge y =(y_1,x_2)$    
>$f(x) + f(y) \geq f(x \bigwedge y) + f(x \bigvee y)$ $\rightarrow$ $f(x_1,x_2) + f(y_1,y_2) \geq f(x_1,y_2) + f(y_1,x_2)$    submodular    
>$f(x_{-ij},x_{i}^{H},x_{j}^{H})-f(x_{-ij},x_{i}^{L},x_{j}^{H}) \leq f(x_{-ij},x_{i}^{H},x_{j}^{L}-f(x_{-ij},x_{i}^{L},x_{j}^{L})$ $\rightarrow$ $f(x_1,y_2) - f(y_1,y_2) \leq f(x_1,x_2 ) -f(y_1,x_2)$    DD    
>in this condition DD $\Leftrightarrow$ submodular
* 对于经典格(boolean lattice),有 DR-submodularity $\Leftrightarrow$ lattice submodularity    
*notice*    
* 在很多情况下， 比如格的乘积空间而不是链的乘积空间，此时submodular是比DD更强的条件。那么我们自然要考虑一般情况下DD+？ $\Leftrightarrow$ lottice submodular     
>事实上我们有    
> DD+f is submodular in L $\Leftrightarrow$ f is submodular in $L^n$            
* 在$Z^n$ 和 $R^n$ 空间中，DR-submodularity 要强于 lattice submodularity (参考 单调函数是模但不是DR模)    
> 注意的是，在一般情况$L^n$下,DR与sub并没有明显的包含关系。
### 定义域
对于submodular function 经典定义自然是在$B^n$={0,1$\}^{n}$,有时我们根据需要，会将其延拓至$Z^n$,或$R^n$。这里要意识到，我们在$R^n$上研究所得的性质在其子空间内仍然适用，于是很多充分条件可移至更"大"的空间中利用其他领域的知识加以证明。
### $R^n$ 上的submodular 初识
#### taylor expansion
首先可以利用的一个工具自然是最熟悉的taylor expansion    
there exists an $\epsilon$ $\in$ [0,1] st:    
in the first order : $f(x \bigvee y)= f(x+(y-x)^{+})=f(x)+ < \bigtriangledown f(x + \epsilon (y-x)^{+}),(y-x)^{+} >$    
in second order :$f(x \bigvee y) = f(x) + < \bigtriangledown f(x),(y-x)^{+} > + \frac{1}{2} ((y-x)^{+})^{T} \bigtriangledown^{2} f(x+ \epsilon (y-x)^{+} )(y-x)^{+}$    
#### 一些判别准则
if f(x) is differentiable on $R^n$ ,then     
f DD $\Leftrightarrow$  $\frac{\partial f(x)}{\partial x_i}$ 对任何j $\neq$ i 满足一阶偏导单增(等价于其海森矩阵除对角线外小于等于零)    
f DR  $\Leftrightarrow$  $\frac{\partial f(x)}{\partial x_i}$  对 $\forall$i,j成立。
## 面向问题
### 大略杂谈
#### 优化问题(optimization problem)
首先想到的自然是优化问题，对于**一般的优化问题**，能够将值域拓展到无穷，带来的好处首先是可以将定义域放到全空间，这将会为我们带来极大的方便。    
对于一个一般的优化问题:    
$\underset{x \in F}{min} f(x)$ 其中f为从$F$映到$R$的一个实值函数。$F$ of $L$    

>解决问题的困难程度一般取决于 (a) $f$目标函数 (b)$F$可行域    

而对于**连续优化**的问题，在将值域拓展到R + ∞ 紧致空间后，利用泛函分析等知识可以进一步研究下列问题:    
>最优解存在性    
>对偶理论    
>稳定性    
>灵敏度    
>单调性    
>具体算法对计算效率的影响    
>近似算法    

再进一步，对于**次模(超模)函数的优化**问题,考虑其min\max问题(min 要比 max的研究更为简单)，研究    
> 何时存在精确解    
> 何时可近似求解

此外，针对**参数优化**问题    
$f^* (t) = \underset{x \in S(t)}{inf} f(x,t)$    
$x^* (t) = arg \underset{x \in S(t)}{inf} f(x,t)$    
>其中 x为决策变量，t作为参数    
>参数优化问题占有很大的分量，经济学上的寻找纳什平衡点与参数优化问题密不可分    
 
 对该类问题需研究:
 >何时 $f^*$(t) 为 sub    
 >何时 $x^*$(t) 对于参数t是单调的    
 >关于t的参数函数是否具有先前f的性质

#### 不动点理论(fixed-point theorem)
这里的不动点不同常规定义——$x = f(x)$，其映射不动点定义如下:    
>if f(x) : X $\rightarrow$ $2^X$ is a correspondence\mapping, then x is a fixed-point of f if  
>    x $\in$ f(x)    

对于不动点理论一般研究f和X在何种情况下具有不动点。

#### 非合作博弈(Non-cooperative supermodular game)
一个非合作博弈可利用三元数组<N,S,f>,玩家数量n=|N|；S为联合策略集；f为收益函数，更进一步，$f_{i} (x_{i},x_{-i})$ 表示的玩家i收益    
对于非合作博弈我们感兴趣的是何时具有纳什平衡点。
#### 合作博弈(cooperative game with side payments)
一般用数对(E,f)，其中E={1，2...n}，为player集合，一般为有限，f为实值特征函数，$f: 2^E \rightarrow R$。    
合作博弈的核心在于至少我们应该满足以下条件:    
>$B(f) = \{ x: x(E) = f(E), x(S) \leq f(S), \forall S \in E \}$
>其中 x(S)可理解为每个人单独去做的费用，f(S)表示当合作进行每个人需要消耗的费用。即至少对部分player有益，否则无合作必要。    

当f为一个次模函数时，我们有一些很好的结论

>* B(f) $\neq$ $\varnothing$  
>* B(f)的每个顶点都是pmas(population monotonic allocation scheme)  
>* 贪婪算法通过列举参与人的所有排列可得到B(f)所有顶点

### 经典次模vs DR 次模
>lattice submodular(zero-order def) vs DR-sub(first-order def)    
> 注意 $B^n,Z^n,R^n$ 都是特殊的格，他们的定义等价。但对于一般格，情况将变得棘手。这时也不再具有等价的定义。
#### 分布性
def: $(x \bigvee y) \bigwedge z$ = $(x \bigwedge) z \bigvee (y \bigwedge z)$

>一般来讲在x上定义任何属于关系都满足分布律，但Pentagon $N_5$,diamond $M_3$并不满足分布律，于是在这上面lattice-sub $\neq$ DR-sub

<figure class="half">
    <img src="https://surplus-1311636487.cos.ap-beijing.myqcloud.com/10086-3.png" width = "300">
    <img src="https://surplus-1311636487.cos.ap-beijing.myqcloud.com/10086 -4.png"width = "300">
</figure>

#### 有限格上的研究
对于有限格上的研究已经具备一套完整的理论，对于有限格，只要没有上面提到的两种子图，那么就符合分布律，DR与lattice sub 等价。但如果我们拓展到无限格这时候影响因素增多，对于何时两者等价尚无定论。    

#### two example
example1: 对于$Z^n$ DR-sub $\rightarrow$ Lattice-sub,but not vice versa-see。
>eg     
> 1、任何 f:$Z \rightarrow R$ 是一个模。 这是由于$f(x) + f(y) = f(x \bigwedge y) + f(x \bigvee y),\forall x,y \in L$      
>2、f:$Z \rightarrow R$是一个DR-sub需要:    
>$f(x+1)-f(x) \geq f(y+1)-f(y) , \ \forall x,y \in  \ Z \ with \  x  \ \leq \  y$
>DR-sub is stronger than lattice sub

example2 $f:2^N \rightarrow R$    
$$ f(A)=\left\{
\begin{matrix}
 0,if \ |A| = ∞ \\
 1，otherwise 
\end{matrix}
\right.
$$

>取S和T分别为奇数集和偶数集，对于lattice sub 套用定义有    
>$f(S) + f(T) = 0$ < $f(S \cap T ) + f(S \cup T) = 1$    
>显然这不满足其定义，所以不是一个lattice sub    

>但对于DR-sub    
>for S $\subseteq$  T $\subseteq$ N ,i $\notin$ S, 我们有    
>$ 0 = f(S \cup i ) - f(S) \geq f(T \cup i ) - f(T) = 0$    
>是一个DR-sub

#### 如何保证DR-sub $\Leftrightarrow$ lattice sub
这里引用一个定理
>if the set function f :$2^N \rightarrow R$ is continuous from below(above).then the zero-order and first-order conditions are equivalent for f to be supermodular(submodular).

>Given a set system (X,F) , a set function f:F $\rightarrow$ R is continuous from below at a set $A \in F$ if for every countable family of sets {$A_n$} in F such that $A_1 \subseteq A_2 \subseteq ...$, it holds that    
> $\underset{n \rightarrow ∞}{lim}f(A_n) = f( \underset{n \rightarrow ∞}{lim} A_n)$ from above    
>$\underset{n \rightarrow ∞}{lim} f(A_n) = f(\cap^{∞}_{n=1}A_n)$ from below

#### modular
def: A function is modular iff both submodular and supermodular    
即$f(x) + f(y) = f(x \bigvee y) + f(x \bigwedge y), \forall x,y \in L$    

An theorem about it    
>if $L_i$ is a chain ,for = 1...n,then: $f:\pi_{i=1}^n L_i \rightarrow R$    
>is a modular $\Leftrightarrow$ f is  a separable function    

*tips*    
*a separable function means $f(x_1,x_2....) = \sum g(x_i)$*

#### additive
def: A function $f: B \rightarrow R$ is additive if    
$f(x) + f(y) = f(x \bigvee y),\forall x,y \in B^n : x \bigwedge y = 0$ 

#### modular vs additive on $B^n$
* 一般来说二者并非等价的    
* 主要原因是模函数是一个仿射函数(affine)而可加函数是线性函数(linear)    
* 如果在game中，f(0) = 0，自然这时他们等价    
* 但如上在$Z^n$ 和 $R^n$中并不能成立

## 格的概念
>这里是感觉这部分会牵扯一些拓扑的知识，关于拓扑我当初参考的是《点集拓扑讲义第八
>版》+*Topology,James R.Munkres*    

### 杂谈
格(lattice)是在偏序(patrial order)和全序集(chain or total order)下产生的。
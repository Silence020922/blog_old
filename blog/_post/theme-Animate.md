---
title: Animate 代码实例开发
date: 2022-11-27
tag: note
---
Animate 是一个动画软件，本篇文章给予简单介绍。    
首先创建图层，在适当帧可创建图形。例如，我们在0帧时创建圆形，60帧创建菱形，通过创建帧间动画，我们可以得到由圆到菱形的一个变化过程。    
## 作业要求之截图
![](https://surplus-1311636487.cos.ap-beijing.myqcloud.com/63BC15027803CED3AF6450A64FA2ADC0.jpg)
## 控制影片的播放和停止
我们需要新建一个图层用于放置播放和停止的按钮。双击进入对对象的设置，并修改实例对象的名称以用于编程实现。    
代码需单独放在一个新的图层上，参考代码如下
```
import flash.events.MouseEvent;

bt_1.addEventListener(MouseEvent.CLICK,bt1Click)
function bt1Click(event:MouseEvent)
{
    ball.stop();
}
bt_2.addEventListener(MouseEvent.CLICK,bt2Click)
function bt2Click(event:MouseEvent)
{
    ball.play();
}
```
## 控制影片的播放速度
原理为控制帧率，可在属性见观察当前帧频。    
我们在此创建两个按钮，新建图层并打开动作对相框，添加代码如下
```
import flash.events.MouseEvent;

bt_1.addEventListener(MouseEvent.CLICK,bt1Click)
function bt1Click(event:MouseEvent)
{
    stage.frameRate - 30;
}
bt_2.addEventListener(MouseEvent.CLICK,bt2Click)
function bt2Click(event:MouseEvent)
{
    stage.frameRate = 10;
}
```
## 实例
水泡效果。    
首先，创建一个水泡，利用蓝色填充与白色笔触，并使用笔刷美化。选中转化为元件，类型为影片剪辑。    
创建动画:选定该水泡，转化为元件，类型影片剪辑，设置新的名字-高级-Actionscript导出为类。双击该水泡进入编辑状态，右键图层选择添加传统运动引导层，在引导层我们为其绘制一条路经，适当调整使其重合。    
30FPS创建关键帧，使用F5扩充帧，F6将水泡放到路径顶部，并将其色彩设置-Alpha为零,传统补帧。    
返回场景一，新建一个图层，并添加
```
function addPaopao()
{
    var pp:paopao = new paopao; //生成实例
    addChild(pp); //加载到舞台
    var rd:Number = Math.random()
    pp.x=  600*rd;
    pp.y = 100*rd + 250;
    var rd1:Number = Math.random()
    pp.scaleX = rd1;
    pp.scaleY = rd1;
}
setInterval(addPaopao,400) //间隔运行函数
```
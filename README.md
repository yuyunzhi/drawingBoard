<h1>如何用原生JS做一个画板？</h1>

<p>这是我做的第一个项目画板，故记录知识点方便以后回顾。有两种方式：div和canvas，选择了用canvas做。</p>

<p><strong>关键词:</strong>原生JavaScript、Canvas、移动端、SVG、特性检测</p>

<p><strong>描述：</strong>该项目使用原生JS实现，主要调用 Canvas API，实现了线粗、调色、橡皮擦、保存等功能。用 context.clearRect()实现了 橡皮檫和清屏的功能，用 className切换实现了笔的线粗、颜色切换的功能，用meta:vp、特性检测、ontouch事件实现了触屏设备与web端兼容。</p>

<h2>一、div VS canvas 选哪个？</h2>

<p>如果用div做画板，那么思路是这样的：</p>

<ul>
    <li>document.onmousedown：鼠标点击画一个圆，获取点击的坐标；创建div；设置div样式；</li>
    <li>document.onmousemove：移动创建圆：把1复制到2里，然后使用标记，未点击是false，点击是true，松开是false；</li>
    <li>doucment.onmouseup：鼠标松开，完成绘绘画；</li>
</ul>

<p>然后缺点是<strong>快速移动无法形成连续的圆</strong>，so不能用 div来做画板。而canvas解决了这个不足的地方。</p>

<p>让我们看下如何一步步用canvas实现画板。</p>

<h2>二、cavans提供的画图API</h2>

<h3>1、使用canvas</h3>

```
var canvas=document.getElementById('canvas');
var context=canvas.getContext('2d');
```

<h3>2、封装一个画实心圆的函数</h3>

```
function drawCir(x,y){
    context.beginPath()
    context.arc(x,y,0.1,0,Math.PI*2)
    context.fill();
}
```

<h3>3、封装一条画直线的函数</h3>

```
function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.lineWidth=2;
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.stroke();
    context.closePath();  
}
```

<p><strong>注意</strong>context.cloasePath()，表示关闭路径，线宽在开始和结束只能用一次，如果有多个颜色就要进行多次的开始和结束。</p>

<h3>4、删除内容，橡皮檫</h3>

```
context.clearRect(x坐标,y坐标,长,宽);
//x和y的坐标都可以动态获取
```

<p>更多canvas API可以查看MDN:</p>

<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_usage">Canvas基本用法</a>

<h2>三、然后怎么做？</h2>

<h3>1、首先我们要给画板设置视口宽高，并封装成函数</h3>

```
function setCanvasSize(){
    var pageWidth=document.documentElement.clientWidth;
    var pageHeight=document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
 }
```

<p>如果我们窗口变化了，可以调用这个函数重新设置canvas的宽高。</p>

<h3>2、实现能画图</h3>

```
var using=false;
var lastPoint={
    x:undefined,y:undefined
}
//鼠标点击监听
canvas.onmousedown=function(aaa){
 var x=aaa.clientX;
 var y=aaa.clientY;
    using=true;
    lastPoint={x:x,y:y};
 if(eraserEnabled){
        context.clearRect(x-10,y-10,20,20);
    }else{
        drawCir(x,y);
    }
}

//鼠标移动监听
canvas.onmousemove=function(aaa){
 var x=aaa.clientX;
 var y=aaa.clientY;
 var newPoint={x:x,y:y}
 if(using){
 if(eraserEnabled){
            context.clearRect(x-10,y-10,20,20);
      }else{
            drawCir(x,y);
            drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
            lastPoint=newPoint;      
        }
    }
}       

//鼠标松开监听
canvas.onmouseup=function(aaa){
    using=false;
}
```

<p><strong>注意</strong>做一个“锁”来切换点击状态 var using=false。</p>

<h3>3、引入SVG：铅笔、橡皮、清屏、下载</h3>

<p>在iconfont里找到自己想要的icon，按照说明帮助使用smybol引用：</p>

<a href="http://iconfont.cn/">iconfont-阿里巴巴矢量图库</a>

<h3>4、通过点击事件用js切换className</h3>

```
xxx.onclick=function(){
    xxx.classList.add('active');
    yyy.classList.remove('active');
}
```
<p>解释：给一个元素的状态激活增加active，给另一个元素的取消激活状态移除active。xxx代表点击事件监听的元素，比如pen的粗细切换、颜色切换，pen和eraser切换进行红色高亮。</p>

<h3>5、增加清屏功能</h3>

```
clear.onclick=function(){
    context.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
}
```

<h3>6、增加下载图片功能</h3>

```
download.onclick = function(){
    var url = canvas.toDataURL('image/png');
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href=url;
    a.download='my drawing';
    a.click();
}
```

<h3>7、解决移动页面宽度（在手机能看）</h3>

<p>在head加一个meta:vp:</p>

```
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no,maximum-scale=1.0,minimum-scale=1.0"/>

页面宽度=移动宽度 ：width=device-width
用户不可以缩放：user-scalable=no
缩放比例：initial-scale=1
最大缩放比例：maximum-scale=1.0
最小缩放比例：minimum-scale=1.0
```

<p>具体可看我之前写的文章：</p>

<a href="https://zhuanlan.zhihu.com/p/36851344">移动端是怎么做适配的？</a>

<h3>8、特性检测没有onmouse事件，用ontouch事件</h3>

```
document.ontouchstart =function(){}
document.ontouchmove = function(){}
document.ontouchend = function(){}
```

<h3>9、特性检测</h3>

```
if(document.body.ontouchstart!==undefined){
    //是触屏设备
 }else{
    //不是触屏设备
 }
 ```

 <h2>四、解决一些问题</h2>

 <h3>1、当窗口变大变小，能够保证画板自适应的放缩</h3>

<p>这里需要注意的是，onresize响应事件处理中，获取到的页面尺寸参数是变更后的参数。</p>

```
window.onresize =function(){
    setCanvasSize()
}
```

<h3>2、用http协议预览</h3>

<p>使用了svg，那么file协议的预览就无法看到图片，所以打开node.js输入命令行安装一个http协议预览的功能，输入命令：</p>

```
npm i -g http-server
```

<p>运行</p>

```
http-server -c-1 //清除缓存预览
hs -c-1 //与上面等价
```

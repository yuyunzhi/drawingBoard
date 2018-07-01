
var canvas=document.getElementById('canvas');
var context=canvas.getContext('2d');

var using=false;
var lastPoint={
    x:undefined,
    y:undefined
}

/*画板逻辑 */

autoSetSize(canvas);

listenToUser(canvas);

/********/
//画笔、橡皮擦按钮替换
var eraserEnabled=false;

pen.onclick=function(){
    eraserEnabled=false;
    pen.classList.add('active');
    eraser.classList.remove('active');
 }


eraser.onclick=function(){
    eraserEnabled=true;
    eraser.classList.add('active');
    pen.classList.remove('active');
}

 //颜色替换并高亮
red.onclick=function(){
    context.fillStyle ="red";
    context.strokeStyle="red";
    red.classList.add('active');
    yellow.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
}
yellow.onclick=function(){
    context.fillStyle ="yellow";
    context.strokeStyle="yellow";
    yellow.classList.add('active');
    red.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
}
blue.onclick=function(){
    context.fillStyle ="blue";
    context.strokeStyle="blue";
    blue.classList.add('active');
    yellow.classList.remove('active');
    red.classList.remove('active');
    black.classList.remove('active');
}
black.onclick=function(){
    context.fillStyle ="black";
    context.strokeStyle="black";
    black.classList.add('active');
    yellow.classList.remove('active');
    blue.classList.remove('active');
    red.classList.remove('active');
}
/********/

thin.onclick=function(){
    thin.classList.add('active');
    thick.classList.remove('active');    
    context.lineWidth=2;
}

thick.onclick=function(){
    thick.classList.add('active');
    thin.classList.remove('active');
    context.lineWidth=4;
}

clear.onclick=function(){
    context.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);  
}

download.onclick = function(){
    var url = canvas.toDataURL('image/png');
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href=url;
    a.download='my drawing';
    a.click();
}



/********/
/********/
/********/


//drawLine
function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.stroke();
    context.closePath();  
  }

//drawCir
function drawCir(x,y){
context.beginPath()
context.arc(x,y,0.1,0,Math.PI*2);
context.fill();
}

//重置canvas画板宽高
function setCanvasSize(){
    var pageWidth=document.documentElement.clientWidth;
    var pageHeight=document.documentElement.clientHeight;
   
    canvas.width = pageWidth;
    canvas.height = pageHeight;

 }

//自动设置canvas画板宽高
function autoSetSize(){
    setCanvasSize();    
    window.onresize =function(){
        setCanvasSize();
    }    
}
function preventBehavior(e) {
    e.preventDefault()
}
    
document.addEventListener("touchmove", preventBehavior, false)
    

function listenToUser(){
    //特性检测
    if(document.body.ontouchstart!== undefined ){                    
        //是触屏设备
        canvas.ontouchstart =function(aaa){
            var x=aaa.touches[0].clientX;
            var y=aaa.touches[0].clientY;
            using=true;
            lastPoint={x:x,y:y};
            if(eraserEnabled){
                context.clearRect(x-10,y-10,20,20);
            }else{
                drawCir(x,y);
            }
        }
        //
        canvas.ontouchmove = function(aaa){
            var x=aaa.touches[0].clientX;
            var y=aaa.touches[0].clientY;
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
        canvas.ontouchend = function(aaa){
            using=false;
        }

    }else{
        //不是触屏设备
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
    }
}



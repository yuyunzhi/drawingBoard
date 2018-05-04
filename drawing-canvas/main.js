
//drawLine
function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.strokeStyle="black";
    context.lineWidth=6;
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.stroke();
    context.closePath();  
  }

//drawCir
function drawCir(x,y){
context.beginPath()
context.fillStyle ="black";
context.arc(x,y,3,0,Math.PI*2);
context.fill();
}

//重置canvas画板宽高
function setCanvasSize(yyy){
    var pageWidth=document.documentElement.clientWidth;
    var pageHeight=document.documentElement.clientHeight;
   
    yyy.width = pageWidth;
    yyy.height = pageHeight;

 }


/********/


var yyy=document.getElementById('canvas');
var context=yyy.getContext('2d');

var using=false;
var lastPoint={
    x:undefined,
    y:undefined
}

setCanvasSize(yyy);

window.onresize =function(){

    setCanvasSize(yyy);

}

//鼠标点击监听
document.onmousedown=function(aaa){
    var x=aaa.clientX;
    var y=aaa.clientY;
    lastPoint={x:x,y:y};
    if(eraserEnabled){
        using=true;
        context.clearRect(x-10,y-10,20,20);
    }else{
        using=true;
        drawCir(x,y);
    }
}

//鼠标移动监听
document.onmousemove=function(aaa){
    var x=aaa.clientX;
    var y=aaa.clientY;
    var newPoint={x:x,y:y}
   
    if(eraserEnabled){
        if(using){
            context.clearRect(x-10,y-10,20,20);
        }

    }else{
        if(using){ 
            drawCir(x,y);
            drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
            lastPoint=newPoint;
        }
    }
}

//鼠标松开监听
document.onmouseup=function(aaa){
    using=false;
}
  
 
/********/
  
var eraserEnabled=false;

eraser.onclick=function(){
    eraserEnabled = !eraserEnabled;
}
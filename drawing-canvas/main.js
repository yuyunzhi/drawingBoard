
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
  
var eraserEnabled=false;

eraser.onclick=function(){
    eraserEnabled = !eraserEnabled;
    if(eraserEnabled){
        eraser.textContent= "画笔";
    }else{
        eraser.textContent= "橡皮擦";
    }
}

/********/


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


function listenToUser(){
    //特性检测
    if(document.body.ontouchstart!== undefined ){                    
        //是触屏设备
        //
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
    //鼠标点击监听

}
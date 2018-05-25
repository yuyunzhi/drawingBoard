

var div=document.getElementById('canvas');
//var flagBox=false;
var flagBox=false;

//鼠标点击
document.onmousedown=function(a){
  flagBox=true;
  var x=a.clientX;
  var y=a.clientY;
  var divA=document.createElement('div');
  divA.style.height='10px';
  divA.style.width='10px';
  divA.style.background='black';
  divA.style.position='absolute';
  divA.style.borderRadius='50%';  
  divA.style.top=(y-5)+'px';
  divA.style.left=(x-5)+'px';
  div.appendChild(divA);


}

//鼠标移动
document.onmousemove=function(a){
  if(flagBox){
    var x=a.clientX;
    var y=a.clientY;
    var divA=document.createElement('div');
    divA.style.height='10px';
    divA.style.width='10px';
    divA.style.background='black';
    divA.style.position='absolute';
    divA.style.borderRadius='50%';  
    divA.style.top=(y-5)+'px';
    divA.style.left=(x-5)+'px';
    div.appendChild(divA);
  }else{
    
  }

}
                               
//鼠标松开
document.onmouseup=function(z){
  flagBox=false;

}


var b=123e-3;
console.log(b);
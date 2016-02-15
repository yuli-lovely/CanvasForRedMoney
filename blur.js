var canvasWidth=800;
var canvasHeight=600;

var canvas=document.getElementById('canvas');
var context=canvas.getContext('2d');
canvas.width=canvasWidth;
canvas.height=canvasHeight;

//绘制图像及使用剪辑区域 

var image=new Image();
var radio=50;
var clippingRegion={x:-1,y:-1,r:radio}
//var clippingRegion={x:Math.random()*(canvas.width-2*radio))+radio,y:Math.random()*(canvas.height-2*radio))+radio,r:radio}//定义一个剪辑区域
image.src="002.jpg";
image.onload=function(e){
	initCanvas();
}

function initCanvas(){
	//show之后的归位操作
	var clippingRegion={x:Math.random()*(canvas.width-2*radio)+radio,y:Math.random()*(canvas.height-2*radio)+radio,r:radio}
	draw(image,clippingRegion);
}
function setClippingRegion(clippingRegion){//设置一个剪辑区域
	context.beginPath();
	context.arc(clippingRegion.x,clippingRegion.y,clippingRegion.r,0,Math.PI*2,false);
	context.clip();
}
function draw (image,clippingRegion) {//以后可能会频繁的调用绘图
	context.clearRect(0,0,canvas.width,canvas.height);//清空
	context.save();//保存当前状态
	setClippingRegion(clippingRegion);
	context.drawImage(image,0,0);
	context.restore();//
}

function reset(){
initCanvas();
}

function show(){
	// 动画效果
	var t=setInterval(function(){
		clippingRegion.r+=20;
		if(clippingRegion.r>2*Math.max(canvas.width,canvas.height)){
			clearInterval(t);
		}
		draw(image,clippingRegion);

	},30)
	
}
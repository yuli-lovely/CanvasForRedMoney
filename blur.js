// var canvasWidth=800;
// var canvasHeight=600;
//4-1 适应移动端屏幕尺寸
var canvasWidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
var canvasHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
var canvas=document.getElementById('canvas');
var context=canvas.getContext('2d');
canvas.width=canvasWidth;
canvas.height=canvasHeight;

//绘制图像及使用剪辑区域 

var image=new Image();
var radio=50;
var clippingRegion={x:-1,y:-1,r:radio}
// 适应移动端屏幕尺寸
var leftMargin =0;
var topMargin = 0;
//var clippingRegion={x:Math.random()*(canvas.width-2*radio))+radio,y:Math.random()*(canvas.height-2*radio))+radio,r:radio}//定义一个剪辑区域
image.src="002.jpg";
image.onload=function(e){
	//适应移动端屏幕尺寸begin
	$('#blur-div').css("width",canvasWidth+'px');
	$('#blur-div').css("height",canvasHeight+'px');
	$('#blur-img').css("width",image.width+'px');
	$('#blur-img').css("height",image.height+'px');

	leftMargin = (image.width-canvas.width)/2;
	topMargin=(image.height-canvas.height)/2;
	//canvas<image
	// $('#blur-img').css("top","-"+topMargin+'px');
	// $('#blur-img').css("left","-"+leftMargin+'px');
	$('#blur-img').css("top",String(-topMargin)+'px');
	$('#blur-img').css("left",String(-leftMargin)+'px');
	//end
	initCanvas();

}

function initCanvas(){
	////适应移动端屏幕尺寸begin
	var theleft=leftMargin<0?-leftMargin:0;
	var thetop=topMargin<0?-topMargin:0;
	var clippingRegion={x:Math.random()*(canvas.width-2*radio-2*theleft)+radio+theleft,y:Math.random()*(canvas.height-2*radio-2*thetop)+radio+thetop,r:radio}
	//end
	//show之后的归位操作
	// var clippingRegion={x:Math.random()*(canvas.width-2*radio)+radio,y:Math.random()*(canvas.height-2*radio)+radio,r:radio}
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
	// context.drawImage(image,0,0);
	//适应移动端屏幕尺寸begin 重新定义剪辑区间
	
	// context.drawImage(image,leftMargin,topMargin,canvas.width,canvas.height,0,0,canvas.width,canvas.height)
	context.drawImage(image,
		Math.max(leftMargin,0),Math.max(topMargin,0),
		Math.min(canvas.width,image.width),Math.min(canvas.height,image.height),
		leftMargin<0?-leftMargin:0,topMargin<0?-topMargin:0,
		Math.min(canvas.width,image.width),Math.min(canvas.height,image.height))
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
//组织滑动事件
canvas.addEventListener("touchstart",function(e){
	e.preventDefault();
})
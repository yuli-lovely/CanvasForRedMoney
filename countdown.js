var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=500;
var RADIUS=8;
var MARGIN_TOP=60;
var MARGIN_LEFT=30;

const endTime=new Date(2016,1,18,18,47,52);
var curShowTimeSecond=0;//毫秒转化为秒
window.onload=function(){
    var canvas=document.getElementById('canvas');
    var cxt=canvas.getContext('2d');
    canvas.width=WINDOW_WIDTH;
    canvas.height=WINDOW_HEIGHT;
    curShowTimeSecond=getCurrentShowTimeSeconds();
    render(cxt);
}
function getCurrentShowTimeSeconds(){
    var curTime =new Date();
    var ret=endTime.getTime()-curTime.getTime();
    ret=Math.round(ret/1000);//转化成秒
    return ret>=0?ret:0;
}
function render(cxt){
    var hours=parseInt(curShowTimeSecond/3600);
    var minutes=parseInt((curShowTimeSecond-hours*3600)/60);
    var seconds=curShowTimeSecond%60;
    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
    renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
    renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
    renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
    renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
    renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);
}
function renderDigit(x,y,num,cxt){
    cxt.fillStyle="rgb(0,102,153)";
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                cxt.beginPath();
                cxt.arc(x+j*2*(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,Math.PI*2);
                cxt.closePath();
                cxt.fill();
            }
        }
    }

}
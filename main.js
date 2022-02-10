video="";
status="";
objects=[];
function preload(){
video=createVideo('cute_tiger.mp4');
video.hide();
}

function setup(){
    canvas=createCanvas(500,400);
    canvas.position(475,275);
}

function draw(){
image(video,0,0,500,400);
if(status!=""){
    objectDetector.detect(video,gotResult);
}
for(i=0; i<objects.length; i++){
    document.getElementById("status").innerHTML="status detected objects";
    document.getElementById("number-of-objects").innerHTML="number of objects are- "+objects.length;
    fill("#ed1111");
    percent=floor(objects[i].confidence*100);
    text(objects[i].label + "" + percent + "%",objects[i].x+15,objects[i].y+15);
    noFill();
    stroke("#ed1111");
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
}
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="status-detecting objects";
}

function modelLoaded(){
    console.log("modelLoaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(1);
}

function gotResult(error,results){
if(error){
console.error(error);
}
else{
    console.log(results);
    objects=results;
}
}
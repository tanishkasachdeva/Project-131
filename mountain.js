img="";
status="";
objects=[];

function preload()
{
    img=loadImage("Mountain.jpg");
}

function setup()
{
    canvas=createCanvas(640,420);
    canvas.center();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded()
{
    console.log("model loaded!");
    status=true;
    objectDetector.detect(img,gotResult);
}

function draw()
{
    image(img,0,0,640,420);
    if (status!="")
    {
        for(i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="Status: Objects Detected";
            fill("#EE82EE");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+' '+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function gotResult(error,results)
{
    if (error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects=results;
    }
}

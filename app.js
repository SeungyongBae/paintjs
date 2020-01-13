const canvas = document.getElementById("jsCanvas");

let click = false;

function onMouseMove(event)
{
    const x = event.offsetX;
    const y = event.offsetY;

    if(click)
    {
        console.log(x, y);
        
    }
}

function onMouseDown(event)
{
    click = true;
}

function onMouseUp(event)
{
    click = false;
}

function onMouseLeave(event)
{
    click = false;
}

if(canvas)
{
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", click = false);
    //canvas.addEventListener("mouseleave", onMouseLeave);
}
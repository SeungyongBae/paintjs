const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
canvas.fillStyle = "white";
canvas.fillRect = (0,0,CANVAS_SIZE,CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let paintBtn = true;


function handleRangeChange(event)
{
    const lineWidth = event.target.value
    console.log(lineWidth);
    ctx.lineWidth = lineWidth;
}
if(range)
    range.addEventListener("input", handleRangeChange);


function handleModeClick()
{
    if(paintBtn)
    {
        mode.innerText = "Fill";
        paintBtn = false;
    }      
    else
    {
        mode.innerText = "Paint";
        paintBtn = true;
    }  
}
if(mode)
    mode.addEventListener("click", handleModeClick)

function handleSaveClick()
{
    let date = new Date();

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "👍" + date.getHours() + date.getMinutes() + date.getSeconds();
    link.click();
}
if(save)
    save.addEventListener("click", handleSaveClick);

function handleColorClick(event)
{
   const color = event.target.style.backgroundColor;
   console.log(color); 
   ctx.strokeStyle = color;
   ctx.fillStyle = color;
}
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));


function stopPainting()
{
    painting = false;
}
function startPainting()
{
    painting = true;
}

function onMouseMove(event)
{
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting)
    {
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
    else
    {
        ctx.lineTo(x,y);
        ctx.stroke();

        if(paintBtn == false)
            ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function onMouseClick()
{             
    if(paintBtn == false)
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function handleContextMenu(evnet)
{
    event.preventDefault();
}

if(canvas)
{
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);    //painting = false; 일때는 다르게 작동, 다른것들도 이상생김 왜?
    canvas.addEventListener("click", onMouseClick);
    canvas.addEventListener("contextmenu", handleContextMenu);  //오른쪽 클릭 방지
}
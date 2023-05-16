const mainBox = document.querySelector(".mainDrawBoxes");
console.log(mainBox);
let boxes = [];

let horizontalBoxNum = 5;
let verticalBoxNum = 5;
let initialBoxNum = verticalBoxNum * horizontalBoxNum;
let isMouseDown = false;

document.documentElement.style.setProperty(`--horLength`, horizontalBoxNum);
document.documentElement.style.setProperty(`--vertLength`, verticalBoxNum);

//check to see if the mouse is down on every move because the normal
//mouseup and mousedown events down't always fire, especially if there's
//gaps between objects
window.addEventListener("mousemove", checkMouse);
function checkMouse(e){
    console.log(e.buttons);
    if(e.buttons == 0){
        isMouseDown = false;
    }
    if(e.buttons == 1){
        isMouseDown = true;
    }
}

//function that creates a square subdiv with all attached info
//such as on mouse over = change colour
function addBox(){

    let newBox = document.createElement("div");
    mainBox.classList.add("content");
    newBox.addEventListener("mouseenter", addHover);
    newBox.addEventListener("mouseleave", removeHover);
    newBox.onmousedown = recolour;
    newBox.setAttribute("draggable", false);
    newBox.classList.add("simpleBox");
    boxes.push(newBox);
    mainBox.appendChild(newBox);
}

function addHover(e){
    //change colour of given box to black
    this.classList.add("hovered");
    if(isMouseDown == true){
        this.classList.add("black");
    }
}

function removeHover(e){
    this.classList.remove("hovered");
}

function recolour(e){
    this.classList.add("black");
}

//resets all currently coloured boxes
function resetBoxes(){
    for(let i = 0; i < boxes.length; i++){
        boxes[i].className = "";
        boxes[i].classList.add("simpleBox");
    }
}

//destroys old boxes and creates new ones according to dimensions
function createNewBoxes(){
    while(boxes.length > 0){
        boxes[0].remove();
        boxes.shift();
    }
    horizontalBoxNum = document.getElementById("horizontal").value;
    verticalBoxNum = document.getElementById("vertical").value;
    let multiple = horizontalBoxNum * verticalBoxNum;
    //update css also
    document.documentElement.style.setProperty(`--horLength`, horizontalBoxNum);
    document.documentElement.style.setProperty(`--vertLength`, verticalBoxNum);
    for(i = 0; i < multiple; i++){
        addBox();
    }
}


for(i = 0; i < initialBoxNum; i++){
    addBox();
}

//add a button to top of screen that sends a promt asking for new dimensions of grid
//when user enters a number (max 100), delete current grid and make new one (code should be reusuable)
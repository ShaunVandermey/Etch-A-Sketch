const mainBox = document.querySelector(".mainDrawBoxes");
console.log(mainBox);
let boxes = [];
let initialBoxNum = 100;
let isMouseDown = false;
mainBox.onmouseup = dontColour();
//function that creates a square subdiv with all attached info
//such as on mouse over = change colour
function addBox(){

    let newBox = document.createElement("div");
    mainBox.classList.add("content");
    newBox.addEventListener("mouseenter", addHover);
    newBox.addEventListener("mouseleave", removeHover);
    newBox.onmousedown = recolour;
    newBox.onmouseup = dontColour;
    //newBox.addEventListener("onclick", recolour);
    newBox.classList.add("simpleBorder");
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
    isMouseDown = true;
}

function dontColour(e){
    isMouseDown = false;
}

function resetBoxes(){
    for(let i = 0; i < boxes.length; i++){
        boxes[i].className = "";
        boxes[i].classList.add("simpleBorder");
    }
}


for(i = 0; i < initialBoxNum; i++){
    addBox();
}

//add a button to top of screen that sends a promt asking for new dimensions of grid
//when user enters a number (max 100), delete current grid and make new one (code should be reusuable)
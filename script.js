const mainBox = document.querySelector(".mainDrawBoxes");
const colourPicker = document.getElementById('colourPicker');
colourPicker.oninput = (e) => setColour(e.target.value);
let boxes = [];

let horizontalBoxNum = 5;
let verticalBoxNum = 5;
let boxUpperLimit = 30;
let initialBoxNum = verticalBoxNum * horizontalBoxNum;
let isMouseDown = false;
let currentColour = "#000000";

document.documentElement.style.setProperty(`--horLength`, horizontalBoxNum);
document.documentElement.style.setProperty(`--vertLength`, verticalBoxNum);

//check to see if the mouse is down on every move because the normal
//mouseup and mousedown events down't always fire, especially if there's
//gaps between objects
/*
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
*/

document.body.onmousedown = () => (isMouseDown = true);
document.body.onmouseup = () => (isMouseDown = false);

//function that creates a square subdiv with all attached info
//such as on mouse over = change colour
function addBox(){

    let newBox = document.createElement("div");
    mainBox.classList.add("content");
    newBox.addEventListener("mouseenter", addHover);
    newBox.addEventListener("mouseleave", removeHover);
    //newBox.onmousedown = recolour;
    newBox.addEventListener("mouseover", recolour);
    newBox.addEventListener("mousedown", recolour);
    newBox.addEventListener("ondragstart", dragStart);
    newBox.setAttribute("draggable", false);
    newBox.classList.add("simpleBox");
    boxes.push(newBox);
    mainBox.appendChild(newBox);
}

function setColour(newColour){
    currentColour = newColour;
}

function addHover(e){
    //change colour of given box to black
    this.classList.add("hovered");
    /*
    if(isMouseDown == true){
        this.classList.add("black");
    }
    */
}

function removeHover(e){
    this.classList.remove("hovered");
}

function recolour(e){
    if(e.type === "mouseover" && !isMouseDown){   
        return;
    }
    //this.classList.add("black");
    this.style.backgroundColor = currentColour;
}

//resets all currently coloured boxes
function resetBoxes(){
    for(let i = 0; i < boxes.length; i++){
        boxes[i].className = "";
        boxes[i].classList.add("simpleBox");
    }
}

function dragStart(e){
    e.preventDefault();
}

//destroys old boxes and creates new ones according to dimensions
function createNewBoxes(){
    horizontalBoxNum = document.getElementById("horizontal").value;
    verticalBoxNum = document.getElementById("vertical").value;
    if (isNaN(horizontalBoxNum) || isNaN(verticalBoxNum)){
        alert("Please ensure that both fields have a number.");
    }
    else if (horizontalBoxNum <= 0 || verticalBoxNum <= 0){
        alert("Please make sure both fields have a number larger than 0.");
    }
    else if (horizontalBoxNum > boxUpperLimit || verticalBoxNum > boxUpperLimit){
        alert("Please ensure that no field is larger than " + boxUpperLimit + ".");
    }
    else{
        //within parameters
        while(boxes.length > 0){
            boxes[0].remove();
            boxes.shift();
        }
        
        let multiple = horizontalBoxNum * verticalBoxNum;
        //update css also
        document.documentElement.style.setProperty(`--horLength`, horizontalBoxNum);
        document.documentElement.style.setProperty(`--vertLength`, verticalBoxNum);
        for(i = 0; i < multiple; i++){
            addBox();
        }
    }
}


for(i = 0; i < initialBoxNum; i++){
    addBox();
}

//add a button to top of screen that sends a promt asking for new dimensions of grid
//when user enters a number (max 100), delete current grid and make new one (code should be reusuable)
const mainBox = document.querySelector(".mainDrawBoxes");
console.log(mainBox);
let boxes = [];
let initialBoxNum = 16;
//function that creates a square subdiv with all attached info
//such as on mouse over = change colour
function addBox(){

    let newBox = document.createElement("div");
    mainBox.classList.add("content");
    newBox.addEventListener("mouseenter", changeToBlack);
    newBox.addEventListener("mouseleave", changeToWhite);
    newBox.classList.add("simpleBorder");
    boxes.push(newBox);
    mainBox.appendChild(newBox);
}

function changeToBlack(e){
    //change colour of given box to black
    this.classList.add("black");
}

function changeToWhite(e){
    this.classList.remove("black");
}




for(i = 0; i < initialBoxNum; i++){
    addBox();
}

//add a button to top of screen that sends a promt asking for new dimensions of grid
//when user enters a number (max 100), delete current grid and make new one (code should be reusuable)
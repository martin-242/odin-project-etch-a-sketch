// Function that creates the grid
function gridMaker(size){ 
    let gridSize = size;
    let columns = "";
    let gridRows = gridSize;
    for ( let i = gridRows; i >= 1; i-- ) {
        columns += "1fr ";
    }
    gridContainer.setAttribute("style", `grid-template-columns:${columns};grid-template-rows:${columns};`);
    for ( let i = gridSize * gridSize; i >= 1; i-- ) {
        let gridPixel = document.createElement("div");
        gridContainer.prepend(gridPixel);
        gridPixel.setAttribute("id", "gridPixel");
        gridPixel.setAttribute("class", ("pixel_" + `${i}`));
    };
    let allPixels = document.querySelectorAll("#gridPixel");    
    allPixels.forEach(element => { element.addEventListener("mouseover", () => { 
        element.classList.add(`pixel_black`); } )
    }
    );
};

// Removes grid
function removeGrid(){
    let allPixels = document.querySelectorAll("#gridPixel");
    allPixels.forEach(element => { 
        gridContainer.removeChild(element)
        });
};

// Clears grid
function clearGrid(){
    let allPixels = document.querySelectorAll("#gridPixel");
    allPixels.forEach(element => { 
        element.classList.remove("pixel_black");
        });
};

// Changes brush color
function changeColor(color){
    let newColor = color;
    let allPixels = document.querySelectorAll("#gridPixel");    
    allPixels.forEach(element => { element.addEventListener("mouseover", () => { 
        element.classList.remove(`${currentColor}`); 
        element.classList.add(`${newColor}`);
        currentColor = newColor;
    } )}
    );
    return currentColor;
};

// Program starts running here 

// Sets default starting color
let currentColor = "pixel_black";

// Selects the grid containers
const gridContainer = document.querySelector("#grid_container");
const gridEnvelope = document.querySelector("#grid_envelope");

// Sets the grid to 16x16
const gridButton16 = document.querySelector("#button_16");
gridButton16.addEventListener("click", () => {    
    removeGrid();
    gridMaker(16);
});

// Sets the grid to 32x32
const gridButton32 = document.querySelector("#button_32");
gridButton32.addEventListener("click", () => {
    removeGrid();
    gridMaker(32);
});

// Sets the grid to 64x64
const gridButton64 = document.querySelector("#button_64");
gridButton64.addEventListener("click", () => {
    removeGrid();
    gridMaker(64);
});

// Clears the grid
const gridButtonClear = document.querySelector("#button_clear");
gridButtonClear.addEventListener("click", () => {    
    clearGrid();
});

// Selects the eraser brush
const gridButtonEraser = document.querySelector("#button_eraser");
gridButtonEraser.addEventListener("click", () => {    
    changeColor("pixel_eraser");
    
});

// Selects the black brush
const gridButtonBlack = document.querySelector("#button_black");
gridButtonBlack.addEventListener("click", () => {    
    changeColor("pixel_black");
});

// Creates starting grid
gridMaker(32);
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

function removeGrid(){
    let allPixels = document.querySelectorAll("#gridPixel");
    allPixels.forEach(element => { 
        gridContainer.removeChild(element)
        });
};

function clearGrid(){
    let allPixels = document.querySelectorAll("#gridPixel");
    allPixels.forEach(element => { 
        element.classList.remove("pixel_black");
        });
};

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

let currentColor = "pixel_black";

const gridContainer = document.querySelector("#grid_container");
const gridEnvelope = document.querySelector("#grid_envelope");

const gridButton16 = document.querySelector("#button_16");
gridButton16.addEventListener("click", () => {    
    removeGrid();
    gridMaker(16);
});

const gridButton32 = document.querySelector("#button_32");
gridButton32.addEventListener("click", () => {
    removeGrid();
    gridMaker(32);
});

const gridButton64 = document.querySelector("#button_64");
gridButton64.addEventListener("click", () => {
    removeGrid();
    gridMaker(64);
});

const gridButtonClear = document.querySelector("#button_clear");
gridButtonClear.addEventListener("click", () => {    
    clearGrid();
});

const gridButtonEraser = document.querySelector("#button_eraser");
gridButtonEraser.addEventListener("click", () => {    
    changeColor("pixel_eraser");
    
});

const gridButtonBlack = document.querySelector("#button_black");
gridButtonBlack.addEventListener("click", () => {    
    changeColor("pixel_black");
});

gridMaker(32);
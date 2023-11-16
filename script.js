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
    changeColor(currentColor);
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
        element.removeAttribute("style");
        element.classList.remove("pixel_black");
        element.classList.remove("pixel_eraser");
        });
};

// Changes brush color and creates event listeners
// Needs to be reworked to separate the adding of event listeners from the color changing
function changeColor(color){
    let allPixels = document.querySelectorAll("#gridPixel");
    let newColor = color;
    if ( newColor == "pixel_rainbow" ) {
        const rainbowColors = ["#e81416", "#ffa500", "#faeb36", "#79c314", "#487de7", "#4b369d", "#70369d"]; 
        allPixels.forEach(element => { 
            element.addEventListener("mousedown", (e) => {
                if (e.button === 0) {
                    isMouseDown = true;
                    let randomNumber = Math.floor(Math.random() * 7);
                    element.classList.remove(`${currentColor}`); 
                    element.classList.add(`${newColor}`);
                    let randomColor = rainbowColors[randomNumber];
                    element.setAttribute("style", `background-color:${randomColor}`);
                    currentColor = newColor;
                }})
            element.addEventListener("mousemove", () => {
                if (isMouseDown) {
                    let randomNumber = Math.floor(Math.random() * 7);
                    element.classList.remove(`${currentColor}`); 
                    element.classList.add(`${newColor}`);
                    let randomColor = rainbowColors[randomNumber];
                    element.setAttribute("style", `background-color:${randomColor}`);
                    currentColor = newColor;
                }
                });
            element.addEventListener("mouseup", () => {
                if (isMouseDown) {
                    isMouseDown = false;
                }
            });
        })
    }
    else if ( newColor == "pixel_custom" ) {
        allPixels.forEach(element => { 
            element.addEventListener("mousedown", (e) => {
                if (e.button === 0) {
                    isMouseDown = true;
                    element.removeAttribute("style");
                    element.classList.remove(`${currentColor}`); 
                    element.setAttribute("style", `background-color:${gridButtonPicker.value}`);    
                    currentColor = newColor;
                }
            });
            element.addEventListener("mousemove", () => {
                if (isMouseDown) {
                    element.removeAttribute("style");
                    element.classList.remove(`${currentColor}`); 
                    element.setAttribute("style", `background-color:${gridButtonPicker.value}`);    
                    currentColor = newColor;
                    }
            });
        });
    }
    else {
        allPixels.forEach(element => { 
            element.addEventListener("mousedown", (e) => {
                if (e.button === 0) {
                    isMouseDown = true;
                    element.removeAttribute("style");
                    element.classList.remove(`${currentColor}`); 
                    element.classList.add(`${newColor}`);    
                    currentColor = newColor;
                }
            });
            element.addEventListener("mousemove", () => {
                if (isMouseDown) {
                    element.removeAttribute("style");
                    element.classList.remove(`${currentColor}`); 
                    element.classList.add(`${newColor}`);    
                    currentColor = newColor;
                    }
            });
        });
    };
    return currentColor;
};
    

// Selects active button, disable the others and returns the selected color
function selectBrushButton(brush){
    let brushButtons = document.querySelectorAll(".brush_button");
    brushButtons.forEach(element => {
        if ( brush == "black" ){
            element.classList.remove("active");
            gridButtonBlack.classList.add("active");
            currentColor = "pixel_black";
        }
        else if ( brush == "eraser" ){
            element.classList.remove("active");
            gridButtonEraser.classList.add("active");
            currentColor = "pixel_eraser";    
        }
        else if ( brush == "rainbow" ){
            element.classList.remove("active");
            gridButtonRainbow.classList.add("active");
            currentColor = "pixel_rainbow";    
        }
        else if ( brush == "custom" ){
            element.classList.remove("active");
            gridButtonPicker.classList.add("active");
            currentColor = "pixel_custom";    
        }
    });
    return currentColor;
};

//////////////////////////////////////////// Program starts running here 

// Tracks if the mouse button is held down
let isMouseDown = false;

// Adds event listeners for mousedown, mouse move and mouseup  
document.addEventListener("mouseup", () => {
    isMouseDown = false;
});

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

// Selects the black brush
const gridButtonBlack = document.querySelector("#button_black");
gridButtonBlack.addEventListener("click", () => {    
    changeColor("pixel_black");
    selectBrushButton("black");
});

// Selects the eraser brush
const gridButtonEraser = document.querySelector("#button_eraser");
gridButtonEraser.addEventListener("click", () => {    
    changeColor("pixel_eraser");
    selectBrushButton("eraser");
});

// Selects the rainbow brush
const gridButtonRainbow = document.querySelector("#button_rainbow");
gridButtonRainbow.addEventListener("click", () => {    
    changeColor("pixel_rainbow");
    selectBrushButton("rainbow");
}); 

// Selects the custom brush
const gridButtonPicker = document.querySelector("#button_picker");
gridButtonPicker.addEventListener("click", () => {    
    changeColor("pixel_custom");
    selectBrushButton("custom");
}); 

// Creates starting grid
gridMaker(32);
changeColor("pixel_black");
selectBrushButton("black");

//////////////////////// SAVE IMAGE

// Function to save the div content as an image
function saveDivAsImage() {
    const div = document.querySelector("#grid_container"); // The div you want to save as an image
  
    html2canvas(div).then(function(canvas) {
      // Create an image from the canvas
      var image = canvas.toDataURL("image/png", 1.0);
  
      // Create a temporary link to trigger the download
      var link = document.createElement('a');
      link.href = image;
      link.download = 'my_magic_drawing.png'; // Name the image file
  
      // Trigger the download
      link.click();
    });
  }
  
  // Function to show the context menu
  function showContextMenu(x, y) {
    var contextMenu = document.getElementById('contextMenu');
    contextMenu.style.display = 'block';
    contextMenu.style.left = x + 'px';
    contextMenu.style.top = y + 'px';
  }
  
  // Function to hide the context menu
  function hideContextMenu() {
    var contextMenu = document.getElementById('contextMenu');
    contextMenu.style.display = 'none';
  }
  
  // Add event listener for right-click on the div
  document.querySelector("#grid_container").addEventListener('contextmenu', function(e) {
    e.preventDefault(); // Prevent the default context menu
    showContextMenu(e.pageX, e.pageY); // Show the custom context menu at the cursor position
  });
  
  // Add event listener for click on the 'Save Image' option
  document.getElementById('saveImage').addEventListener('click', function() {
    saveDivAsImage();
    hideContextMenu(); // Hide the context menu after saving
  });
  
  // Add event listener to hide the context menu when clicking elsewhere on the page
  document.addEventListener('click', function(e) {
    if (e.target.id !== 'saveImage') {
      hideContextMenu();
    }
  });
  
  // Prevent the context menu from hiding when clicking within it
  document.getElementById('contextMenu').addEventListener('click', function(e) {
    e.stopPropagation();
  });
  
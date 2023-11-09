// Function that gets user input and validates it
function getValidInput(){
    let keepGoing = true;
    while ( KeepGoing = true ) {
        let value = prompt("Please enter a positive number between 1 and 100 for the grid size");
        if ( ( value > 100 ) || ( value < 0 ) || ( isNaN(value) ) ) {
            alert("Size must be a positive number between 0 and 100");
        }
        else {
            return value;
        };
        keepGoing = false;
    };
};

// Function that creates the grid
function gridMaker(size){ 
    let row = '';
    for (let i = size; i >= 1; i--) {
        row += 'x';
    }
    for (let i = size; i >= 1; i--) {
        console.log(row);
    }
    
};

// Program starts running here 

let size = getValidInput();
gridMaker(size);
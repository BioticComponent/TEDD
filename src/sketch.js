let allCells = [];
let landCells = [];
let roadCells = [];
let dim = 100; //size of grid

let counter = 0;

function setup() {
    let canvasSize = 600;
    createCanvas(canvasSize,canvasSize);
    background(50);
    initializeCellGrid();
    recursiveRoadGeneration(0, floor(dim / 2), 'r');
}

function draw() {
    background(50);
    for (let cell of allCells) {
        cell.show();
    }
    noLoop();
}
//create road map
function recursiveRoadGeneration(a, b, dir) {
    let roadLength;
    let stopValue = 10;
    if (dir == 'r') {
        roadLength = makeRoad(a, b, dir);
        if (roadLength > stopValue) {
            recursiveRoadGeneration(a + floor((roadLength/2) + random(-(roadLength/4),(roadLength/4))), b, 'u');
            recursiveRoadGeneration(a + floor((roadLength/2) + random(-(roadLength/4),(roadLength/4))), b, 'd');
        }
    } else if (dir == 'd') {
        roadLength = makeRoad(a, b, dir);
        if (roadLength > stopValue) {
            recursiveRoadGeneration(a, b + floor((roadLength/2) + random(-(roadLength/4),(roadLength/4))), 'l');
            recursiveRoadGeneration(a, b + floor((roadLength/2) + random(-(roadLength/4),(roadLength/4))), 'r');
        }
    } else if (dir == 'l') {
        roadLength = makeRoad(a, b, dir);
        if (roadLength > stopValue) {
            recursiveRoadGeneration(a - floor((roadLength/2) + random(-(roadLength/4),(roadLength/4))), b, 'u');
            recursiveRoadGeneration(a - floor((roadLength/2) + random(-(roadLength/4),(roadLength/4))), b, 'd');
        }
    } else if (dir == 'u') {
        roadLength = makeRoad(a, b, dir);
        if (roadLength > stopValue) {
            recursiveRoadGeneration(a, b - floor((roadLength/2) + random(-(roadLength/4),(roadLength/4))), 'l');
            recursiveRoadGeneration(a, b - floor((roadLength/2) + random(-(roadLength/4),(roadLength/4))), 'r');
        }
    }
    
}

//returns index in allCells that cell with i,j resides in
function cellIndex(i, j) {
    return i * dim + j;
}

//make a road from (a,b) to x spaces in direction dir
function makeRoad(a,b, dir) {
    if (dir != 'r' && dir != 'd' && dir != 'l' && dir != 'u') {
        noLoop();
        console.log("direction not recognized in call to makeRoad()");
        return;
    }
    let i = 0; 
    let counter2 = 0;
    let roadLength = 0;
    while (1) {
        let cell;
        if (dir == 'r') {
            if (!(cell = allCells[cellIndex(a + i, b)]) || a+i == dim) {
                return roadLength;
            }
        } else if (dir == 'd') {
            if (!(cell = allCells[cellIndex(a, b + i)]) || b+i == dim) {
                return roadLength;
            }
        } else if (dir == 'l') {
            if (!(cell = allCells[cellIndex(a - i, b)]) || a-i < 0) {
                return roadLength;
            }
        } else if (dir == 'u') {
            if (!(cell = allCells[cellIndex(a, b - i)]) || b-i < 0) {
                return roadLength;
            }
        }
        if (cell.designation == 1 && counter2 > 0) {    
            return roadLength;
        }
        cell.designation = 1;
        roadCells.push(cell);
        landCells.splice(getIndexInLC(cell), 1);
        i++; counter2++; roadLength++;
    }
}

//get cell index in landCells array
function getIndexInLC(cell) {
    return landCells.indexOf(cell);
}

//create grid of cells and insert them into cells array
function initializeCellGrid() {
    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            let pos = createVector(i * (width/dim), j * (width/dim));
            let cell = new Cell(i,j,pos, 0);
            allCells.push(cell);
            landCells.push(cell);
        }
    }
}
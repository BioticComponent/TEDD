let allCells = [];
let landCells = [];
let roadCells = [];
let dim = 100; //size of grid

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
    // noLoop();
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
//global variables
let allCells = [];
let landCells = [];
let roadCells = [];
let dim = 100; // how many cells x cells in map
let mapSize = 600; //size of map

let startCellButton;
let startCellButtonPressed = 0;
let endCellButton;
let endCellButtonPressed = 0;

//dijkstras
let startCell, currentCell, endCell;
let finished = 0;
let startCellisSet = 0;
let endCellisSet = 0;

function setup() {
    // randomSeed(2);
    createCanvas(mapSize + 150, mapSize);
    background(50);
    initializeCellGrid();
    recursiveRoadGeneration(0, floor((dim/2) + random(-(dim/4),(dim/4))), 'r');
    setNeighbors();

    setupUI();
}

function draw() {
    background(100);
    for (let cell of allCells) {
        cell.show();
    }
    drawNodes();
    checkForButtonsPressed();

    if (startCellisSet && endCellisSet && !finished) {
        dijkstras();
    } 
    if (finished) {
        displayFinalPath();
    }
    // noLoop();
}

function mousePressed() {
    if (startCellButtonPressed) {
        for (let cell of roadCells) {
            if (cell.rollover()) {
                startCell = cell;
                currentCell = startCell;
                startCellButtonPressed = 0;
                startCellisSet = 1;
            }
        }
    }
    if (endCellButtonPressed) {
        for (let cell of roadCells) {
            if (cell.rollover()) {
                endCell = cell;
                endCellButtonPressed = 0;
                endCellisSet = 1;
            }
        }
    }
}

//create grid of cells and insert them into cells array
function initializeCellGrid() {
    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            let pos = createVector(i * (mapSize/dim), j * (mapSize/dim));
            let cell = new Cell(i,j,pos, 0);
            allCells.push(cell);
            landCells.push(cell);
        }
    }
}

//set all neighbors for each road cell
function setNeighbors() {
    for (let i = 0; i < roadCells.length; i++) {
        let cell = roadCells[i];
        let iIndex = cell.i;
        let jIndex = cell.j;
        let index;
        
        index = cellIndex(iIndex - 1, jIndex);
        if (allCells[index] && allCells[index].designation == 1) {
            if (!cell.neighbors.includes(allCells[index])) {
                cell.neighbors.push(allCells[index]);
            }
        }
        index = cellIndex(iIndex + 1, jIndex);
        if (allCells[index] && allCells[index].designation == 1) {
            if (!cell.neighbors.includes(allCells[index])) {
                cell.neighbors.push(allCells[index]);
            }
        }
        if (jIndex != 0) {
            index = cellIndex(iIndex, jIndex - 1);
            if (allCells[index] && allCells[index].designation == 1) {
                if (!cell.neighbors.includes(allCells[index])) {
                    cell.neighbors.push(allCells[index]);
                }
            }
        }
        if (jIndex != dim - 1) {
            index = cellIndex(iIndex, jIndex + 1);
            if (allCells[index] && allCells[index].designation == 1) {
                if (!cell.neighbors.includes(allCells[index])) {
                    cell.neighbors.push(allCells[index]);
                }
            }
        }
    }
}

function drawNodes() {
    if (startCellisSet) {
        fill('green');
        ellipse(startCell.pos.x + (mapSize/dim)/2, startCell.pos.y + (mapSize/dim)/2, (mapSize/dim)*3);
    }
    if (endCellisSet) {
        fill('red');
        ellipse(endCell.pos.x + (mapSize/dim)/2, endCell.pos.y + (mapSize/dim)/2, (mapSize/dim)*3);
    }
}
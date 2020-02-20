//global variables
let allCells = [];
let landCells = [];
let roadCells = [];
let edgeRoadCells = [];
let drivers = [];
let dim = 100; // how many cells x cells in map
let mapSize = 600; //size of map

//UI
let startCellButtonPressed = 0;
let endCellButtonPressed = 0;

let hqCell;
//dijkstras
let startCellTP, currentCellTP, endCellTP;
let finishedTP = 0;
let startCellisSet = 0;
let endCellisSet = 0;

function setup() {
    // randomSeed(1);
    // frameRate(5);
    createCanvas(mapSize + 150, mapSize);
    background(50);

    do {
        fullReset();
        initializeCellGrid();
        setHeadQuarters();
        generateRoads();
    } while (isNotValidMap());
    getEdgeRoadCells();
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

    if (startCellisSet && endCellisSet && !finishedTP) {
        dijkstrasTestPoints();
    } 
    if (finishedTP) {
        displayFinalPathTestPoints();
    }

    showHeadQuarters();

    //move and display drivers
    for (let driver of drivers) {
        driver.move();
        driver.show();
    }
    // noLoop();
}

function mousePressed() {
    if (startCellButtonPressed) {
        for (let cell of roadCells) {
            if (cell.rollover()) {
                startCellTP = cell;
                currentCellTP = startCellTP;
                startCellButtonPressed = 0;
                startCellisSet = 1;
            }
        }
    }
    if (endCellButtonPressed) {
        for (let cell of roadCells) {
            if (cell.rollover()) {
                endCellTP = cell;
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

function setHeadQuarters() {
    hqCell = allCells[cellIndex(floor(dim/2),floor(dim/2))];
    let cornerCells = [];
    let lbCornerCell = allCells[cellIndex(hqCell.i - 8, hqCell.j)];
    cornerCells.push(lbCornerCell);
    let ltCornerCell = allCells[cellIndex(hqCell.i - 8, hqCell.j - 6)];
    cornerCells.push(ltCornerCell);
    let rtCornerCell = allCells[cellIndex(hqCell.i + 8, hqCell.j - 6)];
    cornerCells.push(rtCornerCell);
    let rbCornerCell = allCells[cellIndex(hqCell.i + 8, hqCell.j)];
    cornerCells.push(rbCornerCell);
    
    for (let cell of cornerCells) {
        cell.designation = 1;
        roadCells.push(cell);
        landCells.splice(getIndexInLC(cell), 1);
    }

    makeRoad(lbCornerCell.i, lbCornerCell.j,'r');
    makeRoad(rbCornerCell.i, rbCornerCell.j,'u');
    makeRoad(rtCornerCell.i, rtCornerCell.j,'l');
    makeRoad(ltCornerCell.i, ltCornerCell.j,'d');

}

function showHeadQuarters() {
    let referenceCell = allCells[cellIndex(hqCell.i - 6, hqCell.j - 4)];
    //HQ Building
    noStroke();
    fill(0);
    rect(referenceCell.pos.x - (mapSize/dim)/2, referenceCell.pos.y - (mapSize/dim)/2, (mapSize/dim)*6, (mapSize/dim)*4);
    textSize(16);
    fill(220);
    text('HQ', referenceCell.pos.x + 3, referenceCell.pos.y + 15);
    //HQ Parking Lot
    fill(100);
    rect(referenceCell.pos.x + (mapSize/dim)*5.5, referenceCell.pos.y - (mapSize/dim)/2, (mapSize/dim)*8, (mapSize/dim)*4);
    rect(referenceCell.pos.x + (mapSize/dim)*5.5, referenceCell.pos.y + (mapSize/dim)*3.5, (mapSize/dim)*2, (mapSize/dim)/2);
    stroke(255);
    strokeWeight(1);
    line(referenceCell.pos.x + (mapSize/dim)*7.5, referenceCell.pos.y + (mapSize/dim)*1.5, referenceCell.pos.x + (mapSize/dim)*13.5, referenceCell.pos.y + (mapSize/dim)*1.5);
    for (let i = 0; i < 4; i++) {
        line(referenceCell.pos.x + (mapSize/dim)*(7.5 + i * 2), referenceCell.pos.y, referenceCell.pos.x + (mapSize/dim)*(7.5 + i * 2), referenceCell.pos.y + (mapSize/dim)*3);
    }
}

function getEdgeRoadCells() {
    let i, j;
    i = 0
    for (j = 0; j < dim - 1; j++) {
        if (allCells[cellIndex(i,j)].designation == 1) {
            edgeRoadCells.push(allCells[cellIndex(i,j)]);
        }
    }
    j = dim - 1;
    for (i = 0; i < dim - 1; i++) {
        if (allCells[cellIndex(i,j)].designation == 1) {
            edgeRoadCells.push(allCells[cellIndex(i,j)]);
        }
    }
    i = dim - 1;
    for (j = 0; j < dim - 1; j++) {
        if (allCells[cellIndex(i,j)].designation == 1) {
            edgeRoadCells.push(allCells[cellIndex(i,j)]);
        }
    }
    j = 0;
    for (i = 0; i < dim - 1; i++) {
        if (allCells[cellIndex(i,j)].designation == 1) {
            edgeRoadCells.push(allCells[cellIndex(i,j)]);
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
        ellipse(startCellTP.pos.x + (mapSize/dim)/2, startCellTP.pos.y + (mapSize/dim)/2, (mapSize/dim)*3);
    }
    if (endCellisSet) {
        fill('red');
        ellipse(endCellTP.pos.x + (mapSize/dim)/2, endCellTP.pos.y + (mapSize/dim)/2, (mapSize/dim)*3);
    }
}
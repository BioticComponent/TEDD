//global variables
let allCells = [];
let landCells = [];
let roadCells = [];
let edgeRoadCells = [];
let noBuildCells = [];
let hqCell;

let drivers = [];
let driversOnShift = 0;

let dim = 100; // how many cells x cells in map
let mapSize = 600; //size of map

let buildings;

let cellDrawIteration = 0;


function setup() {
    // randomSeed(1);
    createCanvas(mapSize + 150, mapSize);
    
    buildings = createGraphics(mapSize, mapSize);

    do {
        fullReset();
        initializeCellGrid();
        setHeadQuarters();
        generateRoads();   
        makeBuildings();   
    } while (isNotValidMap());
    getEdgeRoadCells();
    setNeighbors();
    makeBuildings();
    hireDrivers();
    

    setupUI();
}

function draw() {
    background(100);
    imageMode(CORNER);
    image(buildings,0,0);

    cellDrawIteration = 0;
    for (let cell of allCells) {
        cell.show();
    }
    cellDrawIteration = 1;
    for (let cell of allCells) {
        cell.show();
    }
    
    showHeadQuarters();

    for(let cell of noBuildCells) {
        fill('red');
        rect(cell.pos.x, cell.pos.y, (mapSize/dim), (mapSize/dim));
    }

    //move and display drivers
    for (let driver of drivers) {
        driver.move();
        driver.show();
    }

    showBoundaries();
    // noLoop();
}

function hireDrivers() {
    let availableColors = [color('red'), color('cyan'), color('yellow'), color('white'), color('orange'), color('magenta')];
    for (let i = 0; i < 6; i++) {
        let driver = new Driver();
        driver.parkingSpot = i + 1;
        driver.color = availableColors[i];
        // driver.path = dijkstrasAtoB(driver.inlet, hqCell);
        driver.location = hqCell;
        drivers.push(driver);
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
    //HQ grass boundary
    noStroke();
    fill(50,150,50);
    rect(referenceCell.pos.x - (mapSize/dim), referenceCell.pos.y - (mapSize/dim), mapSize/dim*15, mapSize/dim*5);
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

function makeBuildings() {
    buildings.background(60,179,113);
    buildings.noStroke();
    let x,y;
    for (let i = 0; i < 320; i++) {
        if (i < 80) {
            x = random(0,mapSize/2);
            y = random(0,mapSize/2);
        } else if (i < 160) {
            x = random(0,mapSize/2);
            y = random(mapSize/2,mapSize);
        } else if (i < 240) {
            x = random(mapSize/2,mapSize);
            y = random(0,mapSize/2);
        } else {
            x = random(mapSize/2,mapSize);
            y = random(mapSize/2,mapSize);
        }
        let xlen = random(40, 60);
        let ylen = random(40, 60);
        buildings.fill(random(100,200));
        buildings.rect(x,y,xlen,ylen);
    }
}

//an implementation for a more specific makeBuilding function
//currently not using this, but keeping it for safe keeping in case i change my mind later
// function removeNonBuildingCells() {
//     //remove roads
//     for (let roadCell of roadCells) {
//         noBuildCells.push(roadCell);
//     }
//     //remove edges
//     for (let i = 0; i < dim; i++) {
//         noBuildCells.push(allCells[cellIndex(i,0)]);
//         noBuildCells.push(allCells[cellIndex(i,dim-1)]);
//         noBuildCells.push(allCells[cellIndex(0,i)]);
//         noBuildCells.push(allCells[cellIndex(dim-1,i)]);
//     }
//     //remove HQ plot
//     let refCell = allCells[cellIndex(hqCell.i - 7, hqCell.j - 5)];
//     for (let i = 0; i < 15; i++) {
//         for (let j = 0; j < 5; j++) {
//             noBuildCells.push(allCells[cellIndex(refCell.i + i, refCell.j + j)]);
//         }
//     }
//     //remove one unit wide plots
//     for (let i = 0; i < landCells.length; i++) {
//         refCell = landCells[i];
//         if (refCell.i != 0 && refCell.i != dim - 1 && refCell.j != 0 && refCell.j != dim - 1) {
//             if (noBuildCells.includes(allCells[cellIndex(refCell.i - 1, refCell.j)]) && noBuildCells.includes(allCells[cellIndex(refCell.i + 1, refCell.j)])) {
//                 noBuildCells.push(refCell);
//             }
//             if (noBuildCells.includes(allCells[cellIndex(refCell.i, refCell.j - 1)]) && noBuildCells.includes(allCells[cellIndex(refCell.i, refCell.j + 1)])) {
//                 noBuildCells.push(refCell);
//             }
//         }
//     }
// }

function showBoundaries() {
    stroke(255);
    strokeWeight(10);
    noFill();
    rect(0,0,mapSize,mapSize);
    rect(0,0,width, mapSize);
}
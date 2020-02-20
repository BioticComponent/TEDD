function setupUI() {
    pickStartCellButton();
    pickEndCellButton();
    createResetPointsButton();
    generateNewMapButton();
    createAddDriverButton();
    createRemoveDriverButton();
}

//FOR TESTING PURPOSES -- pick points /////////////////////////////////////////////

function checkForButtonsPressed() {
    if (startCellButtonPressed) {
        for (let cell of roadCells) {
            if (cell.rollover()) {
                fill('green');
                ellipse(cell.pos.x + (mapSize/dim)/2, cell.pos.y + (mapSize/dim)/2, (mapSize/dim)*3);
            }
        }
    }
    if (endCellButtonPressed) {
        for (let cell of roadCells) {
            if (cell.rollover()) {
                fill('red');
                ellipse(cell.pos.x + (mapSize/dim)/2, cell.pos.y + (mapSize/dim)/2, (mapSize/dim)*3);
            }
        }
    }
}

function pickStartCellButton() {
    let startCellButton = createButton('Pick Start Point');
    startCellButton.position(width - 127, 30);
    startCellButton.size(55, 50);
    startCellButton.mousePressed(pickStartCell);
}

function pickStartCell() {
    startCellisSet = 0;
    startCellButtonPressed = 1;
}

function pickEndCellButton() {
    let endCellButton = createButton('Pick End Point');
    endCellButton.position(width - 62, 30);
    endCellButton.size(55, 50);
    endCellButton.mousePressed(pickEndCell);
}

function pickEndCell() {
    endCellisSet = 0;
    endCellButtonPressed = 1;
}

function createResetPointsButton() {
    let resetPointsButton = createButton('Reset Points');
    resetPointsButton.position(width - 127, 90);
    resetPointsButton.size(120, 40);
    resetPointsButton.mousePressed(resetPoints);
}

function resetPoints() {
    for (let cell of allCells) {
        cell.path.splice(0,cell.path.length);
    }
    finishedTP = 0;
    startCellisSet = 0;
    endCellisSet = 0;
    startCellButtonPressed = 0;
    endCellButtonPressed = 0;
}

//generate new map button//////////////////////////////////////////////////////////
function generateNewMapButton() {
    newMapButton = createButton('Generate New Map');
    newMapButton.position(width - 127, 140);
    newMapButton.size(120, 40);
    newMapButton.mousePressed(generateNewMap);
}

function generateNewMap() {
    
    do {
        fullReset();
        initializeCellGrid();
        setHeadQuarters();
        generateRoads();
    } while (isNotValidMap());
    getEdgeRoadCells();
    setNeighbors();
}


//adding and removing drivers//////////////////////////////////////////////////////
function createAddDriverButton() {
    let addDriverButton = createButton('Add Driver');
    addDriverButton.position(width - 127, 190);
    addDriverButton.size(55, 40);
    addDriverButton.mousePressed(addDriver);
}

function addDriver() {
    let availableColors = [color('red'), color('cyan'), color('yellow'), color('white'), color('orange'), color('magenta')];
    if (drivers.length < 6) {
        let driver = new Driver();
        driver.parkingSpot = drivers.length + 1;
        driver.color = availableColors[driver.parkingSpot - 1];
        driver.path = dijkstrasAtoB(driver.inlet, hqCell);
        drivers.push(driver);
    }
}

function createRemoveDriverButton() {
    let removeDriverButton = createButton('Remove Driver');
    removeDriverButton.position(width - 62, 190);
    removeDriverButton.size(55, 40);
    removeDriverButton.mousePressed(removeDriver);
}

function removeDriver() {
    if (drivers.length > 0) {
        drivers.splice(drivers.length - 1, 1);
    }
}

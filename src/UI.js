function setupUI() {
    generateNewMapButton();
    createAddDriverButton();
    createRemoveDriverButton();
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

function setupUI() {
    generateNewMapButton();
    createAddDriverButton();
    createRemoveDriverButton();
}

//generate new map button//////////////////////////////////////////////////////////
function generateNewMapButton() {
    newMapButton = createButton('Generate New Map');
    newMapButton.position(width - 127, 25);
    newMapButton.size(120, 40);
    newMapButton.mousePressed(generateNewMap);
}

function generateNewMap() {
    do {
        fullReset();
        initializeCellGrid();
        setHeadQuarters();
        generateRoads();
        makeBuildings(); 
    } while (isNotValidMap());
    getEdgeRoadCells();
    setNeighbors();
    hireDrivers();
}


//adding and removing drivers//////////////////////////////////////////////////////
function createAddDriverButton() {
    let addDriverButton = createButton('Add Driver');
    addDriverButton.position(width - 127, 75);
    addDriverButton.size(55, 40);
    addDriverButton.mousePressed(addDriver);
}

function addDriver() {
    if (driversOnShift < 6 && drivers[driversOnShift].onShift == false) {
        drivers[driversOnShift].onShift = true;
        drivers[driversOnShift].awayFromHQ = false;
        driversOnShift++;
    }
}

function createRemoveDriverButton() {
    let removeDriverButton = createButton('Remove Driver');
    removeDriverButton.position(width - 62, 75);
    removeDriverButton.size(55, 40);
    removeDriverButton.mousePressed(removeDriver);
}

function removeDriver() {
    if (driversOnShift > 0 && drivers[driversOnShift - 1].onShift == true) {
        drivers[driversOnShift - 1].onShift = false;
        drivers[driversOnShift - 1].awayFromHQ = false;
        driversOnShift--;
    }
}

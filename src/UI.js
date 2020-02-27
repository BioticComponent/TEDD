function setupUI() {
    createNewMapButton();
    createNumDriversSlider();
    createStartSimulationButton();
}

function updateUI() {
    noStroke();
    fill(220);
    textSize(14);
    text('Num Drivers: ' + numDriversSlider.value(), width - 125, 130);
}

//generate new map button//////////////////////////////////////////////////////////
function createNewMapButton() {
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

function createNumDriversSlider() {
    numDriversSlider = createSlider(1,6,6,1);
    numDriversSlider.position(width - 120, 150);
    numDriversSlider.size(100);
    
}

function createStartSimulationButton() {
    startSimulationButton = createButton('Start Simulation');
    startSimulationButton.position(width - 127, 75);
    startSimulationButton.size(120, 40);
    startSimulationButton.mousePressed(startSimulation);
}

function startSimulation() {
    simulationsStartSequence = 1;
    startSimulationButton.attribute('disabled', '');
    newMapButton.attribute('disabled', '');
    clockInDrivers();
    numDriversSlider.attribute('disabled', '');
    
}

function clockInDrivers() {
    for (let i = 0; i < numDriversSlider.value(); i++) {
        driversOnShift.push(driverRoster[i]);
    }
}

//adding and removing drivers//////////////////////////////////////////////////////
// function createAddDriverButton() {
//     let addDriverButton = createButton('Add Driver');
//     addDriverButton.position(width - 127, 75);
//     addDriverButton.size(55, 40);
//     addDriverButton.mousePressed(addDriver);
// }

// function addDriver() {
//     if (driversOnShift < 6 && drivers[driversOnShift].onShift == false) {
//         drivers[driversOnShift].onShift = true;
//         drivers[driversOnShift].awayFromHQ = false;
//         driversOnShift++;
//     }
// }

// function createRemoveDriverButton() {
//     let removeDriverButton = createButton('Remove Driver');
//     removeDriverButton.position(width - 62, 75);
//     removeDriverButton.size(55, 40);
//     removeDriverButton.mousePressed(removeDriver);
// }

// function removeDriver() {
//     if (driversOnShift > 0 && drivers[driversOnShift - 1].onShift == true) {
//         drivers[driversOnShift - 1].onShift = false;
//         drivers[driversOnShift - 1].awayFromHQ = false;
//         driversOnShift--;
//     }
// }


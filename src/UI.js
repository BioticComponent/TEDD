function setupUI() {
    createNewMapButton();
    createNumDriversSlider();
    createStartSimulationButton();
    createSpeedOfSimulationSlider();
}

function updateUI() {
    noStroke();
    fill(220);
    textSize(14);
    text('Num Drivers: ' + numDriversSlider.value(), width - 125, 130);
    textSize(12);
    text('Simulation Speed:',width - 125, 540);

    if (simulationRunning) {
        masterQueueVisual(width - 135, 175);
    }
    
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
    } while (isNotValidMap());
    getEdgeRoadCells();
    setNeighbors();
    makeBuildings();
    hireDrivers();
    setDeliverySchedule();
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
    setDeliverySchedule();
    setDriverRoutes();
    numDriversSlider.attribute('disabled', '');
}

function clockInDrivers() {
    for (let i = 0; i < numDriversSlider.value(); i++) {
        driversOnShift.push(driverRoster[i]);
    }
}

function setDeliverySchedule() {
    let time = 0;
    let num = numDriversSlider.value();
    let counter = 0;
    for(let i = 0; i < 100; i++) {
        let delivery = new Event();
        delivery.address = roadCells[floor(random(0,roadCells.length-1))];
        delivery.orderTime = time;
        delivery.deliverBy = time + 1000;
        delivery.driverAssignment = counter;
        counter++;
        if (counter == num) {
            counter = 0;
        }
        time += floor(random(500,2000));
        masterQueue.enqueue(delivery);
    }
}

function setDriverRoutes() {
    for (let i = 0; i < masterQueue.deliveries.length; i++) {
        let thisEvent = masterQueue.deliveries[i];
        let addedPath = dijkstrasAtoB(hqCell, thisEvent.address);
        let homePath = dijkstrasAtoB(thisEvent.address, hqCell);
        let driver = driversOnShift[thisEvent.driverAssignment];
        driver.path = driver.path.concat(addedPath);
        driver.path = driver.path.concat(homePath);
        driver.myEvents.push(thisEvent);
    }
}

function createSpeedOfSimulationSlider() {
    speedOfSimulationSlider = createSlider(10,40,40,5);
    speedOfSimulationSlider.position(width - 120, 560);
    speedOfSimulationSlider.size(100);
}

//visualize queue and delivery destinations
function masterQueueVisual(x,y) {
    stroke(0);
    strokeWeight(2);
    fill(220);
    rectMode(CORNER);
    let queueHeight = 340;
    let items = 6;
    rect(x,y, 120, queueHeight);
    let xVal, yVal, viewEvent, viewEventCell;
    for (let i = 0; i < items; i++) {
        xVal = x;
        yVal = y + (queueHeight/items*i);
        stroke(0);
        strokeWeight(2);
        noFill();
        rect(xVal,yVal, 120, queueHeight/items);
        viewEvent = masterQueue.deliveries[i];
        if (viewEvent) {
            viewEventCell = viewEvent.address;
        } else {
            return;
        }
        
        noStroke();
        fill(0);
        textSize(10);
        text('To ' + viewEventCell.i + ', ' + viewEventCell.j, xVal + 15, yVal + 15); 
        fill(driversOnShift[viewEvent.driverAssignment].color);
        stroke(0);
        rect(xVal + 70, yVal + 5, 10, 10); 
        stroke(driversOnShift[viewEvent.driverAssignment].color);
        noFill();
        ellipse(viewEventCell.pos.x + (mapSize/dim)/2, viewEventCell.pos.y+ (mapSize/dim)/2, 15);
    }
    
}

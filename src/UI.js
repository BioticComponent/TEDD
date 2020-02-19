function setupUI() {
    pickStartCellButton();
    pickEndCellButton();
    resetButton();
    generateNewMapButton();
}

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
    startCellButton = createButton('Pick Start Point');
    startCellButton.position(width - 127, 30);
    startCellButton.size(120, 40);
    startCellButton.mousePressed(pickStartCell);
}

function pickStartCell() {
    startCellisSet = 0;
    startCellButtonPressed = 1;
}

function pickEndCellButton() {
    endCellButton = createButton('Pick End Point');
    endCellButton.position(width - 127, 90);
    endCellButton.size(120, 40);
    endCellButton.mousePressed(pickEndCell);
}

function pickEndCell() {
    endCellisSet = 0;
    endCellButtonPressed = 1;
}

function resetButton() {
    reset = createButton('Reset');
    reset.position(width - 127, 150);
    reset.size(120, 40);
    reset.mousePressed(resetPoints);
}

function generateNewMapButton() {
    newMapButton = createButton('Generate New Map');
    newMapButton.position(width - 127, 210);
    newMapButton.size(120, 40);
    newMapButton.mousePressed(generateNewMap);
}

function generateNewMap() {
    fullReset();
    initializeCellGrid();
    setHeadQuarters();
    generateRoads();
    setNeighbors();
}


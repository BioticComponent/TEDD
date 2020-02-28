//returns index in allCells that cell with i,j resides in
function cellIndex(i, j) {
    return i * dim + j;
}

//get cell index in landCells array
function getIndexInLC(cell) {
    return landCells.indexOf(cell);
}

function fullReset() {
    allCells.length = 0;
    landCells.length = 0;
    roadCells.length = 0;
    edgeRoadCells.length = 0;
    driverRoster.length = 0;
    driversOnShift.length = 0;
    masterQueue.deliveries.length = 0;
}
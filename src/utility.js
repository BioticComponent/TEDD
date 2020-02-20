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
    startCellButtonPressed = 0;
    endCellButtonPressed = 0;
    finishedTP = 0;
    startCellisSet = 0;
    endCellisSet = 0;
    startCellTP = null;
    currentCellTP = null; 
    endCellTP = null;
}
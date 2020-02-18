//returns index in allCells that cell with i,j resides in
function cellIndex(i, j) {
    return i * dim + j;
}

//get cell index in landCells array
function getIndexInLC(cell) {
    return landCells.indexOf(cell);
}

function resetPoints() {
    for (let cell of allCells) {
        cell.path.splice(0,cell.path.length);
    }
    finished = 0;
    startCellisSet = 0;
    endCellisSet = 0;
    startCellButtonPressed = 0;
    endCellButtonPressed = 0;
}

function fullReset() {
    allCells.length = 0;
    landCells.length = 0;
    roadCells.length = 0;
    startCellButtonPressed = 0;
    endCellButtonPressed = 0;
    finished = 0;
    startCellisSet = 0;
    endCellisSet = 0;
    startCell = null;
    currentCell = null; 
    endCell = null;
}
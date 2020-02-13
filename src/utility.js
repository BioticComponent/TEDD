//returns index in allCells that cell with i,j resides in
function cellIndex(i, j) {
    return i * dim + j;
}

//get cell index in landCells array
function getIndexInLC(cell) {
    return landCells.indexOf(cell);
}
function dijkstrasTestPoints() {
    let visited = [];
    let unvisited = [];
    for (let cell of roadCells) {
        unvisited.push(cell);
        cell.tentDist = Infinity;
    }
    // visited.push(startCellTP);
    startCellTP.path.push(startCellTP);
    startCellTP.tentDist = 0;

    while (currentCellTP != endCellTP) {
        let testCell, newDist;
        for (let i = 0; i < currentCellTP.neighbors.length; i++) {
            testCell = currentCellTP.neighbors[i];
            if (unvisited.includes(testCell)) {
                newDist = currentCellTP.tentDist + 1;
                if (newDist < testCell.tentDist) {
                    testCell.tentDist = newDist;
                    testCell.path.splice(0, testCell.path.length);
                    arrayCopy(currentCellTP.path, testCell.path);
                    testCell.path.push(testCell);
                }
            }
        }
        visited.push(currentCellTP);
        let index = unvisited.indexOf(currentCellTP);
        unvisited.splice(index, 1);
        let low = Infinity;
        let savedIndex;
        for (let i = 0; i < unvisited.length; i++) {
            if (unvisited[i].tentDist < low) {
                low = unvisited[i].tentDist;
                savedIndex = i;
            }
        }
        currentCellTP = unvisited[savedIndex];
    }
    finishedTP = 1;
}

function displayFinalPathTestPoints() {
    for (let i = 0; i < endCellTP.path.length; i++) {
        strokeWeight(10);
        stroke('yellow')
        point(endCellTP.path[i].pos.x, endCellTP.path[i].pos.y)
    }
}

function dijkstrasAtoB(A, B) {
    clearCellPaths();
    let path = [];
    let startCell, currentCell, endCell;
    currentCell = startCell = A;
    endCell = B;

    let visited = [];
    let unvisited = [];
    for (let cell of roadCells) {
        unvisited.push(cell);
        cell.tentDist = Infinity;
    }
    startCell.path.push(startCell);
    startCell.tentDist = 0;

    while (currentCell != endCell) {
        let testCell, newDist;
        for (let i = 0; i < currentCell.neighbors.length; i++) {
            testCell = currentCell.neighbors[i];
            if (unvisited.includes(testCell)) {
                newDist = currentCell.tentDist + 1;
                if (newDist < testCell.tentDist) {
                    testCell.tentDist = newDist;
                    testCell.path.splice(0, testCell.path.length);
                    arrayCopy(currentCell.path, testCell.path);
                    testCell.path.push(testCell);
                }
            }
        }
        visited.push(currentCell);
        let index = unvisited.indexOf(currentCell);
        unvisited.splice(index, 1);
        let low = Infinity;
        let savedIndex;
        for (let i = 0; i < unvisited.length; i++) {
            if (unvisited[i].tentDist < low) {
                low = unvisited[i].tentDist;
                savedIndex = i;
            }
        }
        currentCell = unvisited[savedIndex];
    }

    return endCell.path;
}

function clearCellPaths() {
    for (let i = 0; i < allCells.length; i++) {
        allCells[i].path.splice(0,allCells[i].path.length);
    }
}
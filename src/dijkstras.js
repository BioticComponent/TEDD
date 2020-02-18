function dijkstras() {
    let visited = [];
    let unvisited = [];
    for (let cell of roadCells) {
        unvisited.push(cell);
        cell.tentDist = Infinity;
    }
    // visited.push(startCell);
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
    finished = 1;
}

function displayFinalPath() {
    for (let i = 0; i < endCell.path.length; i++) {
        strokeWeight(10);
        stroke('yellow')
        point(endCell.path[i].pos.x, endCell.path[i].pos.y)
    }
}
function generateRoads() {
    recursiveRoadGeneration(hqCell.i, hqCell.j - 6, 'u');
    recursiveRoadGeneration(hqCell.i, hqCell.j, 'd');
    recursiveRoadGeneration(hqCell.i - 8, hqCell.j - 3, 'l');
    recursiveRoadGeneration(hqCell.i + 8, hqCell.j - 3, 'r');

}

function isNotValidMap() {
    let surroundingCellCount;
    for (cell of roadCells) {
        surroundingCellCount = 0;
        if (allCells[cellIndex(cell.i + 1, cell.j)] && allCells[cellIndex(cell.i + 1, cell.j)].designation == 1) {
            surroundingCellCount++;
        }
        if (allCells[cellIndex(cell.i + 1, cell.j + 1)] && allCells[cellIndex(cell.i + 1, cell.j + 1)].designation == 1) {
            surroundingCellCount++;
        }
        if (allCells[cellIndex(cell.i, cell.j + 1)] && allCells[cellIndex(cell.i, cell.j + 1)].designation == 1) {
            surroundingCellCount++;
        }
        if (surroundingCellCount == 3) {
            return 1;
        }
    }
    return 0;
}

//create road map
function recursiveRoadGeneration(a, b, dir) {
    if (dir != 'r' && dir != 'd' && dir != 'l' && dir != 'u') {
        noLoop();
        console.log("direction not recognized in call to recursiveRoadGeneration()");
        return;
    }
    let roadLength;
    let stopValue = 8;
    if (dir == 'r') {
        roadLength = makeRoad(a, b, dir);
        if (roadLength > stopValue) {
            recursiveRoadGeneration(a + floor((roadLength/2) + random(-(roadLength/4),(roadLength/4))), b, 'u');
            recursiveRoadGeneration(a + floor((roadLength/2) + random(-(roadLength/4),(roadLength/4))), b, 'd');
        }
    } else if (dir == 'd') {
        roadLength = makeRoad(a, b, dir);
        if (roadLength > stopValue) {
            recursiveRoadGeneration(a, b + floor((roadLength/2) + random(-(roadLength/4),(roadLength/4))), 'l');
            recursiveRoadGeneration(a, b + floor((roadLength/2) + random(-(roadLength/4),(roadLength/4))), 'r');
        }
    } else if (dir == 'l') {
        roadLength = makeRoad(a, b, dir);
        if (roadLength > stopValue) {
            recursiveRoadGeneration(a - floor((roadLength/2) + random(-(roadLength/4),(roadLength/4))), b, 'u');
            recursiveRoadGeneration(a - floor((roadLength/2) + random(-(roadLength/4),(roadLength/4))), b, 'd');
        }
    } else if (dir == 'u') {
        roadLength = makeRoad(a, b, dir);
        if (roadLength > stopValue) {
            recursiveRoadGeneration(a, b - floor((roadLength/2) + random(-(roadLength/4),(roadLength/4))), 'l');
            recursiveRoadGeneration(a, b - floor((roadLength/2) + random(-(roadLength/4),(roadLength/4))), 'r');
        }
    }
}

//make a road from (a,b) in direction dir. road ends when it hits another road or end of map
function makeRoad(a,b, dir) {
    if (dir != 'r' && dir != 'd' && dir != 'l' && dir != 'u') {
        noLoop();
        console.log("direction not recognized in call to makeRoad()");
        return;
    }
    let i = 0; 
    let counter = 0;
    let roadLength = 0;
    while (1) {
        let cell;
        if (dir == 'r') {
            if (!(cell = allCells[cellIndex(a + i, b)]) || a+i == dim) {
                return roadLength;
            }
        } else if (dir == 'd') {
            if (!(cell = allCells[cellIndex(a, b + i)]) || b+i == dim) {
                return roadLength;
            }
        } else if (dir == 'l') {
            if (!(cell = allCells[cellIndex(a - i, b)]) || a-i < 0) {
                return roadLength;
            }
        } else if (dir == 'u') {
            if (!(cell = allCells[cellIndex(a, b - i)]) || b-i < 0) {
                return roadLength;
            }
        }
        if (cell.designation == 1 && counter > 0) {    
            return roadLength;
        }
        cell.designation = 1;
        roadCells.push(cell);
        landCells.splice(getIndexInLC(cell), 1);
        i++; counter++; roadLength++;
    }
}
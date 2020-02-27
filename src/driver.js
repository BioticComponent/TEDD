class Driver {
    constructor() {
        this.color;
        this.parkingSpot;
        this.onShift = false;
        this.awayFromHQ = false;
        this.path = [];
        this.pathPosition = 0;
        this.location = hqCell;
    }

    //NEEDS FIXIN
    move() {
        if (this.awayFromHQ == true && this.onShift == true) {
            if (this.pathPosition < this.path.length - 1) {
                this.pathPosition += 1;
                this.location = this.path[this.pathPosition];
                if (this.location == hqCell && this.pathPosition == this.path.length - 1) {
                    this.awayFromHQ = false;
                    this.path.length = 0;
                    this.pathPosition = 0;
                }
            }
        }
        
    }

    show() {
        let getCell;
        if (this.onShift) {
            if (this.awayFromHQ == false) {
                noStroke();
                fill(this.color);
                //PARKING SPOTS AT HQ
                switch(this.parkingSpot) {
                    case 1:
                        getCell = allCells[cellIndex(hqCell.i + 2, hqCell.j - 2)];
                        rect(getCell.pos.x, getCell.pos.y, (mapSize/dim), (mapSize/dim));
                        break;
                    case 2:
                        getCell = allCells[cellIndex(hqCell.i + 4, hqCell.j - 2)];
                        rect(getCell.pos.x, getCell.pos.y, (mapSize/dim), (mapSize/dim));
                        break;
                    case 3:                   
                        getCell = allCells[cellIndex(hqCell.i + 6, hqCell.j - 2)];
                        rect(getCell.pos.x, getCell.pos.y, (mapSize/dim), (mapSize/dim));
                        break;
                    case 4:
                        getCell = allCells[cellIndex(hqCell.i + 2, hqCell.j - 4)];
                        rect(getCell.pos.x, getCell.pos.y, (mapSize/dim), (mapSize/dim));
                        break;
                    case 5:
                        getCell = allCells[cellIndex(hqCell.i + 4, hqCell.j - 4)];
                        rect(getCell.pos.x, getCell.pos.y, (mapSize/dim), (mapSize/dim));
                        break;
                    case 6:
                        getCell = allCells[cellIndex(hqCell.i + 6, hqCell.j - 4)];
                        rect(getCell.pos.x, getCell.pos.y, (mapSize/dim), (mapSize/dim));
                        break;
                    default:
                        console.log("too many drivers!");
                        break;
                }
            } else { //driver is driving, show current location
                noStroke();
                fill(this.color);
                rectMode(CENTER);
                rect(this.location.pos.x + (mapSize/dim)/2,this.location.pos.y + (mapSize/dim)/2,(mapSize/dim)*2, (mapSize/dim)*2);
            }
        }
    }
}
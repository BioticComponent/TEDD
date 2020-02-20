class Driver {
    constructor() {
        this.color;
        this.parkingSpot;
        this.location = hqCell;
        this.isDelivering = true;
        this.path = [];
        this.pathPosition = 0;
        this.inlet = edgeRoadCells[floor(random(0,edgeRoadCells.length - 1))];
    }

    move() {
        if (this.isDelivering == true) {
            if (this.pathPosition < this.path.length - 5) {
                this.pathPosition += 5;
            } else {
                this.isDelivering = false;
                
            }
        }
        
    }

    show() {
        let getCell;
        if (this.isDelivering == false) {
            noStroke();
            fill(this.color);
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
        } else {
            getCell = this.path[this.pathPosition];
            noStroke();
            fill(this.color);
            rect(getCell.pos.x,getCell.pos.y,(mapSize/dim), (mapSize/dim));
        }
    }
}
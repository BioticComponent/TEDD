class Cell {
    constructor(i,j,pos, designation) {
        this.i = i; //i-index of cell
        this.j = j; //j-index of cell
        this.pos = pos; //position coordinates (x,y)
        this.designation = designation; //0 for land cell, 1 for road cell
        this.neighbors = []; //array of surrounding road cells for each road cell, empty if land cell
        this.tentDist = 0; //hold tentative distance for dijkstras algorithm
        this.path = []; //holds path from startCell to this cell
    }

    show() {
        noStroke();
        if (allCells[cellIndex(this.i,this.j)] == hqCell) {
            fill('red');
        } else if (this.designation == 1) { //is roadCell 
            fill(0);
        } else { //is landCell
            fill(200,255,200);
        }
        rectMode(CORNER);
        rect(this.pos.x, this.pos.y, mapSize/dim, mapSize/dim)
        if (this.designation == 1) {
            fill(150);
            rectMode(CENTER);
            rect(this.pos.x + mapSize/dim/2, this.pos.y + mapSize/dim/2, mapSize/dim/5, mapSize/dim/5 )
        }
    }

    rollover() {
        // return ((mouseX > this.pos.x) && (mouseX < this.pos.x + mapSize/dim) && (mouseY > this.pos.y) && (mouseY < this.pos.y + mapSize/dim));
        return (dist(this.pos.x + (mapSize/dim)/2, this.pos.y + (mapSize/dim)/2, mouseX, mouseY) < (mapSize/dim)/2);
    }

}
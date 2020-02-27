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
        rectMode(CORNER);
        if (this.designation == 1) { //is roadCell 
            if (cellDrawIteration == 0) {
                fill(220);
                rect(this.pos.x - 2, this.pos.y - 2, mapSize/dim + 4, mapSize/dim + 4);
            } else {
                fill(0);
                rect(this.pos.x, this.pos.y, mapSize/dim, mapSize/dim)
                fill(200);
                rectMode(CENTER);
                rect(this.pos.x + mapSize/dim/2, this.pos.y + mapSize/dim/2, mapSize/dim/4, mapSize/dim/4 )
            }
        } 
        
        
        
    }

    rollover() {
        
        return (dist(this.pos.x + (mapSize/dim)/2, this.pos.y + (mapSize/dim)/2, mouseX, mouseY) < (mapSize/dim)/2);
    }

}
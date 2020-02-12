class Cell {
    constructor(i,j,pos, designation) {
        this.i = i; //i-index of cell
        this.j = j; //j-index of cell
        this.pos = pos; //position coordinates (x,y)
        this.designation = designation; //0 for land cell, 1 for road cell
        this.neighbors = []; //array of surrounding road cells for each road cell, empty if land cell
    }

    show() {
        noStroke();
        if (this.designation == 1) { //is roadCell 
            fill(0);
        } else { //is landCell
            fill(255);
        }
        rect(this.pos.x, this.pos.y, width/dim, width/dim)
    }

}
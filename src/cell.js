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
            fill(220);
        }
        rectMode(CORNER);
        rect(this.pos.x, this.pos.y, width/dim, width/dim)
        if (this.designation == 1) {
            fill(150);
            rectMode(CENTER);
            rect(this.pos.x + width/dim/2, this.pos.y + width/dim/2, width/dim/5, width/dim/5 )
        }
    }

}
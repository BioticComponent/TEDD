class Cell {
    constructor(i,j,pos) {
        this.i = i;
        this.j = j;
        this.pos = pos;
    }

    show() {
        rect(this.pos.x, this.pos.y, width/dim, width/dim)
    }

}
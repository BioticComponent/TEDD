let cells = [];
let dim = 10; //size of grid

function setup() {
    createCanvas(400,400);
    background(50);
    initializeCellGrid();
}

function draw() {
    background(50);
    for (let cell of cells) {
        cell.show();
    }
}

function initializeCellGrid() {
    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            let pos = createVector(i * (width/dim), j * (width/dim));
            let cell = new Cell(i,j,pos);
            cells.push(cell);
        }
    }
}
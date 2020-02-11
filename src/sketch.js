let x = 0;

function setup() {
    createCanvas(windowWidth,windowHeight);
    background(50);
}

function draw() {
    background(50);
    fill('red');
    ellipse(x, height/2, 30);
    x++;
    if (x > width) x = 0;
}

function drawLine(a,b, x, y) {
    
}
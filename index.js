function make2darray(rows, cols) {
    let newarray = new Array(rows);
    for (let i = 0; i < rows; i++) {
        newarray[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            newarray[i][j] = 0;
        }
    }
    return newarray;
}

let grid;
let w = 5;
let rows, cols;

let hueValue = 0;

function setup() {
    createCanvas(600, 600);
    colorMode(HSB, 360, 255, 255);
    rows = height / w;
    cols = width / w;
    grid = make2darray(rows, cols);
}

function mouseMoved(){
    mousePressed();
}
function mousePressed() {
    let mousecol = floor(mouseX / w);
    let mouserow = floor(mouseY / w);

    let matrix = 5;
    let extend = floor(matrix / 2);
    for (let i = -extend; i <= extend; i++) {
        for (let j = -extend; j <= extend; j++) {
            if (random(1) < 0.75) {
                let col = mousecol + i;
                let row = mouserow + j;
                if (col >= 0 && col < cols && row >= 0 && row < rows)
                    grid[row][col] = hueValue;
            }
        }
    }
    if (hueValue > 390) {
        hueValue = 0;
    }
    else {
        hueValue += 0.5;
     }
}

function draw() {
    background(0);

    // setTimeout(()=>{
    //     grid[20][10] = 1;
    // },1000)

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            noStroke();
            if (grid[i][j] != 0) {
                fill(grid[i][j], 255, 255);
                let x = j * w;
                let y = i * w;
                square(x, y, w);
            }
            // fill(grid[i][j] * 255);
        }
    }

    let nextgrid = make2darray(rows, cols);
    for (let i = rows - 1; i >= 0; i--) {
        for (let j = 0; j < cols; j++) {
            let state = grid[i][j];
            if (state > 0 && i < rows - 1) {

                let dir = random([-1, 1])

                let below = grid[i + 1][j];
                let belowR = grid[i + 1][j + dir];
                let belowL = grid[i + 1][j - dir];
                if (below === 0) {
                    nextgrid[i][j] = 0;
                    nextgrid[i + 1][j] = grid[i][j];
                } else if (belowL === 0) {
                    nextgrid[i][j] = 0;
                    nextgrid[i + 1][j - dir] = grid[i][j];
                }
                else if (belowR === 0) {
                    nextgrid[i][j] = 0;
                    nextgrid[i + 1][j + dir] = grid[i][j];
                }
                else {
                    nextgrid[i][j] = grid[i][j];
                }
            } else {
                nextgrid[i][j] = state;
            }
        }
    }
    grid = nextgrid;

}




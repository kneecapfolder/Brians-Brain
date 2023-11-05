// init
const CANVAS = document.getElementById("grid");
const ctx = CANVAS.getContext("2d");
let size = 200;
let cellSize = CANVAS.width / size;
let grid = [];
let nextGen = [];

// generate random board
function start() {
    grid = [];
    for(let i = 0; i < size; i++)
        grid.push(Array.from({length: size}, () => Math.floor(Math.random() * 3)));
}

// game loop
function update() {
    draw();
    next_gen();
    grid = nextGen;

    setTimeout(update, 20);
}
start();
update();


function draw() {
    ctx.beginPath();
    for(let x = 0; x < size; x++)
        for(let y = 0; y < size; y++) {
            switch(grid[x][y]) {
                case 0: ctx.fillStyle = "black"; break;
                case 1: ctx.fillStyle = "red"; break;
                case 2: ctx.fillStyle = "yellow"; break;
            }
            ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
        }
}

function next_gen() {
    nextGen = [];
    for(let x = 0; x < size; x++) {
        nextGen.push(new Array(size));
        for(let y = 0; y < size; y++) {
            switch(grid[x][y]) {
                case 0: nextGen[x][y] = check_neighbours(x, y); break;
                case 1: nextGen[x][y] = 0; break;
                case 2: nextGen[x][y] = 1; break;
            }
        }
    }
}

function check_neighbours(x, y) {
    let neighbourList = [[x-1,y-1],[x,y-1],[x+1,y-1],[x-1,y],[x+1,y],[x-1,y+1],[x,y+1],[x+1,y+1]];

    let count = 0;
    neighbourList.forEach(i => {
        // wrap edges
        i[0] < 0? i[0] = size-1 : i[0];
        i[0] > size-1? i[0] = 0 : i[0];
        i[1] < 0? i[1] = size-1 : i[1];
        i[1] > size-1? i[1] = 0 : i[1];

        if (grid[i[0]][i[1]] == 2) count++;
    });
    if (count == 2) return 2;
    else return 0;
}
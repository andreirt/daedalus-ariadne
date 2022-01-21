// these are the variables you can use as inputs to your algorithms
// console.log(fxhash)   // the 64 chars hex number fed to your algorithm
// console.log(fxrand()) // deterministic PRNG function, use it instead of Math.random()

// note about the fxrand() function 
// when the "fxhash" is always the same, it will generate the same sequence of
// pseudo random numbers, always

//----------------------
// defining features
//----------------------
// You can define some token features by populating the $fxhashFeatures property
// of the window object.
// More about it in the guide, section features:
// [https://fxhash.xyz/articles/guide-mint-generative-token#features]
//
// window.$fxhashFeatures = {
//   "Background": "Black",
//   "Number of lines": 10,
//   "Inverted": true
// }

import Maze from './maze';
import Daedalus from './daedalus';
import Ariadne from './ariadne';
import Color from 'color';

let BACKGROUND = '#ffffff';
let wallColor = Color.hsl([Math.floor(fxrand() * 255), 100, 50]);
let blackAndWhite = fxrand();

if (blackAndWhite < 0.05) {
  wallColor = Color('black');
}
else if (blackAndWhite < 0.01) {
  wallColor = Color('white');
}

if (wallColor.luminosity() >= 0.5) {
  BACKGROUND ="#000000";
  document.body.style.backgroundColor = BACKGROUND;
}


let WALL = wallColor.hex();
console.log(BACKGROUND, WALL);


let maze;
let daedalus;
let ariadne;
let finished = true;

const fps = 8;
const fpsInterval = 1000 / fps;
let then = Date.now();

function setup() {

  let edges = [2, 4, 6, 8, 10];
  let EDGE = edges[ Math.floor(fxrand() * edges.length) ];
  let mazeWidth =  Math.floor( (window.innerWidth - (EDGE * 2)) / ( 4 * EDGE) / 2 ) * 2;
  let mazeHeight = Math.floor( (window.innerHeight - (EDGE * 2)) / (2 * EDGE) / 2 ) * 2 ;
  let mazeX = Math.floor((window.innerWidth / 4) - (mazeWidth * EDGE));
  let mazeY = Math.floor((window.innerHeight / 2) - (mazeHeight * EDGE));

  maze = new Maze(mazeWidth, mazeHeight);
  maze.generate();  
  
  let canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  daedalus = new Daedalus(maze, mazeX, mazeY, EDGE, canvas, WALL, BACKGROUND);
  ariadne = new Ariadne(maze, mazeX + (mazeWidth * EDGE * 2), mazeY, EDGE, canvas, WALL, BACKGROUND);
  ariadne.start();
  
  for (let i =0; i < maze.height; i++) {
    for (let j = 0; j < maze.width; j++) {
      if ((maze.completeCells[ maze.getOffset(j, i) ] & 1) != 0) {
        ariadne.paintCell( j*2, i*2, BACKGROUND); 
        ariadne.paintCell( (j*2)+1, i*2, WALL);
      }
      else {
        ariadne.paintCell( j*2, i*2, BACKGROUND); 
        ariadne.paintCell( (j*2)+1, i*2, BACKGROUND);
      }
      
      if ((maze.completeCells[ maze.getOffset(j, i) ] & 8) != 0) {
        ariadne.paintCell(j*2,     (i*2)+1, WALL);
        ariadne.paintCell((j*2)+1, (i*2)+1, WALL);
      }
      else {
        ariadne.paintCell(j*2,     (i*2)+1, BACKGROUND);
        ariadne.paintCell((j*2)+1, (i*2)+1, WALL);
      }
    }
  }

  // para evitar que o resize gere dois draw() simultâneos
  if (finished) {
    finished = false;
    draw();
  }
}

function draw() {
  
  const now = Date.now();
  const elapsed = now - then;

  // if enough time has elapsed, draw the next frame
  if (elapsed > fpsInterval) {

    // Get ready for next frame by setting then=now, but also adjust for your
    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
    then = now - (elapsed % fpsInterval);
  
    if (!daedalus.finished)
      daedalus.drawStep();
    else {
      daedalus.draw();
      if (ariadne.finished)
        finished = true;
    }
    
    if (!ariadne.finished)
      ariadne.nextStep();
  }

  if (!finished)
      requestAnimationFrame(draw);
}

window.addEventListener('resize', function () {
  setup();
});

setup();
const canvas = document.getElementById("game");
const ctxx = canvas.getContext("2d");
var z = document.getElementsByName("forward")[0];

var cl = new AudioContext();

var attackk =0.01;
var releasee = 0.2;

let notes=[3, -7 , 0 , -4, 0 , -7, 3 ,-7 , 0 , -4 , 0 , -7];

var count=0;

let wait = [0 , 0 , 0, 0]

let win = false;

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const img_down = new Image();   
img_down.src = 'snake_head_down.png';

const img_up = new Image();   
img_up.src = 'snake_head_up.png';

const img_sx = new Image();   
img_sx.src = 'snake_head_sx.png';

const img_dx = new Image();  
img_dx.src = 'snake_head_dx.png';


const apple = new Image();   
apple.src = 'apple.png';


let speed = 5;

let tileCount = 20;
//let tileCountApple = 40;

let tileBlock = canvas.width / tileCount;


let tileSize = tileBlock -1.6;
//let tileSizeApple= tileBlockApple -2;

let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5; //posizione iniziale mela
let appleY = 5;

let inputsXVelocity = 0; //velocità iniziale
let inputsYVelocity = 0;

let xVelocity = 0;
let yVelocity = 0;

let scoree = 0;

document.body.addEventListener("keydown", wait_for_up);
document.body.addEventListener("keydown", wait_for_down);
document.body.addEventListener("keydown", wait_for_sx);
document.body.addEventListener("keydown", wait_for_dx);

function wait_for_up(event){
  if(event.keyCode==38 || event.keyCode== 87){
    wait = [1, 0, 0, 0] ;
  }
  return wait;
}

function wait_for_down(event){
  if(event.keyCode==40 || event.keyCode== 83){
    wait= [0, 1, 0, 0];
  }
  return wait;

}
function wait_for_sx(event){
  if(event.keyCode==37 || event.keyCode== 65){

    wait= [0 , 0 , 1, 0];
  }
  return wait;
}
function wait_for_dx(event){
  if(event.keyCode==39 || event.keyCode == 68){

    wait = [0 , 0 , 0, 1];
  }
  return wait;
}


function drawGame() {
  
  xVelocity = inputsXVelocity;
  yVelocity = inputsYVelocity;
  
  changeSnakePosition();
  let lost = isGameOver();
  if (lost) {
    return;
  }
  let won = YouWon();
  if (won) {
    return;
  }
  clearScreen();

  checkAppleCollision();
  
  drawApple();
  drawScore();
  

  if (scoree > 5) {
    speed = 8;
  }
  if (scoree > 10) {
    speed = 10;
  }
  
  drawSnake(KeyboardEvent);

  setTimeout(drawGame, 1000 / speed);
    
}

function YouWon() {
  if (scoree == notes.length) {
    win = true;
  }
    if (win) {
      ctxx.fillStyle = "white";
      ctxx.font = "50px Verdana";
      var gradient = ctxx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop("0", " magenta");
      gradient.addColorStop("0.5", "blue");
      gradient.addColorStop("1.0", "red");
      // Fill with gradient
      ctxx.fillStyle = gradient;
      ctxx.fillText("You Won!", canvas.width /3, canvas.height / 2); //se non metti3.25 non te la mette al centro
      z.style.display = "block";
    }

  return win;
}



function isGameOver() {
  let gameOver = false;

  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  //walls
  if (headX < 0) {
    gameOver = true;
  } else if (headX === tileCount) {
    gameOver = true;
  } else if (headY < 0) {
    gameOver = true;
  } else if (headY === tileCount) {
    gameOver = true;
  }

  for (let ii = 0; ii < snakeParts.length; ii++) {
    let part = snakeParts[ii];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctxx.fillStyle = "white";
    ctxx.font = "50px Verdana";

    if (gameOver) {
      ctxx.fillStyle = "white";
      ctxx.font = "50px Verdana";

      var gradient = ctxx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop("0", " magenta");
      gradient.addColorStop("0.5", "blue");
      gradient.addColorStop("1.0", "red");
      // Fill with gradient
      ctxx.fillStyle = gradient;

      ctxx.fillText("Game Over!", canvas.width / 4, canvas.height / 2); //se non metti3.25 non te la mette al centro
    }

    ctxx.fillText("Game Over!", canvas.width / 4, canvas.height / 2);
  }

  return gameOver;
}

function drawScore() {
  ctxx.fillStyle = "white";
  ctxx.font = "30px Trirong";
  ctxx.fillText("Score " + scoree, canvas.width-130, 40);
}


function clearScreen() {
 ctxx.fillStyle = "#E0B0FF";
 ctxx.fillRect(0, 0, canvas.width, canvas.height); 
}


document.body.addEventListener("keydown", drawSnake);

function drawSnake(event) {
  
    ctxx.fillStyle = "#8cc53f";
    ctxx.strokeStyle = 'black';
  
  for (let ii = 0; ii < snakeParts.length; ii++) {
    let part = snakeParts[ii];
    ctxx.beginPath()
    ctxx.fill()
    ctxx.fillRect(part.x * tileBlock, part.y * tileBlock, tileSize, tileSize); 
  
  }

//TESTA
  snakeParts.push(new SnakePart(headX, headY)); //put an item at the end of the list next to the head
  while (snakeParts.length > tailLength) {
    snakeParts.shift(); // remove the furthet item from the snake parts if have more than our tail size.
  }

  ctxx.fillStyle = "#E0B0FF";
  ctxx.beginPath() 
  ctxx.fill()
  ctxx.fillRect(headX * tileBlock, headY * tileBlock, tileSize, tileSize);
  ctxx.closePath()
  
  //ctx.drawImage(img_dx,headX*tileBlock-18,headY*tileBlock-18,512/8,512/8); 
  
  //up
  if (event.keyCode == 38 || event.keyCode == 87) {
    ctxx.drawImage(img_up,headX*tileBlock-18,headY*tileBlock-18,512/8,512/8); 
  }
  else if (wait[0]==1){
    ctxx.drawImage(img_up,headX*tileBlock-18,headY*tileBlock-18,512/8,512/8);
  }

  //down
  if (event.keyCode == 40 || event.keyCode == 83) {
    ctxx.drawImage(img_down,headX*tileBlock-18,headY*tileBlock-18,512/8,512/8);
  }
  else if (wait[1]==1){
    ctxx.drawImage(img_down,headX*tileBlock-18,headY*tileBlock-18,512/8,512/8);
  }

//left
   if (event.keyCode == 37 || event.keyCode == 65 ) {
    ctxx.drawImage(img_sx,headX*tileBlock-18,headY*tileBlock-18,512/8,512/8);
  }
  else if (wait[2]==1){
    ctxx.drawImage(img_sx,headX*tileBlock-18,headY*tileBlock-18,512/8,512/8);
  }

  //right
  if (event.keyCode == 39 || event.keyCode == 68) {
    ctxx.drawImage(img_dx,headX*tileBlock-18,headY*tileBlock-18,512/8,512/8);
  }
  else if (wait[3]==1){
    ctxx.drawImage(img_dx,headX*tileBlock-18,headY*tileBlock-18,512/8,512/8);
  }
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
   
}


function drawApple() {
  ctxx.beginPath()  
  ctxx.fillStyle = "#E0B0FF";
  ctxx.fill()
  ctxx.fillRect(appleX * tileBlock, appleY * tileBlock, tileSize, tileSize);
  ctxx.drawImage(apple,appleX*tileBlock-5,appleY*tileBlock-5,2481/70,2481/70);
}

function pley(m) {
  const a = cl.createOscillator();
  const b = cl.createGain();
  a.frequency.value = 440*Math.pow(2,m/12);
  a.connect(b);
  b.connect(cl.destination);
  const now = cl.currentTime;
  b.gain.setValueAtTime(0, now);
  b.gain.linearRampToValueAtTime(1, now+attackk);
  b.gain.linearRampToValueAtTime(0, now+attackk+releasee);
  a.start();
  a.stop(now+attackk+releasee);
}

var stepp = 0;

function renderr() {
  document.querySelectorAll(".dott").forEach(renderDott)
}
function renderDott(dott , index) {
  dott.classList.toggle("active-dott", index == stepp)}

  function updateStepp() {
    renderr()
    stepp += 1;
    if(stepp >= rettangolo.children.length)
    return;   
  }

  
  updateStepp();
   

 function checkAppleCollision() {
  
  if (appleX === headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    scoree++;
    count++;
    updateStepp();
    for (var ii=0; ii< count; ii++){
      if(count==notes.length)
      {break;}
      pley(notes[count]);
     }
    }
    
  }
  
 document.body.addEventListener("keydown", keyDown);

 function keyDown(event) {
  //up
  if (event.keyCode == 38 || event.keyCode == 87) {
    if (inputsYVelocity == 1) return;
    inputsYVelocity = -1;
    inputsXVelocity = 0;
  }

  //down
  if (event.keyCode == 40 || event.keyCode == 83) {
    // 83 is s
    if (inputsYVelocity == -1) return;
    inputsYVelocity = 1;
    inputsXVelocity = 0;
  }

  //left
  if (event.keyCode == 37 || event.keyCode == 65) {
    // 65 is a
    if (inputsXVelocity == 1) return;
    inputsYVelocity = 0;
    inputsXVelocity = -1;
  }

  //right
  if (event.keyCode == 39 || event.keyCode == 68) {
    
    //68 is d
    if (inputsXVelocity == -1) return;
    inputsYVelocity = 0;
    inputsXVelocity = 1;
  }
}

drawGame()


const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
var z = document.getElementsByName("forward")[0];

var c = new AudioContext();

var attack =0.01;
var release = 0.2;

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
//let tileBlockApple= canvas.width / tileCountApple;

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

let score = 0;

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
  

  if (score > 5) {
    speed = 8;
  }
  if (score > 10) {
    speed = 10;
  }
  
  drawSnake(KeyboardEvent);

  setTimeout(drawGame, 1000 / speed);
    
}

function YouWon() {
  if (score == notes.length) {
    win = true;
  }
    if (win) {
      ctx.fillStyle = "white";
      ctx.font = "50px Verdana";
      var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop("0", " magenta");
      gradient.addColorStop("0.5", "blue");
      gradient.addColorStop("1.0", "red");
      // Fill with gradient
      ctx.fillStyle = gradient;
      ctx.fillText("You Won!", canvas.width /3, canvas.height / 2); //se non metti3.25 non te la mette al centro
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

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";

    if (gameOver) {
      ctx.fillStyle = "white";
      ctx.font = "50px Verdana";

      var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop("0", " magenta");
      gradient.addColorStop("0.5", "blue");
      gradient.addColorStop("1.0", "red");
      // Fill with gradient
      ctx.fillStyle = gradient;

      ctx.fillText("Game Over!", canvas.width / 4, canvas.height / 2); //se non metti3.25 non te la mette al centro
    }

    ctx.fillText("Game Over!", canvas.width / 4, canvas.height / 2);
  }

  return gameOver;
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "30px Trirong";
  ctx.fillText("Score " + score, canvas.width-130, 40);
}


function clearScreen() {
 ctx.fillStyle = "#E0B0FF";
 ctx.fillRect(0, 0, canvas.width, canvas.height); 
}


document.body.addEventListener("keydown", drawSnake);

function drawSnake(event) {
  
    ctx.fillStyle = "#8cc53f";
    ctx.strokeStyle = 'black';
  
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.beginPath()
    ctx.fill()
    ctx.fillRect(part.x * tileBlock, part.y * tileBlock, tileSize, tileSize); 
  
  }

//TESTA
  snakeParts.push(new SnakePart(headX, headY)); //put an item at the end of the list next to the head
  while (snakeParts.length > tailLength) {
    snakeParts.shift(); // remove the furthet item from the snake parts if have more than our tail size.
  }

  ctx.fillStyle = "#E0B0FF";
  ctx.beginPath() 
  ctx.fill()
  ctx.fillRect(headX * tileBlock, headY * tileBlock, tileSize, tileSize);
  ctx.closePath()
  
  //ctx.drawImage(img_dx,headX*tileBlock-18,headY*tileBlock-18,512/8,512/8); 
  
  //up
  if (event.keyCode == 38 || event.keyCode == 87) {
    ctx.drawImage(img_up,headX*tileBlock-18,headY*tileBlock-18,512/8,512/8); 
  }
  else if (wait[0]==1){
    ctx.drawImage(img_up,headX*tileBlock-18,headY*tileBlock-18,512/8,512/8);
  }

  //down
  if (event.keyCode == 40 || event.keyCode == 83) {
    ctx.drawImage(img_down,headX*tileBlock-18,headY*tileBlock-18,512/8,512/8);
  }
  else if (wait[1]==1){
    ctx.drawImage(img_down,headX*tileBlock-18,headY*tileBlock-18,512/8,512/8);
  }

//left
   if (event.keyCode == 37 || event.keyCode == 65 ) {
    ctx.drawImage(img_sx,headX*tileBlock-18,headY*tileBlock-18,512/8,512/8);
  }
  else if (wait[2]==1){
    ctx.drawImage(img_sx,headX*tileBlock-18,headY*tileBlock-18,512/8,512/8);
  }

  //right
  if (event.keyCode == 39 || event.keyCode == 68) {
    ctx.drawImage(img_dx,headX*tileBlock-18,headY*tileBlock-18,512/8,512/8);
  }
  else if (wait[3]==1){
    ctx.drawImage(img_dx,headX*tileBlock-18,headY*tileBlock-18,512/8,512/8);
  }
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
   
}


function drawApple() {
  ctx.beginPath()  
  ctx.fillStyle = "#E0B0FF";
  ctx.fill()
  ctx.fillRect(appleX * tileBlock, appleY * tileBlock, tileSize, tileSize);
  ctx.drawImage(apple,appleX*tileBlock-5,appleY*tileBlock-5,2481/70,2481/70);
}

function play(n) {
  const o = c.createOscillator();
  const g = c.createGain();
  o.frequency.value = 440*Math.pow(2,n/12);
  o.connect(g);
  g.connect(c.destination);
  const now = c.currentTime;
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(1, now+attack);
  g.gain.linearRampToValueAtTime(0, now+attack+release);
  o.start();
  o.stop(now+attack+release);
}

var step1 = 0;

function render1() {
  document.querySelectorAll(".dot1").forEach(renderDot1)
}
function renderDot1(dot , index) {
  dot.classList.toggle("active-dot1", index == step1)}

  function updateStep1() {
    render1()
    step1 += 1;
    if(step1 >= rett1.children.length)
    return;   
  }

  
  updateStep1();
   

function checkAppleCollision() {
  
  if (appleX === headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
    count++;
    updateStep1();
    for (var i=0; i< count; i++){
      if(count==notes.length)
      {break;}
      play(notes[count]);
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
    //ctx.drawImage(img_dx,headX*tileBlock-25,headY*tileBlock-25,512/6,512/6);
    //68 is d
    if (inputsXVelocity == -1) return;
    inputsYVelocity = 0;
    inputsXVelocity = 1;
  }
}

drawGame()


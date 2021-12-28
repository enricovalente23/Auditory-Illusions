var c = new AudioContext();

var play;
var num_osc = 10; // 10
var osc = []; 
var gain = [];

var a = c.createAnalyser();
a.fftSize = 1024; //512

var freq = [8000]; // 8000
var lowestFreq = 50; // 50 
var highestFreq = 16000; // 16000

let flag2 = 0;

function ascendingShepard() {

    if (play) {
        clearInterval(play);
    }

    for (i = 1; i <= num_osc; i++) {
        if (osc[i]) {
            osc[i].stop();  
        }
        osc[i] = c.createOscillator();
        freq[i] = freq[i - 1] / 2; // highest[1] 8000, lowest[10] 7.81
        osc[i].frequency.value = freq[i]; 

        gain[i] = c.createGain(); 
        gain[i].gain.value = 0; 
    }

    play = setInterval(function() {
        flag2 = 0;
        for (i = 1; i <= num_osc; i++) {

            if (freq[i] > 20000) {
                freq[i] = 20;
            } 
            else {
                freq[i] = freq[i] + (freq[i] / 200); // 192
            }

            osc[i].frequency.value = freq[i]; 

            if (lowestFreq < freq[i] < highestFreq) {
                gain[i].gain.value = 0.02; 
            }

            osc[i].connect(gain[i]);
            gain[i].connect(a);
            a.connect(c.destination);

        }

    }, 100); //update hz every 75ms

    for (i = 1; i <= num_osc; i++) {
        osc[i].start(); 
    } 
}

function descendingShepard() {
    
    if (play) {
        clearInterval(play);
    }

    for (i = 1; i <= num_osc; i++) {
        if (osc[i]) {
            osc[i].stop();  
        }
        osc[i] = c.createOscillator();
        freq[i] = freq[i - 1] / 2; // highest[1] 8000, lowest[10] 7.81
        osc[i].frequency.value = freq[i]; 

        gain[i] = c.createGain(); 
        gain[i].gain.value = 0; 
    }

    play = setInterval(function() {

        for (i = 1; i <= num_osc; i++) {

            if (freq[i] < 20) {
                freq[i] = 20000;
            } 
            else {
                freq[i] = freq[i] - (freq[i] / 200); // 192
            }

            osc[i].frequency.value = freq[i]; 

            if (lowestFreq < freq[i] < highestFreq) {
                gain[i].gain.value = 0.02; 
            }

            osc[i].connect(gain[i]);
            gain[i].connect(a);
            a.connect(c.destination);

        }

    }, 100); //update hz every 75ms

    for (i = 1; i <= num_osc; i++) {
        osc[i].start(); 
    } 
}

// OSCILLOSCOPE

const canvasO = document.getElementById('canvasO');
canvasO.width = window.innerWidth;
canvasO.height = window.innerHeight;
const ctxO = canvasO.getContext('2d');

const bufferLength = a.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

const barWidth = (canvasO.width*10)/bufferLength;
let barHeight;
let x = 0;

window.addEventListener('click', function() {

    function animate() {
        x = 0;
        ctxO.clearRect(0, 0, canvasO.width, canvasO.height);
        a.getByteFrequencyData(dataArray);
        drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray);
        requestAnimationFrame(animate);
    }
    animate();
});

function drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray) {
    for (let i=0; i < bufferLength; i++){
        barHeight = dataArray[i]*3.5;
        const red = i * barHeight/50;
        const green = i/2;
        const blue = i * barHeight; 
        ctxO.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
        ctxO.fillRect(canvasO.width - x, canvasO.height - barHeight, barWidth, barHeight);
        x += barWidth;
    }
}

// ENDLESS RUNNER GAME

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let score;
let scoreText;
let highscore = 0;
let highscoreText;
let player;
let gravity;
let obstacles = [];
let gameSpeed;
let keys = {};

let flag = 0;
let AR;

const playerImg = new Image();
playerImg.src = 'eggchild.png';
const spriteWidth = 128;
const spriteHeight = 128;
let frameX = 0;
let frameY = 0; // 4

document.addEventListener('keydown', function(evt) {
    keys[evt.code] = true;
});
document.addEventListener('keyup', function(evt) {
    keys[evt.code] = false;
});

class Player {
    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.dy = 0;
        this.jumpForce = 11;
        this.originalHeight = h;
        this.grounded = false;
        this.jumpTimer = 0;
    }

    Animate () {
        //jump
        if (keys['Space'] || keys['ArrowUp']) {
            this.Jump();
        } else {
            this.jumpTimer = 0;
        }

        if (keys['ArrowDown']) {
            this.h = this.originalHeight / 2;
        } else {
            this.h = this.originalHeight;
        }

        this.y += this.dy;

        //gravity
        if (this.y + this.h < canvas.height) {
            this.dy += gravity;
            this.grounded = false;
        } else {
            this.dy = 0;
            this.grounded = true;
            this.y = canvas.height - this.h;
        }

        this.Draw();
    }

    Jump () {
        if (this.grounded && this.jumpTimer == 0) {
            this.jumpTimer = 1;
            this.dy = -this.jumpForce;
        } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
            this.jumpTimer++;
            this.dy = -this.jumpForce - (this.jumpTimer / 50);
        }
    }

    Draw () {
        ctx.drawImage(playerImg, frameX*spriteWidth, frameY*spriteHeight, spriteWidth, spriteHeight, this.x, this.y, this.w, this.h);
        animateSprite(this.x, this.y, this.w, this.h);
    }
}

function animateSprite(x, y, w, h) {
    ctx.clearRect(x, y, w, h);
    ctx.drawImage(playerImg, frameX*spriteWidth, frameY*spriteHeight, spriteWidth, spriteHeight, x, y, w, h);
    if (frameX < 8) { //10
        frameX++;
    } else {
        frameX = 0;
    }
    requestAnimationFrame(animateSprite);
};

class Obstacle {
    constructor (x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;

        this.dx = -gameSpeed;
    }

    Update () {
        this.x += this.dx;
        this.Draw();
        this.dx = -gameSpeed;
    }

    Draw () {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.closePath();
    }
}

class Text {
    constructor(t, x, y, a, c, s) {
        this.t = t;
        this.x = x;
        this.y = y;
        this.a = a;
        this.c = c;
        this.s = s;
    }

    Draw () {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.font = this.s + "px sans-serif";
        ctx.textAlign = this.a;
        ctx.fillText(this.t, this.x, this.y);
        ctx.closePath();
    }

}

function SpawnObstacle() {
    let size = RandomIntInRange(20, 70);
    let type = RandomIntInRange(0, 3);
    let color = RandomIntInRange(0, 5)
    let obstacle = new Obstacle(canvas.width + size, canvas.height - size, size, size, '#2a952f');

    if (type == 1) {
        obstacle.y -= player.originalHeight - 10;
    }
    obstacles.push(obstacle);

    if (color == 2) {
        obstacle.c = '#ff0000';
    } else if (color == 3) {
        obstacle.c = '#0400ff';
    }
}

function RandomIntInRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

canvas.width = 700;
canvas.height = 300;
ctx.font = "20px sans-serif";

let scr = 'Score: ' + score;
scoreText = new Text(scr, 115, 46, "left", "rgb(255, 255, 255)", "20");

document.getElementById("start").addEventListener('click', function() {
    flag = 0;
    Start();
});

function Start () {

    gameSpeed = 3;
    gravity = 1;
    score = 0;
    highscore = 0;
    /* if (localStorage.getItem('highscore')) {
        highscore = localStorage.getItem('highscore');
    }  */
    let hscr = "Highscore: " + highscore;
    highscoreText = new Text(hscr, canvas.width - 55, 46, "right", "rgb(255, 255, 255)", "20"); 
    player = new Player(25, 0, 50, 50);
    requestAnimationFrame(Update);  
}

let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;

function Update() {
    if (flag == 0) {
     AR = requestAnimationFrame(Update);   
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    spawnTimer--;
    if (spawnTimer <= 0) {
        SpawnObstacle();
        console.log(obstacles);
        spawnTimer = initialSpawnTimer - gameSpeed * 8;

        if (spawnTimer < 60) {
            spawnTimer = 60;
        }
    }

    for (let i=0; i<obstacles.length; i++) {
        let o = obstacles[i];

        if (o.x + o.w < 0) {
            obstacles.splice(i, 1);
        }

        if (player.x < o.x + o.w && player.x + player.w > o.x && player.y < o.y + o.h && player.y + player.h > o.y) {
            if (o.c == '#2a952f' && flag2 == 0) {          
                obstacles = [];
                score = 0;
                spawnTime = initialSpawnTimer;
                gameSpeed = 3;
                flag = 1;

                clearInterval(play);
                for (i = 1; i <= num_osc; i++) {
                    osc[i].stop();
                }
                /* window.localStorage.setItem('highscore', highscore); */  
            }   
            if (o.c == '#2a952f' && flag2 == 1) {          
                ascendingShepard(); 
            }             
            if (o.c == '#ff0000') {
                clearInterval(play);
                for (i = 1; i <= num_osc; i++) {
                    osc[i].stop();
                }
                flag2 = 1;                       
            }
            if (o.c == '#0400ff') {
                clearInterval(play);
                for (i = 1; i <= num_osc; i++) {
                    osc[i].stop();
                }
                flag2 = 1;
            }         
        }

        o.Update();
    }

    player.Animate();

    score++;
    scoreText.t = score;
    scoreText.Draw();

    if (score > highscore) {
        highscore = score;
        highscoreText.t = highscore;
    }
    highscoreText.Draw();

    gameSpeed += 0.003;
}

function Stop() {
    clearInterval(play);
    for (i = 1; i <= num_osc; i++) {
        osc[i].stop();
    }
    cancelAnimationFrame(AR);
} 
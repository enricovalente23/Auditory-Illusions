var c = new AudioContext();

var play;
var num_osc = 10; // 10
var osc = []; 
var gain = [];

var a = c.createAnalyser();
a.fftSize = 1024; 

var freq = [8000]; // 8000
var lowestFreq = 50; // 50 
var highestFreq = 16000; // 16000

let flag2 = 0;
let flag3 = 1;

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

    }, 100); // update every 100 ms

    for (i = 1; i <= num_osc; i++) {
        osc[i].start(); 
    } 
}

function redCollision() {

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

        flag3 = 0;

        for (i = 1; i <= num_osc; i++) {
                
            if (freq[i] > 3000) {
                freq[i] = 200;
            } 
            else {
                freq[i] = freq[i] + (freq[i] / 100); // 200
            }

            osc[i].frequency.value = freq[i]; 

            if (lowestFreq < freq[i] < highestFreq) {
                gain[i].gain.value = 0.02; 
            }

            osc[i].connect(gain[i]);
            gain[i].connect(a);
            a.connect(c.destination);

        }

    }, 80); 

    for (i = 1; i <= num_osc; i++) {
        osc[i].start(); 
    } 
}

// OSCILLOSCOPE

const canvasO = document.getElementById('canvasO');
canvasO.width = window.innerWidth;
canvasO.height = window.innerHeight;
const ctxO = canvasO.getContext('2d');

canvasO.width = 700;
canvasO.height = 300;

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
        barHeight = dataArray[i]*1.2;
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

canvas.width = 700;
canvas.height = 300;
ctx.font = "20px sans-serif";

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
let no_doublestart = 0;
let AR;

const playerImg = new Image();
playerImg.src = 'eggchild.png';
const spriteWidth = 128;
const spriteHeight = 128;
let frameX = 0;
let frameY = 0;

const background = new Image();
background.src = 'BG.png'; 

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
        if (keys['KeyW']) {
            this.Jump();
        } else {
            this.jumpTimer = 0;
        }

        if (keys['KeyS']) {
            this.h = this.originalHeight / 2;            
        } else {
            this.h = this.originalHeight;
        }

        this.y += this.dy;

        //gravity
        if (this.y + this.h*1.2 < canvas.height) {
            this.dy += gravity;
            this.grounded = false;
        } else {
            this.dy = 0;
            this.grounded = true;
            this.y = canvas.height - this.h*1.2;
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
        animateSprite(this.x, this.y, this.w, this.h);            
    }
}

function animateSprite(x, y, w, h) {
    ctx.clearRect(x, y, w, h);
    if (keys['KeyS'] == true) {
        duckX = 6;
        duckY = 1;           
        ctx.drawImage(playerImg, duckX*spriteWidth, duckY*spriteHeight, spriteWidth, spriteHeight, x-30, y-53, w*4, h*4);                
    } else {
        ctx.drawImage(playerImg, frameX*spriteWidth, frameY*spriteHeight, spriteWidth, spriteHeight, x-30, y-30, w*4, h*2);
        if (frameX < 8) { 
            frameX++;
        } else {
            frameX = 0;
        }   
    }
    requestAnimationFrame(animateSprite);
};

const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}

function handleBackground() {
    if (BG.x1 <= -BG.width + gameSpeed*3) BG.x1 = BG.width;
    else BG.x1 -= gameSpeed/2;
    if (BG.x2 <= -BG.width + gameSpeed*3) BG.x2 = BG.width;
    else BG.x2 -= gameSpeed/2;
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

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
        if (this.a == 'left') {
            ctx.fillText('Score: ' + this.t, this.x, this.y);
        } else {
            ctx.fillText('Highscore: ' + this.t, this.x, this.y)
        }
        ctx.closePath();
    }

}

function SpawnObstacle() {
    let size = RandomIntInRange(20, 70);
    let type = RandomIntInRange(0, 3);
    let color = RandomIntInRange(0, 2)
    let obstacle = new Obstacle(canvas.width + size, canvas.height - size, size, size, '#323232');

    if (type == 1) {
        obstacle.y -= player.originalHeight - 10;
    }
    obstacles.push(obstacle);

    if (color == 2) {
        obstacle.c = '#ff0000';
    } 
    /* else if (color == 3) {
        obstacle.c = '#0400ff';
    } */
}

function RandomIntInRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


document.getElementById("start").addEventListener('click', function() {
    flag = 0;
    flag3 = 1;
    num_osc = 10;
    if (no_doublestart == 0) {

        setTimeout( function () {
            document.getElementById("gray").classList.remove("hide");
            setTimeout( function() {
                document.getElementById("gray").classList.add("hide");
                document.getElementById("p21").classList.remove("hide");
            }, 1500);            
        }, 1000);

        Start();  
        ascendingShepard();
    }
});

function Start () {

    no_doublestart = 1;

    gameSpeed = 3;
    gravity = 1;
    score = 0; 

    scoreText = new Text(score, 80, 46, "left", "#000000", "20");
    highscoreText = new Text(highscore, canvas.width - 80, 46, "right", "#000000", "20"); 

    player = new Player(25, 0, 20, 40);

    requestAnimationFrame(Update);  
}

let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;

function Update() {
    if (flag == 0) {
     AR = requestAnimationFrame(Update);   
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    handleBackground();

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
            if (o.c == '#323232' && flag2 == 0) {          
                obstacles = [];
                score = 0;
                spawnTime = initialSpawnTimer;
                gameSpeed = 3;
                flag = 1;
                no_doublestart = 0;

                clearInterval(play);
                for (i = 1; i <= num_osc; i++) {
                    osc[i].stop();
                }
                
            }   
            if (o.c == '#323232' && flag2 == 1) {  // grey
                num_osc = 10;

                document.getElementById("p23").classList.remove("hide");

                document.getElementById("gray").classList.remove("hide");
                setTimeout( function() {
                    document.getElementById("gray").classList.add("hide");
                }, 1500);  

                ascendingShepard(); 
                flag3 = 1;
            }             
            if (o.c == '#ff0000' && flag3 == 1) { // red
                clearInterval(play);
                for (i = 1; i <= num_osc; i++) {
                    osc[i].stop();
                }
                flag2 = 1;
                num_osc = 1;
                
                document.getElementById("p22").classList.remove("hide");

                document.getElementById("red").classList.remove("hide");
                setTimeout( function() {
                    document.getElementById("red").classList.add("hide");
                }, 1500);

                redCollision();
            }
            if (o.c == '#ff0000' && flag3 == 0) {
                obstacles = [];
                score = 0;
                spawnTime = initialSpawnTimer;
                gameSpeed = 3;
                flag = 1;
                no_doublestart = 0;

                clearInterval(play);
                for (i = 1; i <= num_osc; i++) {
                    osc[i].stop();
                }
            }
        /* if (o.c == '#0400ff') { // blue
                clearInterval(play);
                for (i = 1; i <= num_osc; i++) {
                    osc[i].stop();
                }
                flag2 = 1;
            } */      
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
    no_doublestart = 0;
} 

// OBSTACLES SPRITES
// 'GAME OVER'
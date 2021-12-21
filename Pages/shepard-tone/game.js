const canvas = document.getElementById('game');
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

document.addEventListener('keydown', function(evt) {
    keys[evt.code] = true;
});
document.addEventListener('keyup', function(evt) {
    keys[evt.code] = false;
});

class Player {
    constructor (x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;

        this.dy = 0;
        this.jumpForce = 15;
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
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.closePath();
    }
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
        ctx.fillText(this.t, this.x, this.y);
        ctx.closePath();
    }

}

//game functions
function SpawnObstacle() {
    let size = RandomIntInRange(20, 70);
    let type = RandomIntInRange(0, 1);
    let obstacle = new Obstacle(canvas.width + size, canvas.height - size, size, size, '#2a952f');

    if (type == 1) {
        obstacle.y -= player.originalHeight - 10;
    }
    obstacles.push(obstacle);
}
function RandomIntInRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

canvas.width = 1000;
canvas.height = 500;
ctx.font = "20px sans-serif";

scoreText = new Text(score, 115, 46, "left", "#212121", "20");

function Start () {
    
    gameSpeed = 3;
    gravity = 1;
    score = 0;
    //highscore = 0;
    /* if (localStorage.getItem('highscore')) {
        highscore = localStorage.getItem('highscore');
    } */
    highscoreText = new Text(highscore, canvas.width - 55, 46, "right", "#212121", "20");
    player = new Player(25, 0, 50, 50, '#4c239d');
    requestAnimationFrame(Update);
}

let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;

function Update() {
    if (flag == 0) {
     requestAnimationFrame(Update);   
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

    //spawn enemies
    for (let i=0; i<obstacles.length; i++) {
        let o = obstacles[i];

        if (o.x + o.width < 0) {
            obstacles.splice(i, 1);
        }

        if (player.x < o.x + o.w && player.x + player.w > o.x && player.y < o.y + o.h && player.y + player.h > o.y) {
            obstacles = [];
            score = 0;
            spawnTime = initialSpawnTimer;
            gameSpeed = 3;

            flag = 1;
            /* window.localStorage.setItem('highscore', highscore); */
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

//Start();

canvas.addEventListener('click', function(e) {
    flag = 0;
    Start()
});
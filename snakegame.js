var background;
var ctx;

var snakehead;
var banana;
var body;
var snakeover;

var snakebody;
var banana_a;
var banana_b;

var leftDirection = false;
var rightDirection = true;
var upDirection = false;
var downDirection = false;
var inGame = true;   

const size = 10;
const all_body = 5000;
const maxrandom = 75;
const speed = 100;
const height = 700;
const width = 700;   

const left = 37;
const right = 39;
const up = 38;
const down = 40;

var a = new Array(all_body);
var b = new Array(all_body);  

function init() {
    background = document.getElementById('snakegrass');
    ctx = background.getContext('2d');
    images();
    snake();
    locateBanana();
    setTimeout("gameCycle()", speed);
}   

function images() {
    snakehead = new Image();
    snakehead.src = 'snakehead.png';   

    body = new Image();
    body.src = 'snakebody.png';

    banana = new Image();
    banana.src = 'snakebanana.png';
}

function snake() {
    snakebody = 2;
    for (var i = 0; i < snakebody; i++) {
        a[i] = 150 - i * 50;
        b[i] = 150;
    }
}

function eatBanana() {
    if ((a[0] == banana_a) && (b[0] == banana_b)) {
        snakebody++;
        locateBanana();
    }
}   

function doDrawing() {
    ctx.clearRect(0, 0, width, height);
    if (inGame) {
        ctx.drawImage(banana, banana_a, banana_b);
        for (var i = 0; i < snakebody; i++) {
            if (i == 0) {
                ctx.drawImage(snakehead, a[i], b[i]);
            } else {
                ctx.drawImage(body, a[i], b[i]);
            }
        }  
    } else {
        gameOver();
    }       
}

 

function gameOver() {
    /*snakeover = new Image();
    snakeover.src = 'snakeover.gif';*/
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = 'small-caps bolder 90px cursive';
    ctx.fillText('GAME OVER!', width/2 , height/2);
}

function eatBanana() {
    if ((a[0] == banana_a) && (b[0] == banana_b)) {
        snakebody += 2;
        locateBanana();
    }
}

function move() {
    for (var i = snakebody; i > 0; i--) {
        a[i] = a[(i - 1)];
        b[i] = b[(i - 1)];
    }

    if (leftDirection) {
        a[0] -= size;
    }

    if (rightDirection) {
        a[0] += size;
    }

    if (upDirection) {
        b[0] -= size;
    }

    if (downDirection) {
        b[0] += size;
    }
}  

function hitBanana() {
    for (var i = snakebody; i > 0; i--) {
        if ((i > 10) && (a[0] == a[i]) && (b[0] == b[i])) {
            inGame = false;
        }
    }

    if (b[0] >= height) {
        inGame = false;
    }

    if (b[0] < 0) {
       inGame = false;
    }

    if (a[0] >= width) {
      inGame = false;
    }

    if (a[0] < 0) {
      inGame = false;
    }
}

    function locateBanana() {
    var r = Math.floor(Math.random() * maxrandom);
    banana_a = r * size;
    r = Math.floor(Math.random() * maxrandom);
    banana_b = r * size;
}   

function gameCycle() {
    if (inGame) {
        eatBanana();
        hitBanana();
        move();
        doDrawing();
        setTimeout("gameCycle()", speed);
    }
}

onkeydown = function(e) {
    var key = e.keyCode;
    if ((key == left) && (!rightDirection)) {
        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == right) && (!leftDirection)) {
        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == up) && (!downDirection)) {
        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if ((key == down) && (!upDirection)) {
        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }       
};
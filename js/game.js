const cWidth = document.querySelector('#wrapper').offsetWidth
const cHeight = document.querySelector('#wrapper').offsetHeight
    
var hit = false;
var score;
var miss;
var timer;
    
var ball = [];
var ballAmount = 2;
var ballRadius = 55;
var px2ball = [];

function setupCvs() {
    //Settings game start stats 
    timer = 5;
    miss = -1;
    score = 0;
    document.getElementById('defaultCanvas0').style.display = 'block';
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById("gameName").style.display = 'none';
    document.getElementById("countdown").innerHTML = "30s";
    document.getElementById("score").innerHTML = "0";
    document.getElementById("highScore").innerHTML = highScore;
    document.getElementById("miss").innerHTML = "0";

    //Creating Canvas
    var canvas = createCanvas(cWidth, cHeight + 0.14);
    resizeCanvas(cWidth, cHeight + 0.14);
    canvas.parent('wrapper');
    ballCreate();

    //Timer 
    var gameTimer = setInterval(function() {
        if (timer <= 0) {
            //Game End Screen
            clearInterval(gameTimer);
            document.getElementById("countdown").innerHTML = "0s";
            alert("Score: " + score);
            resizeCanvas(0, 0);
            scoreUpdate(score);
            document.getElementById('startBtn').style.display = 'block'; 
            document.getElementById("gameName").style.display = 'block';
        } else {
            document.getElementById("countdown").innerHTML = timer + "s";
        }
        timer -= 1;
    }, 1000);
}

function stopGame() {
    resizeCanvas(0, 0);
    timer = 0;
    document.getElementById('startBtn').style.display = 'block';
    document.getElementById("gameName").style.display = 'block';
}

function draw() {
    background(220);
    for (var i = 0; i < ball.length; i++) {
        ball[i].display();
        ball[i].movement();
    }
    dToBall();
}

function dToBall() {
    for (i = 0; i < ball.length; i++) {
        px2ball[i] = dist(ball[i].x, ball[i].y, mouseX, mouseY);
    }
}

function ballCreate() {
    for (var i = 0; i < ballAmount; i++) {
        ball[i] = {

            x: random(ballRadius, cWidth - ballRadius),
            y: random(ballRadius, cHeight - ballRadius),
            speedX: Math.random() * (3 - -3) - 3,
            speedY: Math.random() * (3 - -3) - 3,

            display: function() {
                fill(100, 100, 100);
                ellipse(this.x, this.y, ballRadius, ballRadius);
            },

            movement: function() {
                if (this.x > cWidth - ballRadius / 2) {
                    this.speedX = this.speedX * -1;
                } else if (this.x < ballRadius / 2) {
                    this.speedX = this.speedX * -1;
                }

                this.x += this.speedX;

                if (this.y > cHeight - ballRadius / 2) {
                    this.speedY = this.speedY * -1;
                } else if (this.y < ballRadius / 2) {
                    this.speedY = this.speedY * -1;
                }

                this.y += this.speedY;
            },
        }
    }
    ballAmount = 0;
}

function mouseClicked() {
    for (var i = 0; i < ball.length; i++) {
        if (px2ball[i] <= ballRadius) {
            ball[i].x = random(ballRadius, width - ballRadius);
            ball[i].y = random(ballRadius, height - ballRadius);
            ball[i].speedX = Math.random() * (3 - -3) - 3;
            ball[i].speedY= Math.random() * (3 - -3) - 3;
        }
    }
    hit = px2ball.some(function(e) {
        return e <= ballRadius;
    });

    if (hit == true) {
        score += 1;
        document.getElementById('score').innerHTML = score;
        console.log("score: " + score);
    }
    else {
        if (mouseX < width && mouseX > 0 && mouseY > 0 && mouseY < height) {
            miss += 1;
            document.getElementById('miss').innerHTML = miss;
            console.log("miss:" + miss);
        }
    }
}


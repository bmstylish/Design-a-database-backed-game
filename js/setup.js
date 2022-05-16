var cvs = document.getElementById("game");
var cWidth = document.querySelector('#wrapper').offsetWidth
var cHeight= document.querySelector('#wrapper').offsetHeight

var hit = false;
var score = 0;
var count = 0;
var miss = 0;

var ball = [];
var ballAmount = 2;
var ballRadius = 55;
var px2ball = [];


function setup() {
  var canvas = createCanvas(cWidth - 15, cHeight);
  canvas.parent('wrapper');
  ballCreate();
}

function draw() {
   background(220);
    
  for (var i = 0; i < ball.length; i++) {
    ball[i].display();
    ball[i].movement();
  }
  dToBall();
}

function dToBall (){
    for (i = 0; i < ball.length; i++) {
    px2ball[i] = dist(ball[i].x, ball[i].y, mouseX, mouseY);
  }
}

function ballCreate(){  
  for(var i = 0; i < ballAmount; i++){
    ball[i]= {
      
        x: Math.random() * (cWidth - 50) + 50,
        y: Math.random() * (cHeight - 50) + 50,
        speedX: Math.random() * (3 - -3) - 3,
        speedY: Math.random() * (3 - -3) - 3,

        display: function () {
            fill(100,100,100);
            ellipse(this.x, this.y, 55, 55);
        },

        movement: function () {
            if (this.x > cWidth - 27.5) {
                this.speedX = this.speedX * -1;
            } else if (this.x < 27.5) {
                this.speedX = this.speedX * -1;
            }

            this.x += this.speedX;

            if (this.y > cHeight - 27.5) {
                this.speedY = this.speedY * -1;
            } else if (this.y < 27.5) {
                this.speedY = this.speedY * -1;
            }

            this.y += this.speedY;
        },
    }
    
  }
  ballAmount = 0;
}

function mouseClicked(){
  for (var i = 0; i < ball.length; i++) {
    if (px2ball[i] <= ballRadius) {
      ball[i].x = random(20, 380);
      ball[i].y = random(20, 380);
    }
  }
    hit = px2ball.some(function (e) {
    return e <= ballRadius;
  });
  
if (hit == true) {
    score += 1;
    console.log("score: "+ score);
  }
  else {
    miss += 1;
    console.log("miss:" + miss);
  }
}
/*************************************************************/
//      END OF APP
/*************************************************************/
let x = 40;
let d = 50;
let n = 37;
let y;

let decrement = 0.25;

balls = [];

function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  y = windowHeight / 2;
  for (let i = 0; i < n; i++) {
    if (i % 2 == 0) {
      balls.push(new Ball(x + i * x, x, d));
    } else {
      balls.push(new Ball(x + (i - 1) * x, Math.random() * 300 + y, d));
    }
  }
  rectMode(CENTER);
}

function gaveOver() {
  decrement = 0;
}

function draw() {
  noStroke();
  background(0);
  y -= decrement;
  for (let i = 0; i < n; i++) {
    circle(balls[i].x, balls[i].y, d);
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        if (balls[i].touches(balls[j])) {
          gaveOver();
        }
      }
      if (i % 2 != 0) {
        balls[i].y -= decrement;
      }
    }
  }
  if (!decrement) {
    fill(255);
    rect(width / 2, height / 2, 200, 50);
    textSize(32);
    fill(0);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2);
    noLoop();
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
}

class Ball {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
  }
  touches(ball) {
    return dist(this.x, this.y, ball.x, ball.y) < (this.d + ball.d) / 2;
  }
}

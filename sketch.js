let x = 40;
let d = 50;
let n;
let y;
let pixelOffset = 12;
let decrement = 0.25;

balls = [];

function setup() {
  createCanvas(windowWidth - pixelOffset, windowHeight - pixelOffset);
  y = windowHeight / 2;

  for (n = 0; x + n * x < width - d / 2; n++) {
    if (n % 2 == 0) {
      balls.push(new Ball(x + n * x, x, d));
    } else {
      balls.push(new Ball(x + (n - 1) * x, Math.random() * 300 + y, d));
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
    // setTimeout(() => {
    //   location.reload();
    // }, 1000);
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

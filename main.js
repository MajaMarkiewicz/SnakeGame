const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

const box = 25;
const numberOfBoxes = 600/box;

const fruitImg = new Image();
fruitImg.src ='images/apple.png'

let snake = [
  {x:6*box, y:5*box},
  {x:5*box, y:5*box},
  {x:4*box, y:5*box}
];

let fruit = randomPoint()

function randomPoint() {
    let randX = Math.floor(Math.random() *numberOfBoxes)*box;
    let randY =(Math.floor(Math.random() *numberOfBoxes)+2)*box;
    for (let i = 0; i<snake.length; i++) {
      if (randX == snake[i].x && randY == snake[i].y) {
        return randomPoint();
      } else {
        return { x: randX, y: randY }
      }
  }
}

let dir = "";
let score = 0;

let headX = snake[0].x;
let headY = snake[0].y;

function drawBackground() {
  c.fillStyle ='#6fb98f';
  c.fillRect (0, 0, 600, 650);
  c.drawImage(fruitImg,1/3*box,1/3*box,1.5*box,1.5*box);
  for (let i = 2; i<numberOfBoxes+2; i++){
    c.beginPath();
    c.moveTo(0, box*i);
    c.lineTo(numberOfBoxes*box, box*i);
    c.strokeStyle = '#b9c4c9'
    c.stroke();
  }
  for (let i=1; i<numberOfBoxes; i++){
    c.beginPath();
    c.moveTo(box*i, 2*box);
    c.lineTo(box*i, (numberOfBoxes+2)*box);
    c.strokeStyle = '#b9c4c9'
    c.stroke();
  }
}

function drawSnake() {
  for (let i=0; i<snake.length; i++) {
    c.fillStyle = (i==0)?"#006c84" : "#004445";
    c.fillRect (snake[i].x,snake[i].y,box,box);
  }
}

function drawSnakeFood() {
  c.drawImage(fruitImg,fruit.x,fruit.y,box-3,box-3)
}

document.addEventListener("keydown",direction);
function direction(event) {
  if(event.keyCode == 37 && dir!="right") {
    dir = "left";
  } else if (event.keyCode == 38 && dir!="down") {
    dir = "up";
  } else if (event.keyCode == 39 && dir!="left") {
    dir = "right"
  } else if (event.keyCode == 40 && dir!="up") {
    dir = "down"
  }
}

function snakeMove() {
  switch(dir) {
    case "left":
      headX -= box;
      break;
    case "up":
      headY -= box;
      break;
    case "right":
      headX += box;
      break;
    case "down":
      headY += box;
      break;
  }

  if (headX == fruit.x && headY == fruit.y) {
    score++;
    fruit = randomPoint();
  } else if (dir !== "") {
      snake.pop();
  }

  let newHead = {x: headX, y: headY}
  if (dir !== "") {
    snake.unshift(newHead);
  }
}

function drawScore() {
  c.fillStyle = '#b9c4c9';
  c.font = "50px Arial";
  c.fillText(score, 2*box, 1.8*box)
}

function isOut() {
  return (headX < 0 || headX > numberOfBoxes*box || headY < 2*box || headY > (numberOfBoxes+2)*box)
}

function isCollision() {
  for (let i = 1; i < snake.length; i++) {
    if (headX == snake[i].x && headY == snake[i].y ) {
      return true;
    }
  }
  return false;
}

function isGameover() {
  if (isOut() || isCollision()) {
    clearInterval(game);
    alert("Game over, your score is: " + score);
    document.location.reload(true);
  }
}

function draw() {
  drawBackground();
  drawSnake()
  drawSnakeFood()
  snakeMove();
  drawScore()
  isGameover();
}

let game = setInterval(draw,100);

import {
  mybutton,
  wrapper,
  footer,
  canvas,
  ctx,
  harder,
} from "./globalContext.js";
import { Score } from "./score.js";
import { mySnake } from "./entities/snake.js";
import { Fruit } from "./entities/fruit.js";
import { deathScreen } from "./death.js";
import { Tail } from "./entities/tail.js";
import { goldenFruit } from "./entities/goldenApple.js";
canvas.width = window.innerWidth - 350;
canvas.height = window.innerHeight - 25;
let startMenuOff = false;
let harderMode = false;
let runningGame = true;
let lastX = 0;
let lastY = 0;
let lastX2 = 0;
let lastY2 = 0;
let chance = Math.floor(Math.random() * 10);
let appleImg = new Image();
appleImg.src = "./res/img/apple.png";
let snakeHead = new Image();
snakeHead.src = "./res/img/head.png";
let tailImg = new Image();
tailImg.src = "./res/img/tail.png";
let goldenImg = new Image();
goldenImg.src = "./res/img/golden.png";
const Directions = {
  directionLeft: 1,
  directionRight: 2,
  directionUp: 3,
  directionDown: 4,
};

let CurrentDirection;
// Starting menu
harder.onclick = () => {
  harder.style.display = "none";
  harderMode = true;
  startMenuOff = true;
  wrapper.style.display = "none";
  canvas.style.display = "flex";
  footer.style.display = "none";
};
mybutton.onclick = () => {
  wrapper.style.display = "none";
  canvas.style.display = "flex";
  footer.style.display = "none";
  startMenuOff = true;
};

const fruit = new Fruit(appleImg);
const snake = new mySnake(snakeHead);
const score = new Score();
const death = new deathScreen();
const tail = new Tail(tailImg);
const golden = new goldenFruit(goldenImg);
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  up: {
    pressed: false,
  },
  down: {
    pressed: false,
  },
};
//Death function
function Death() {
  // added the death after snake touches the border of the game area
  if (
    snake.position.x >= canvas.width - snake.height ||
    snake.position.x <= 0 ||
    snake.position.y >= canvas.height - snake.height ||
    (snake.position.y < 0 && harderMode == true)
  ) {
    runningGame = false;
    death.update();
  }
  for (let a = 0; a < snake.tails.length; a++) {
    if (a >= 3) {
      if (
        snake.position.x + snake.width >= snake.tails[a].position.x &&
        snake.position.x <= snake.tails[a].position.x + tail.width &&
        snake.position.y + snake.height >= snake.tails[a].position.y &&
        snake.position.y <= snake.tails[a].position.y + tail.height
      ) {
        console.log("death");
        death.update();
        runningGame = false;
      }
    }
  }
}

// Movement
function movement() {
  if (keys.left.pressed && startMenuOff == true) {
    // movement to the left
    if (CurrentDirection !== Directions.directionRight) {
      snake.addPosition(-snake.speed, 0);
      CurrentDirection = Directions.directionLeft;
    } else {
      keys.right.pressed = true;
    }
  }
  if (keys.up.pressed && startMenuOff == true) {
    // movement up
    if (CurrentDirection !== Directions.directionDown) {
      snake.addPosition(0, -snake.speed);
      CurrentDirection = Directions.directionUp;
    } else {
      keys.down.pressed = true;
    }
  }
  if (keys.down.pressed && startMenuOff == true) {
    // movement down
    if (CurrentDirection !== Directions.directionUp) {
      snake.addPosition(0, snake.speed);
      CurrentDirection = Directions.directionDown;
    } else {
      keys.up.pressed = true;
    }
  }
  if (keys.right.pressed && startMenuOff == true) {
    // movement to the right
    if (CurrentDirection !== Directions.directionLeft) {
      snake.addPosition(snake.speed, 0);
      CurrentDirection = Directions.directionRight;
    } else {
      keys.left.pressed = true;
    }
  }
}
//Checking if snake is out of the map
function collisionWithMap() {
  if (snake.position.x >= canvas.width) {
    snake.position.x = 0;
  } else if (snake.position.x < 0) {
    snake.position.x = canvas.width;
  } else if (snake.position.y >= canvas.height) {
    snake.position.y = 0;
  } else if (snake.position.y < 0) {
    snake.position.y = canvas.height;
  }
}
function deahtInNormalGame() {
  // death in easier mode
  for (let a = 0; a < snake.tails.length; a++) {
    if (a >= 1) {
      if (
        snake.position.x + snake.width >= snake.tails[a].position.x &&
        snake.position.x <= snake.tails[a].position.x + tail.width &&
        snake.position.y + snake.height >= snake.tails[a].position.y &&
        snake.position.y <= snake.tails[a].position.y + tail.height
      ) {
        console.log("death");
        death.update();
        runningGame = false;
      }
    }
  }
}
//Collision between snake and fruit
function collision() {
  if (chance == 5) {
    if (
      snake.position.x + snake.width >= golden.position.x &&
      snake.position.x <= golden.position.x + golden.width &&
      snake.position.y + snake.height >= golden.position.y &&
      snake.position.y <= golden.position.y + golden.height
    ) {
      chance = Math.floor(Math.random() * 10);
      golden.position.x = Math.random() * (canvas.width - fruit.height);
      golden.position.y = Math.random() * (canvas.height - fruit.height);
      score.points += 300;

      snake.tails.push(new Tail(-1500, -1500, tailImg));
      if (harderMode == true) {
        snake.speed += 0.1;
      }
      console.log("goldenApple");
    }
  }
  if (
    snake.position.x + snake.width >= fruit.position.x &&
    snake.position.x <= fruit.position.x + fruit.width &&
    snake.position.y + snake.height >= fruit.position.y &&
    snake.position.y <= fruit.position.y + fruit.height
  ) {
    chance = Math.floor(Math.random() * 10);
    fruit.position.x = Math.random() * (canvas.width - fruit.height);
    fruit.position.y = Math.random() * (canvas.height - fruit.height);
    fruit.update();
    score.points += 100;

    snake.tails.push(new Tail(-1500, -1500, tailImg));
    if (harderMode == true) {
      snake.speed += 0.1;
    }
  }
}

function renderingTails() {
  if (snake.tails.length == 0) {
    //num of tails at the beginning
    snake.tails.push(new Tail(snake.position.x, snake.position.y, tailImg));
  }

  for (let a = 0; a < snake.tails.length; a++) {
    // tail after the head
    if (snake.tails.length == 1 || a == 0) {
      if (
        snake.position.x + snake.width >= snake.tails[a].position.x &&
        snake.position.x <= snake.tails[a].position.x + tail.width &&
        snake.position.y + snake.height >= snake.tails[a].position.y &&
        snake.position.y <= snake.tails[a].position.y + tail.height
      ) {
      } else {
        lastX = snake.tails[a].position.x;
        lastY = snake.tails[a].position.y;

        snake.tails[a].position.x = snake.position.x;
        snake.tails[a].position.y = snake.position.y;
      }
    }

    if (snake.tails.length > 1 && a > 0) {
      //other tails
      if (
        snake.tails[a].position.x + tail.width >=
          snake.tails[a - 1].position.x &&
        snake.tails[a].position.x <=
          snake.tails[a - 1].position.x + tail.width &&
        snake.tails[a].position.y + tail.height >=
          snake.tails[a - 1].position.y &&
        snake.tails[a].position.y <= snake.tails[a - 1].position.y + tail.height
      ) {
        //  console.log("in collision");
      }
      else {
        lastX2 = snake.tails[a].position.x;
        lastY2 = snake.tails[a].position.y;

        snake.tails[a].position.x = lastX;
        snake.tails[a].position.y = lastY;
        lastX = lastX2;
        lastY = lastY2;
        snake.update();
      }
      //console.log(lastX);
      //console.log(lastY);
    }

    snake.update();
  }
  //console.log("end of the loop");
}
//Gameloop
function animation() {
  if (runningGame == true) {
    requestAnimationFrame(animation);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clears canvas everytime
    snake.update();
    if (chance == 5) {
      golden.update();
    } else {
      fruit.update();
    }
    score.update();
    renderingTails();
    movement();
    deahtInNormalGame();
    if (harderMode != true) {
      collisionWithMap();
    } else {
      Death();
      runningGame == false;
    }
    collision();
    console.log(chance);
  }
}
//Keys for game
addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65: //keyA
      keys.left.pressed = true;
      keys.up.pressed = false;
      keys.right.pressed = false;
      keys.down.pressed = false;
      if (CurrentDirection === null) {
        CurrentDirection = Directions.directionLeft;
      }

      break;
    case 68: //keyD
      keys.right.pressed = true;
      keys.left.pressed = false;
      keys.up.pressed = false;
      keys.down.pressed = false;
      if (CurrentDirection === null) {
        CurrentDirection = Directions.directionRight;
      }
      break;
    case 87: //keyW
      keys.up.pressed = true;
      keys.down.pressed = false;
      keys.left.pressed = false;
      keys.right.pressed = false;
      if (CurrentDirection === null) {
        CurrentDirection = Directions.directionUp;
      }
      break;
    case 83: //keyS
      keys.down.pressed = true;
      keys.up.pressed = false;
      keys.left.pressed = false;
      keys.right.pressed = false;
      if (CurrentDirection === null) {
        CurrentDirection = Directions.directionDown;
      }

      break;
    case 32: //keySpace
      if (runningGame == false) {
        snake.position.x = canvas.width / 2;
        snake.position.y = canvas.height / 2;
        snake.tails.length = 0;
        score.points = 0;
        runningGame = true;
        startMenuOff = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log("space");
        animation();
        keys.up.pressed = false;
        keys.left.pressed = false;
        keys.right.pressed = false;
        keys.down.pressed = false;
      }

      break;
  }
});
//Drawing
animation();

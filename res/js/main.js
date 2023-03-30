import {
  mybutton,
  wrapper,
  footer,
  canvas,
  ctx,
  harder,
} from "./globalContext.js";
import { Score } from "./score.js";
import { myPlayer } from "./entities/player.js";
import { Fruit } from "./entities/fruit.js";
import { deathScreen } from "./death.js";
import { Tail } from "./entities/tail.js";
canvas.width = window.innerWidth - 350;
canvas.height = window.innerHeight - 25;
let startMenuOff = false;
let harderMode = false;
let runningGame = true;
let lastX = 0;
let lastY = 0;
let lastX2 = 0;
let lastY2 = 0;
let appleImg = new Image;
appleImg.src = "./res/img/apple.png";
let snakeHead = new Image;
snakeHead.src ="./res/img/head.png";
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
const player = new myPlayer(snakeHead);
const score = new Score();
const death = new deathScreen();
const tail = new Tail();

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
  // added the death after player touches the border of the game area
  if (
    player.position.x >= canvas.width ||
    player.position.x <= 0 ||
    player.position.y >= canvas.height ||
    (player.position.y < 0 && harderMode == true)
  ) {
    runningGame = false;
    death.update();
  }
  for (let a = 0; a < player.tails.length; a++) {
    if (a >= 2) {
      if (
        player.position.x + player.width >= player.tails[a].position.x &&
        player.position.x <= player.tails[a].position.x + tail.width &&
        player.position.y + player.height >= player.tails[a].position.y &&
        player.position.y <= player.tails[a].position.y + tail.height
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
      player.addPosition(-player.speed, 0);
      CurrentDirection = Directions.directionLeft;
    } else {
      keys.right.pressed = true;
    }
  }
  if (keys.up.pressed && startMenuOff == true) {
    // movement up
    if (CurrentDirection !== Directions.directionDown) {
      player.addPosition(0, -player.speed);
      CurrentDirection = Directions.directionUp;
    } else {
      keys.down.pressed = true;
    }
  }
  if (keys.down.pressed && startMenuOff == true) {
    // movement down
    if (CurrentDirection !== Directions.directionUp) {
      player.addPosition(0, player.speed);
      CurrentDirection = Directions.directionDown;
    } else {
      keys.up.pressed = true;
    }
  }
  if (keys.right.pressed && startMenuOff == true) {
    // movement to the right
    if (CurrentDirection !== Directions.directionLeft) {
      player.addPosition(player.speed, 0);
      CurrentDirection = Directions.directionRight;
    } else {
      keys.left.pressed = true;
    }
  }
}
//Checking if player is out of the map
function collisionWithMap() {
  if (player.position.x >= canvas.width) {
    player.position.x = 0;
  } else if (player.position.x < 0) {
    player.position.x = canvas.width;
  } else if (player.position.y >= canvas.height) {
    player.position.y = 0;
  } else if (player.position.y < 0) {
    player.position.y = canvas.height;
  }
}
function deahtInNormalGame() {
  // death is easier mode
  for (let a = 0; a < player.tails.length; a++) {
    if (a >= 2) {
      if (
        player.position.x + player.width >= player.tails[a].position.x &&
        player.position.x <= player.tails[a].position.x + tail.width &&
        player.position.y + player.height >= player.tails[a].position.y &&
        player.position.y <= player.tails[a].position.y + tail.height
      ) {
        console.log("death");
        death.update();
        runningGame = false;
      }
    }
  }
}
//Collision between player and fruit
function collision() {
  if (
    player.position.x + player.width >= fruit.position.x &&
    player.position.x <= fruit.position.x + fruit.width &&
    player.position.y + player.height >= fruit.position.y &&
    player.position.y <= fruit.position.y + fruit.height
  ) {
    fruit.position.x = Math.random() * canvas.width;
    fruit.position.y = Math.random() * canvas.height;
    fruit.update();
    score.points += 100;

    player.tails.push(new Tail(player.position.x, player.position.y));
    if (harderMode == true) {
      player.speed += 0.1;
    }
  }
}

function renderingTails() {
  if (player.tails.length == 0) {
    //num of tails at the beginning
    player.tails.push(new Tail(player.position.x, player.position.y));
  }

  console.log(player.tails.length + " tail lenght");
  for (let a = 0; a < player.tails.length; a++) {
    // tail after the head
    if (player.tails.length == 1 || a == 0) {
      if (
        player.position.x + player.width >= player.tails[a].position.x &&
        player.position.x <= player.tails[a].position.x + tail.width &&
        player.position.y + player.height >= player.tails[a].position.y &&
        player.position.y <= player.tails[a].position.y + tail.height
      ) {
        console.log("collision");
      } else {
        lastX = player.tails[a].position.x;
        lastY = player.tails[a].position.y;

        player.tails[a].position.x = player.position.x;
        player.tails[a].position.y = player.position.y;

        console.log("not in collision 1");
      }
    }
    console.log(lastX);
    console.log(lastY);
    if (player.tails.length > 1 && a > 0) {
      //other tails
      if (
        player.tails[a].position.x + tail.width >=
          player.tails[a - 1].position.x &&
        player.tails[a].position.x <=
          player.tails[a - 1].position.x + tail.width &&
        player.tails[a].position.y + tail.height >=
          player.tails[a - 1].position.y &&
        player.tails[a].position.y <=
          player.tails[a - 1].position.y + tail.height
      ) {
      } else {
        lastX2 = player.tails[a].position.x;
        lastY2 = player.tails[a].position.y;

        player.tails[a].position.x = lastX;
        player.tails[a].position.y = lastY;
        lastX = lastX2;
        lastY = lastY2;
      }
    }
  }
  console.log("end of the loop");
}
//Gameloop
function animation() {
  if (runningGame == true) {
    requestAnimationFrame(animation);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clears canvas everytime
    player.update();
    fruit.update();
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
        player.position.x = canvas.width / 2;
        player.position.y = canvas.height / 2;
        player.tails.length = 0;
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

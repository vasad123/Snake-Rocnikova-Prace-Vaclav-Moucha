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
export let tailLenght = 4;
let startMenuOff = false;
let harderMode = false;
let runningGame = true;
let lastX = 0;
let lastY = 0;
let lastX2 = 0;
let lastY2 = 0;
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

const fruit = new Fruit();
const player = new myPlayer();
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
function death() {
  if (
    player.position.x >= canvas.width ||
    player.position.x <= 0 ||
    player.position.y >= canvas.height ||
    (player.position.y < 0 && harderMode == true)
  ) {
    runningGame = false;
    death.update();
  }
}
// Movement 
function movement() {
  if (keys.left.pressed && startMenuOff == true) {
    if (CurrentDirection !== Directions.directionRight) {
      player.addPosition(-player.speed, 0);
      CurrentDirection = Directions.directionLeft;
    } else {
      keys.right.pressed = true;
    }
  }
  if (keys.up.pressed && startMenuOff == true) {
    if (CurrentDirection !== Directions.directionDown) {
      player.addPosition(0, -player.speed);
      CurrentDirection = Directions.directionUp;
    } else {
      keys.down.pressed = true;
    }
  }
  if (keys.down.pressed && startMenuOff == true) {
    if (CurrentDirection !== Directions.directionUp) {
      player.addPosition(0, player.speed);
      CurrentDirection = Directions.directionDown;
    } else {
      keys.up.pressed = true;
    }
  }
  if (keys.right.pressed && startMenuOff == true) {
    if (CurrentDirection !== Directions.directionLeft) {
      player.addPosition(player.speed, 0);
      CurrentDirection = Directions.directionRight;
    } else {
      keys.left.pressed = true;
    }
  }
}
//Checking if player is out of the map
function checkCorners() {
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
    tailLenght++;
    if (harderMode == true) {
      player.speed += 0.1;
    }
  }
}
// Attempt for making a tail 

function renderingTails() {
  if (player.tails.length == 0) {
    player.tails.push(new Tail(player.position.x + 60, player.position.y));
    player.tails.push(new Tail(player.position.x + 120, player.position.y));
    player.tails.push(new Tail(player.position.x + 180, player.position.y));
  }

  console.log(player.tails.length + " tail lenght");
  for (let a = 0; a < player.tails.length; a++) {
    console.log(a + " počet a");
      console.log(
      "ocas 0 " +
        player.tails[0] +
        " " +
        player.tails[0].position.y +
        " " +
        player.tails[0].position.x
    ); console.log(
      "Tail  1 " +
        player.tails[1] +
        " " +
        player.tails[1].position.y +
        " " +
        player.tails[1].position.x
    );
 
    console.log(
      "Tail 2 " +
        player.tails[2] +
        " " +
        player.tails[2].position.y +
        " " +
        player.tails[2].position.x
    );

    if (player.tails.length == 1 || a == 0) {
      if (
        player.position.x + player.width >= player.tails[a].position.x &&
        player.position.x <= player.tails[a].position.x + tail.width &&
        player.position.y + player.height >= player.tails[a].position.y &&
        player.position.y <= player.tails[a].position.y + tail.height
      ) {
        console.log("collision")
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
        if (a == 1) {
          console.log("if")
        lastX2 = player.tails[a].position.x;
        lastY2 = player.tails[a].position.y;
          player.tails[a].position.x = lastX;
          player.tails[a].position.y = lastY;
        }else{
          console.log("else")
          player.tails[a].position.x = lastX2;
          player.tails[a].position.y = lastY2;
        }
        console.log("not in collision 2");
      }
    }
  }
  console.log("end of loop");
}
//Gameloop
function animation() {
  if (runningGame == true) {
    requestAnimationFrame(animation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    fruit.update();
    score.update();
    renderingTails();
    movement();
    if (harderMode != true) {
      checkCorners();
    } else {
      death();
    }

    collision();
  }
}
//Keys for game 
addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      keys.left.pressed = true;
      keys.up.pressed = false;
      keys.right.pressed = false;
      keys.down.pressed = false;
      if (CurrentDirection === null) {
        CurrentDirection = Directions.directionLeft;
      }

      break;
    case 68:
      keys.right.pressed = true;
      keys.left.pressed = false;
      keys.up.pressed = false;
      keys.down.pressed = false;
      if (CurrentDirection === null) {
        CurrentDirection = Directions.directionRight;
      }
      break;
    case 87:
      keys.up.pressed = true;
      keys.down.pressed = false;
      keys.left.pressed = false;
      keys.right.pressed = false;
      if (CurrentDirection === null) {
        CurrentDirection = Directions.directionUp;
      }
      break;
    case 83:
      keys.down.pressed = true;
      keys.up.pressed = false;
      keys.left.pressed = false;
      keys.right.pressed = false;
      if (CurrentDirection === null) {
        CurrentDirection = Directions.directionDown;
      }

      break;
  }
});
//Drawing
animation();

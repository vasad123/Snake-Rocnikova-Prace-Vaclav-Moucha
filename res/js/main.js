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
export let tailLenght = 2;
let startMenuOff = false;
let harderMode = false;
let runningGame = true;
const Directions = {
  directionLeft: 1,
  directionRight: 2,
  directionUp: 3,
  directionDown: 4,
};

let CurrentDirection;

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
function Death() {
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

function renderingTails() {
  for (let a = 0; a <= tailLenght; a++) {
    console.log(a);
    player.tails[a];
    player.tails[new Tail(a)];
    if (a == 0) {
      if (
        player.position.x + player.width >= player.tails[a].position.x &&
        player.position.x <= player.tails[a].position.x + tail.width &&
        player.position.y + player.height >= player.tails[a].position.y &&
        player.position.y <= player.tails[a].position.y + tail.height
      ) {
      } else {
        player.tails[a].position.x = player.position.x;
        player.tails[a].position.y = player.position.y;
     
      }
    }
    console.log(player.tails);

    if (player.tails.length > 1) {
      console.log("ll");
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
        player.tails[a].position.x = player.tails[a - 1].position.x;
        player.tails[a].position.y = player.tails[a - 1].position.y; 
         
      }
    }
  }
  console.log("end of loop");
}
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
      Death();
    }

    tail.update();
    collision();
  }
}
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

animation();

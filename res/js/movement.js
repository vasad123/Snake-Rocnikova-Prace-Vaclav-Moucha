import {
  mybutton,
  wrapper,
  footer,
  canvas,
  ctx,
  Directions,
  CurrentDirection,
} from "./globalContext.js";
import myPlayer from "./player.js";
import { Fruit } from "./fruit.js";
export { keys, animation };
canvas.width = 1380;
canvas.height = window.innerHeight;
const player = new myPlayer();
const fruit = new Fruit();
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

function animation() {
  console.log("DIRRRR" + Directions.left);
  requestAnimationFrame(animation);

  if (
    fruit.position.x == player.position.x &&
    fruit.position.y == player.position.y
  ) {
    fruit.position.x = Math.random() * canvas.width;
    fruit.position.y = Math.random() * canvas.height;
    fruit.update();
  }
  player.update();

  if (keys.left.pressed) {
    if (CurrentDirection !== Directions.directionRight) {
      player.position.x = player.position.x - 5;
      CurrentDirection = Directions.directionLeft;
    } else {
      keys.right.pressed = true;
    }
  }
  if (keys.up.pressed) {
    if (CurrentDirection !== Directions.directionDown) {
      player.position.y = player.position.y - 5;
      CurrentDirection = Directions.directionUp;
    } else {
      keys.down.pressed = true;
    }
  }
  if (keys.down.pressed) {
    if (CurrentDirection !== Directions.directionUp) {
      player.position.y = player.position.y + 5;
      CurrentDirection = Directions.directionDown;
    } else {
      keys.up.pressed = true;
    }
  }
  if (keys.right.pressed) {
    if (CurrentDirection !== Directions.directionLeft) {
      player.position.x = player.position.x + 5;
      CurrentDirection = Directions.directionRight;
    } else {
      keys.left.pressed = true;
    }
  }
  if (player.position.x >= canvas.width) {
    player.position.x = 0;
  } else if (player.position.x < 0) {
    player.position.x = canvas.width;
  } else if (player.position.y >= canvas.height) {
    player.position.y = 0;
  } else if (player.position.y < 0) {
    player.position.y = window.innerHeight;
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

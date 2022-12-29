import { mybutton, wrapper, footer, canvas, ctx } from "./globalContext.js";
canvas.width = 1380;
canvas.height = window.innerHeight;
let startMenuOff = false;
const Directions = {
  directionLeft: 1,
  directionRight: 2,
  directionUp: 3,
  directionDown: 4,
};
let CurrentDirection;
mybutton.onclick = () => {
  wrapper.style.display = "none";
  canvas.style.display = "flex";
  footer.style.display = "none";
  startMenuOff = true;
};
class myPlayer {
  constructor() {
    this.position = {
      x: canvas.width / 2,
      y: 500,
    };

    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
  }
}
class Fruit {
  constructor() {
    this.position = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    };

    this.width = 30;
    this.height = 30;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
  }
}
const fruit = new Fruit();
const player = new myPlayer();

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
function drawingFruit() {
  fruit.update();
  requestAnimationFrame(drawingFruit);
  if (
    fruit.position.x == player.position.x &&
    fruit.position.y == player.position.y
  ) {
    fruit.position.x = Math.random() * canvas.width;
    fruit.position.y = Math.random() * canvas.height;
    fruit.update();
  } if (
    player.position.x < fruit.position.x + fruit.width &&
    player.position.x + player.position.w > fruit.position.x &&
    player.position.y < fruit.position.y + fruit.height &&
    player.height + player.position.y > fruit.position.y
  ){
    console.log("collision");
  }

}
function animation() {
  requestAnimationFrame(animation);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  if (keys.left.pressed && startMenuOff == true) {
    if (CurrentDirection !== Directions.directionRight) {
      player.position.x = player.position.x - 5;
      CurrentDirection = Directions.directionLeft;
    } else {
      keys.right.pressed = true;
    }
  }
  if (keys.up.pressed && startMenuOff == true) {
    if (CurrentDirection !== Directions.directionDown) {
      player.position.y = player.position.y - 5;
      CurrentDirection = Directions.directionUp;
    } else {
      keys.down.pressed = true;
    }
  }
  if (keys.down.pressed && startMenuOff == true) {
    if (CurrentDirection !== Directions.directionUp) {
      player.position.y = player.position.y + 5;
      CurrentDirection = Directions.directionDown;
    } else {
      keys.up.pressed = true;
    }
  }
  if (keys.right.pressed && startMenuOff == true) {
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
drawingFruit();
animation();

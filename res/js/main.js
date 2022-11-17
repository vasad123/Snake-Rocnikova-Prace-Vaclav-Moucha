const mybutton = document.getElementById("mybutton");
const wrapper = document.getElementById("wrapper");
const footer = document.getElementById("footer");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let startMenuOff = false;
canvas.width = 1380;
canvas.height = window.innerHeight;
const currentDirection = {
  directionLeft: 1,
  directionRight: 2,
  directionUp: 3,
  directionDown: 4,
};
mybutton.onclick = () => {
  wrapper.style.display = "none";
  canvas.style.display = "flex";
  footer.style.display = "none";
  startMenuOff=true;
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
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
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

  fruit.update();

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

function animation() {
  requestAnimationFrame(animation);
  if(fruit.position.x==player.position.x &&fruit.position.y == player.position.y){
    fruit.position.x = Math.random()*canvas.width;
    fruit.position.y = Math.random()*canvas.height;
    fruit.update();
  }
  player.update();

  if (keys.left.pressed) {
    player.position.x = player.position.x - 5;
    currentDirection = 1;
  }
  if (keys.up.pressed) {
    player.position.y = player.position.y - 5;
    currentDirection = 2;
  }
  if (keys.down.pressed) {
    player.position.y = player.position.y + 5;
    currentDirection = 3;
  }
  if (keys.right.pressed) {
    player.position.x = player.position.x + 5;
    currentDirection = 4;
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

      break;
    case 68:
      keys.right.pressed = true;
      keys.left.pressed = false;
      keys.up.pressed = false;
      keys.down.pressed = false;
      break;
    case 87:
      keys.up.pressed = true;
      keys.down.pressed = false;
      keys.left.pressed = false;
      keys.right.pressed = false;
      break;
    case 83:
      keys.down.pressed = true;
      keys.up.pressed = false;
      keys.left.pressed = false;
      keys.right.pressed = false;

      break;
  }
});
animation();

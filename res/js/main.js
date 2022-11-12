const mybutton = document.getElementById("mybutton");
const wrapper = document.getElementById("wrapper");
const footer = document.getElementById("footer");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1380;
canvas.height = window.innerHeight;
const direction = {
  left: 1,
  right: 2,
  up: 3,
  down: 4,
};
mybutton.onclick = () => {
  wrapper.style.display = "none";
  canvas.style.display = "flex";
  footer.style.display = "none";
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
    ctx.fillStyle = "green ";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
  }
}

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
  player.update();

  if (keys.left.pressed) {
    player.position.x = player.position.x - 5;
    direction = 1;
  }
  if (keys.up.pressed) {
    player.position.y = player.position.y - 5;
    direction = 2;
  }
  if (keys.down.pressed) {
    player.position.y = player.position.y + 5;
    direction = 3;
  }
  if (keys.right.pressed) {
    player.position.x = player.position.x + 5;
    direction = 4;
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

const mybutton = document.getElementById("mybutton");
const wrapper = document.getElementById("wrapper");
const footer = document.getElementById("footer");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1380;
canvas.height = window.innerHeight;

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
    console.log("Update");
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
    console.log("move to left");
    player.position.x = player.position.x - 5;
    keys.up.pressed = false;
    keys.right.pressed = false;
    keys.down.pressed = false;
    // keys.left.pressed = false;
  }
  if (keys.up.pressed) {
    keys.down.pressed = false;
    keys.left.pressed = false;
    keys.right.pressed = false;
    // keys.up.pressed = false;
    console.log("move up");
    player.position.y = player.position.y - 5;
  }
  if (keys.down.pressed) {
    player.position.y = player.position.y + 5;
    console.log("move down");
    keys.up.pressed = false;
    keys.left.pressed = false;
    keys.right.pressed = false;
    // keys.down.pressed = false;
  }
  if (keys.right.pressed) {
    console.log("move to right");
    player.position.x = player.position.x + 5;
    keys.left.pressed = false;
    keys.up.pressed = false;
    keys.down.pressed = false;
    //keys.right.pressed = false;
  }
  console.log("DOWN " + keys.down.pressed);
  console.log("UP " + keys.up.pressed);
  console.log("LEFT " + keys.left.pressed);
  console.log("RIGHT " + keys.right.pressed);
}
animation();
addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      keys.left.pressed = true;
      break;
    case 68:
      keys.right.pressed = true;
      break;
    case 87:
      keys.up.pressed = true;
      break;
    case 83:
      keys.down.pressed = true;
      break;
  }
});
/*addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      keys.left.pressed = false;
      break;
    case 68:
      keys.right.pressed = false;
      break;
    case 87:
      keys.up.pressed = false;
      break;
    case 83:
      keys.down.pressed = false;
      break;
  }
});*/

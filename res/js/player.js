import {
  mybutton,
  wrapper,
  footer,
  canvas,
  startMenuOff,
  ctx,
  Directions,
  CurrentDirection,
} from "./globalContext.js";

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
export default myPlayer;

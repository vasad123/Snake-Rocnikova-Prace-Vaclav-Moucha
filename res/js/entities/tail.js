import { ctx } from "../globalContext.js";
canvas.width = window.innerWidth - 350;
canvas.height = window.innerHeight - 25;

export class Tail {
  constructor(x, y, tailImg) {
    this.position = {
      x: x,
      y: y,
    };

    this.width = 60;
    this.height = 60;
    this.tailImg = tailImg;
  }
  draw() {
    ctx.drawImage(
      this.tailImg,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  update() {
    this.draw();
  }
}

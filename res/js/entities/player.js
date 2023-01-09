import { ctx } from "../globalContext.js";
canvas.width = 1440;
canvas.height = 960;
export class myPlayer {
  constructor() {
    this.position = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };

    this.width = 60;
    this.height = 60;
    this.speed = 5;
  }
  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
  }
}

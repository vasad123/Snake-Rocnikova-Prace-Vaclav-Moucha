import { ctx, canvas } from "../globalContext.js";
canvas.width = window.innerWidth-350;
canvas.height = window.innerHeight-25;

export class Fruit {
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

import { ctx, canvas } from "../globalContext.js";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export class Fruit {
  constructor() {
    this.position = {
      x: Math.random() * canvas.width+30,
      y: Math.random() * canvas.height+30,
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

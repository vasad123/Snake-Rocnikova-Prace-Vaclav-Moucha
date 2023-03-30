import { ctx, canvas } from "../globalContext.js";
canvas.width = window.innerWidth - 350;
canvas.height = window.innerHeight - 25;
export class Fruit {
  constructor(appleImg) {
    this.width = 30;
    this.height = 30;
    this.position = {
      x: Math.random() * (canvas.width - this.width),
      y: Math.random() * (canvas.height - this.width),
    };

    this.appleImg = appleImg;
  }
  draw() {
    ctx.drawImage(
      this.appleImg,
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

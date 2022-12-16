import {
  mybutton,
  wrapper,
  footer,
  canvas,
  ctx,
  Directions,
  CurrentDirection,
} from "./globalContext.js";

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

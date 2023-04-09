import { ctx } from "../globalContext.js";
canvas.width = window.innerWidth - 350;
canvas.height = window.innerHeight - 25;
export class mySnake {
  constructor(snakeHead) {
    this.position = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };
    this.width = 60;
    this.height = 60;
    this.speed = 5;
    this.tails = [];
    this.snakeHead = snakeHead;
  }

  addPosition(x, y) {
    this.position.x += x;
    this.position.y += y;
  }

  draw() {
    ctx.drawImage(
      this.snakeHead,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    this.tails.forEach((element) => {
      element.update();
    });
  }
  update() {
    this.draw();
  }
}

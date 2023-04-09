import { ctx } from "./globalContext.js";

export class deathScreen {
  constructor() {
    this.position = {
      x: canvas.width / 2 - 100,
      y: canvas.height / 2,
    };
  }
  draw() {
    ctx.fillStyle = "black";
    ctx.font = "40px serif";
    ctx.fillText("Game Over", this.position.x, this.position.y);
    ctx.fillText(
      "Press space to restart",
      this.position.x - 100,
      this.position.y + 75
    );
  }
  update() {
    this.draw();
  }
}

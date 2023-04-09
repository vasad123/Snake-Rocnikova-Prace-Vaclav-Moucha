import { ctx } from "./globalContext.js";
export class Score {
  constructor() {
    this.position = {
      x: 30,
      y: 40,
    };
    this.points = 0;
  }
  draw() {
    ctx.fillStyle = "black";
    ctx.font = "48px serif";
    ctx.fillText(this.points, this.position.x, this.position.y);
  }
  update() {
    this.draw();
  }
}

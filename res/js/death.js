import { ctx } from "./globalContext.js";
import { Score } from "./score.js";
export class deathScreen {
  constructor() {
    this.position = {
      x: canvas.width/2,
      y: canvas.height/2,
    };
  }
  draw() {
    ctx.fillStyle = "black";
    ctx.font = "48px serif";
    ctx.fillText("You died",this.position.x,this.position.y);
  }
  update() {
    this.draw();
  }
}
import { ctx } from "../globalContext.js";
import { myPlayer } from "./player.js";
canvas.width = window.innerWidth-350;
canvas.height = window.innerHeight-25;

export class Tail {
  constructor(x,y) {
    this.position = {
      x: x,
      y: y
    };

    this.width = 60;
    this.height = 60;
  }
  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
  }
}

import { ctx } from "../globalContext.js";
import { myPlayer } from "./player.js";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const player = new myPlayer();
export class Tail {
  constructor() {
    this.position = {
      x: canvas.width / player.height,
      y: canvas.height / 2,
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

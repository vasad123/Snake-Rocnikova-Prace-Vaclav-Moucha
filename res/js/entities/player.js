import { ctx } from "../globalContext.js";
import { Tail } from "./tail.js";
import { tailLenght } from "../main.js";
const tail = new Tail();
canvas.width = window.innerWidth-350;
canvas.height = window.innerHeight-25;
export class myPlayer {
  constructor() {
    this.position = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };
    this.width = 60;
    this.height = 60;
    this.speed = 5;
    this.tails = [new Tail(tailLenght)]
  }

  addPosition(x, y) {
      this.position.x += x
      this.position.y += y
  }

  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    this.tails.forEach(element => {
      element.update();
    });
  }
  update() {
    this.draw();
  }
}

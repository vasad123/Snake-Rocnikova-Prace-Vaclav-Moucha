import myPlayer from "./player.js";
import {
  mybutton,
  wrapper,
  footer,
  canvas,
  ctx,
  Directions,
} from "./globalContext.js";

import { Fruit } from "./fruit.js";
import { keys, animation } from "./movement.js";
let startMenuOff;

mybutton.onclick = () => {
  wrapper.style.display = "none";
  canvas.style.display = "flex";
  footer.style.display = "none";
  startMenuOff = true;
};

const fruit = new Fruit();
const player = new myPlayer();

fruit.update();

animation();

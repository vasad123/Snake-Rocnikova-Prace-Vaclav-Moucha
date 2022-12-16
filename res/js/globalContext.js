export {
  mybutton,
  wrapper,
  footer,
  canvas,
  startMenuOff,
  ctx,
  CurrentDirection,
  Directions,
};
const mybutton = document.getElementById("mybutton");
const wrapper = document.getElementById("wrapper");
const footer = document.getElementById("footer");
const canvas = document.querySelector("canvas");
let startMenuOff = false;
const ctx = canvas.getContext("2d");
canvas.width = 1380;
canvas.height = window.innerHeight;

const Directions = {
  directionLeft: 1,
  directionRight: 2,
  directionUp: 3,
  directionDown: 4,
};
let CurrentDirection;

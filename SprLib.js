import * as sprites from "./tabs/sprites.js";

document.addEventListener("DOMContentLoaded", (e) => {
  changeTab("Sprites");
  sprites.draw();
})

document.addEventListener("resize", (e) => {console.log(e)})
window.sprites = sprites;
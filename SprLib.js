import * as sprites from "./tabs/sprites.js";

document.addEventListener("DOMContentLoaded", (e) => {
  changeTab("Sprites");
  sprites.draw();
})

document.addEventListener("resize", (e) => {console.log(e)})
window.sprites = sprites;

function changeTab(tab) {
  let tabs = document.getElementsByClassName("tab");
  for (let i=0; i<tabs.length; i++) {
    if (tabs[i].dataset.tab == tab) {
      tabs[i].style.backgroundColor = "var(--sl)";
      tabs[i].style.outlineColor = "var(--sl)";
    } else {
      tabs[i].style.backgroundColor = "";
      tabs[i].style.outlineColor = "";
    }
  }
  let tabContents = document.getElementsByClassName("content");
  for (let i=0; i<tabContents.length; i++) {
    if (tabContents[i].id==tab) {
      tabContents[i].style.display = "";
    } else {
      tabContents[i].style.display = "none";
    }
  }
}

window.changeTab = changeTab;
import * as sprites from "./tabs/sprites.js";
window.sprites = sprites;

document.addEventListener("DOMContentLoaded", (e) => {
  changeTab("Sprites");
  sprites.updateColors();
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

document.addEventListener("click", (e) => {
  const context = document.getElementById("colorContext");
  if (!e.composedPath().includes(context)) {
    context.style.display = "none";
  }
  const dropdowns = document.getElementsByClassName("dropdown");
  for (let i = 0; i < dropdowns.length; i++) {
    if (!e.composedPath().includes(dropdowns[i]) && e.composedPath()[0].dataset.option != dropdowns[i].id) { //!e.composedPath().includes(dropdowns[i]) && 
      dropdowns[i].style.display = "none";
    }
  }
})

function optionMenu(e) {
  let menu = document.getElementById(e.target.dataset.option);
  let buttonPos = e.target.getBoundingClientRect();
  menu.style.display = "block";
  menu.style.left = buttonPos.x + "px";
  menu.style.top = (buttonPos.y + buttonPos.height) + "px";
}

window.optionMenu = optionMenu;

window.changeTab = changeTab;
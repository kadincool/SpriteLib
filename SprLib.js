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
    console.log(e.composedPath()[0].dataset.option, dropdowns[i].id, e.composedPath()[0].dataset.option == dropdowns[i].id)
    if (!e.composedPath().includes(dropdowns[i]) && !e.composedPath()[0].dataset.option == dropdowns[i].id) { //!e.composedPath().includes(dropdowns[i]) && 
      dropdowns[i].style.display = "none";
    }
  }
})

function option(e) {
  let menu = document.getElementById("view");
  let buttonPos = e.target.getBoundingClientRect()
  console.log(menu);
  menu.style.display = "block"
}

window.opt = option;

window.changeTab = changeTab;
import * as sprites from "./tabs/sprites.js";
window.sprites = sprites;

document.addEventListener("DOMContentLoaded", (e) => {
  changeTab("Sprites");
  sprites.updateColors();
  sprites.draw();
  setup();
})

function setup() {
  const tabable = ["option", "tab", "sprTool", "contextButton", "codeButton"];
  for (let i = 0; i < tabable.length; i++) {
    let options = document.getElementsByClassName(tabable[i]);
    for (let j = 0; j < options.length; j++) {
      options[j].addEventListener("keyup", (e) => {if (e.code == "Enter") {options[j].click()}})
    }
  }
}

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
    if (tabContents[i].id == tab) {
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

function save() {
  //make a blob with the data
  let data = new Blob([JSON.stringify({sprites: sprites.sprites, colors: sprites.colors, code: document.getElementById("srcCode").innerText})], {type: "application/json"});
  //make download anchor
  let download = document.createElement("a");
  download.href = URL.createObjectURL(data);
  download.download = "save.slb";
  //make the download button temporarily in the DOM then clicv it
  document.body.appendChild(download);
  download.click();
  document.body.removeChild(download);
}

window.save = save;

function load() {
  let filePicker = document.createElement("input");
  filePicker.type = "file";
  filePicker.accept = ".slb";
  filePicker.addEventListener("change", function() {
    let firstFile = filePicker.files[0];

    if (firstFile) {
      let reader = new FileReader();

      reader.readAsText(firstFile);

      reader.onload = function(e) {
        let loadedFile = JSON.parse(e.target.result);

        console.log(loadedFile);

        sprites.loadSprites(loadedFile);
        if (loadedFile.code) document.getElementById("srcCode").innerText = loadedFile.code;
      };
    }
  });

  filePicker.click();
}

window.load = load;

window.changeTab = changeTab;
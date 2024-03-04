export var fill = false;
export var canvas =  document.getElementById("spriteCanvas");
export var can2d = canvas.getContext("2d");
var scale;
var translate;
export var contextColor = 0;

export function setFill(event) {
  console.log(event.target);
  fill = !fill;
  if (fill) {
    event.target.style.backgroundColor = "var(--sl)";
    event.target.style.outlineColor = "var(--sl)";
  } else {
    event.target.style.backgroundColor = "";
    event.target.style.outlineColor = "";
  }
}

export function setPixel(x,y,col) {
  if (!sprites[currentSprite]) makeImage(16, 16);
  let current = sprites[currentSprite];
  current.data[x + y * current.width] = col;
  sprites[currentSprite].data = current.data;
}

export function makeImage(w,h) {
  // return {data: [], width: w, height: h};
  sprites.push({data: [], width: w, height: h});
}

export function updateSprites() {

}

export function reloadSprites() {
  let sprites = document.getElementById("sprList");
  sprites.innerHTML = "";

  for (let i = 0; i < sprites.length; i++) {
    let sprite = document.createElement("div");
    sprite.className = "sprItem";
    let spritePreview = document.createElement("canvas");
    spritePreview.className = "spritePreview";
  }
}

export function loadSprites(file) {
  if (file.sprites) sprites = file.sprites;
  if (file.colors) colors = file.colors;
}

export function setColor(col) {
  currentColor = col;
  updateColors();
}

export function addColor(col) {
  if (col == null || col == "") return;
  colors.push(col);
  // let made = document.createElement("div");
  // made.style = "background-color: "+col+";";
  // made.className = "color";
  // document.getElementById("sprColorList").appendChild(made);
  currentColor = colors.length - 1;
  updateColors();
}

export function removeColor(remove) {
  if (colors[remove]) {
    const context = document.getElementById("colorContext");
    colors.splice(remove, 1);
    for (let sprite = 0; sprite < sprites.length; sprite++) {
      let instances = [];
      let larger = [];
      for (let i = 0; i < sprites[sprite].data.length; i++) {
        if (sprites[sprite].data[i] == remove) instances.push(i);
        else if (sprites[sprite].data[i] > remove) larger.push(i);
      }
      for (let i = 0; i < instances.length; i++) {
        sprites[sprite].data[instances[i]] = 0;
      }
      for (let i = 0; i < larger.length; i++) {
        sprites[sprite].data[larger[i]] -= 1;
      }
    }
    if (currentColor == remove) {currentColor = 0}
    else if (currentColor > remove) {currentColor -= 1}
    
    updateColors();
    context.style.display = "none";
  }
}

export function updateColors() {
  const list = document.getElementById("sprColorList");
  /*while (list.hasChildNodes) {
    list.removeChild(list.firstChild);
  }*/
  list.innerHTML = "";
  for (let i = 0; i < colors.length; i++) {
    let made = document.createElement("div");
    let style = "background-color: "+colors[i]+"; "
    if (currentColor == i) {style += "outline-color: white;"}
    made.style = style;
    made.onclick = function() {setColor(Number(this.dataset.index))};
    made.className = "SprColor";
    made.dataset.index = i;
    made.addEventListener("contextmenu", (e) => {e.preventDefault(); colorContext(e)});
    document.getElementById("sprColorList").appendChild(made);
  }
  let made = document.createElement("div");
  made.className = "SprColor";
  made.id = "addColor";
  made.innerHTML = "+";
  made.onclick = function() {addColor(prompt("Choose a color (eg. #rgb, #rgba, #rrggbb, #rrggbbaa, <css color>)"))}
  document.getElementById("sprColorList").appendChild(made);
}

export function colorContext(e) {
  contextColor = Number(e.composedPath()[0].dataset.index)

  const context = document.getElementById("colorContext");
  context.style.display = "flex";
  // context.style.display = "block";
  context.style.left = e.pageX - context.clientWidth - 4 + "px";
  context.style.top = e.pageY + 4 + "px";
}

export function draw() {
  canvas.width = undefined;
  canvas.height = undefined; //ensure that the canvas doesnt overflow the div
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  can2d.clearRect(0,0,canvas.width,canvas.height);
  //can2d.fillRect(0,0,canvas.width,canvas.height);
  if (!sprites[currentSprite]) makeImage(16, 16);
  let current = sprites[currentSprite];
  scale = Math.floor(canvas.height/current.height);
  translate=[Math.floor((canvas.width-current.width*scale)/2), Math.floor((canvas.height-current.height*scale)/2)]
  can2d.translate(...translate);
  //can2d.translate(Math.floor(current.width*scale), Math.floor(current.height*scale))
  for (let i=0; i<current.width*current.height; i++) {
    if (current.data[i] == undefined) current.data[i] = 0;
    // if (!current.data[i]) current.data[i] = "#ffffff"+(Math.floor(i/(current.width*current.height)*256).toString(16));
    can2d.fillStyle = colors[current.data[i]];
    can2d.fillRect((i%current.width)*scale, Math.floor(i/current.width)*scale, scale, scale);
  }
  requestAnimationFrame(draw);
}

canvas.addEventListener("mousedown", (e) => {
  //console.log(Math.floor((e.offsetX-translate[0])/scale), Math.floor((e.offsetY-translate[1])/scale));
  let px = Math.floor((e.offsetX-translate[0])/scale);
  let py = Math.floor((e.offsetY-translate[1])/scale);
  if (px >= 0 && px < sprites[currentSprite].width && py >= 0 && py < sprites[currentSprite].height)
  setPixel(px, py, currentColor);
})

canvas.addEventListener("mousemove", (e) => {
  let px = Math.floor((e.offsetX-translate[0])/scale);
  let py = Math.floor((e.offsetY-translate[1])/scale);
  if (px >= 0 && px < sprites[currentSprite].width && py >= 0 && py < sprites[currentSprite].height && e.buttons > 0) {
    setPixel(px, py, currentColor);
  }
  //if (e.buttons > 0) setPixel(Math.floor((e.offsetX-translate[0])/scale), Math.floor((e.offsetY-translate[1])/scale), currentColor)
})

export var sprites = [];
export var colors = [];
export var currentSprite = 0;
export var currentColor = 0;

addColor("white");
addColor("black");

/*export function initSprites() {
  sprite.canvas = document.getElementById("spriteCanvas");
  sprite.can2d = sprite.canvas.getContext("2d");
  sprite.setPixel = function (x,y,col) 
  sprite.makeImage = function(w,h) {
    sprite.sprites.push({data: [], width: w, height: h});
  }
  sprite.draw = function() {
    for (let i=0; i<)
  }
}*/
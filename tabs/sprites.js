
export var fill = false;
export var canvas =  document.getElementById("spriteCanvas");
export var can2d = canvas.getContext("2d");
var scale;
var translate;

export function setPixel(x,y,col) {
  if (!sprites[currentSprite]) makeImage(5,5);
  let current = sprites[currentSprite];
  current.data[x + y * current.width] = col;
  sprites[currentSprite].data = current.data;
}

export function makeImage(w,h) {
  // return {data: [], width: w, height: h};
  sprites.push({data: [], width: w, height: h});
}

export function draw() {
  // canvas.width = sprites[currentSprite].width;
  // canvas.height = sprites[currentSprite].height;
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  can2d.clearRect(0,0,canvas.width,canvas.height);
  //can2d.fillRect(0,0,canvas.width,canvas.height);
  if (!sprites[currentSprite]) makeImage(5,5);
  let current = sprites[currentSprite];
  scale = Math.floor(canvas.height/current.height);
  translate=[Math.floor((canvas.width-current.width*scale)/2), Math.floor((canvas.height-current.height*scale)/2)]
  can2d.translate(...translate);
  //can2d.translate(Math.floor(current.width*scale), Math.floor(current.height*scale))
  for (let i=0; i<current.width*current.height; i++) {
    if (current.data[i] == undefined) current.data[i] = i%3;
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
  setPixel(px, py, 0)
})

canvas.addEventListener("mousemove", (e) => {if (e.buttons > 0) setPixel(Math.floor((e.offsetX-translate[0])/scale), Math.floor((e.offsetY-translate[1])/scale), 0)})

export var sprites = [];
export var colors = ["#000000", "#7f7f7f", "#ffffff"];
export var currentSprite = 0;
export var currentColor = 0;

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
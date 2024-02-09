
export var fill = false;
export var canvas =  document.getElementById("spriteCanvas");
export var can2d = canvas.getContext("2d");

export function setPixel(x,y,col) {

}

export function makeImage(w,h) {
  sprites.push({data: [], width: w, height: h});
}

export function draw() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  can2d.clearRect(0,0,canvas.width,canvas.height);
  //can2d.fillRect(0,0,canvas.width,canvas.height);
  if (!sprites[currentSprite]) makeImage(10,10);
  let current = sprites[currentSprite];
  let scale = Math.floor(canvas.height/current.height);
  can2d.translate(Math.floor((canvas.width-current.width*scale)/2), Math.floor((canvas.height-current.height*scale)/2))
  //can2d.translate(Math.floor(current.width*scale), Math.floor(current.height*scale))
  for (let i=0; i<current.width*current.height; i++) {
    if (!current.data[i]) current.data[i] = i%3;
    // if (!current.data[i]) current.data[i] = "#ffffff"+(Math.floor(i/(current.width*current.height)*256).toString(16));
    can2d.fillStyle = colors[current.data[i]];
    can2d.fillRect((i%current.width)*scale, Math.floor(i/current.width)*scale, scale, scale);
  }
  requestAnimationFrame(draw);
}

export var sprites = [];
export var colors = ["#000000", "#7f7f7f", "#ffffff"];
export var currentSprite = 0;

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
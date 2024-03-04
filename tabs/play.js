var running = false;
var keys = {};

function runProgram() {
  //need to store because of weird bug
  let srcCode = document.getElementById("srcCode").innerText;
  changeTab("Play");
  const canvas = document.getElementById("runCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = undefined;
  canvas.height = undefined;
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  function drawSprite(spr, x, y, scale) {
    let sprite = sprites.sprites[spr];
    for (let i=0; i<sprite.width*sprite.height; i++) {
      if (sprite.data[i] == undefined) console.error("Sprite "+spr+" Not Defined");
      ctx.fillStyle = sprites.colors[sprite.data[i]];
      ctx.fillRect((i%sprite.width)*scale+x, Math.floor(i/sprite.width)*scale+y, scale, scale);
    }
  }

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function frameLoop() {
    if (running) {
      frame();
      requestAnimationFrame(frameLoop);
    }
  }
  function frame() {}

  running = true;
  try {
    eval(srcCode)
    frameLoop()
  } catch (error) {
    alert(error); console.log(error)
  }
}
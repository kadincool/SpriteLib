function runProgram() {
  changeTab("Play");
  const canvas = document.getElementById("runCanvas");
  const ctx = canvas.getContext("2d");
  try {eval(document.getElementById("srcCode").innerText);}
  catch (error) {alert(error); console.log(error)}
}

function runPerFrame(func) {
  func();
  requestAnimationFrame(runPerFrame(func));
}

function frame() {}

function programFrame() {
//   canvas.width = undefined;
//   canvas.height = undefined;
//   canvas.width = canvas.clientWidth;
//   canvas.height = canvas.clientHeight;
  frame();
  requestAnimationFrame(programFrame);
}
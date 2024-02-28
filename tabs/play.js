function runProgram() {
  changeTab("Play");
  const canvas = document.getElementById("runCanvas");
  const ctx = canvas.getContext("2d");
  try {eval(document.getElementById("srcCode").innerText); programFrame();}
  catch (error) {alert(error); console.log(error)}
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
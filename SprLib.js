function changeTab(tab) {
  let tabContents = document.getElementsByClassName("content");
  for (let i=0; i<tabContents.length; i++) {
    if (tabContents[i].id==tab) {
      tabContents[i].style.display = "block";
    } else {
      tabContents[i].style.display = "none";
    }
  }
}

document.addEventListener("DOMContentLoaded", (e) => changeTab("Sprites"))
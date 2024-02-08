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
      tabContents[i].style.display = "block";
    } else {
      tabContents[i].style.display = "none";
    }
  }
}
function showNav() {
  document.getElementById("nav").style.left = "0";
  document.getElementById("overlay").classList.remove("dn");
  document.getElementById("body").classList.add("overflow-hidden");
}

function hideNav() {
  document.getElementById("nav").style.left = "-100%";
  document.getElementById("overlay").classList.add("dn");
  document.getElementById("body").classList.remove("overflow-hidden");
}

function checkWidth() {
  if (window.innerWidth >= 1366) {
    document.getElementById("nav").style.left = "0";
  }
  else {
    document.getElementById("nav").style.left = "-100%";
  }
}

window.onload = function(){
  checkWidth();
  document.getElementById("nav").style.left = "-100%";
};

window.onresize = function(){
  checkWidth();
};

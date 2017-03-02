function showNav() {
  document.getElementById("nav").style.left = "0";
  document.getElementById("overlay").classList.remove("dn");
  document.getElementsByTagName("body")[0].classList.add("overflow-hidden");
}

function hideNav() {
  document.getElementById("nav").style.left = "-100%";
  document.getElementById("overlay").classList.add("dn");
  document.getElementsByTagName("body")[0].classList.remove("overflow-hidden");
}

function checkWidth() {
  if (window.innerWidth >= 1366) {
    document.getElementById("nav").style.left = "0";
    document.getElementsByClassName("app")[0].style.marginLeft = "320px";
    document.getElementById("footer").style.marginLeft = "320px";
    document.getElementById("header").classList.add("dn");
    document.getElementById("article").classList.add("pt4-ns");
  }
  else {
    document.getElementById("nav").style.left = "-100%";
    document.getElementsByClassName("app")[0].style.marginLeft = "0";
    document.getElementById("footer").style.marginLeft = "0";
    document.getElementById("header").classList.remove("dn");
    document.getElementById("article").classList.remove("pt4-ns");
  }
}

window.onload = function(){
  checkWidth();
};

window.onresize = function(){
  checkWidth();
};

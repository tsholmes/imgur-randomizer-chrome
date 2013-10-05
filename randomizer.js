var __charset = "qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM";
var __threads = 20;

var imgel = null;
var container = null;

var imglist = [];

var running = 0;

function randomChar() {
  return __charset[parseInt(Math.random()*__charset.length)];
}

function randomId() {
  var id = "";
  for (var i = 0; i < 5; i++) {
    id += randomChar();
  }
  return id;
}

function loadNextImage() {
  var id = randomId();
  var url = "http://i.imgur.com/" + id + ".png";

  var loaded = false;


  var img = new Image();
  img.src = url;

  var onloaded = function() {
    if (!loaded) {
      loaded = true;
      if (!((img.width==198 && img.height==160) || (img.width==161 && img.height==81) || img.width < 20 || img.height < 20)) {
        imglist.push(img);
        if (imgel.src == "") {
          moveToNext();
        }
      }
      if (imglist.length < 200) {
        loadNextImage();
      } else {
        running--;
      }
    }
  }

  img.onload = onloaded;

  if (img.complete) {
    onloaded();
  }
}

function moveToNext() {
  container.style.width = "auto";
  imgel.src = imglist[0].src;
  container.style.width = imgel.width + "px";
  imglist.splice(0,1);
  if (running == 0) {
    running++;
    loadNextImage();
  }
}

window.addEventListener('load',function(){
  imgel = document.getElementById("img");
  container = document.getElementById("container");
  document.onclick = moveToNext;
  for (var x = 0; x < __threads; x++) {
    running++;
    loadNextImage();
  }
},false);

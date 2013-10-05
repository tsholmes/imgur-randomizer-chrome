var __charset = "qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM";
var __threads = 20;

var imgel = null;
var container = null;

var imglist = [];

var running = 0;

var lastImg = new Image();
var curImg = new Image();

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
  if (imglist.length == 0) {
    if (running < 20) {
      running++;
      loadNextImage();
    }
    return;
  }
  lastImg = curImg;
  curImg = imglist.shift();

  container.style.width = "auto";
  imgel.src = curImg.src;
  container.style.width = imgel.width + "px";

  if (running == 0) {
    running++;
    loadNextImage();
  }
}

function moveToLast() {
  if (curImg == lastImg) {
    return;
  }
  imglist.unshift(curImg);
  curImg = lastImg;

  container.style.width = "auto";
  imgel.src = curImg.src;
  container.style.width = imgel.width + "px";
}

function handleKey(e) {
  if (e.keyIdentifier == "Right") {
    moveToNext();
  } else if (e.keyIdentifier == "Left") {
    moveToLast();
  } else if (e.keyIdentifier == "Down") {
    var newwin = window.open(imgel.src,"_blank");
    newwin.blur();
    window.focus();
  }
}

window.addEventListener('load',function(){
  imgel = document.getElementById("img");
  container = document.getElementById("container");
  document.onkeydown = handleKey;
  for (var x = 0; x < __threads; x++) {
    running++;
    loadNextImage();
  }
},false);


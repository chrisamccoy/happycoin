window.onload = deferLoad;

function deferLoad() {
  deferImages();
  deferThirdParty();
  deferIframes();
}

function deferImages() {
  var imgDefer = document.getElementsByTagName('img');
  for (var i=0; i<imgDefer.length; i++) {
    if(imgDefer[i].getAttribute('data-src')) {
      imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'));
    }
  }
}

function deferThirdParty() {
  $.getScript('https://platform.twitter.com/widgets.js');
}

function deferIframes() {
  var iframes = document.getElementsByTagName('iframe');
  for (var i=0; i<iframes.length; i++) {
    if(iframes[i].getAttribute('data-src')) {
      iframes[i].setAttribute('src',iframes[i].getAttribute('data-src'));
    }
  }
}

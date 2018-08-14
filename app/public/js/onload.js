window.onload = deferLoad;

var sliderInit = false;

function deferLoad() {
  deferImages();

  setTimeout(function() {
    initLogoSlider('#hc-buyers-slider', 3);
    deferSections();
    deferAnalytics();
    deferTwitter();
    deferIframes();
  }, 1000);
}

function deferSections() {
  var $el = $(window.location.hash);

  if ($el.length === 1) {
    var $sec = $el.parents('section');
    if ($sec.length >= 1) {
      $sec.addClass('expanded');
    }
  }

  $('section').each(function() {
    if ($(this).hasClass('expanded')) {
      $(this).prev('.section-heading').addClass('expand');
      checkForSliders($(this));
    } else {
      $(this).hide();
    }
  });

  $('.section-heading').click(function() {
    if ($(this).hasClass('expand')) {
      $(this).removeClass('expand');
      $(this).next('section').hide();
    } else {
      $(this).addClass('expand');
      $(this).next('section').show();
      checkForSliders($(this).next('section'));
    }
  });

  hasUrl();
}

function checkForSliders($el) {
  if (sliderInit) {
    return;
  }

  if ($el.find('#wallet-slider').length === 0) {
    console.log('Not found!');
    return;
  }

  sliderInit = true;
  initLogoSlider('#hc-partners-slider', 3);
  initLogoSlider('#wallet-slider', 4);
  initLogoSlider('#eco-system-slider', 2);
}

function deferImages() {
  var imgDefer = document.getElementsByTagName('img');
  for (var i=0; i<imgDefer.length; i++) {
    if(imgDefer[i].getAttribute('data-src')) {
      imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'));
    }
  }
}

function deferAnalytics() {
  // Google Analytics
  $.getScript( "https://www.googletagmanager.com/gtag/js?id=UA-112685273-1" )
    .done(function( script, textStatus ) {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-112685273-1');
  });
}

function deferTwitter() {
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

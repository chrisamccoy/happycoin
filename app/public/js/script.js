$(document).ready(function(){
  // console.log(getCookie('ref_email'));
  var isMobile = false;
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    .test(navigator.userAgent) ) {
   isMobile = true;
  }
  // alert($(window).width());
  $('img[usemap]').rwdImageMaps();
  initDropdown();
  whyTextToggle();
  renderRadio();
  cardFlip();
  stratDist(isMobile);
  scrollCheck(isMobile);

  // on scroll
  $(window).scroll(function(){
    scrollCheck(isMobile);
  });

  $('#hc-nav-wrapper .menu-toggle').click(function (){
    $('#hc-nav-wrapper .hc-navigation .hc-menu-container').toggle('slow');
  });

  $("input[data-type='number']").keyup(function(event){
    // skip for arrow keys
    if(event.which >= 37 && event.which <= 40){
        event.preventDefault();
    }
    var $this = $(this);
    var num = $this.val().replace(/,/gi, "");
    var num2 = num.split(/(?=(?:\d{3})+$)/).join(",");
    // console.log(num2);
    // the following line has been simplified. Revision history contains original.
    $this.val(num2);
  });

  renderCircles();
  renderCards();
  toggleCardTasks();
  emailSubscribe(isMobile);
  initSlider();
  initProblemSlider();
  toggleStatusText();
  initTimer();
  fadeInContent();
  initTippy(isMobile);
  initLightBulb();
  initFireGlow();
  initProblemReveal(isMobile);
  initCoinFlip();
  initInviteSale();
  initFullscreenImage(isMobile);
  initIntroHeight(isMobile);
  initBlogShare();
  initFormSubscribe();
  initThirdTokenSale();
  twitterWidgets();
  iframes();
  initKyc();
  initCountDown();
});

function initCountDown() {
  // console.log($('#countdown').length);
  if ($('#countdown').length > 0) {
    var second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    var countDown = new Date("Aug 27, 2018 00:00:00").getTime(),
        x = setInterval(function () {
      var now = new Date().getTime(),
          distance = countDown - now;

      document.getElementById("days").innerText = Math.floor(distance / day), document.getElementById("hours").innerText = Math.floor(distance % day / hour), document.getElementById("minutes").innerText = Math.floor(distance % hour / minute), document.getElementById("seconds").innerText = Math.floor(distance % minute / second);

    }, second);
  }
}

function initDropdown() {
  var $menu = $('#hc-nav-wrapper .hc-branding.invite-dropdown .hc-menu-dropdown'),
      $nav = $menu.find('.nav-menu');

  $menu.click(function(){
    $nav.toggleClass('show');
  });
}

function initThirdTokenSale(){
  var $tokenSale = $('#third-token-sale');

  $('#third-token-sale button').click(function(){
    $('html, body').animate({ scrollTop : 0 }, 400, function(){
      $('#third-token-sale button').hide();
      $('.hc-email .email-widget').hide();
      $('#third-token-sale').addClass('hide');
      $('.token-widget-container').show();
      // $('#about-second-token-sale').hide();
      $('.hc-email .steps-form').show();
      $('.hc-email .email-steps.step-1').show();
    });
  });

  $tokenSale.find('.jump-to-buy').click(function(){
    $('html, body').animate({ scrollTop : $('#hc-content iframe').offset().top - 100}, 600);
  });

  $('.token-widget-container .go-back').click(function(){
    $(this).find('i').toggleClass('ion-chevron-up ion-chevron-down');
    $('#third-token-sale').toggleClass('hide');
  });
}

function initBlogShare (){
  var $blogNews = $('.blog-news');

  if($blogNews.length) {
    var $blogHead = $blogNews.find('.article-title'),
        $blogShare = $blogNews.find('.blog-share');

    $(window).scroll(function(){
      var scrollVal  = $(window).scrollTop(),
          offset = $blogHead.offset().top - 100,
          height = $blogNews.height();
      // console.log(scrollVal, height - 200);
      if (scrollVal > offset && scrollVal < height - 300) {
        $blogShare.not('.fixed').fadeIn();
      } else {
        $blogShare.not('.fixed').fadeOut();
      }
    });
  }
}

function initIntroHeight (isMobile) {
  // var introHeight = $(window).height() - ((isMobile) ? 232 : 271);
  // var introHeight = $(window).height() - $('#hc-nav-wrapper').outerHeight() - $('#second-token-sale .form-subscribe').outerHeight() - $('#second-token-sale #note').outerHeight();
  var introHeight = $(window).height() - $('#hc-nav-wrapper').outerHeight() - $('#second-token-sale .form-subscribe').outerHeight();
  if($('#countdown').length > 0) {
    introHeight = $(window).height() - $('#hc-nav-wrapper').outerHeight();
  }
  // console.log(introHeight);
  $('#hc-intro').height(introHeight);
}

function initFullscreenImage (isMobile) {
  var $infoFullScreen = $('.info-fullscreen'),
      $infoModal = $('#info-image-modal');

  $infoFullScreen.click(function(){
    var html = $(this).html();
    if (isMobile) {
      $infoModal.find('.content .image-modal-container')
                .css('width', 'auto')
                .html('')
                .append(html);
    } else {
      $infoModal.find('.content .image-modal-container').html('').append(html);
    }
    $infoModal.modal({
      onShow : function(){
        $(window).trigger('resize');
      }
    }).modal('show');
    $infoModal.find('i.ion-android-close').click(function(){
      $infoModal.modal('hide');
    });
  });

  $('.blog-news .hc-image').click(function(){
    var html = $(this).html();
    if (isMobile) {
      $infoModal.find('.content .image-modal-container')
                .css('width', 'auto')
                .html('')
                .append(html);
    } else {
      $infoModal.find('.content .image-modal-container').html('').append(html);
    }
    $infoModal.modal({
      onShow : function(){
        $(window).trigger('resize');
      }
    }).modal('show');
    $infoModal.find('i.ion-android-close').click(function(){
      $infoModal.modal('hide');
    });
  });
}

function initInviteSale() {
  var $navWrap = $('#hc-nav-wrapper'),
      $inviteSale = $('.sale-invite'),
      $modal = $('#sale-invite-modal');

  $inviteSale.click(function(){
    if (window.location.host === 'storeco.in' && window.location.pathname === '/') {
      var id = $(this).data().id;
      var $tokenSale = ($(id).length) ? $(id) : $('#tokensale-bottom');
      if($tokenSale.length) {
        $('html, body').animate({ scrollTop : $tokenSale.offset().top - $navWrap.height() }, 600);
      }
    } else {
      $modal.modal('show');
    }
  });

  $modal.find('i.ion-android-close').click(function(){
    $modal.modal('hide');
  });

  $modal.find('form').submit(function(){
    $modal.modal('hide');
  });
}

function initCoinFlip () {
  var $coins = $('.coin');

  $coins.each(function(i){
    var $coin = $(this),
    $coinCont = $coin.parents('.coin-wrapper'),
    offset = $coinCont.offset().top - (500 * ( i + 1)),
    flipping = false;
    $(window).scroll(function(){
      var scrollVal  = $(window).scrollTop();
      console.log(i, flipping, scrollVal, offset);
      if (scrollVal > offset) {
        if(!flipping) {
          $coin.addClass('flip');
          setTimeout(function(){
            $coin.removeClass('flip');
          }, 2000);
          flipping = true;
        }
      } else {
        $coin.removeClass('flip');
        flipping = false;
      }
    });
  });
}


function initProblemReveal(isMobile){
  var $seeMoreLink = $('.see-more');
  $seeMoreLink.click(function(){
    var link = $(this).data().link,
        extraMargin = $(this).data().margin.split(','),
        isScroll = $(this).data().scroll,
        $reveal;

    if (link == '.zcash-text') {
      $reveal = $(this).parents('.storeco-vs-blchains').find(link).toggleClass('show');
    } else {
      if($(this).data().back) {
        $reveal = $(link).toggleClass('show');
      } else {
        $reveal = $(link).addClass('show');
      }
    }

    if($(this).data().inner) {
      var texts = $(this).data().inner.split(',');
      $(this).html(function(i, text){
          return text === texts[0] ? texts[1] : texts[0];
      });
    }

    var marginTop = (isMobile) ? (92 - extraMargin[0]) : (100 - extraMargin[1]),
    offset = $reveal.offset().top - marginTop;

    if (isScroll) {
      $('html, body').animate({ scrollTop : offset }, 600);
    }
  });
}

function initLightBulb () {
  var $ourVision = $('#our-vision-zero-fee');

  if ($ourVision.length) {
    var $bulbOff = $ourVision.find('.bulb-off'),
        $bulbGlow = $ourVision.find('.bulb-glow');

    $(window).scroll(function(){
      var scrollVal  = $(window).scrollTop() + $(window).height(),
          offset = $ourVision.find('.hc-image').offset().top + ($ourVision.find('.hc-image').height() / 2);
      if (scrollVal > offset) {
        $bulbGlow.fadeIn();
        $ourVision.addClass('active');
      } else {
        $bulbGlow.hide();
        $ourVision.removeClass('active');
      }
    });
  }
}

function initFireGlow () {
  var $tolerance = $('#why-fork-tolerance-matters');

  if ($tolerance.length) {
    var $fireOff = $tolerance.find('.fire-off'),
        $fireOn = $tolerance.find('.fire-on');

    $(window).scroll(function(){
      var scrollVal  = $(window).scrollTop() + $(window).height(),
          offset = $tolerance.find('.hc-image').offset().top + ($tolerance.find('.hc-image').height() / 2);
      if (scrollVal > offset) {
        $fireOn.fadeIn();
        $tolerance.addClass('active');
      } else {
        $fireOn.hide();
        $tolerance.removeClass('active');
      }
    });
  }
}

// function initLearnMore (isMobile) {
//   var $learnMoreLinks = $('#learn-more .hc-feature-lead');
//   $learnMoreLinks.click(function(){
//     var link = $(this).data().link,
//         $thisItem = $(link),
//         offset;
//
//     $('.learn-more').hide();
//     $thisItem.show();
//     var marginTop = (isMobile) ? 92 : 100;
//     offset = $thisItem.offset().top - marginTop;
//
//     $('html, body').animate({ scrollTop : offset }, 600);
//   });
// }

function initTippy(isMobile) {
  // $('map[name="image-map"] area').click(function(){
  //   var offset = $(this).offset();
  //   console.log($('.tippy-popper'));
  //   $('#tippy-tooltip-1').css('transform', 'translate3d('+offset.left+'px, '+offset.top+'px, 0px)');
  // });
  tippy('.desktop-image map[name="desktop-image-map"] area',{
    // trigger : 'click',
    animation: 'scale',
    arrow: true,
    followCursor : true
  });

  tippy('#security-system .hazard-boxes .box',{
    // trigger : 'click',
    animation: 'scale',
    arrow: true,
    followCursor : true
  });

  if (isMobile) {
    tippy('#comparison-table td .see-more',{
      // trigger : 'click',
      animation: 'scale',
      arrow: true,
      followCursor : true
    });
  }
}

function imgCoords(isMobile) {
  var winWidth = isMobile ? 'mobile' : 'desktop',
      $areas = $('.'+winWidth+'-image map[name="'+winWidth+'-image-map"] area'),
      ogWidth = 1000;

  // console.log(winWidth);
  var selector = '.'+winWidth+'-image img[usemap="#'+winWidth+'-image-map"]';
  $(selector).on('load', function(){
    var imgWidth = $(this).width();
    $areas.each(function(){
      var myCoords = $(this).attr('mycoords').split(','),
          newCoords = [];
      myCoords.forEach(function(item){
        var percent = item/ogWidth,
            newVal = imgWidth * percent;
        newCoords.push(newVal);
        // console.log(newCoords);
      });
      $(this).attr('coords', newCoords.join(','));
    });
  });
}

function scrollCheck(isMobile){
  var scrollVal = $(window).scrollTop(),
      $navSection = $('#hc-nav-wrapper'),
      $emailSubscribe = $('#email-subscribe'),
      pathname = window.location.pathname,
      paths = ['/communityfund', '/cfc18'];

  // console.log(paths.indexOf(pathname));

  if (paths.indexOf(pathname) < 0) {
    if (scrollVal > 50) {
      $navSection.addClass('scrolling');
    } else {
      $navSection.removeClass('scrolling');
    }

    if (scrollVal > 60) {
      $emailSubscribe.fadeIn();
    } else {
      $emailSubscribe.fadeOut(100);
    }
  } else {
    $navSection.addClass('scrolling');
    $('#hc-content').css('margin-top', (isMobile) ? '46px' : '50px');
  }

  $emailSubscribe.find('.close').click(function(){
    $(this).parents('#email-subscribe').remove();
  });

  $emailSubscribe.find('.reveal').click(function(){
    $emailSubscribe.find('.mobile-reveal').addClass('show');
    $(this).fadeOut();
  });
}

function initFormSubscribe () {
  var $form = $('.form-subscribe'),
      $button = $form.find('button[type="submit"]');

  $form.find('form').on('submit', function(){
    $form.addClass('hidden');
  });
}

function cardFlip() {
  var $sixEngines = $('#six-engines'),
      $engine = $sixEngines.find('.engines .engine'),
      $engineModal = $('.engine-modals .engine-modal'),
      $openModal = $('.open-modal'),
      isSlider = {
        '#dypos-modal' : false
      };

  $engineModal.find('i.ion-android-close').click(function(){
    $(this).parents('.engine-modal').modal('hide');
  });

  $openModal.click(function(){
    var modalName = $(this).data().modal,
        goto = $(this).data().goto;
    $(modalName).modal({
      observeChanges : true,
      onVisible : function(){
        if(modalName in isSlider) {
          if(!isSlider[modalName]) {
            $(modalName+' .engine-slider').slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows : true
              // adaptiveHeight : true
            });
            isSlider[modalName] = true;
          }
        }
        $(modalName+' .engine-slider').slick('slickGoTo', goto);
        $(modalName+' .engine-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
          console.log(currentSlide);
        });
      }
    }).modal('show');
  });

  if($(window).width() > 700) {
    $engine.css('perspective', '1000px');

    $engine.hover(
      function(){
        $(this).addClass('flip');
      },
      function(){
        $(this).removeClass('flip');
      }
    );
  } else {
    // $('#engine-cards-modal').modal({ observeChanges : true });
    // var isCardSlider = false;
    // $engine.click(function(){
    //   var goto = $(this).data().goto;
    //   $('#engine-cards-modal').modal('show');
    //   $('#engine-cards-modal').modal('refresh');
    //   if(!isCardSlider) {
    //     $('#engine-cards-modal .card-slider').slick({
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //       arrows : true,
    //       adaptiveHeight : true
    //     });
    //     isCardSlider = true;
    //   }
    //   $('#engine-cards-modal .card-slider').slick('slickGoTo', goto);
    //   $('#engine-cards-modal i.ion-android-close').click(function(){
    //     $('#engine-cards-modal').modal('hide');
    //   });
    // });
  }
}

function stratDist(isMobile) {
  var $startDist = $('#distribution-strategy .hc-strat-dist');

  if(isMobile) {
    $startDist.click(function(){
      $startDist.find('p').removeClass('show');
      $(this).find('p').addClass('show');
    });
  } else {
    $startDist.hover(
      function(){
        $(this).find('p').addClass('show');
      },
      function(){
        $(this).find('p').removeClass('show');
      }
    )
  }
}

// function scrollCheck(){
//   var scrollVal = $(window).scrollTop(),
//       $navWrapper = $('#hc-nav-wrapper');
//
//   if (scrollVal > 1) {
//     //$navWrapper.addClass('add-background');
//   } else {
//     //$navWrapper.removeClass('add-background');
//   }
// }

function generateCircle (element, value, color, fontSize) {
  element = document.getElementById(element);
  if (element) {
    var bar = new ProgressBar.Circle(element, {
      color: color,
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 2,
      trailWidth: 4,
      easing: 'easeInOut',
      text: {
        autoStyleContainer: false
      },
      from: { color: '#FFEA82', width: 5 },
      to: { color: '#ED6A5A', width: 5 },
      // Set default step function for all animate calls
      step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

        var value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText('0');
        } else {
          circle.setText(value+"%");
        }

      }
    });

    bar.text.style.fontSize = fontSize;

    bar.animate(value);
  }
}

function generateBar (element, value) {
  element = document.getElementById(element);
  if (element) {
    var bar = new ProgressBar.Line(element, {
      strokeWidth: 4,
      easing: 'easeInOut',
      duration: 1400,
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      svgStyle: {width: '100%', height: '100%'},
      from: {color: '#FFEA82'},
      to: {color: '#ED6A5A'},
      step: function (state, bar) {
        bar.path.setAttribute('stroke', state.color);
      }
    });

    bar.animate(value);
  }
}

function renderCircles() {
  generateCircle('circle1', 0.33, '#5d794c', '2rem');
  generateCircle('circle2', 0.46, '#5d794c', '2rem');
  generateCircle('circle3', 0.20, '#5d794c', '2rem');
  generateCircle('circle4', 0.01, '#5d794c', '2rem');
  // generateCircle('rev-recur-circle', 0.01, '#5d794c', '2rem');
}

function whyTextToggle () {
  var $columns = $('.points:not(.ext) .columns');

  $columns.click(function(){
    $columns.removeClass('active');
    $columns.find('.points-desc').addClass('ellipsis');
    $(this).toggleClass('active');
    $(this).find('.points-desc').toggleClass('ellipsis');
  });
}

function renderCards() {
  var cards = [
    {
      cardId : 'card-1', name : 'TECHNICAL DOCUMENTATION' , completion : 0.1,
      description : 'Technical Document Protocol of how the blockchain is updated and the data is exchanged between nodes.',
      taskCompleted : 0,
      tasks : [
        { name : 'Writing documentation', completion : 0.15 }
      ]
    },
    {
      cardId : 'card-2', name : 'DESKTOP WALLET REDESIGN' , completion : 0.63,
      description : 'Complete redesign of Desktop Wallet to make it even more user friendly.',
      taskCompleted : 3,
      tasks : [
        { name : 'Initial R & D', completion : 1.0 },
        { name : 'UI Wireframe', completion : 1.0 },
        { name : 'Prototype Mockup', completion : 1.0 },
        { name : 'Finalize UI/UX wireframe', completion : 0.15 },
        { name : 'Code final wallet build', completion : 0 }
      ]
    },
    {
      cardId : 'card-3', name : 'MOBILE WALLETS' , completion : 0.52,
      description : 'Building IOS/ANDROID based mobile wallets.',
      taskCompleted : 1,
      tasks : [
        { name : 'Initial R & D', completion : 1.0 },
        { name : 'UI Wireframe', completion : 0.6 },
        { name : 'Prototype Mockup', completion : 0 }
      ]
    },
    {
      cardId : 'card-4', name : 'SMARTBRIDGE PARTNERSHIPS' , completion : 0.1,
      description : 'Building partnerships and bridging other projects is a never ending phase on the roadmap. We will always be looking to connect and build partnerships, so this percentage will never be complete.',
      taskCompleted : 0,
      tasks : [
        { name : 'Build Partnerships', completion : 0.15 }
      ]
    },
    {
      cardId : 'card-5', name : 'ALTERNATIVE DEVELOPMENT IMPLEMENTATION AND PROGRAMMING LANGUAGES.' , completion : 0.45,
      description : 'ARK is built on node.js/javascript but we want the world of developers to be comfortable in their favorite programming languages. So we are integrating multiple other languages. The .NET integration covers many different programming languages, the list can be found here https://en.wikipedia.org/wiki/List_of_CLI_languages#Current_Languages it also covers more in linux via Mono. http://www.mono-project.com/',
      taskCompleted : 4,
      tasks : [
        { name : 'Python', completion : 1.0 },
        { name : 'Java', completion : 1.0 },
        { name : '.NET', completion : 1.0 },
        { name : 'R', completion : 0.2 },
        { name : 'C', completion : 0 },
        { name : 'GO', completion : 1.0 },
        { name : 'Advanced PowerShell', completion : 0.2 },
        { name : 'RUST', completion : 0 },
        { name : 'PHP', completion : 0.07 },
        { name : 'TypeScript API', completion : 0.2 },
        { name : 'C++', completion : 0.07 }
      ]
    },
    {
      cardId : 'card-6', name : 'FIRST ITERATION OF SMARTBRIDGE WITH A CENTRALIZED APP.' , completion : 0.5,
      description : 'Building a blockchain app and connecting it to ARK’s mainchain via SmartBridge for initial testing and usecase.',
      taskCompleted : 0,
      tasks : [
        { name : 'Build a simple APP', completion : 0.5 }
      ]
    },
    {
      cardId : 'card-7', name : 'PUSH BUTTON DEPLOYABLE BLOCKCHAINS.' , completion : 0.43,
      description : 'Making ARK clone-able with push button deployment and linked to ARK’s Main Chain via SmartBridge. So any startup that wants to fork ark can do so with ease and be SmartBridge compatible right out of the box.',
      taskCompleted : 1,
      tasks : [
        { name : 'Integrate code and make wallet compatible', completion : 1.0 },
        { name : 'Update Lite-Client Libraries to support multiple chains', completion : 0.2 },
        { name : 'Make Instructions and easy walk through', completion : 0.35 },
        { name : 'Update ARKCommander for new start-ups', completion : 0.3 }
      ]
    },
    {
      cardId : 'card-8', name : 'INTEGRATION OF INTERPLANETARY FILE SYSTEM (IPFS).' , completion : 0.1,
      description : 'IPFS(Inter-planetary File System) is a peer-to-peer hypermedia protocol. With IPFS integrated ARK will address large amounts of data and place the immutable, permanent IPFS links into the ARK blockchain with out the bloat. It will timestamp and secure your content, without having to put the data on the chain itself.',
      taskCompleted : 0,
      tasks : [
        { name : 'Implement IPFS into ARK core.', completion : 0.7 }
      ]
    },
    {
      cardId : 'card-9', name : 'FORMATION OF BUSINESS ENTITY. IE, FOUNDATION.' , completion : 0.65,
      description : 'Currently this is not required for ARK  nor is it a priority. It is on the roadmap because we feel it is a step into future ideas and projects, and we are still investigating multiple options. We are deciding which route is best for the future currently.',
      taskCompleted : 0,
      tasks : [
        { name : 'Research foundation and choose best option for ARK\'s future', completion : 0.65 }
      ]
    },
    {
      cardId : 'card-10', name : 'WEBSITE REDESIGN' , completion : 0.1,
      description : 'Complete overhaul of ARK.io website.',
      taskCompleted : 0,
      tasks : [
        { name : 'Redesign site', completion : 0.1 }
      ]
    },
    {
      cardId : 'card-11', name : 'DEPLOYMENT OF TESTNET CLONES FOR START-UPS.' , completion : 0.67,
      description : 'Push button deploy-able testnets for anyone that wants to test or build something on ARK, or for ARK. Making it easy for anyone to have their own ARK testnet to try new and exiting things.',
      taskCompleted : 1,
      tasks : [
        { name : 'Setting push button genesis blocks and in wallet access.', completion : 0.9 },
        { name : 'Updating desktop wallet to handle testnet chains', completion : 1.0 },
        { name : 'Making easy to use intructions', completion : 0.5 },
        { name : 'Updating ARKCommander to use with new testnet chains', completion : 0.3 }
      ]
    },
    {
      cardId : 'card-12', name : 'SMARTBRIDGE DOCUMENTATION AND INSTRUCTIONAL VIDEOS' , completion : 0.15,
      description : 'Making Documentation for SmartBridge. Making it Easy to understand with instructional tutorials. Also a more technical SmartBridge White Paper.',
      taskCompleted : 0,
      tasks : [
        { name : 'Writing documents, making tutorials.', completion : 0.15 }
      ]
    },
    {
      cardId : 'card-13', name : 'INTEGRATING ARK AS PAYMENT FOR MERCH STORE' , completion : 0,
      description : 'Accepting ARK in the ARK Merchandise Store.',
      taskCompleted : 0,
      tasks : [
        { name : 'Integrating ARK into woocommerce, gocoin, or other payment processors.', completion : 0 }
      ]
    },
    {
      cardId : 'card-14', name : 'DEVELOPMENT OF VARIOUS SMART CARD/NFC MATERIALS.' , completion : 0.17,
      description : 'Research, Sourcing, and Development of various Smart Card/NFC materials.',
      taskCompleted : 0,
      tasks : [
        { name : 'Research of Smart Card/NFC devices.', completion : 0.5 },
        { name : 'Beta Testing', completion : 0 },
        { name : 'Production and distribution', completion : 0 }
      ]
    },
    {
      cardId : 'card-15', name : 'NFC/CONTACTLESS CHIP WEARABLE DEVICES.' , completion : 0.57,
      description : 'Partnerships and R&D for NFC/contact less chip and wearable devices.',
      taskCompleted : 1,
      tasks : [
        { name : 'Research', completion : 1.0 },
        { name : 'Beta Testing', completion : 0.6 },
        { name : 'Production and distribution partnership research', completion : 0.1 }
      ]
    },
    {
      cardId : 'card-16', name : 'POINT OF SALE HARDWARE R&D' , completion : 0.1,
      description : 'Researching Point of Sale Hardware integration and services.',
      taskCompleted : 0,
      tasks : [
        { name : 'R & D', completion : 0.1 },
      ]
    },
    {
      cardId : 'card-17', name : 'INTERPLANETARY DATABASE (IPDB).' , completion : 0.1,
      description : 'Integration of InterPlanetary DataBase (IPDB). This depends on final release. Learn more here https://ipdb.foundation/',
      taskCompleted : 0,
      tasks : [
        { name : 'Research', completion : 0.1 },
      ]
    }
  ];

  cards.forEach(function(item, i){
    var $card = $('#'+item.cardId),
        $cardHead = $card.find('.card-head'),
        $cardDesc = $card.find('.card-desc'),
        $barsHead = $card.find('.progress-bars .bar-head p'),
        $bars = $card.find('.progress-bars .bars'),
        $cardCircle = $card.find('.card-circle-progress'),
        circleId = item.cardId+'-circle-'+i;
        cardCompletion = Math.round(item.completion*100),
        numTasks = item.tasks.length;

    $cardHead.find('h5').text(item.name);
    $cardHead.find('.comp-percent').html(cardCompletion+'%<br> Complete');
    $cardHead.find('.num-tasks').html(item.taskCompleted+'/'+numTasks+'<br> Tasks');
    $cardCircle.append('<div id="'+circleId+'"></div>');
    generateCircle(circleId, item.completion, '#5b6a72', '3rem');
    $cardDesc.find('p').text(item.description);
    $barsHead.text(item.taskCompleted+' OF '+numTasks+' COMPLETED');

    item.tasks.forEach(function(task, t){
      taskBarId = item.cardId+'-bar-'+t;
      $bars.append('<p>'+task.name+'</p><div id="'+taskBarId+'"></div>');
      generateBar(taskBarId, task.completion);
    });
  });
}

function toggleCardTasks() {
  var $cards = $('#hc-roadmap .task-card'),
      $barsHead = $cards.find('.bar-head'),
      $bars = $cards.find('.bars');

  $barsHead.click(function(){
    var $thisCard = $(this).parents('.task-card');
    var $thisBar = $thisCard.find('.bars');
    $cards.not($thisCard).addClass('truncate');
    $thisCard.toggleClass('truncate');
    $barsHead.not(this).find('h6 i').removeClass('ion-chevron-up');
    $barsHead.not(this).find('h6 i').addClass('ion-chevron-down');
    $bars.not($thisBar).addClass('hidden');
    $(this).find('h6 i').toggleClass('ion-chevron-up ion-chevron-down');
    $(this).next('.bars').toggleClass('hidden');
  });
}

function toggleAppsDesc() {
  var $apps = $('#hc-apps .desktop'),
      $row  = $apps.find('.hc-apps-row'),
      $title = $row.find('.title'),
      $reveal = $row.find('.title-reveal');

  $title.click(function(){
    var data = $(this).data(),
        tabName = data.tab;

    $title.find('i').removeClass('ion-chevron-up');
    $title.find('i').addClass('ion-chevron-down');

    $reveal.addClass('hide');
    $(this).find('i').toggleClass('ion-chevron-up ion-chevron-down');
    $(this).parent('.hc-apps-row').find('.title-reveal[data-tab="'+tabName+'"]').toggleClass('hide');
  });
}

function toggleIncentive () {
  var $network = $('#problems'),
      $incentive = $network.find('.incentive');

  $incentive.click(function () {
    $incentive.not(this).removeClass('reveal');
    $(this).toggleClass('reveal');
  });
}

function emailSubscribe(isMobile) {
  var $emailSection = $('.hc-email'),
      $emailForm = $emailSection.find('.form'),
      $emailWidget = $emailSection.find('.email-widget'),
      $subscribeBtn = $emailWidget.find('.button-primary.init-token-sale-widget[type="submit"]'),
      $emailInput = $emailSection.find('input[type=email]'),
      $emailSteps = $emailSection.find('.email-steps'),
      $stepsform = $emailSection.find('.steps-form'),
      curStep = 1,
      totalSteps = 26,
      btcVal, ethVal, bchVal,
      preTokenSaleMailchimp = 'https://hooks.zapier.com/hooks/catch/2306819/rageg0/',
      postTokenSaleEmail = 'https://hooks.zapier.com/hooks/catch/2306819/rak7mz/',
      postTokenSaleMailchimp = 'https://hooks.zapier.com/hooks/catch/2306819/raqkzh/',
      formData = {
        'payment-type' : [],
        'accredited-investor' : 'No'
      },
      isStep11Checked = false;

  autosize($('textarea'));

  $('input[name="ref_email"]').val(getCookie('ref_email'));
  deleteCookie('ref_email');

  $.when(
    $.getJSON('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD', function(data) {
        ethVal = data;
    }),
    $.getJSON('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD', function(data) {
        btcVal = data;
    }),
    $.getJSON('https://min-api.cryptocompare.com/data/price?fsym=BCH&tsyms=USD', function(data) {
        bchVal = data;
    })
  ).then(function() {
    if (ethVal) {
      $emailSection.find('.step-10 .eth-value , .step-8-1 .eth-value').text(numeral(5000 / ethVal.USD).format('0.000'));
    }
    else {
        // Request for graphic data didn't work, handle it
    }
    if (btcVal) {
      $emailSection.find('.step-10 .btc-value , .step-8-1 .btc-value').text(numeral(5000 / btcVal.USD).format('0.000'));
    }
    else {
        // Request for web data didn't work, handle it
    }
    // if (bchVal) {
    //   $emailSection.find('.step-10 .btc-value , .step-8-1 .bch-value').text(numeral(5000 / bchVal.USD).format('0.000'));
    // }
    // else {
    //     // Request for web data didn't work, handle it
    // }
  });

  $emailSteps.find('input').change(function(){
    // console.log(formData);
    var isStep15 = $(this).parents('.email-steps').hasClass('step-15');
    if (isStep15) {
      if ($(this).attr('type') == 'checkbox') {
        var array = formData[$(this).attr('name')];
        var arrayIndex = array.indexOf($(this).val());
        if (arrayIndex < 0 ) {
          array.push($(this).val());
        } else {
          array.splice(arrayIndex, 1);
        }
      }
    } else {
      formData[$(this).attr('name')] = $(this).val();
    }
  });

  // $emailSection.find('.email-steps.step-18').

  $emailSection.find('.button-okay').click(function(){
    $(this).parents('.hc-email').hide();
  });

  $emailSteps.find('input[type="radio"]').change(function(){
    // console.log('changed');
    var $thisEmailStep = $(this).parents('.email-steps');
    var $thisForm = $(this).parents('.steps-form');
    var step101 = $thisEmailStep.hasClass('step-10-1');
    var step102 = $thisEmailStep.hasClass('step-10-2');
    var step17 = $thisEmailStep.hasClass('step-17');
    var step10 = $thisEmailStep.hasClass('step-10');
    var step11 = $thisEmailStep.hasClass('step-11');
    var step1_0 = $thisEmailStep.hasClass('step-1-0');
    var step10_0 = $thisEmailStep.hasClass('step-10-0');
    // console.log(step101, step102);

    $thisEmailStep.find('.button-primary').removeAttr('disabled');

    if (step101 || step102) {
      if(step101) {
        var $step11 = $(this).parents('.hc-email').find('.step-11');
        if ($(this).val() == 'Yes') {
          // console.log($(this).val());
          totalSteps = 26;
          $thisForm.find('.out-of').text(totalSteps);
          $thisEmailStep.find('.button-primary.button-next[data-step="step-11"]').hide();
          $thisEmailStep.find('.button-primary.button-next[data-step="step-10-2"]').show();
          $step11.find('.button-primary.button-back[data-step="step-10-2"]').show();
          $step11.find('.button-primary.button-back[data-step="step-10-1"]').hide();
        } else if ($(this).val() == 'No') {
          // console.log($(this).val());
          totalSteps = 25;
          $thisForm.find('.out-of').text(totalSteps);
          $thisEmailStep.find('.button-primary.button-next[data-step="step-11"]').show();
          $thisEmailStep.find('.button-primary.button-next[data-step="step-10-2"]').hide();
          $step11.find('.button-primary.button-back[data-step="step-10-1"]').show();
          $step11.find('.button-primary.button-back[data-step="step-10-2"]').hide();
        }
      }
    } else if (step17) {
      var $next171 = $thisEmailStep.find('.button-primary.button-next[data-step="step-17-1"]');
      var $next18 = $thisEmailStep.find('.button-primary.button-next[data-step="step-18-1"]');
      if ($(this).val() == 'Yes') {
        $next171.hide();
        $next18.show();
      } else if ($(this).val() == 'No') {
        $next171.show();
        $next18.hide();
      }
    } else if (step10) {
      if ($(this).val() == 'Yes') {
        $thisEmailStep.find('.button-primary.button-next').show();
        $thisEmailStep.find('.button-primary.button-end').hide();
      } else if ($(this).val() == 'No') {
        $thisEmailStep.find('.button-primary.button-next').hide();
        $thisEmailStep.find('.button-primary.button-end').show();
      }
    } else if (step11) {
      if ($(this).val() == 'Yes') {
        totalSteps += 1;
        $thisForm.find('.out-of').text(totalSteps);
        $thisEmailStep.find('.button-primary.button-next[data-step="step-12"]').show();
        $thisEmailStep.find('.button-primary.button-next[data-step="step-12-1"]').hide();
        isStep11Checked = true;
      } else if ($(this).val() == 'No') {
        totalSteps = (isStep11Checked) ? totalSteps - 1 : totalSteps;
        $thisForm.find('.out-of').text(totalSteps);
        $thisEmailStep.find('.button-primary.button-next[data-step="step-12"]').hide();
        $thisEmailStep.find('.button-primary.button-next[data-step="step-12-1"]').show();
        isStep11Checked = true;
      }
    } else if (step1_0) {
      if ($(this).val() == 'Yes') {
        $thisEmailStep.find('.button-primary.button-next[data-step="step-1-2"]').show();
        $thisEmailStep.find('.button-primary.button-next[data-step="step-1-1"]').hide();
      } else if ($(this).val() == 'No') {
        $thisEmailStep.find('.button-primary.button-next[data-step="step-1-2"]').hide();
        $thisEmailStep.find('.button-primary.button-next[data-step="step-1-1"]').show();
      }
    } else if (step10_0) {
      var $thisTextBox = $thisEmailStep.find('.text-box');
      if ($(this).val() == 'Myself') {
        $thisTextBox.hide();
        $thisTextBox.find('textarea').val('');
      } else if ($(this).val() == 'Another organization or entity') {
        $thisTextBox.show();
        $thisTextBox.find('.text-area-count').text('(40)');
      }
    }
  });

  $emailSteps.find('input[type="email"]').keyup(function(){
    // console.log('changed');
    var $thisEmailStep = $(this).parents('.email-steps'),
        $thisSection = $(this).parents('.hc-email'),
        emailVal = $(this).val();

    if(validateEmail(emailVal)) {
      $thisEmailStep.find('.button-primary.button-next').removeAttr('disabled');
      if($thisEmailStep.hasClass('step-17-1')) {
        // console.log($thisSection.find('.email-steps.step-17 input'));
        $thisSection.find('.email-steps.step-17 input').val(emailVal);
      }
    } else {
      $thisEmailStep.find('.button-primary.button-next').attr('disabled', '');
    }
  });

  $emailSection.find('.step-10 input[type="email"]').change(function() {
    var inputVal = $(this).val(),
        $thisStep = $(this).parents('.email-steps'),
        $thisSection = $(this).parents('.hc-email');

    if(inputVal == 'No') {
      $thisStep.hide();
      $thisSection.find('.success-message-2').show();
    }
  });

  $emailSection.find('.step-3 input[type="radio"]').change(function() {
    var inputVal = $(this).val(),
        $thisStep = $(this).parents('.email-steps'),
        $thisSection = $(this).parents('.hc-email');

    if(inputVal == 'No') {
      $thisStep.hide();
      $thisSection.find('.success-message-2').show();
    }
  });

  $emailSection.find('.step-16 input[type="radio"]').change(function() {
    var inputVal = $(this).val(),
        $thisStep = $(this).parents('.email-steps'),
        $thisSection = $(this).parents('.hc-email');

    if(inputVal == 'No') {
      $thisStep.hide();
      $thisSection.find('.email-steps.step-16-1').show();
    }
  });

  $emailSection.find('input[type="checkbox"]').change(function() {
    var $thisInput = $(this),
        thisIsChecked = $(this).is(':checked'),
        $thisStep = $(this).parents('.email-steps'),
        isChecked = $thisStep.find('input[type="checkbox"]').is(':checked'),
        $fieldGroup = $(this).parents('.field-group'),
        isStep12_1 = $thisStep.hasClass('step-12-1'),
        isStep15 = $thisStep.hasClass('step-15');

    if(isStep15) {
      if(isChecked) {
        // console.log($(this).val());
        $thisStep.find('.button-next').removeAttr('disabled');
      } else {
        $thisStep.find('.button-next').attr('disabled', '');
      }
    }

    if(isStep12_1) {
      var inputStc = $thisStep.find('input[name="num-of-storecoins"]'),
          inputDol = $thisStep.find('input[name="storecoins-value"]');
      if(isChecked) {
        // console.log('is checked');
        inputStc.val(150151).trigger('keyup').trigger('change');
        inputDol.val(5000).trigger('keyup').trigger('change');
      } else {
        // console.log('is not checked');
        inputStc.val('').trigger('keyup').trigger('change');
        inputDol.val(0).trigger('keyup').trigger('change');
      }
    }
  });

  $emailSteps.find('input[type="text"], input[type="number"]').keyup(function(){
    var textVal = $(this).val();
    var $thisEmailStep = $(this).parents('.email-steps');
    var isStep12_1 = $thisEmailStep.hasClass('step-12-1');
    var $thisSect = $(this).parents('.hc-email');
    // console.log(textVal);
    if(textVal.length > 0 ) {
      if (isStep12_1) {
        if($(this).attr('name') == 'num-of-storecoins') {
          textVal = numeral(textVal).multiply(0.0333);
          if(textVal._value >= 5000) {
            $thisEmailStep.find('.button-primary.button-next').removeAttr('disabled');
            $thisEmailStep.find('.alert').hide();
          } else {
            $thisEmailStep.find('.button-primary.button-next').attr('disabled','');
            $thisEmailStep.find('.alert').hide();
          }
          textVal = textVal.format('(0,0)');
          // $thisEmailStep.find('.computed').text(' ' + textVal);
          $thisEmailStep.find('input[name="storecoins-value"]').val(textVal);
          $thisEmailStep.find('input[name="storecoins-value"]').trigger('change');
          // $thisSect.find('.email-steps.step-15 .usd-value').text(' ' + textVal + ' ');
        } else if ($(this).attr('name') == 'storecoins-value') {
          textVal = numeral(textVal).divide(0.0333);
          var dollarVal = numeral($(this).val())._value;
          if(dollarVal >= 5000) {
            $thisEmailStep.find('.button-primary.button-next').removeAttr('disabled');
            $thisEmailStep.find('.alert').hide();
          } else {
            $thisEmailStep.find('.button-primary.button-next').attr('disabled','');
            $thisEmailStep.find('.alert').hide();
          }
          textVal = textVal.format('(0,0)');
          // $thisEmailStep.find('.computed').text(' ' + textVal);
          $thisEmailStep.find('input[name="num-of-storecoins"]').val(textVal);
          $thisEmailStep.find('input[name="num-of-storecoins"]').trigger('change');
          // $thisSect.find('.email-steps.step-15 .usd-value').text(' ' + textVal + ' ');
        }
      }
    } else {
      $thisEmailStep.find('.button-primary.button-next').attr('disabled','');
    }
  });

  $emailSteps.find('.reset-button').click(function(){
    var $thisEmailStep = $(this).parents('.email-steps');
    var $form = $thisEmailStep.parents('.steps-form');
    var $thisWidget = $form.parents('.hc-email');
    $thisEmailStep.hide();
    $thisWidget.find('.email-widget').show();
    $form.hide();
    $form.find('.email-steps.step-1-0 input[value="No"]').trigger('click');
    curStep = 1;
    $form.find('.step-numbers .with-in').text(curStep);
    // $thisWidget.find('.email-widget input[type="email"]').empty();
  });

  $stepsform.submit(function(e){
    e.preventDefault();
  });

  $stepsform.find('.button-submit[type="submit"]').click(function(){
    var $thisEmailSect = $(this).parents('.hc-email');
    var $thisForm = $(this).parents('.steps-form');

    setTimeout(function(){
      $(window).scrollTop($thisEmailSect.offset().top - ((isMobile) ? 77 : 100));
    }, 300);

    var formArray = $thisForm.serializeArray();
    formArray.forEach(function(item){
      if (item.value == '' || !item.value) {
        item.value = 'None';
      }
    });

    // console.log(formArray);

    $thisEmailSect.find('.email-steps').hide();
    $thisEmailSect.find('.email-steps.step-19').show();

    // email request
    $.ajax({
      type : 'POST',
      url : postTokenSaleEmail,
      data : formArray
    }).done(function(result){
      console.log('success')
    });

    // mail chimp
    $.ajax({
      type : 'POST',
      url : postTokenSaleMailchimp,
      data : formArray
    }).done(function(result){
      console.log('success');
    });
  });


  // TOKEN SALE BEFORE
  $subscribeBtn.click(function(){
    var $thisEmailSect = $(this).parents('.hc-email');
    var $thisForm = $(this).parents('.form');
    var emailVal = $thisForm.find('input[type="email"]').val();

    $thisForm.submit(function(e){
      e.preventDefault();
    });

    if(emailVal){
      $thisEmailSect.find('.email-steps.step-17 input[type="text"]').val(emailVal);
      $thisEmailSect.find('.email-widget .form').hide();
      $('#about-second-token-sale').hide();
      $thisEmailSect.find('.steps-form').show();
      $thisEmailSect.find('.email-steps.step-1').show();
      // $thisEmailSect.find('.success-message').show();
      setTimeout(function(){
        $(window).scrollTop($thisEmailSect.offset().top - ((isMobile) ? 77 : 100));
      }, 300);
      $.ajax({
        type : 'GET',
        url : preTokenSaleMailchimp,
        // url : 'https://market.capitalstake.com',
        data : $thisForm.serialize()
      }).done(function(result){
        // console.log(result);
      });
    }
  });

  if (getParameterByName('e')) {
    var $firstEmailWidgetSection = $('.hc-email').first(),
        $firsrEmailWidget = $($firstEmailWidgetSection).find('.email-widget');
    $firsrEmailWidget.find('input[type="email"]').val(getParameterByName('e'));
    $firsrEmailWidget.find('input[type="submit"]').trigger('click');
  }

  $('.hc-email .email-steps .button-group .button-end').click(function(){
    var $thisEmailSect = $(this).parents('.hc-email');
    var $next = $thisEmailSect.next();
    $thisEmailSect.hide();

    setTimeout(function(){
      $(window).scrollTop($thisEmailSect.offset().top - ((isMobile) ? 77 : 100));
    }, 300);
  });

  var $step18_1 = $('.hc-email .email-steps.step-18-1');

  $step18_1.find('.button-step-group .add-another-invite').click(function(){
    var $thisEmailStep = $(this).parents('.email-steps'),
        $friendEmailGroup = $thisEmailStep.find('.friend-email-group');

    $friendEmailGroup.append('<div class="input-close-group"><a><i class="ion-android-close"></i></a><input class="u-full-width" type="email" placeholder="Email Address"></div>');
    $friendEmailGroup.find('.input-close-group a').css({ visibility : 'visible' });
  });

  $step18_1.find('.friend-email-group').on('click', '.input-close-group a', function(){
    var $friendEmailGroup = $(this).parents('.friend-email-group');
    $(this).parents('.input-close-group').remove();
    var numberOfInput = $friendEmailGroup.find('.input-close-group');
    if (numberOfInput.length == 1) {
      $friendEmailGroup.find('.input-close-group:first-child a').css({ visibility : 'hidden' });
    }
  });

  $step18_1.find('.friend-email-group').on('input', 'input[type="email"]', function(){
    var $friendEmailGroupInput = $(this).parents('.email-steps').find('.friend-email-group input'),
        emails = '',
        $inviteManyBox = $(this).parents('.email-steps').find('.invite-many-box');

    $friendEmailGroupInput.each(function(){
      if(validateEmail($(this).val())) {
        emails += ' ' + $(this).val() ;
      }
    });
    emails = $.trim(emails).split(' ').join(', ');
    $inviteManyBox.find('textarea').val(emails);
  });

  $step18_1.find('.button-step-group .invite-many-button').click(function(){
    var $inviteManyBox = $(this).parents('.email-steps').find('.invite-many-box'),
        $addInviteBox = $(this).parents('.email-steps').find('.add-invite-box');
    $addInviteBox.hide();
    $inviteManyBox.show();
  });

  // $step18_1.find('.add-many-invites').click(function(){
  //   var $thisTextarea = $(this).parents('.invite-many-box').find('textarea'),
  //       $textareaVal = $thisTextarea.val().split(','),
  //       emails = [];
  //
  //   $textareaVal.forEach(function(item){
  //     item = $.trim(item);
  //     // console.log(item);
  //     if (validateEmail(item)) {
  //       emails.push(item);
  //     }
  //   });
  //
  //   // console.log(emails);
  //
  //   if (emails.length > 0) {
  //     var $thisEmailStep = $(this).parents('.email-steps'),
  //         $friendEmailGroup = $thisEmailStep.find('.friend-email-group');
  //
  //     $friendEmailGroup.html('');
  //
  //     emails.forEach(function(email){
  //       if(emails.length == 1) {
  //         $friendEmailGroup.append('<div class="input-close-group"><a style="visibility:hidden;"><i class="ion-android-close"></i></a><input class="u-full-width" type="email" placeholder="Email Address" name="friend-email" value="'+email+'"></div>');
  //       } else {
  //         $friendEmailGroup.append('<div class="input-close-group"><a><i class="ion-android-close"></i></a><input class="u-full-width" type="email" placeholder="Email Address" name="friend-email" value="'+email+'"></div>');
  //       }
  //     });
  //
  //     // $thisEmailStep.find('.button-next').removeAttr('disabled');
  //   }
  //
  //   var $inviteManyBox = $(this).parents('.email-steps').find('.invite-many-box'),
  //       $addInviteBox = $(this).parents('.email-steps').find('.add-invite-box');
  //
  //   $addInviteBox.show();
  //   $inviteManyBox.hide();
  //   $thisTextarea.val('');
  // });

  $emailSteps.find('.button-group .button-primary:not(.button-end, .twitter, .email, .email-mobile)').click(function(){
    var $thisEmailSect = $(this).parents('.hc-email'),
        $thisForm = $thisEmailSect.find('.form'),
        stepVal = $(this).data().step,
        $numSteps = $thisEmailSect.find('.step-numbers');

    if($(this).hasClass('button-next')){
      curStep += 1;
      $numSteps.find('.with-in').text(curStep);
    } else if ($(this).hasClass('button-back')) {
      if (stepVal == 'step-1') {
        curStep = 1;
        $numSteps.find('.with-in').text(curStep);
      } else {
        curStep -= 1;
        $numSteps.find('.with-in').text(curStep);
      }
    }

    setTimeout(function(){
      $(window).scrollTop($thisEmailSect.offset().top - ((isMobile) ? 77 : 100));
    }, 300);

    // console.log(stepVal);git p
    $(this).parents('.email-steps').hide();
    // console.log($emailSection.find('div.email-steps[data-step="'+ stepVal +'"]'),stepVal);
    $thisEmailSect.find('.email-steps.'+ stepVal).show();
    if (stepVal == 'step-12' || stepVal == 'step-12-1') {
      initSticky();
    }
    if (stepVal == 'step-18') {
      // console.log(formData);
      var $step18 = $thisEmailSect.find('.email-steps.step-18');
      var payments = [];
      var paymentStr = ' ';
      var paymentTypes = formData['payment-type'];
      // console.log(paymentTypes);
      $step18.find('.num-of-storecoins').text(' ' + numeral(formData['num-of-storecoins']).format('(0,0)') + ' ');
      $step18.find('.storecoins-amount').text(' ' + formData['storecoins-value'] + ' ');

      paymentTypes.forEach(function(method, i) {
        if (i == paymentTypes.length - 1 && paymentTypes.length > 1) {
          paymentStr += '& ' + method + '.';
        } else if ( paymentTypes.length == 1 ) {
          paymentStr += '' + method + '.';
        } else if (i == paymentTypes.length - 2) {
          paymentStr += method + ' ';
        } else {
          paymentStr += method + ', ';
        }
        var inputName = method.toLowerCase().replace(/ /g, '-') + '-percent';
        $step18.find('.payment-group').append(
          '<div class="field">%<input type="text" name="payment-percent" data-name="'+method+'" hidden><input type="number" name="percent-value" onkeydown="limit(this);" onkeyup="limit(this);"> '+' '+method+'</div>'
        );
      });

      if(paymentTypes.length == 1){
        var $firstPaymentPercent = $step18.find('.payment-group .field:first-child input[name="payment-percent"]');
        var firstPaymentPercentVal = ' ' + $firstPaymentPercent.data().name + ' - 100%';
        $step18.find('.payment-group .field:first-child input[type="number"]').val(100);
        $firstPaymentPercent.val(firstPaymentPercentVal);
        $step18.find('.total-percentage span').text(' 100%');
        $step18.find('.percent-sum input').val(100);
        $step18.find('.total-percentage span').addClass('red');
        $step18.find('.button-next').removeAttr('disabled');
      }

      $step18.find('.payment-methods').text(paymentStr);

      var $percentInput = $step18.find('.payment-group .field input[type="number"]');
      var sumPercent;
      $percentInput.on('keyup change click', function(){
        var thisVal = $(this).val();
        var $paymentPercent = $(this).parents('.field').find('input[name="payment-percent"]');
        var paymentPercentVal = ' ' + $paymentPercent.data().name + ' - ' + $(this).val() + '%';
        $paymentPercent.val(paymentPercentVal);
        sumPercent = 0;
        $percentInput.each(function(){
          if($(this).val()) {
            sumPercent += parseInt($(this).val());
          }
        });

        var sumText = numeral(sumPercent).format('0,0');
        $step18.find('.total-percentage span').text(' ' + sumText+'%');
        $step18.find('.percent-sum input').val(sumText);
        if(sumPercent >= 100) {
          $step18.find('.button-next').removeAttr('disabled');
          $step18.find('.total-percentage span').addClass('red');
        } else {
          $step18.find('.button-next').attr('disabled', '');
          $step18.find('.total-percentage span').removeClass('red');
        }
      });
    }
  });

  var copyButton = document.getElementsByClassName("copy-button");
  for (var i = 0; i < copyButton.length; i++) {
    copyButton[i].addEventListener("click", function() {
      // console.log(document.getElementsByClassName("copy-target")[0]);
      // console.log(document.getElementById("copy-target"));
      var target = document.getElementsByClassName("copy-target")[0];
      copyToClipboard(target);
      // $('#copyButton').text('Copied');
    });
  }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function initSlider() {
  var $sliderEl = $('#hc-slider');

  if ($sliderEl.length > 0 ) {

    $sliderEl.slick({
      lazyLoad: 'ondemand',
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows : true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }
}

function copyToClipboard(elem) {
	  // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    var succeed;
    try {
    	  succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }

    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}

function initSticky() {
  var sticky = new Sticky('.sticky');

  // and when parent change height..
  sticky.update();
}

function initLogoSlider(id, slides) {
  var $sliderEl = $(id);

  if ($sliderEl.length > 0 ) {

    $sliderEl.slick({
      lazyLoad: 'ondemand',
      slidesToShow: slides,
      slidesToScroll: slides,
      arrows : true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }
}

function initProblemSlider () {
  var $sliderEl = $('#hc-problem-slider');

  if ($sliderEl.length > 0 ) {

    $sliderEl.slick({
      lazyLoad: 'ondemand',
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows : true,
      adaptiveHeight : true
    });
  }
}

function renderRadio () {
  var $radio = $('.field input');
  $radio.change(function(){
    $radio.each(function(){
      if ($(this).is(':checked')) {
        $(this).parents('.field').find('.hc-radio-btn').addClass('checked');
      } else {
        $(this).parents('.field').find('.hc-radio-btn').removeClass('checked');
      }
    });
  });
}

function toggleStatusText(){
  $buttonContainer = $('.hc-feature .button-container');
  $revealButton = $buttonContainer.find('.reveal-button');

  $revealButton.click(function(){
    // $(window).scrollTop($(this).offset().top - 80);
    $(this).find('i').toggleClass('ion-chevron-up ion-chevron-down');
    var $textReveal = $(this).parents('.hc-feature').find('.reveal-text');
    $textReveal.toggle();
  });
}

function limit(element)
{
    var max_chars = 3;

    if(element.value.length > max_chars) {
        element.value = element.value.substr(0, max_chars);
    }
}

function generateCountdownCircle (element, cap) {
  elements = document.getElementsByClassName(element);
  var bars = [];

  if (elements) {
    for(var i = 0; i < elements.length; i++) {
      // console.log(elements[i]);
      var bar = new ProgressBar.Circle(elements[i], {
        color: '#5D795D',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 4,
        trailWidth: 1,
        easing: 'easeInOut',
        text: {
          autoStyleContainer: false
        },
        fill: '#fff',
        from: { color: '#e97844', width: 2 },
        to: { color: '#e97844', width: 4 },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);

          var value = Math.round(circle.value() * cap);
          if (value === 0) {
            circle.setText('0');
          } else {
            circle.setText(value);
          }

        }
      });

      bar.text.style.fontSize = '5rem';
      bars.push(bar);
    }

    return bars;
  } else {
    return null;
  }
}

function renderCountCircles () {
  var circles = {
        days : generateCountdownCircle('circle-days', 365),
        hours : generateCountdownCircle('circle-hours', 24),
        minutes : generateCountdownCircle('circle-minutes', 60),
        seconds : generateCountdownCircle('circle-seconds', 60)
      };

  return circles;
}

function initTimer () {
  // Set the date we're counting down to
  var countDownDate = new Date("Sep 14, 2017 00:00:00").getTime();

  // getting all circle ProgressBar
  var circles = renderCountCircles();

  if (circles) {
    // Update the count down every 1 second
    var x = setInterval(function() {

      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now an the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      var daysCap = 365;
      var daysDist = days/daysCap;

      var hoursCap = 24;
      var hoursDist = hours/hoursCap;

      var minutesCap = 60;
      var minutesDist = minutes/minutesCap;

      var secondsCap = 60;
      var secondsDist = seconds/secondsCap;

      // console.log(daysDist, hoursDist, minutesDist, secondsDist);
      if (circles.days) {
        circles.days.forEach(function(circle){
          circle.animate(daysDist);
        });
      }

      if (circles.hours) {
        circles.hours.forEach(function(circle){
          circle.animate(hoursDist);
        });
      }

      if (circles.minutes) {
        circles.minutes.forEach(function(circle){
          circle.animate(minutesDist);
        });
      }

      if (circles.seconds) {
        circles.seconds.forEach(function(circle){
          circle.animate(secondsDist);
        });
      }
    }, 1000);
  }
}

function hasUrl () {
  // console.log(window.location.hash);
  var timeout = setTimeout(function () {
    var hash = window.location.hash;
    if (hash) {
      $(window).scrollTop($(hash).offset().top - 100);
    }
  }, 2000);
}

function maxcount(t) {
  var count = $(t).val().length,
      max = $(t).data().maxlength,
      remain = max - count,
      color = (remain < 0) ? 'red' : 'green',
      $thisEmailStep = $(t).parents('.email-steps'),
      $thisNextBtn = $thisEmailStep.find('.button-next');

  $(t).siblings('.text-area-count').text('('+remain+')').css({ color : color });

  if (remain < 0 ) {
    $thisNextBtn.attr('disabled', '');
  } else {
    $thisNextBtn.removeAttr('disabled');
  }
}

function getParameterByName(name, url) {
   if (!url) url = window.location.href;
   name = name.replace(/[\[\]]/g, '\\$&');
   var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
       results = regex.exec(url);
   if (!results) return null;
   if (!results[2]) return '';
   return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function fadeInContent () {
  if ($('#hc-milestones .each-milestone .wrapper').length) {
    window.sr = ScrollReveal();
    sr.reveal('#hc-milestones .each-milestone .wrapper', {
      duration: 800, origin: 'bottom', distance : '40px', scale : 1
    });
    $(window).scroll(function(){
      var scrollVal = $(window).scrollTop(),
          introHeight = $('#intro-section').height();
      // console.log(scrollVal < introHeight);
      // console.log(window.sr);
      sr.reveal('#hc-milestones .each-milestone .wrapper', {
        reset : false
      });
    });

    $('#hc-milestones .each-milestone').each(function(i){
      if (i % 2 == 0) {
        $(this).addClass('left');
      } else {
        $(this).addClass('right');
      }
    });
  }
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "None";
}

function deleteCookie (name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

function twitterWidgets() {
  $.getScript('https://platform.twitter.com/widgets.js');
}

function iframes() {
  var iframes = document.getElementsByTagName('iframe');
  for (var i=0; i<iframes.length; i++) {
    if(iframes[i].getAttribute('data-src')) {
      iframes[i].setAttribute('src',iframes[i].getAttribute('data-src'));
    }
  }
}

function initTabs(el) {
  var $el = $(el),
  $tabs = $el.children('.tabs'),
  $item = $tabs.children('.item');

  $item.click(function(){
    var tabName = $(this).data().tab;
    if(!$(this).hasClass('active')){
      $item.removeClass('active');
      $(this).addClass('active');
      $el.children('.tab-body').removeClass('active');
      $el.children('.tab-body[data-tab="'+tabName+'"]').addClass('active');
    }
  });
}


function initKyc() {
  if (window.location.pathname.includes('/kyc')) {
    if ($('.kyc-page').length) {
      kycPage();
    } else if ($('.kyc-register').length) {
      kycFormReg();
    }
  }
}

function kycFormReg () {
  var $kyc = $('.kyc-register'),
  $form = $kyc.find('form.register'),
  $button = $form.find('button');

  $form.submit(function(e){
    e.preventDefault();
    $form.find('.loading').addClass('show');
    if ($button.is(":disabled")) {
      return false;
    }

    var formData = $form.serializeArray(),
        submitData = {};

    formData.forEach(function(item){
      submitData[item.name] = item.value;
    });

    submitData['send_email'] = 'true';

    $.ajax({
      url: '/kyc/register',
      type: "POST",
      data: JSON.stringify(submitData),
      contentType: "application/json",
      complete: function(response){
        var resData = response.responseJSON;
        $form.find('.loading').removeClass('show');
        if (resData.success == 1) {
          $form.hide();
          $kyc.find('.success').show();
        }
      }
    });
  });
}

function kycPage() {
  var data = {
    id: $('.kyc-onfido').attr('data-id'),
    applicant_id: $('.kyc-onfido').attr('data-applicant-id'),
    referrer: window.location.href
  };

  var url = '/assets/onfido.min.js';

  $.getScript(url, function() {
    $.ajax({
      url: '/kyc/get-token',
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      dataType: "json",
      complete: function(response) {
        var json = response.responseJSON;
        if (json.success !== 1) {
          return;
        }

        Onfido.init({
          useModal: false,
          token: json.token,
          containerId: 'onfido-mount',
          onComplete: function(res) {
            $.get('/kyc/complete/' + data.id + '/' + data.applicant_id);
            console.log("Application complete");
            console.log(res);
          },
          steps: [
            {
              type: 'welcome',
              options: {
                title: 'Verify your Identity',
                descriptions: [
                  'Please have your Driver\'s License, Passport, or Government issued Identity Card ready to facilitate the verification process.',
                  '\xa0',
                  'We will need to verify your identity. It will only take a couple of minutes.',
                  '\xa0',
                  'Storecoin uses Onfido as the identity verification service provider. Storecoin does not collect or store any of the information provided during this portion of the verification process. Please see Storecoin\'s Privacy policy for more information regarding the data Storecoin collects, stores, and how it is managed'
                ]
              }
            },
            'document',
            'face',
            'complete'
          ]
        });
      }
    });
  });
}

function opentoken_contribute_click(l,e){e.preventDefault();window.open(l,'contribute_opentoken','width=500,height=700,toolbar=0,menubar=0,status=1,scrollbars=1,resizable=0,left=0,top=0');return false;}

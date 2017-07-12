$(document).ready(function(){
  scrollCheck();
  whyTextToggle();

  // on scroll
  $(window).scroll(function(){
    scrollCheck();
  });


  $('#hc-nav-wrapper .menu-toggle').click(function (){
    $('#hc-nav-wrapper .hc-navigation .hc-menu-container').toggle('slow');
  });

  $(document).on('click', '.learn-more', function(event){
    var $icon = $(this).find('i');

    if ($icon.hasClass('ion-chevron-down')) {
       $('.hc-intro-text').addClass('show')
       $icon.removeClass('ion-chevron-down');
       $icon.addClass('ion-chevron-up');
    } else {
       $('.hc-intro-text').removeClass('show')
       $icon.removeClass('ion-chevron-up');
       $icon.addClass('ion-chevron-down');
       $(window).scrollTop(0);
    }

  });

  renderCircles();
  renderCards();
  toggleCardTasks();
  toggleAppsDesc();
  toggleIncentive();
  initEmail();
  initSlider();
  initPartnerSlider();
});


function scrollCheck(){
  var scrollVal = $(window).scrollTop(),
      $navWrapper = $('#hc-nav-wrapper');

  if (scrollVal > 1) {
    //$navWrapper.addClass('add-background');
  } else {
    //$navWrapper.removeClass('add-background');
  }
}

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
      step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
      }
    });

    bar.animate(value);
  }
}

function renderCircles() {
  generateCircle('circle1', 0.33, '#5d794c', '2rem');
  generateCircle('circle2', 0.33, '#5d794c', '2rem');
  generateCircle('circle3', 0.33, '#5d794c', '2rem');
  generateCircle('circle4', 0.01, '#5d794c', '2rem');
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
  var $apps = $('#hc-apps .container.desktop'),
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
  var $network = $('#hc-network-effects'),
      $incentive = $network.find('.incentive');

  $incentive.click(function () {
    $incentive.not(this).removeClass('reveal');
    $(this).toggleClass('reveal');
  });
}

function emailSubscribe() {
  var $emailSection = $('.hc-email'),
      $emailForm = $emailSection.find('.form'),
      $emailWidget = $emailSection.find('.email-widget'),
      $subscribeBtn = $emailWidget.find('.button-primary[type="submit"]'),
      $emailInput = $emailSection.find('input[type=email]'),
      $emailSteps = $emailSection.find('.email-steps'),
      $stepsform = $emailSection.find('.steps-form');

  $emailSteps.find('input[type="radio"]').change(function(){
    // console.log('changed');
    var $thisEmailStep = $(this).parents('.email-steps');
    $thisEmailStep.find('.button-primary.button-next').removeAttr('disabled');
  });

  $emailSection.find('.step-1 input[type="radio"]').change(function() {
    var inputVal = $(this).val(),
        $thisStep = $(this).parents('.email-steps'),
        $thisSection = $(this).parents('.hc-email');

    if(inputVal == 'No') {
      $thisStep.find('.button-next[data-step="step-2"]').hide();
      $thisStep.find('.button-next[data-step="step-3"]').show();
      $thisSection.find('.step-3 .button-back[data-step="step-1"]').show();
      $thisSection.find('.step-3 .button-back[data-step="step-2"]').hide();
    }

    if(inputVal == 'Yes') {
      $thisStep.find('.button-next[data-step="step-2"]').show();
      $thisStep.find('.button-next[data-step="step-3"]').hide();
      $thisSection.find('.step-3 .button-back[data-step="step-1"]').hide();
      $thisSection.find('.step-3 .button-back[data-step="step-2"]').show();
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

  $emailSteps.find('input[type="text"]').keyup(function(){
    // console.log('changed');
    var textVal = $(this).val();
    if(textVal.length > 0 ) {
      var $thisEmailStep = $(this).parents('.email-steps');
      $thisEmailStep.find('.button-primary.button-next').removeAttr('disabled');
    }
  });

  $stepsform.submit(function(e){
    e.preventDefault();
  });

  $stepsform.find('.button-submit[type="submit"]').click(function(){
    var $thisEmailSect = $(this).parents('.hc-email');
    var $thisForm = $(this).parents('.steps-form');
    // console.log($thisForm.serialize());
    $.ajax({
      type : 'POST',
      url : 'https://hooks.zapier.com/hooks/catch/2306819/5ua8pj/',
      url : 'https://market.capitalstake.com',
      data : $thisForm.serialize()
    }).done(function(result){
      console.log($thisForm.serialize());
      console.log(result);
      $thisEmailSect.find('.email-steps').hide();
      $thisEmailSect.find('.success-message').show();
    });
  });

  $subscribeBtn.click(function(){
    var $thisEmailSect = $(this).parents('.hc-email');
    var $thisForm = $(this).parents('.form');
    var emailVal = $thisForm.find('input[type="email"]').val();
    if(emailVal){
      $thisEmailSect.find('.email-steps.step-4 input[type="email"]').val(emailVal);
      $.ajax({
        type : 'GET',
        url : 'https://hooks.zapier.com/hooks/catch/2306819/5bmzth/',
        url : 'https://market.capitalstake.com',
        data : $thisForm.serialize()
      }).done(function(result){
        console.log(result);
        $thisEmailSect.find('.email-widget').hide();
        $thisEmailSect.find('.email-steps.step-1').show();
      });
    }
  });

  $emailSteps.find('.button-group .button-primary:not(.button-submit)').click(function(){
    var $thisEmailSect = $(this).parents('.hc-email');
    // console.log('step clicked');
    var stepVal = $(this).data().step;
    // console.log(stepVal);git p
    $(this).parents('.email-steps').hide();
    // console.log($emailSection.find('div.email-steps[data-step="'+ stepVal +'"]'),stepVal);
    $thisEmailSect.find('.email-steps.'+ stepVal).show();
    if (stepVal == 'step-2') {
      initSticky();
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
  // copyButton.addEventListener("click", function() {
  //   copyToClipboard(document.getElementsByClassName("copy-target"));
  //   // $('#copyButton').text('Copied');
  // });
  // var $copyLinkWrap = $('#email-copy-link');
  //
  // $copyLinkWrap.find('.button').click(function(){
  //   copyToClipboard($copyLinkWrap.find('input'));
  // });
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function initSlider() {
  var $sliderEl = $('#hc-slider');

  if ($sliderEl.length > 0 ) {
    // console.log('slider');
    $sliderEl.find('.slide .text').click(function(){
      $sliderEl.find('.slide .text').not(this).removeClass('show');
      $(this).toggleClass('show');
    });

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

function initPartnerSlider() {
  var $sliderEl = $('#hc-partners-slider');

  if ($sliderEl.length > 0 ) {

    $sliderEl.slick({
      lazyLoad: 'ondemand',
      slidesToShow: 3,
      slidesToScroll: 3,
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

function initEmail () {
  var template =
    '<div class="container email-widget">' +
      '<h4>Participate	in	the	Storecoin	Pre-ICO</h4>' +
      '<div class="row form">' +
        '<div class="eight columns">'+
          '<input class="u-full-width" type="email" name="email" placeholder="Enter your email address">'+
        '</div>'+
        '<div class="four columns">'+
          '<input class="button-primary" type="submit" value="Subscribe">'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<form class="steps-form">'+
      '<div class="email-steps step-1">'+
        '<p>Have you participated in Token Sales or ICOs before?</p>'+
        '<div class="field">'+
          '<input type="radio" name="participate" value="Yes">'+
          '<label for="participate-yes">Yes</label>'+
        '</div>'+
        '<div class="field">'+
          '<input type="radio" name="participate" value="No">'+
          '<label for="participate-no">No</label>'+
        '</div>'+
        '<hr>'+
        '<div class="button-group">'+
          '<button disabled class="button-next button-primary" data-step="step-2">Next<i class="ion-chevron-right"></i></button>'+
          '<button disabled class="button-next button-primary" style="display:none;" data-step="step-3">Next<i class="ion-chevron-right"></i></button>'+
        '</div>'+
      '</div>'+
      '<div class="email-steps step-2">'+
        '<div data-sticky-container>'+
          '<p class="sticky" data-margin-top="65">How much do you typically invest in a Token Sale or ICO?</p>'+
          '<div class="fields">'+
            '<div class="field">'+
              '<input type="radio" name="invest" value="<$1,000">'+
              '<label for="invest-1"><$1,000</label>'+
            '</div>'+
            '<div class="field">'+
              '<input type="radio" name="invest" value="$1,000 - $5,000">'+
              '<label for="invest-2">$1,000 - $5,000</label>'+
            '</div>'+
          '</div>'+
          '<div class="fields">'+
            '<div class="field">'+
              '<input type="radio" name="invest" value="$5,000 - $25,000">'+
              '<label for="invest-3">$5,000 - $25,000</label>'+
            '</div>'+
            '<div class="field">'+
              '<input type="radio" name="invest" value="$25,000 - $50,000">'+
              '<label for="invest-4">$25,000 - $50,000</label>'+
            '</div>'+
          '</div>'+
          '<div class="fields">'+
            '<div class="field">'+
              '<input type="radio" name="invest" value="$50,000 - $75,000">'+
              '<label for="invest-5">$50,000 - $75,000</label>'+
            '</div>'+
            '<div class="field">'+
              '<input type="radio" name="invest" value="$75,000 - $100,000">'+
              '<label for="invest-6">$75,000 - $100,000</label>'+
            '</div>'+
          '</div>'+
          '<div class="fields">'+
            '<div class="field">'+
              '<input type="radio" name="invest" value="$100,000 - $150,000">'+
              '<label for="invest-7">$100,000 - $150,000</label>'+
            '</div>'+
            '<div class="field">'+
              '<input type="radio" name="invest" value="$150,000 - $200,000">'+
              '<label for=invest-8>$150,000 - $200,000</label>'+
            '</div>'+
          '</div>'+
          '<div class="fields">'+
            '<div class="field">'+
              '<input type="radio" name="invest" value="$200,000 - $250,000">'+
              '<label for="invest-9">$200,000 - $250,000</label>'+
            '</div>'+
            '<div class="field">'+
              '<input type="radio" name="invest" value="$250,000 - $500,000">'+
              '<label for="invest-10">$250,000 - $500,000</label>'+
            '</div>'+
          '</div>'+
          '<div class="fields">'+
            '<div class="field">'+
              '<input type="radio" name="invest" value="$500,000 - $1,000,000">'+
              '<label for="invest-11">$500,000 - $1,000,000</label>'+
            '</div>'+
            '<div class="field">'+
              '<input type="radio" name="invest" value="$1,000 - $3,000,000">'+
              '<label for="invest-12">$1,000 - $3,000,000</label>'+
            '</div>'+
          '</div>'+
          '<div class="fields">'+
            '<div class="field">'+
              '<input type="radio" name="invest" value="$3,000,000 or more">'+
              '<label for="invest-13">$3,000,000 or more</label>'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<hr>'+
        '<div class="button-group">'+
          '<button class="button-back button-primary" data-step="step-1"><i class="ion-chevron-left"></i>Back</button>'+
          '<button disabled class="button-next button-primary" data-step="step-3">Next<i class="ion-chevron-right"></i></button>'+
        '</div>'+
      '</div>'+
      '<div class="email-steps step-3">'+
        '<p>Are	you	interesting	in	participating	in	the	Storecoin	First	ICO?</p>'+
        '<div class="field">'+
          '<input type="radio" name="payment" value="Yes">'+
          '<label for="payment-yes">Yes</label>'+
        '</div>'+
        '<div class="field">'+
          '<input type="radio" name="payment" value="No">'+
          '<label for="payment-no">No</label>'+
        '</div>'+
        '<hr>'+
        '<div class="button-group">'+
          '<button class="button-back button-primary" data-step="step-2"><i class="ion-chevron-left"></i>Back</button>'+
          '<button class="button-back button-primary" data-step="step-1" style="display:none;"><i class="ion-chevron-left"></i>Back</button>'+
          '<button disabled class="button-next button-primary" data-step="step-4">Next<i class="ion-chevron-right"></i></button>'+
        '</div>'+
      '</div>'+
      '<div class="email-steps step-4">'+
        '<p>Do	you	have	questions	or	ideas	for	the	Storecoin	Team?	</p>'+
        '<div class="field">'+
          '<input type="text" class="u-full-width" name="comment">'+
          '<input type="email" class="u-full-width" name="email" hidden>'+
        '</div>'+
        '<hr>'+
        '<div class="button-group">'+
          '<button class="button-back button-primary" data-step="step-3"><i class="ion-chevron-left"></i>Back</button>'+
          '<button class="button-primary button-submit button-next" type="submit">Submit</button>'+
        '</div>'+
      '</div>'+
      '<div class="success-message message">'+
        '<h5>'+
          'Thanks	for	registering	for	the	Storecoin	First	ICO.	We’ll	email'+
          'you	once	it	launches.	ETA	2017.'+
        '</h5>'+
        '<h5>'+
          'By	registering	directly	on	Storecoin,	you\'ll	have	priority'+
          'access	to	our	First	ICO	before	the	public.'+
        '</h5>'+
        '<h5>'+
          'If	you	buy	storecoins in	our	First	ICO,	you\'ll	have	first	rights'+
          'to	bid	on	future	ICOs,	too.'+
        '</h5>'+
        '<h5>'+
          'Here\'s	a	link	to	share	the	Storecoin	First	ICO	with	a	friend.'+
        '</h5>'+
        '<div class="form row desktop-link" style="max-width:700px;">'+
          '<div class="eight columns">'+
            '<input class="u-full-width copy-target" readonly type="text" value="http://storeco.in/firstico">'+
          '</div>'+
          '<div class="four columns">'+
            '<button class="button button-primary copy-button"><i class="ion-link"></i> Copy Link</button>'+
          '</div>'+
        '</div>'+
        '<div class="mobile-link">'+
          '<a class="button button-primary" target="_blank" href="mailto:someone@example.com">Click Here</a>'+
        '</div>'+
      '</div>'+
      '<div class="success-message-2 message">'+
        '<h5>'+
          'Thanks	for	checking	out	the	Storecoin	First	ICO.'+
        '</h5>'+
        '<h5>You	can	give	us	a	hand	by sharing	the storecoin first ICO with a friend.</h5>'+
        '<div class="form row desktop-link" style="max-width:700px;">'+
          '<div class="eight columns">'+
            '<input class="u-full-width copy-target" readonly type="text" value="http://storeco.in/firstico">'+
          '</div>'+
          '<div class="four columns">'+
            '<button class="button button-primary copy-button"><i class="ion-link"></i> Copy Link</button>'+
          '</div>'+
        '</div>'+
        '<div class="mobile-link">'+
          '<a class="button button-primary" target="_blank" href="mailto:someone@example.com">Click Here</a>' +
        '</div>'+
      '</div>'+
    '</form>';
  // console.log(template);
  if ($('.hc-email').length > 0) {
    $('.hc-email').append(template);
    emailSubscribe();
  }
}

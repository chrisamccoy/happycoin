$(document).ready(function(){
  scrollCheck();
  whyTextToggle();
  renderRadio();

  // on scroll
  $(window).scroll(function(){
    scrollCheck();
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
    console.log(num2);
    // the following line has been simplified. Revision history contains original.
    $this.val(num2);
  });

  renderCircles();
  renderCards();
  toggleCardTasks();
  toggleAppsDesc();
  toggleIncentive();
  emailSubscribe();
  initSlider();
  initPartnerSlider();
  initProblemSlider();
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
      $stepsform = $emailSection.find('.steps-form'),
      btcVal, ethVal,
      formData = {
        'payment-type' : []
      };

  $.when(
    $.getJSON('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD', function(data) {
        ethVal = data;
    }),
    $.getJSON('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD', function(data) {
        btcVal = data;
    })
  ).then(function() {
    if (ethVal) {
      $emailSection.find('.step-10 .eth-value').text(ethVal.USD / 2500);
    }
    else {
        // Request for graphic data didn't work, handle it
    }
    if (btcVal) {
      $emailSection.find('.step-10 .btc-value').text(btcVal.USD / 2500);
    }
    else {
        // Request for web data didn't work, handle it
    }
  });

  $emailSteps.find('input').change(function(){
    // console.log(formData);
    if ($(this).attr('type') == 'checkbox') {
      var array = formData[$(this).attr('name')];
      var arrayIndex = array.indexOf($(this).val());
      if (arrayIndex < 0 ) {
        array.push($(this).val());
      } else {
        array.splice(arrayIndex, 1);
      }
      // console.log(formData[$(this).attr('name')]);
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

    $thisEmailStep.find('.button-primary.button-next').removeAttr('disabled');
    if ($(this).val() == 'No') {
      $thisEmailStep.find('.button-primary.button-next').attr('disabled', '');
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

  // $emailSection.find('.step-1 input[type="radio"]').change(function() {
  //   var inputVal = $(this).val(),
  //       $thisStep = $(this).parents('.email-steps'),
  //       $thisSection = $(this).parents('.hc-email');
  //
  //   if(inputVal == 'No') {
  //     $thisStep.find('.button-next[data-step="step-2"]').hide();
  //     $thisStep.find('.button-next[data-step="step-3"]').show();
  //     $thisSection.find('.step-3 .button-back[data-step="step-1"]').show();
  //     $thisSection.find('.step-3 .button-back[data-step="step-2"]').hide();
  //   }
  //
  //   if(inputVal == 'Yes') {
  //     $thisStep.find('.button-next[data-step="step-2"]').show();
  //     $thisStep.find('.button-next[data-step="step-3"]').hide();
  //     $thisSection.find('.step-3 .button-back[data-step="step-1"]').hide();
  //     $thisSection.find('.step-3 .button-back[data-step="step-2"]').show();
  //   }
  // });

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

  $emailSection.find('.step-15 input[type="checkbox"]').change(function() {
    var $thisInput = $(this),
        thisIsChecked = $(this).is(':checked'),
        $thisStep = $(this).parents('.email-steps'),
        isChecked = $thisStep.find('input[type="checkbox"]').is(':checked'),
        $fieldGroup = $(this).parents('.field-group');

    // if(thisIsChecked) {
    //   $fieldGroup.find('.field.full-width').removeClass('hidden');
    // } else {
    //   $fieldGroup.find('.field.full-width').addClass('hidden');
    // }

    if(isChecked) {
      $thisStep.find('.button-next').removeAttr('disabled');
    } else {
      $thisStep.find('.button-next').attr('disabled', '');
    }
  });

  $emailSteps.find('input[type="text"], input[type="number"]').keyup(function(){
    var textVal = $(this).val();
    var $thisEmailStep = $(this).parents('.email-steps');
    var isStep13 = $thisEmailStep.hasClass('step-13');
    // console.log(textVal);
    if(textVal.length > 0 ) {
      $thisEmailStep.find('.button-primary.button-next').removeAttr('disabled');
      if (isStep13) {
        textVal = numeral(textVal).multiply(0.005).format('($0,0.00)');
        $thisEmailStep.find('.computed').text(' ' + textVal);
        $thisEmailStep.find('input[hidden]').val(textVal);
        $thisEmailStep.find('input[hidden]').trigger('change');
      }
    } else {
      $thisEmailStep.find('.button-primary.button-next').attr('disabled','');
      if (isStep13) {
        // console.log(parseInt(textVal) * 0.005);
        $thisEmailStep.find('.computed').text(' $0');
        $thisEmailStep.find('input[hidden]').val('$0');
        $thisEmailStep.find('input[hidden]').trigger('change');
      }
    }
  });

  $stepsform.submit(function(e){
    e.preventDefault();
  });

  $stepsform.find('.button-submit[type="submit"]').click(function(){
    var $thisEmailSect = $(this).parents('.hc-email');
    var $thisForm = $(this).parents('.steps-form');

    $(window).scrollTop($thisEmailSect.offset().top - 66);

    var formArray = $thisForm.serializeArray();
    formArray.forEach(function(item){
      if (item.value == '' || !item.value) {
        item.value = 'None';
      }
    });
    $.ajax({
      type : 'POST',
      // url : 'https://hooks.zapier.com/hooks/catch/2306819/5ua8pj/',
      // url : 'https://market.capitalstake.com',
      url : 'https://hooks.zapier.com/hooks/catch/2399325/5iwky6/',
      data : formArray
    }).done(function(result){
      console.log(formArray);
      // console.log(result);
      $thisEmailSect.find('.email-steps').hide();
      $thisEmailSect.find('.success-message').show();
    });
  });

  $subscribeBtn.click(function(){
    var $thisEmailSect = $(this).parents('.hc-email');
    var $thisForm = $(this).parents('.form');
    var emailVal = $thisForm.find('input[type="email"]').val();

    if(emailVal){
      $thisEmailSect.find('.email-steps.step-17 input[type="text"]').val(emailVal);
      $.ajax({
        type : 'GET',
        // url : 'https://hooks.zapier.com/hooks/catch/2306819/5bmzth/',
        url : 'https://market.capitalstake.com',
        data : $thisForm.serialize()
      }).done(function(result){
        // console.log(result);
        $thisEmailSect.find('.email-widget').hide();
        $thisEmailSect.find('.email-steps.step-1').show();
        $(window).scrollTop($thisEmailSect.offset().top - 66);
      });
    }
  });

  $emailSteps.find('.button-group .button-primary:not(.button-submit)').click(function(){
    var $thisEmailSect = $(this).parents('.hc-email'),
        $thisForm = $thisEmailSect.find('.form');

    var stepVal = $(this).data().step;

    $(window).scrollTop($thisEmailSect.offset().top - 66);

    // console.log(stepVal);git p
    $(this).parents('.email-steps').hide();
    // console.log($emailSection.find('div.email-steps[data-step="'+ stepVal +'"]'),stepVal);
    $thisEmailSect.find('.email-steps.'+ stepVal).show();
    if (stepVal == 'step-12') {
      initSticky();
    }
    if (stepVal == 'step-18') {
      // console.log(formData);
      var $step18 = $thisEmailSect.find('.email-steps.step-18');
      var payments = [];
      var paymentStr = ' ';
      var paymentTypes = formData['payment-type'];
      $step18.find('.num-of-storecoins').text(' ' + numeral(formData['num-of-storecoins']).format('(0,0)') + ' ');
      $step18.find('.storecoins-amount').text(' ' + formData['storecoins-value'] + ' ');

      paymentTypes.forEach(function(method, i) {
        paymentStr += (i == paymentTypes.length - 1 && length > 1 ) ? '& ' + method : method + ', ';
        var inputName = method.toLowerCase().replace(/ /g, '-') + '-percent';
        $step18.find('.payment-group').append(
          '<div class="field">%<input type="text" name="payment-percent" data-name="'+method+'" hidden><input type="number" name="percent-value" max="999"> '+' '+method+'</div>'
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
        $step18.find('.button-submit').removeAttr('disabled');
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
        $step18.find('.total-percentage span').text(' ' + sumPercent+'%');
        $step18.find('.percent-sum input').val(sumPercent);
        if(sumPercent >= 100) {
          $step18.find('.button-submit').removeAttr('disabled');
          $step18.find('.total-percentage span').addClass('red');
        } else {
          $step18.find('.button-submit').attr('disabled', '');
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
    // console.log('slider');
    // $sliderEl.find('.slide .text').click(function(){
    //   $sliderEl.find('.slide .text').not(this).removeClass('show');
    //   $(this).toggleClass('show');
    // });
    //
    // $sliderEl.find('.slide .link').click(function(){
    //   $thisText = $(this).parents('.slide').find('.text');
    //   $sliderEl.find('.slide .text').not($thisText).removeClass('show');
    //   $thisText.toggleClass('show');
    // });

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
    // console.log($(this).is(':checked'));
    // if ($(this).is(':checked')) {
    //   $(this).parents('.field').find('.hc-radio-btn').addClass('checked');
    // } else {
    //   $radio.parents('.field').find('.hc-radio-btn').removeClass('checked');
    // }
    $radio.each(function(){
      if ($(this).is(':checked')) {
        $(this).parents('.field').find('.hc-radio-btn').addClass('checked');
      } else {
        $(this).parents('.field').find('.hc-radio-btn').removeClass('checked');
      }
    });
  });
}
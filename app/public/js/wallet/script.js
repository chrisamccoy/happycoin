$(document).ready(function(){
  initRangeSlider();
  initModal();
  bankSelect();
  autosize($('textarea'));
  initTextarea();
  initTabs();
  initDropdowns();
  sendGift();
  loadChartData();
  initDatePicker();
  loadCoinsValue();
  initPaginate();
  initApi();
  triggerOnUrl();
  initFeedsTab();
  // initPercentSlider();
  initRoyaltyTabs();
  initProcess();
});
var giftItems = {
  storeVal : null,
  sender : null,
  message : null
},
numNotification = 1,
coinsVal = {
  eth : null,
  btc : null,
  xrp : null,
  ltc : null
},
coinKey = 'eth',
isApiBuy = false,
budgetVal = 44.38385,
buyAmount = 0,
storecoinBal = 139.470001,
appInfo = {
  'easy-schedule' : {
    img : '/images/wallet/calender-icon.png',
    head : 'Easy Schedule',
    meta : 'Project Management',
    master : false,
    selectedApi : [],
    budgetPos : 0,
    percentPos : 0
  },
  'smart-analytics' : {
    img : '/images/wallet/social-media-logo-v2.png',
    head : 'Smart Analytics',
    meta : 'Social Media Analytics',
    master : false,
    selectedApi : [],
    budgetPos : 0,
    percentPos : 0
  }
},
initBudgetSlider = false,
initPercentSlider = false,
processPadding = 64,
appKey;

function loadCoinsValue() {
  var $selectCoinModal =  $('#select-coin-modal');
  $.when(
    $.getJSON('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD', function(data) {
        coinsVal.eth = data;
    }),
    $.getJSON('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD', function(data) {
        coinsVal.btc = data;
    }),
    $.getJSON('https://min-api.cryptocompare.com/data/price?fsym=XRP&tsyms=USD', function(data) {
        coinsVal.xrp = data;
    }),
    $.getJSON('https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD', function(data) {
        coinsVal.ltc = data;
    })
  ).then(function() {
    if (coinsVal.eth) {
      $('.tab[data-tab="trade"] .buying .btn .price span:last-child').text('@ $'+coinsVal.eth.USD);
      var slider = $("#trade-amount .amount-slider .slider").slider({
        range : 'min',
        max: 139.47001,
        min : 0.00001,
        step : 0.00001,
        value : 44.38385,
        create : function(){
          sliderFunction($(this), 'create', {});
        },
        slide : function(){
          sliderFunction($(this), 'slide', {});
        },
        change : function(){
          sliderFunction($(this), 'change', {});
        }
      });

      $('#trade-amount .amount-slider .slider').append(
        '<div class="slider-rail"></div>'
      );

      $("#trade-amount .amount-slider .slider").slider().bind({
        sliderchange : function (){
          sliderFunction($(this), 'create', {});
        }
      });

      $('.slider').trigger('sliderchange');
    }
  });
}

function initProcess() {
  var $openProcess = $('.open-process'),
  $processWin = $('.process-window'),
  $checkList = $processWin.find('.check-list'),
  $checkItems = $checkList.find('.item');

  $openProcess.click(function(){
    var data = $(this).data();
    appKey = data.app ? data.app : appKey;

    if (appInfo[appKey].master && !$(this).parents('.edit').length) {
      openProcess('#summary-process', appKey);
    } else if ($(this).parents('.edit').length) {
      $('#'+data.process).addClass('edit-window');
      openProcess('#'+data.process, appKey);
    } else {
      $('#'+data.process).removeClass('edit-window');
      openProcess('#'+data.process, appKey);
    }

    if (data.step) {
      $('#'+data.process+' .process-step').removeClass('show');
      $('#'+data.process+' .process-step.'+data.step).addClass('show');
    }
  });

  $checkItems.click(function(){
    $(this).toggleClass('active');
    var selectedApi = [];
    $checkItems.each(function(i){
      if($(this).hasClass('active')) {
        var itemText = $(this).find('.name').text();
        selectedApi.push({ id : i, name : itemText, customName : null });
      }
    });
    var inputField = '';
    selectedApi.forEach(function(api){
      inputField += '<div class="input-field" data-id="'+api.id+'"><label>'+api.name+'</label><input type="text" placeholder="Enter name here"></div>';
      $('#api-process .step-2 .fields').html(inputField);
    });

    var $summaryVal = $('.summary-item.api-selected .stats .value');
    $summaryVal.find('.gained').text(selectedApi.length);
    $summaryVal.find('out-of').text($checkList.find('.item').length);
    appInfo[appKey].selectedApi = selectedApi;
  });

  $processWin.on('input', 'input', function(){
    var thisId = $(this).parents('.input-field').data().id,
    value = $(this).val();
    appInfo[appKey].selectedApi.forEach(function(api){
      if (api.id == thisId) {
        api.customName = value;
      }
    });
  });

  $processWin.find('.proceed.next').click(function(){
    var stepName = $(this).data().step,
    $thisWindow = $(this).parents('.process-window');
    $thisWindow.find('.process-step').removeClass('show');
    $thisWindow.find('.process-step.'+stepName).addClass('show');
    var offset = $thisWindow.find('.process-head').outerHeight() + processPadding;
    $thisWindow.find('.process-step').height($(window).height() - offset);
  });

  $('#api-process .step-1 .proceed').click(function(){
    $('.process-summary').show();
    $('.process-summary .api-selected').show();
  });

  $('#incentive-process .step-1 .proceed').click(function(){
    $('.process-summary').show();
    $('.process-summary .budget-allocated').show();
  });

  $('#incentive-process .step-3 .proceed').click(function(){
    $('.process-summary').show();
    $('.process-summary .dev-royalty').show();
  });

  $('#api-process .step-2 .proceed').click(function(){
    initProcessTwo();
  });

  $('#api-process .proceed.publish').click(function(){
    var data = $(this).data();
    // openProcess('#incentive-process', appKey);
    initloader({
      data : data,
      call : {
        callFunc : openProcess,
        callParams : ['#incentive-process', appKey]
      }
    });
  });

  $('#incentive-process .proceed.publish').click(function(){
    var data = $(this).data();
    initloader({
      data : data,
      call : {
        callFunc : openProcess,
        callParams : ['#summary-process', appKey]
      }
    });

    appInfo[appKey].master = true;
    // console.log(appInfo[appKey].master);
  });

  $('.total-balance .buy .button').click(function(){
    // $processWin.hide();
    $('#home-tab').hide();
    $('#transaction-tab').show();
    $('#wallet-value .nav-links .link[data-tab="buy"]').trigger('click');
  });

  $processWin.find('.back, .process-back:not(.open-process)').click(function(){
    $processWin.hide();
  });

  $processWin.find('form').submit(function(e){
    // console.log('submitted');
    e.preventDefault();
    $(this).parents('.process-step').find('.proceed').trigger('click');
  });
}

function initProcessTwo() {
  // console.log('published');
  var menu = '';

  appInfo[appKey].selectedApi.forEach(function(api, i){
    menu += '<div class="item">'+(api.customName ? api.customName : api.name)+'</div>';
    var itemNum = i,
    isLastItem = (itemNum == appInfo[appKey].selectedApi.length - 1) ? ' last-child' : '',
    percentSlider = ''+
    '<div class="api-item'+isLastItem+'">'+
      '<section data-tab="none" class="tab no-padding percent-slider">'+
        '<div class="title">'+(api.customName ? api.customName : api.name)+'</div>'+
        '<div class="amount-slider">'+
          '<div class="amounts">'+
            '<p class="start">0.00001%</p>'+
            '<p class="end">99%</p>'+
          '</div>'+
          '<div class="slider"></div>'+
          '<div class="conversion">'+
            '<p class="storecoin-val orange"><span class="value">33.83535</span><span>%</span></p><img src="/images/wallet/exchange-icon.png" style="display:none" class="exchange"/>'+
            '<p style="display:none" class="dollar-val green"><span>$</span><span>29.95</span></p>'+
          '</div>'+
        '</div>'+
      '</section>'+
    '</div>';

    $('.api-royalty .api-list').append(percentSlider);
  });
  $('.api-bugget-api').each(function(){
    $(this).find('.api-list .api-item').each(function(i){
      var itemNum = i;
      if (appInfo[appKey].selectedApi.length > itemNum ) {
        $(this).show();
        if (itemNum == appInfo[appKey].selectedApi.length - 1) {
          $(this).addClass('last-child');
        }
      } else {
        $(this).hide();
      }
    });
  });
  initSlider({ el : '.api-percent-global-slider', value : 0, name : 'global-percent-slider' });
  initSlider({ el : '.api-royalty .percent-slider', value : 0, name : 'royalty', max : 99 });
  // initSlider({ el : '.api-bugget-api .percent-slider', value : 0, name : 'royalty', max : 99 });
  $('.process-window .ui.dropdown .menu').html(menu);
  initPercentSlider = true;
}

function openProcess(el, key) {
  // console.log(el, key);
  var $processWin = $('.process-window'),
  $thisApp = $processWin.find('.item-app'),
  appData = appInfo[key],
  $thisPro = $(el);

  $processWin.hide();
  $thisPro.height($(window).height()).show();
  $thisApp.find('.image img').attr('src', appData.img);
  $thisApp.find('.title b').text(appData.head);
  $thisApp.find('.title .meta').text(appData.meta);
  $thisPro.find('.process-step').removeClass('show');
  $thisPro.find('.process-step.step-1').addClass('show');
  var offset = $thisPro.find('.process-head').outerHeight() + processPadding;
  $thisPro.find('.process-step').height($(window).height() - offset);

  updateProcess();
}

function updateProcess(){
  $('.api-budget-app-slider .slider').slider('option', 'value', appInfo[appKey].budgetPos);
  if(initPercentSlider) {
    // console.log(appInfo[appKey].percentPos);
    $('.api-percent-global-slider .slider').slider('option', 'value', appInfo[appKey].percentPos);
  }
  $('#summary-process .api-list .api-item').each(function(i){
    var api = appInfo[appKey].selectedApi[i];
    if(api) {
      $(this).find('.title').text(api.customName ? api.customName : api.name);
    }
  });
  // console.log(appInfo[appKey]);
}

function triggerOnUrl() {
  // console.log(window.location.hash);
  var hash = window.location.hash,
  pathname = window.location.pathname;

  if (pathname == '/wallet/' || pathname == '/wallet/wallet-app/') {
    if (hash == '#api') {
      $('#home-tab .feeds-tab-items .item').removeClass('active');
      $('#home-tab .feeds-tab').removeClass('active');
      $('#home-tab .feeds-tab-items .item[data-tab="#apps"]').addClass('active');
      $('#apps').addClass('active');
      $('.iphone iframe').attr('src', '/wallet/wallet-app/#api');
    } else if (hash == '#dev') {
      $('.iphone iframe').attr('src', '/wallet/wallet-app/#dev');
      appKey = 'easy-schedule';
      appInfo[appKey] = {
        budgetPos : 56,
        head : "Easy Schedule",
        img : "/images/wallet/calender-icon.png",
        master : true,
        meta : "Project Management",
        percentPos : 75,
        selectedApi : [
          {id: 0, name: "User / invite", customName: null},
          {id: 1, name: "User / signup", customName: null}
        ]
      };
      initProcessTwo();
      openProcess('#summary-process', appKey);
      $('#summary-process .step-1').removeClass('show');
      $('#summary-process .step-2').addClass('show');
    }
  }
}

// function initPercentSlider() {
//   var $tab = $('section.tab[data-tab]'),
//   $checkbox = $tab.find('.wallet-checkbox input');
//   $checkbox.change(function() {
//       var $this = $(this),
//       $amountSlider = $this.parents('.tab').find('.amount-slider'),
//       $thisSlider = $amountSlider.find('.slider');
//       // console.log($thisSlider);
//       if(this.checked) {
//         $amountSlider.addClass('disabled');
//         $thisSlider.slider('disable');
//       } else {
//         $thisSlider.slider('enable');
//         $amountSlider.removeClass('disabled');
//       }
//   });
// }

function initRoyaltyTabs() {
  var lastScrollTop = 0;
  $('.royalty-tabs .feeds-tab').scroll(function(event){
     var st = $(this).scrollTop();
     if (st > lastScrollTop){
        $('.royalty-tabs .feeds-tab-items').addClass('top');
        //  $('.royalty-tabs .feeds-tab-items').slideUp();
     } else {
        // upscroll code
        $('.royalty-tabs .feeds-tab-items').removeClass('top');
     }
     lastScrollTop = st;
  });
}

function initFeedsTab() {
  var $tabs = $('.feeds-tab-items'),
  $items = $tabs.find('.item');

  $items.click(function(){
    $items.removeClass('active');
    $('.feeds-tab').removeClass('active');
    $(this).addClass('active');

    var $tab = $($(this).data().tab);
    $tab.addClass('active');
  });
}

function initDatePicker(){
  $('#date-picker input').pickadate({
    format: 'd mmm, yyyy'
  });
  $('#time-picker input').pickatime();
}

function initApi(){
  var $api = $('.api-bugget-api');
  if($api.length){
    var $item = $api.find('.api-item'),
    $button = $item.find('.select-api'),
    $selectModal = $('#select-api-modal'),
    $modalItem = $selectModal.find('.item'),
    $itemName = $modalItem.find('.name'),
    $itemIcon = $itemName.find('i'),
    $subListItem = $modalItem.find('.sub-list li'),
    timeout = null,
    $thisItem = null;

    $button.click(function(){
      $(this).text('Edit');
      $thisItem = $(this).parents('.api-item');
      $selectModal.modal('show');
    });

    $itemName.click(function(){
      if (timeout) {
        clearTimeout(timeout);
      }
      var $this = $(this);
      $itemName.not($this).find('i').removeClass('ion-chevron-up').addClass('ion-chevron-down');
      $this.find('i').toggleClass('ion-chevron-down ion-chevron-up');
      $itemName.not($this).parents('.item').removeClass('active');
      $this.parents('.item').toggleClass('active');

      timeout = setTimeout(function(){
        $selectModal.modal('refresh');
      }, 1000);
    });

    $subListItem.click(function(){
      $selectModal.modal('hide');
      $thisItem.find('.selected-api').text($(this).text());
    });
  }
}

function sendGift () {
  $('#gift-button button').click(function(){
    var templateNot =
    '<section class="wallet-feed"><img src="/images/wallet/printbot-icon.png" class="image"/>'+
      '<div class="description">'+
        '<div class="name-val">'+
          '<div class="name bold">Printbot</div>'+
          '<div class="status">BOT</div>'+
        '</div>'+
        '<div class="transaction"><a class="blue">'+giftItems.sender+'</a> gifted you<span class="black storecoin-val"> '+giftItems.storeVal+' </span><span class="black">storecoin:</span></div>'+
        '<div class="message">'+giftItems.message+'</div>'+
        '<div class="download-time"><img src="/images/wallet/black-storecoin.png"/>'+
          '<div class="dot"><i class="ion-record"></i></div>'+
          '<p class="time">Today, 12:08:PM</p>'+
          '<div class="dot"><i class="ion-record"></i></div>'+
          '<p class="time">Crossfit</p>'+
        '</div>'+
      '</div>'+
    '</section>';
    var templateFeed =
    '<section class="wallet-feed gift-feed"><img src="/images/wallet/user-3.png" class="image"/>'+
      '<div class="description">'+
        '<div class="name-val">'+
          '<p class="name">Chris McCoy</p>'+
          '<p class="status">GIFTED</p>'+
          '<p class="value green">'+giftItems.storeVal+'</p>'+
        '</div>'+
        '<div class="transaction"><a class="blue">'+giftItems.sender+'</a> gifted you storecoin:</div>'+
        '<div class="message">'+giftItems.message+'</div>'+
        '<div class="download-time"><i class="ion-calendar"></i>'+
          '<div class="dot"><i class="ion-record"></i></div>'+
          '<p class="time">just now</p>'+
        '</div>'+
      '</div>'+
    '</section>';
    $('#notification-window .notification-feeds').append(templateNot);
    $('.feeds').append(templateFeed);
    updateNotific('new');
    initloader({data : { message : 'Loading...' }});
  });
}

function updateNotific(type) {
  if (type == 'new') {
    numNotification += 1;
    $('#wallet-nav .notifications').addClass('new');
  } else if (type == 'reset') {
    numNotification = 0;
    $('#wallet-nav .notifications').removeClass('new');
  }
  $('#wallet-nav .notifications').text(numNotification);
}

function initDropdowns() {
  $('.ui.dropdown').dropdown();
  $('.send-gift-to .ui.dropdown').dropdown({
    onChange : function(value){
      giftItems.sender = value;
      // console.log(giftItems);
    }
  });
}

function initTabs (){
  var $walletNav = $('#wallet-nav'),
      $tabLinks = $('#wallet-value .links .link'),
      $subNav = $('#wallet-sub-nav'),
      $back = $walletNav.find('.back'),
      $navLinks = $('.nav-links .link'),
      $subNavLinks = $subNav.find('.links .link'),
      $walletTabs = $('#wallet-tabs'),
      $notifications = $('#wallet-nav .notifications'),
      $navTitle = $walletNav.find('.title'),
      $tradeTab = $('.tab[data-tab="trade"]'),
      $selectMethModal = $('#select-coin-modal');

  $tabLinks.click(function(){
    $('#transaction-tab').show();
    $('#home-tab').hide();
  });

  $subNav.find('.logo').click(function(){
    closeAllTabs();
  });

  $notifications.click(function(){
    $('#transaction-tab').hide();
    $('#home-tab').hide();
    $(this).removeClass('new');
    $('#notification-window').addClass('show');
    $navTitle.find('.main').removeClass('show');
    $navTitle.find('.notification').addClass('show');
    updateNotific('reset');
  });

  $back.click(closeAllTabs);

  $tradeTab.find('.wallet-button').click(function(){
    initloader({data : { message : 'Loading...' }});
  });

  $tradeTab.find('.buying .btn').click(function(){
    $(this).addClass('active');
    $selectMethModal.modal('show');
  });

  $selectMethModal.find('.list .item').click(function(){
    $selectMethModal.modal('hide');
    $selectMethModal.find('.list .item').removeClass('active');
    $(this).addClass('active');
    var data = $(this).data();
    var $btn = $tradeTab.find('.buying .btn');
    $btn.html('');

    var template =
    '<img src="'+data.img+'">'+
      '<div class="price">'+
        '<span><b>'+data.name+'</b></span>'+
        '<span>@ $'+coinsVal[data.key].USD+'  </span>'+
      '</div>'+
    '</a>';
    coinKey = data.key;
    $('.slider').trigger('sliderchange');
    $btn.append(template);
  });

  $navLinks.click(function(){
    $(window).scrollTop(0);
    if (!$(this).is('.active')) {
      var tabName = $(this).data().tab;
      // console.log(tabName);
      $subNavLinks.removeClass('active');
      $walletTabs.find('.tab').removeClass('active');

      $subNav.find('.links .link[data-tab="'+tabName+'"]').addClass('active');
      // $walletTabs.find('.tab[data-tab="'+tabName+'"]').addClass('active');

      var $currentTab = $walletTabs.find('.tab[data-tab="'+tabName+'"]');
      // var offset = (($walletNav.length > 0) ? $walletNav.height() : 0)  + $subNav.height() + 74;
      var offset = $subNav.height() + 63;
      // console.log($currentTab.find('.wallet-button').height());
      $currentTab.addClass('active');
      $currentTab.find('.content').css('height' , ($(window).height() - offset)+'px');
    }
  });

  var $tabInputs = $walletTabs.find('input'),
      $tabTextarea = $walletTabs.find('textarea');

  $tabTextarea.focus(function(){
    var $this = $(this);
    setTimeout(function(){
      $(".layout").animate({ scrollTop: $this.offset().top }, 300);
      // $('.layout').scrollTop($this.offset().top);
    }, 300);
    // $('.layout').scrollTop($(this).offset().top);
  });

  $('body').on('focus', 'input', function(){
    var $this = $(this);
    setTimeout(function(){
      $(".layout").animate({ scrollTop: $this.offset().top }, 300);
      // $('.layout').scrollTop($this.offset().top);
    }, 300);
  });
}

function initTextarea() {
  var $textarea = $('.textarea-count textarea');

  $textarea.on('input', function(){
    var count = $(this).val().length;
    $(this).parents('.textarea-count').find('.count span:first-child').text(count);
    if($(this).is('.gift-textarea')) { giftItems.message = $(this).val(); }
  });
}

function initModal () {
  var $modal = $('.ui.modal'),
      $transactBtn = $('.wallet-button.open-transaction button');

  $modal.modal();

  $transactBtn.click(function(){
    var modalName = $(this).data().modal;
    $('.ui.modal[data-modal="'+modalName+'"]').modal('show');
  });

  $modal.find('.close-modal').click(function(){
    $modal.modal('hide');
  });

  $modal.find('.confirm-button').click(function(){
    $modal.modal('hide');
    initloader({data : { message : 'Loading...' }});
    updateBalance();
  });
}

function updateBalance() {
  storecoinBal += buyAmount;
  // console.log(storecoinBal, buyAmount);
  var scStr = numeral(storecoinBal).format('0.00000000').toString().split('.');
  $('#wallet-value .storecoin-val .number').html(scStr[0]+'<span>.'+scStr[1]+'</span>');
  $('.total-balance .logo-amount .amount').text(storecoinBal);
  $('.api-budget-app-slider .amounts .end span').text(storecoinBal);
  // if(initBudgetSlider) {
  //   $('#api-budget-app-slider .amount-slider .slider').slider('option', 'max', storecoinBal);
  // }
}

function initloader(params) {
  var loadDelay = 2000,
  successDelay = 2000,
  data = params.data;
  if (data.message) {
    $('.loader .content.loading .text').html(data.message);
  }
  if (data.success) {
    $('.loader .content.complete .text').html(data.success);
  } else {
    $('.loader .content.complete .text').html('Complete');
  }
  if (data.loaddelay) {
    loadDelay = data.loaddelay;
  }
  if (data.success) {
    successDelay = data.successdelay;
  }
  $('.loader .content.loading').addClass('show');
  $('.loader .content.complete').removeClass('show');
  $('.loader').height($(window).height()).transition('fade');
  // var count = 0;
  // var interval = setInterval(function(){ console.log(count++) }, 1000);
  setTimeout(function(){
    $('.loader .content.loading').removeClass('show');
    $('.loader .content.complete').addClass('show');
    setTimeout(function(){
      closeAllTabs();
      $('.loader').height($(window).height()).transition('fade');
      if (params && params.call) {
        // console.log(params.call.callParams);
        params.call.callFunc.apply(null, params.call.callParams);
        // params.call.callFunc("#incentive-process", "easy-schedule");
      }
      // clearInterval(interval);
    }, successDelay);
  }, loadDelay);
}

function closeAllTabs (){
  var $navTitle = $('#wallet-nav').find('.title');
  $('#transaction-tab').hide();
  $('#notification-window').removeClass('show');
  $('#home-tab').show();
  // $('.layout').removeClass('overflow');
  $navTitle.find('.main').addClass('show');
  $navTitle.find('.notification').removeClass('show');
}

function initRangeSlider() {
  initSlider({ el : '#wallet-tabs .tab[data-tab="buy"]', value : 15 });
  initSlider({ el : '#wallet-tabs .tab[data-tab="sell"]', value : 15 });
  initSlider({ el : '#wallet-tabs .tab[data-tab="gift"]', value : 15 });
  initSlider({ el : '.api-bugget-api .storecoin-slider', value : 0, name : 'api-slider' });
  initSlider({ el : '.api-budget-app-slider', name : 'budget-slider'});
  initSlider({ el : '.api-summary-app-slider', name : 'budget-slider'});
  $('.api-bugget-api .amount-slider .amounts .end span').text(budgetVal);
  initBudgetSlider = true;
}

function logslider(position, max) {
  // position will be between 0 and 100
  max = max ? max : 139.470001;
  // The result should be between 100 an 10000000
  if (position < 6) {
    var minp = 0;
    var maxp = 5;
    var minv = Math.log(0.00000001);
    var maxv = Math.log(1.00000000);
  } else {
    var minp = 6;
    var maxp = 100;
    var minv = Math.log(1.00000001);
    var maxv = Math.log(max);
  }

  // calculate adjustment factor
  var scale = (maxv-minv) / (maxp-minp);

  var exp = Math.exp(minv + scale*(position-minp));
  // console.log(exp);
  exp = numeral(exp).format('0.00000000') == 'NaN' ? 0 : numeral(exp).format('0.00000000');
  return parseFloat(exp);
}

function pecentLogslider(position, max) {
  // position will be between 0 and 100
  max = max ? max : 139.470001;
  // The result should be between 100 an 10000000
  if (position < 26) {
    var minp = 0;
    var maxp = 25;
    var minv = Math.log(0.01);
    var maxv = Math.log(1);
  } else {
    var minp = 26;
    var maxp = 100;
    var minv = Math.log(1.01);
    var maxv = Math.log(max);
  }

  // calculate adjustment factor
  var scale = (maxv-minv) / (maxp-minp);

  var exp = Math.exp(minv + scale*(position-minp));
  // console.log(exp);
  exp = numeral(exp).format('0.000') == 'NaN' ? 0 : numeral(exp).format('0.000');
  return parseFloat(numeral(exp).format('0.000'));
}


function initSlider(params) {
  var $slider = $(params.el);
  if ($slider.length) {
    var slider = $slider.find(".amount-slider .slider").slider({
      range : 'min',
      max: 100,
      min : 0,
      step : 1,
      value : params.value,
      create : function(ev, ui){
        return sliderFunction($(this), 'create', params);
      },
      slide : function(ev, ui){
        return sliderFunction($(this), 'slide', params);
      },
      change : function(ev, ui){
        if (params.name == 'api-slider') {
          var slider = sliderFunction($(this), 'change', params);
          if(!slider) {
            $(this).slider('option', 'value', ui.value - 1);
          }
        } else {
          return sliderFunction($(this), 'change', params);
        }
      }
    });

    $slider.find(".amount-slider .slider").append(
      '<div class="slider-rail"></div>'
    );
  }
}

function sliderFunction($this, eventName, params) {
  // console.log($this, params);
  var value = $this.slider('value'),
      max = $this.slider('option','max'),
      $parent = $this.parents('.tab'),
      thisHandlePos = $this.find('.ui-slider-handle').offset().left;

  return changeOnSlide($this,value, $parent, thisHandlePos, params, eventName);
}

function changeOnSlide ($this, value, $parent, handlePos, params, eventName) {
  var $storeVal = $parent.find('.amount-slider .storecoin-val span.value'),
      tabName = $parent.data().tab,
      $modalStoreVal = $('.confirm-transact.ui.modal[data-modal="'+tabName+'-modal"] .modal-content .buy-amount .storecoin-val'),
      $dollarVal = $parent.find('.dollar-val span:last-child'),
      $unitSign = $parent.find('.dollar-val span:first-child'),
      $dollarAmount = 35.58,
      $conversion = $parent.find('.conversion'),
      max = params.max ? params.max : null;

  if (params.name == 'budget-slider') {
    if (appInfo[appKey]) {
      appInfo[appKey].budgetPos = value;
    }
    // console.log(appInfo);
    value = logslider(value, storecoinBal);
    budgetVal = value;
    value = numeral(value).format('0.00000000');
    $('.api-bugget-api').find('.end span').text(value);
    $('.summary-item.budget-allocated .sc-val').text(value);
  } else if (params.name == 'api-slider' && eventName != 'create') {
    value = logslider(value, budgetVal);
    var total = 0;
    value = numeral(value).format('0.00000000');
    $('.api-bugget-api .storecoin-slider .amount-slider .slider').each(function () {
        // console.log(logslider($(this).slider('value'), budgetVal));
        total += logslider($(this).slider('value'), budgetVal);
    });
    if (total > budgetVal) {
      return false;
    }
  } else if (params.name == 'global-percent-slider') {
    if (eventName != 'create') {
      if (appInfo[appKey]) {
        appInfo[appKey].percentPos = value;
      }
      // $('.api-royalty .percent-slider .amount-slider .slider').slider('option', 'value', value);
      value = numeral(pecentLogslider(value, 99)).format('0.000');
      $('.summary-item.dev-royalty .value').text(numeral(value).format('0.000')+'%');
    }
  } else if (params.name == 'royalty') {
    value = numeral(pecentLogslider(value, 99)).format('0.000');
  } else {
    // console.log(logslider(value, max));
    value = numeral(logslider(value, max)).format('0.00000000');
  }

  if ($storeVal) { $storeVal.text(value); }
  if ($modalStoreVal) { $modalStoreVal.text(value); }

  if (tabName == 'gift') {
    giftItems.storeVal = value;
  } else if (tabName == 'buy') {
    buyAmount = parseFloat(value);
    if ($dollarVal) { $dollarVal.text(numeral(value * $dollarAmount).format('0,0.00000')); }
  } else if (tabName == 'trade') {
    var coinAmount = coinsVal[coinKey].USD, amount;
    if (coinAmount > $dollarAmount) {
      amount = coinsVal[coinKey].USD/$dollarAmount;
    } else {
      amount = $dollarAmount/coinsVal[coinKey].USD;
    }
    // console.log(value * amount);
    $unitSign.text(coinKey.toUpperCase()+' ');
    $dollarVal.text(numeral(value * amount).format('0,0.00000'));
  } else {
    if ($dollarVal) { $dollarVal.text(numeral(value * $dollarAmount).format('0,0.00000')); }
  }

  var $thisSection = $dollarVal.parents('section'),
      paddingLeft = $thisSection.css('padding-left') + $thisSection.offset().left,
      spacing = ($thisSection.hasClass('no-padding')) ? 0 : 10;

  // console.log(handlePos > ($conversion.width() + 10 + $thisSection.offset().left), handlePos, $conversion.width() + 10 + $thisSection.offset().left);

  if(handlePos > ($conversion.width() + spacing + $thisSection.offset().left)) {
    $conversion.css('left', 'calc('+(handlePos - $conversion.width() - spacing)+'px + '+$thisSection.css('padding-left')+')');
  } else {
    $conversion.css('left', paddingLeft );
  }

  return true;
}

function bankSelect() {
  var $dropdown = $('#wallet-pay-method .ui.dropdown'),
      $modalBankInfo = $('.confirm-transact.ui.modal .content .modal-content .pay-info .bank-info');

  $dropdown.dropdown({
    onChange : function (value) {
      $modalBankInfo.text(value);
    },
  });

  $dropdown.dropdown('set selected', 'Wells Fargo - Bank ******2089');
}

function loadChartData() {
  var $dropdown = $('#wallet-price-span .ui.dropdown');
  $dropdown.dropdown();
  $dropdown.dropdown({
    onChange : function(value){
      // if (value == '1D') {
      //   $.getJSON( "https://market.capitalstake.com/intraday/DGKC/"+value, function( result ) {
      //     drawLineChart(result.data);
      //   });
      // } else {
      //   $.getJSON( "https://market.capitalstake.com/daily/DGKC/", function( result ) {
      //     result.data = result.data.slice(0,value);
      //     drawLineChart(result.data);
      //   });
      // }
      $.getJSON( "/data/"+value+".json", function( result ) {
        // console.log(result.data.prices);
        drawLineChart(result.data.prices);
      });
    }
  });
  $.getJSON( "/data/daily.json", function( result ) {
    drawLineChart(result.data.prices);
  });
  // drawLineChart();
}

function drawLineChart(data) {
  $("#wallet-graph .loading").fadeIn();
  setTimeout(function(){
    $("#wallet-graph .loading").fadeOut();
    $("#wallet-graph .graph").html('');
    if ($("#wallet-graph .graph").length) {
      var svg = d3.select("#wallet-graph .graph").append('svg');
          svg.attr("width", $('#wallet-graph .graph').width());
          svg.attr("height", 170);
      var margin = {top: 20, right: 0, bottom: 20, left: 30},
          margin2 = {top: 0, right: 20, bottom: 30, left: 40},
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom,
          height2 = +svg.attr("height") - margin2.top - margin2.bottom;

      // var parseDate = d3.timeParse("%m/%d/%y");
      var parseDate = d3.utcParse("%Y-%m-%dT%H:%M:%S%Z");

      var x = d3.scaleTime().range([0, width]),
          x2 = d3.scaleTime().range([0, width]),
          y = d3.scaleLinear().range([height, 0]),
          y2 = d3.scaleLinear().range([height2, 0]);

      var xAxis = d3.axisBottom(x).ticks(4),
          xAxis2 = d3.axisBottom(x2),
          yAxis = d3.axisLeft(y).ticks(3).tickFormat(function(d){return numeral(d).format('$(0,0a)');});

      var brush = d3.brushX()
          .extent([[0, 0], [width, height2]])
          .on("brush end", brushed);

      var zoom = d3.zoom()
          .scaleExtent([1, 30])
          .translateExtent([[0, 0], [width, height]])
          .extent([[0, 0], [width, height]])
          .on("zoom", zoomed);

      var area = d3.area()
          .x(function(d) { return x(d.time); })
          .y0(height)
          .y1(function(d) { return y(d.price); });

      var area2 = d3.area()
          .x(function(d) { return x2(d.time); })
          .y0(height2)
          .y1(function(d) { return y2(d.price); });

      svg.append("defs").append("clipPath")
          .attr("id", "clip")
          .append("rect")
          .attr("width", width)
          .attr("height", height);

      var focus = svg.append("g")
          .attr("class", "focus")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var context = svg.append("g")
          .attr("class", "context")
          .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

      var min = d3.min(data, function(d) { return d.price; });
      var max = d3.max(data, function(d) { return d.price; });
      var random = d3.scaleLinear().range([5, 36]).domain([min, max]);

      // format the data
      data.forEach(function(d) {
          d.time = parseDate(d.time);
          d.price = random(+d.price);
      });

      // Scale the range of the data
      // x.domain(d3.extent(data, function(d) {
      //   return d[0];
      // })).range([0, width - margin.left - margin.right]);
      //
      // xAxis.scale(x).orient('bottom').tickPadding(5);
      x.domain(d3.extent(data, function(d) { return d.time; }));
      y.domain(d3.extent(data, function(d) { return d.price; }));

      // x.domain(d3.extent(data, function(d) { return d.time; }));
      // y.domain([0, d3.max(data, function(d) { return d.price; })]);
      x2.domain(x.domain());
      y2.domain(y.domain());

      focus.append("path")
          .datum(data)
          .attr("class", "area")
          .attr("d", area);

      focus.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      focus.append("g")
          .attr("class", "axis axis--y")
          .call(yAxis);

      context.append("path")
          .datum(data)
          .attr("class", "area")
          .attr("d", area2);

      context.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height2 + ")")
          .call(xAxis2);

      context.append("g")
          .attr("class", "brush")
          .call(brush)
          .call(brush.move, x.range());

      // svg.append("rect")
      //     .attr("class", "zoom")
      //     .attr("width", width)
      //     .attr("height", height)
      //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      //     .call(zoom)
      //     .call(zoom.transform, d3.zoomIdentity.translate( -1 * (width * 5), 0).scale(6))
      svg.append("rect")
          .attr("class", "zoom")
          .attr("width", width)
          .attr("height", height)
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .call(zoom);


      function brushed() {
        if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
        var s = d3.event.selection || x2.range();
        x.domain(s.map(x2.invert, x2));
        focus.select(".area").attr("d", area);
        focus.select(".axis--x").call(xAxis);
        svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
            .scale(width / (s[1] - s[0]))
            .translate(-s[0], 0));
      }

      function zoomed() {
        if(d3.event) {
          if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
          var t = d3.event.transform;
          x.domain(t.rescaleX(x2).domain());
          focus.select(".area").attr("d", area);
          focus.select(".axis--x").call(xAxis);
          context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
        }
      }

      function type(d) {
        d.time = parseDate(d.time);
        d.price = +d.price;
        return d;
      }
    }
  }, 2000);
}

function initPaginate() {
  var loading = false,
      $graphFeeds = $('.graph-feeds'),
      $pageLoading = $graphFeeds.find('.page-loading'),
      $feeds = $graphFeeds.find('.feeds'),
      html = $feeds.html();
  $graphFeeds.scroll(function() {
    if (!loading) {
      if($graphFeeds.scrollTop() == $graphFeeds[0].scrollHeight - $graphFeeds.height()) {
        loading = true;
        $pageLoading.show();
        setTimeout(function(){
          $feeds.append(html);
          loading = false;
        }, 5000);
      }
    }
  });
}

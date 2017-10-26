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
});
var giftItems = {
  storeVal : null,
  sender : null,
  message : null
},
numNotification = 1;

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
    closeAllTabs();
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
      $navTitle = $walletNav.find('.title');

  $tabLinks.click(function(){
    $('#transaction-tab').show();
    $('#home-tab').hide();
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

  $back.click(function(){
    closeAllTabs();
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

      var offset = $walletNav.height() + $subNav.height();
      $walletTabs.find('.tab[data-tab="'+tabName+'"]').addClass('active').css('height' , ($(window).height() - offset)+'px');
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
  var $modal = $('.confirm-transact.ui.modal'),
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
    closeAllTabs();
  });
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
  var slider = $("#wallet-amount .amount-slider .slider").slider({
    range : 'min',
    max: 139.47001,
    min : 0.00001,
    step : 0.00001,
    value : 44.38385,
    create : function(){
      sliderFunction($(this), 'create');
    },
    slide : function(){
      sliderFunction($(this), 'slide');
    },
    change : function(){
      sliderFunction($(this), 'change');
    }
  });

  // slider.slider('value', 44.38385);
}

function sliderFunction($this, eventName) {
  var value = $this.slider('value'),
      $parent = $this.parents('.tab'),
      thisHandlePos = $this.find('.ui-slider-handle').offset().left;

  changeOnSlide(value, $parent, thisHandlePos);
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

function changeOnSlide (value, $parent, handlePos) {
  var $storeVal = $parent.find('#wallet-amount .storecoin-val span'),
      tabName = $parent.data().tab,
      $modalStoreVal = $('.confirm-transact.ui.modal[data-modal="'+tabName+'-modal"] .modal-content .buy-amount .storecoin-val'),
      $dollarVal = $parent.find('#wallet-amount .dollar-val span'),
      $dollarAmount = 35.58,
      $conversion = $parent.find('.conversion');

  if ($storeVal) { $storeVal.text(value); }
  if ($modalStoreVal) { $modalStoreVal.text(value); }
  if ($dollarVal) { $dollarVal.text(numeral(value * $dollarAmount).format('0,0.00')); }

  if (tabName == 'gift') {
    giftItems.storeVal = value;
  }

  if(handlePos > $conversion.width()) {
    $conversion.css('left', (handlePos - ($conversion.width() - 10))+'px');
  } else {
    $conversion.css('left', '20px');
  }
}

function loadChartData() {
  var $dropdown = $('#wallet-price-span .ui.dropdown');
  $dropdown.dropdown({
    onChange : function(value){
      if (value == '1D') {
        $.getJSON( "https://market.capitalstake.com/intraday/DGKC/"+value, function( result ) {
          drawLineChart(result.data);
        });
      } else {
        $.getJSON( "https://market.capitalstake.com/daily/DGKC/", function( result ) {
          result.data = result.data.slice(0,value);
          drawLineChart(result.data);
        });
      }
    }
  });
  $.getJSON( "https://market.capitalstake.com/intraday/DGKC/1D", function( result ) {
    drawLineChart(result.data);
  });
}

function drawLineChart(data) {
  var margin = {top: 20, right: 0, bottom: 5, left: 35},
      width = $('.graph').width() - margin.left - margin.right,
      height = ($('.graph').width() * 0.5) - margin.top - margin.bottom;

  // parse the date / time
  var parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S");

  // set the ranges
  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  // define the area
  var	area = d3.area()
      .x(function(d) { return x(d.date); })
      .y0(height)
      .y1(function(d) { return y(d.close); });

  // define the line
  var valueline = d3.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.close); });

  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  $('#wallet-graph .graph').html('');
  var svg = d3.select("#wallet-graph .graph").append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  var min = d3.min(data, function(d) { return d.close; });
  var max = d3.max(data, function(d) { return d.close; });
  var random = d3.scaleLinear().range([10, 36]).domain([min, max]);

  // format the data
  data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.close = random(+d.close);
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.close; }));

  // set the gradient
  svg.append("linearGradient")
    .attr("id", "area-gradient")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0).attr("y1", y(0))
    .attr("x2", 0).attr("y2", y(1000))
  .selectAll("stop")
    .data([
      {offset: "100%", color: "#e0f3e2"}
    ])
  .enter().append("stop")
    .attr("offset", function(d) { return d.offset; })
    .attr("stop-color", function(d) { return d.color; });

  // Add the line.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  // Add the area.
  svg.append("path")
      .data([data])
      .attr("class", "area")
      .attr("d", area);

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y).ticks(2).tickFormat(function(d){return numeral(d).format('$(0,0a)');}));
}

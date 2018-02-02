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
  triggerBuy();
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
coinKey = 'eth';

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
          sliderFunction($(this), 'create');
        },
        slide : function(){
          sliderFunction($(this), 'slide');
        },
        change : function(){
          sliderFunction($(this), 'change');
        }
      });

      $('#trade-amount .amount-slider .slider').append(
        '<div class="slider-rail"></div>'
      );

      $("#trade-amount .amount-slider .slider").slider().bind({
        sliderchange : function (){
          sliderFunction($(this), 'create');
        }
      });

      $('.slider').trigger('sliderchange');
    }
  });
}

function triggerBuy() {
  // console.log(window.location.hash);
  var hash = window.location.hash;
  if (hash == '#buy') {
    $('#wallet-value .links.nav-links .link[data-tab="buy"]').trigger('click');
  }
}

function initDatePicker(){
  $('#date-picker input').pickadate({
    format: 'd mmm, yyyy'
  });
  $('#time-picker input').pickatime();
}

function initApi(){
  var $api = $('#api-bugget-api');
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
    initloader();
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

  $tradeTab.find('.wallet-button').click(initloader);

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
      var offset = $subNav.height() + 74;
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
    initloader();
  });
}

function initloader() {
  // $('.loader .content.loading').removeClass('show');
  // $('.loader .content.complete').addClass('show');
  // $('.loader').height($(window).height()).transition('fade');

  $('.loader .content.loading').addClass('show');
  $('.loader .content.complete').removeClass('show');
  $('.loader').height($(window).height()).transition('fade');
  setTimeout(function(){
    $('.loader .content.loading').removeClass('show');
    $('.loader .content.complete').addClass('show');
    setTimeout(function(){
      closeAllTabs();
      $('.loader').height($(window).height()).transition('fade');
    }, 2000);
  }, 2000);
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
  var $sliders = $('#wallet-amount, #api-budget-app-slider, #api-bugget-api');
  var slider = $sliders.find(".amount-slider .slider").slider({
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

  $sliders.find(".amount-slider .slider").append(
    '<div class="slider-rail"></div>'
  );

  // $("#wallet-amount .amount-slider .slider").slider().bind({
  //   sliderchange : function (){
  //     sliderFunction($(this), 'create');
  //   }
  // });
  //
  // $(".slider").trigger('sliderchange');
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
  var $storeVal = $parent.find('.amount-slider .storecoin-val span'),
      tabName = $parent.data().tab,
      $modalStoreVal = $('.confirm-transact.ui.modal[data-modal="'+tabName+'-modal"] .modal-content .buy-amount .storecoin-val'),
      $dollarVal = $parent.find('.dollar-val span:last-child'),
      $unitSign = $parent.find('.dollar-val span:first-child'),
      $dollarAmount = 35.58,
      $conversion = $parent.find('.conversion');

  if ($storeVal) { $storeVal.text(value); }
  if ($modalStoreVal) { $modalStoreVal.text(value); }

  if (tabName == 'gift') {
    giftItems.storeVal = value;
  } else if (tabName == 'trade') {
    var coinAmount = coinsVal[coinKey].USD, amount;
    if (coinAmount > $dollarAmount) {
      amount = coinsVal[coinKey].USD/$dollarAmount;
    } else {
      amount = $dollarAmount/coinsVal[coinKey].USD;
    }
    // console.log(value * amount);
    $unitSign.text(coinKey.toUpperCase()+' ');
    $dollarVal.text(numeral(value * amount).format('0,0.00'));
  } else {
    if ($dollarVal) { $dollarVal.text(numeral(value * $dollarAmount).format('0,0.00')); }
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
          svg.attr("height", 200);
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

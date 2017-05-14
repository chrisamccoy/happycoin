$(document).ready(function(){
  scrollCheck();
  futureTabs();

  // on scroll
  $(window).scroll(function(){
    scrollCheck();
  });


  $('#hc-nav-wrapper .menu-toggle').click(function (){
    $('#hc-nav-wrapper .hc-navigation .hc-menu-container').toggle('slow');
  });
});


function scrollCheck(){
  var scrollVal = $(window).scrollTop(),
      $navWrapper = $('#hc-nav-wrapper');

  if (scrollVal > 1) {
    $navWrapper.addClass('add-background');
  } else {
    $navWrapper.removeClass('add-background');
  }
}

function futureTabs () {
  var $futureEl = $('#hc-future'),
      $futureTabsBtn = $futureEl.find('.tab-item .button'),
      $futTabContGroup = $futureEl.find('.tab-content-group'),
      $futureTabContent = $futTabContGroup.find('.tab-content'),
      tabId = null;

  $futureTabsBtn.click(function(){
    tabId = $(this).data().tabid;
    $futureTabsBtn.removeClass('is-active');
    $futureTabContent.removeClass('is-active');
    $(this).addClass('is-active');
    $futTabContGroup.find('.tab-content[data-tabid="'+tabId+'"]').addClass('is-active');
  });
}

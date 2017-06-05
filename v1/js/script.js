$(document).ready(function(){
  scrollCheck();

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

  $('#hc-tech .columns .tech-lead').click(function(){
    if (!$(this).hasClass('active')) {
      $('#hc-tech .columns .tech-desc').slideUp();
      $('#hc-tech .columns .tech-lead').removeClass('active');
      $(this).addClass('active');
      $(this).next('.tech-desc').slideToggle();
    } else {
      $('#hc-tech .columns .tech-lead').removeClass('active');
      $(this).next('.tech-desc').slideToggle();
    }
    // console.log($(this).next('.tech-desc'));
  });
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

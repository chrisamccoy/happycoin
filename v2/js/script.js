$(document).ready(function(){
  scrollCheck();
  countdown();

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

function countdown() {
  var countDownDate = new Date("Aug 5, 2017 15:37:25").getTime();

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

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (hours < 10) {
      hours = '0' + hours;
    }

    // Display the result in the element with id="demo"
    $('.countdown').html(days + ":" + hours + ":" + minutes + ":" + seconds);

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      $('.countdown').html("EXPIRED");
    }
  }, 1000);
}

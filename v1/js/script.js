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

function generateCircle (element, value) {
  element = document.getElementById(element);
  var bar = new ProgressBar.Circle(element, {
    color: '#5d794c',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 2,
    trailWidth: 4,
    easing: 'easeInOut',
    text: {
      autoStyleContainer: false
    },
    from: { color: '#5d794c', width: 5 },
    to: { color: '#5d794c', width: 5 },
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

  bar.text.style.fontSize = '2rem';

  bar.animate(value);
}

function renderCircles() {
  generateCircle('circle1', 0.60);
  generateCircle('circle2', 0.25);
  generateCircle('circle3', 0.15);
}

function whyTextToggle () {
  var $columns = $('.points .columns');

  $columns.click(function(){
    $columns.find('.desc').addClass('ellipsis');
    $(this).find('.desc').toggleClass('ellipsis');
  });
}

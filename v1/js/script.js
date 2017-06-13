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
  generateCircle('circle1', 0.60, '#5d794c', '2rem');
  generateCircle('circle2', 0.25, '#5d794c', '2rem');
  generateCircle('circle3', 0.15, '#5d794c', '2rem');
}

function whyTextToggle () {
  var $columns = $('.points .columns');

  $columns.click(function(){
    $columns.find('.points-desc').addClass('ellipsis');
    $(this).find('.points-desc').toggleClass('ellipsis');
  });
}

function renderCards() {
  var cards = [
    {
      cardId : 'card-1', name : 'Technical Documentation' , completion : 0.1,
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
      cardId : 'card-4', name : 'Technical Documentation' , completion : 0.1,
      description : 'Technical Document Protocol of how the blockchain is updated and the data is exchanged between nodes.',
      taskCompleted : 0,
      tasks : [
        { name : 'Writing documentation', completion : 0.15 }
      ]
    },
    {
      cardId : 'card-5', name : 'DESKTOP WALLET REDESIGN' , completion : 0.63,
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
      cardId : 'card-6', name : 'MOBILE WALLETS' , completion : 0.52,
      description : 'Building IOS/ANDROID based mobile wallets.',
      taskCompleted : 1,
      tasks : [
        { name : 'Initial R & D', completion : 1.0 },
        { name : 'UI Wireframe', completion : 0.6 },
        { name : 'Prototype Mockup', completion : 0 }
      ]
    },
    {
      cardId : 'card-7', name : 'Technical Documentation' , completion : 0.1,
      description : 'Technical Document Protocol of how the blockchain is updated and the data is exchanged between nodes.',
      taskCompleted : 0,
      tasks : [
        { name : 'Writing documentation', completion : 0.15 }
      ]
    },
    {
      cardId : 'card-8', name : 'DESKTOP WALLET REDESIGN' , completion : 0.63,
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
      cardId : 'card-9', name : 'MOBILE WALLETS' , completion : 0.52,
      description : 'Building IOS/ANDROID based mobile wallets.',
      taskCompleted : 1,
      tasks : [
        { name : 'Initial R & D', completion : 1.0 },
        { name : 'UI Wireframe', completion : 0.6 },
        { name : 'Prototype Mockup', completion : 0 }
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
        cardCompletion = item.completion*100,
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
    if ($(this).find('h6 i').hasClass('ion-chevron-up')) {
      $(this).find('h6 i').removeClass('ion-chevron-up');
      $(this).find('h6 i').addClass('ion-chevron-down');
      $(this).next('.bars').addClass('hidden');
    } else {
      $bars.addClass('hidden');
      $barsHead.find('h6 i').removeClass('ion-chevron-up');
      $barsHead.find('h6 i').addClass('ion-chevron-down');
      $(this).find('h6 i').toggleClass('ion-chevron-up ion-chevron-down');
      $(this).next('.bars').toggleClass('hidden');
    }
  });
}

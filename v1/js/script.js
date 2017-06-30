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
  emailSubscribe();
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
    $incentive.removeClass('reveal');
    $(this).toggleClass('reveal');
  });
}

function emailSubscribe() {
  var $emailSection = $('.hc-email'),
      $emailForm = $emailSection.find('.form'),
      $subscribeBtn = $emailSection.find('.button-primary'),
      $emailInput = $emailSection.find('input[type=email]');

      $emailForm.submit(function(e){
        e.preventDefault();
      });

      $subscribeBtn.click(function(){
        if($emailInput.val()){
          $.ajax({
            type : 'GET',
            url : 'https://hooks.zapier.com/hooks/catch/2306819/5bmzth/',
            data : $(this).parents('.form').serialize()
          }).done(function(result){
            console.log(result);
            $emailSection.find('.email-widget').hide();
            $emailSection.find('.success-message').show();
          });
        }
      });
}

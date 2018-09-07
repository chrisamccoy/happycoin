$(document).ready(function(){
  loadContent();
});


function loadContent() {
  var load = false;
  $(window).scroll(function(e){
    var offset = $('#load-content').offset().top - 50,
    scrollTop = $(window).scrollTop();

    if (scrollTop > offset && !load) {
      // console.log('load', load);
      $('body').css('overflow', 'hidden');
      load = true;
      $.ajax({
        type: "GET",
        url: "/index-content",
        data: { },
        success: function(data){
          $('#load-content .loading').fadeOut(function(){
            $('#load-content').append(data);
            $('body').css('overflow', 'scroll');
          });
        }
      });
    }
  });
}

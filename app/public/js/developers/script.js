$(document).ready(function(){
  var path = $('#load-path').data().path;
  $.ajax({
    type: "GET",
    url: '/developers/load'+path,
    data: { },
    success: function(data){
      $('#load-path').append(data);
    }
  });
});

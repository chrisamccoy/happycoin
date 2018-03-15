var orders = null,
inventory = null,
data = null,
formData = [],
$loading = null,
resData = null;

$(document).ready(function(){
  loadData();
});

function loadData() {
  $.getJSON('/admin/get-orders', function(result){
    orders = result;
    loaded();
  });

  $.getJSON('/admin/get-inventory', function(result){
    inventory = result;
    loaded();
  });
}

function loaded() {
  if (orders == null || inventory == null ) {
    return false;
  }
  console.log('Orders Loaded');
  initOrders();
}

function initOrders() {
  var $content = $('#admin-content');
  $loading = $content.find('.loading');

  data = {
    orders : orders
  }

  data.orders.forEach(function(order){
    order.product = _.find(inventory, ['id', order.product_id]);
  });

  // console.log(data.orders);

  $loading.fadeOut('fast', function(){
    $('.orders-process .step-1').show();
    templateRender({
      el : '#orders-table',
      data : data
    });

    initOrdersTable();
  });
}

function initOrdersTable() {
  var $table = $('#orders-table'),
  $foldReveal = $table.find('i.fold-reveal[data-fold]'),
  $checkbox = $table.find('input[type="checkbox"]');

  $foldReveal.click(function(){
    var foldId = $(this).data().fold;
    // console.log(foldId, $(foldId));
    $(this).toggleClass('ion-plus-circled ion-minus-circled');
    $('#'+foldId).toggleClass('show');
  });

  $checkbox.change(function() {
    var $parent = $(this).parents('tr');
    if(this.checked) {
      $parent.addClass('checked');
    } else {
      $parent.removeClass('checked');
    }

    if ($table.find('tr.checked').length > 0) {
      $('#generate-order').removeAttr('disabled');
    } else {
      $('#generate-order').attr('disabled', true);
    }
  });

  $('#generate-modal').modal({
    observeChanges : true,
    onShow : function(){
      var checked = $table.find('tr.checked');
      $(this).find('.orders').text('You have selected '+checked.length+' items.');
      $table.find('tr.checked').each(function(){
        var id = $(this).data().id;
        var order = _.find(data.orders, ['id', id]);
        delete order.product_id;
        formData.push(order);
      });
    }
  });

  $('#generate-order').click(function(){
    $('#generate-modal').modal('show');
  });

  $('#generate-modal .accept').click(function(){
    var $orderProcess = $('.orders-process');
    $('#generate-modal').modal('hide');
    $loading.fadeIn('fast');

    $orderProcess.find('.step-1').hide();
    $orderProcess.find('.step-2').show();

    $.ajax({
      url: '/admin/submit-orders',
      type: "POST",
      data: JSON.stringify(formData),
      contentType: "application/json",
      complete: function(response){
        resData = response.responseJSON;
        initOrderSummary();
      }
    });
  });

  $('.close').click(function(){
    $('.ui.modal').modal('hide');
  });
}

function initOrderSummary(){
  $loading.fadeOut('fast', function(){
    console.log(resData);
    templateRender({
      el : '#orders-summary',
      data : resData
    });
  });
}

function templateRender(params) {
  var $el = $(params.el),
  tpl = (params.tpl) ? $(params.tpl) : $(params.el+'-tpl');
  $el.html('');
  $el.html(_.template(tpl.text())(params.data));
}

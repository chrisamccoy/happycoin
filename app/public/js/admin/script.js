var orders = null,
inventory = null,
data = null,
formData = [],
$loading = null,
resData = null;

$(document).ready(function(){
  loadData();
  initMenu();
  initTabs('.sc-tabs');
});

function initTabs(el) {
  var $el = $(el),
  $tabs = $el.children('.tabs'),
  $item = $tabs.children('.item');

  $item.click(function(){
    var tabName = $(this).data().tab;
    if(!$(this).hasClass('active')){
      $item.removeClass('active');
      $(this).addClass('active');
      $el.children('.tab-body').removeClass('active');
      $el.children('.tab-body[data-tab="'+tabName+'"]').addClass('active');
    }
  });
}

function initMenu() {
  $('#admin-nav .open-menu').click(function(){
    $('#admin-nav .menu').toggleClass('show');
  });
}

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
  initCreateOrders();
}

function initCreateOrders() {
  var $createOrder = $('#create-orders');
  $form = $createOrder.find('form');

  $('#autocomplete').autocomplete({
    source: $.map(inventory, function(value){
      return { label : value.name, value : value.id }
    }),
    focus: function(event, ui) {
      $('#autocomplete').val(ui.item.label);
      return false;
    },
    // Once a value in the drop down list is selected, do the following:
    select: function(event, ui) {
      // place the person.given_name value into the textfield called 'select_origin'...
      $('#autocomplete').val(ui.item.label);
      // and place the person.id into the hidden textfield called 'link_origin_id'.
      $('input[name="product_id"]').val(ui.item.value);
      return false;
    }
  });

  $form.submit(function(e){
    $loading.fadeIn();
    e.preventDefault();
    var formData = $form.serializeArray(),
        submitData = {};

    formData.forEach(function(item){
      submitData[item.name] = (item.name == 'quantity') ? parseInt(item.value) : item.value;
    });

    $.ajax({
      url: '/admin/create-order',
      type: "POST",
      data: JSON.stringify(submitData),
      contentType: "application/json",
      complete: function(response){
        resData = response.responseJSON;
        console.log(resData);
        if (resData.success == 1) {
          $form.find("input").val("");
          updateOrders();
        } else {
          $loading.fadeOut('fast');
        }
      }
    });
  });
}

function initOrders() {
  var $content = $('#admin-content');
  $loading = $content.find('.loading');

  data = {
    orders : orders
  }

  data.orders.forEach(function(order){
    if (order.product_id) {
      order.product = _.find(inventory, ['id', order.product_id]);
    }
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

function updateOrders(){
  $.getJSON('/admin/get-orders', function(result){
    orders = result;
    var $orderProcess = $('.orders-process');
    $orderProcess.find('.sc-tabs .tabs .item[data-tab="pending-orders"]').trigger('click');
    initOrders();
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

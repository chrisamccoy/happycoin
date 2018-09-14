var inventory = null;

$(document).ready(function(){
  initOrder();
});

function initOrder() {
  if (window.location.pathname === '/order') {
    getInventory();

    $('#order .add-product').click(function(){
      addProduct();
    });

    $('#product-list').on('click', '.close', function() {
      $(this).parent('.product').remove();
    });
  }
}

function submitOrder() {
  var $form = $('#order form');
  $form.unbind().submit(function(e){
    e.preventDefault();

    var formData = $form.serializeArray(),
        submitData = { items : [] };

    formData.forEach(function(item){
      submitData[item.name] = item.value;
    });

    $('#order form .product').each(function(){
      var id = $(this).find('select').val(),
      product = _.find(inventory, ['id', id]),
      item = {
        quantity : $(this).find('input').val(),
        name: product.name,
        sku: product.sku
      };

      submitData.items.push(item);
    });

    $.ajax({
      url: '/submit-orders',
      type: "POST",
      data: JSON.stringify(submitData),
      contentType: "application/json",
      complete: function(response){
        resData = response.responseJSON;
      }
    });
  });
}

function addProduct() {
  templateRender({
    el : '#product-list .list',
    tpl: '#form-product',
    data : { inventory : inventory },
    append: true
  });

  $('#product-list .loading').fadeOut();

  submitOrder();
}

function getInventory() {
  $.getJSON('/get-inventory', function(result){
    inventory = result;
    addProduct();
  });
}

function templateRender(params) {
  var $el = $(params.el),
  tpl = (params.tpl) ? $(params.tpl) : $(params.el+'-tpl');
  if (params.append) {
    $el.append(_.template(tpl.text())(params.data));
  } else {
    $el.html('');
    $el.html(_.template(tpl.text())(params.data));
  }
}

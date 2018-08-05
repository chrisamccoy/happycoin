var orders = null,
inventory = null,
data = null,
formData = [],
$loading = null,
resData = null,
$orderProcess = null,
submitted = null,
poc = null,
applicants = null;

var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];
var us_states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

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

  $.getJSON('/admin/get-submitted-orders', function(result){
    submitted = result;
    loaded();
  });

  $.getJSON('/admin/poc-forms', function(result){
    poc = result;
    // console.log(poc);
    loaded();
  });

  $.getJSON('/admin/get-applicants', function(result){
    applicants = result;
    // console.log(poc);
    loaded();
  });
}

function loaded() {
  if (orders == null || inventory == null || submitted == null || poc == null ) {
    return false;
  }

  var path = window.location.pathname;
  var $content = $('#admin-content');
  $loading = $content.find('.loading');

  switch(path) {
    case '/admin/orders':
        initOrders();
        initCreateOrders();
        loadSubmittedOrders();
        initPocForms();
        initInventory();
        break;
    case '/admin/applicants':
        initApplicants();
        break;
  }
}

function initInventory () {
  templateRender({
    el : '#inventory-list',
    data : { rows : inventory }
  });
}

function initApplicants () {
  console.log('Applicants Loaded');
  $loading.fadeOut('fast', function(){
    templateRender({
      el : '#applicants-table',
      data : { rows : applicants }
    });

    $('#applicants-table .copy-url').unbind().click(function(){
      var url = $(this).data().url;

      copyToClipboard(url);
    });

    initCreateApplicant();
  });
}

function initCreateApplicant () {
  var $form = $('#create-applicant form');

  $form.submit(function(e){
    e.preventDefault();
    $loading.fadeIn('fast');

    var formData = $form.serializeArray(),
        submitData = {};

    formData.forEach(function(item){
      submitData[item.name] = item.value;
    });

    // console.log(submitData);

    $.ajax({
      url: '/admin/create-applicant',
      type: "POST",
      data: JSON.stringify(submitData),
      contentType: "application/json",
      complete: function(response){
        resData = response.responseJSON;
        // console.log(resData);
        if (resData.success == 1) {
          $loading.fadeOut('fast');
          initApplicants();
          $('.applicants-process .tabs .item[data-tab="applicants"]').trigger('click');
          $.getJSON('/admin/get-applicants', function(result){
            applicants = result;
            // console.log(poc);
            loaded();
          });
        } else {
          $loading.fadeOut('fast');
          $form.find('.error').text('Error Message: '+resData.message).show();
          // console.log(resData);
        }
      }
    });

    $form.find('input').keyup(function(){
      $form.find('.error').hide();
    });
  });
}

function initPocForms() {
  templateRender({
    el : '#poc-table',
    data : { rows : poc }
  });

  $('#review-form').modal();

  $('#poc-table .review').unbind().click(function(){
    var data = $(this).data();
    initReviewForm(data.id);
  });

  $('#poc-table .remove').unbind().click(function(){
    var $this = $(this);
    var data = $(this).data();
    $.getJSON('/admin/poc-forms/remove/'+data.id, function(result){
      $this.parents('tr').remove();
    });
  });
}

function initReviewForm (id) {
  var reviewOrder = _.find(poc, ['id', id]),
  $reviewForm = $('#review-form');
  // console.log(reviewOrder);

  templateRender({
    el : '#review-form',
    data : { data : reviewOrder }
  });

  templateRender({
    el : '#review-product-select',
    data : { rows : inventory, select : 'Product Select' },
    tpl : '#product-select-tpl'
  });

  templateRender({
    el : '#review-product-select-2',
    data : { rows : inventory, select : 'Product Select' },
    tpl : '#product-select-tpl'
  });

  $('#review-product-select').on('change', function() {
    $reviewForm.find('input[name="item1"]').val(this.value);
  });

  $('#review-product-select-2').on('change', function() {
    $reviewForm.find('input[name="item2"]').val(this.value);
  });

  // ​document.getElementById('review-product-select').value = 'Storecoin Unisex Shirt - XS';​​​​​​​​​​
  var item1 = _.find(inventory, ['name', 'Storecoin Unisex Shirt - '+reviewOrder["What's Your T-Shirt Size?"]]);

  if (item1) {
    $('#review-product-select').val(item1.id);
    $reviewForm.find('input[name="item1"]').val(item1.id);
    $reviewForm.find('input[name="quantity1"]').val(1);
  }

  if (reviewOrder['Would you like two tee-shirts instead of one?'] == 'Yes') {
    var item2 = _.find(inventory, ['name', 'Storecoin Unisex Shirt - '+reviewOrder["Tee-shirt size for your second tee-shirt?"]]);
    if (item2) {
      $('#review-product-select-2').val(item2.id);
      $reviewForm.find('input[name="item2"]').val(item2.id);
      $reviewForm.find('input[name="quantity2"]').val(1);
    }
  }

  $reviewForm.modal('show');

  $reviewForm.find('.cancel').unbind().click(function(){
    $reviewForm.modal('hide');
  });

  var $form = $('#review-form form');
  var $loader = $('#review-form .loading');

  $form.unbind().submit(function(e){
    $loader.fadeIn();
    e.preventDefault();
    var formData = $form.serializeArray(),
        submitData = {};

    formData.forEach(function(item){
      if (item.name == 'quantity1') {
        submitData[item.name] = (item.value) ? parseInt(item.value) : null;
      } else if (item.name == 'quantity2') {
        submitData[item.name] = (item.value) ? parseInt(item.value) : null;
      } else if (item.name == 'item2') {
        if (item.value) {
          submitData[item.name] = item.value;
        } else {
          submitData[item.name] = null;
          submitData['quantity2'] = null;
        }
      } else {
        submitData[item.name] = item.value;
      }
    });

    // console.log(submitData);

    $.ajax({
      url: '/admin/create-order',
      type: "POST",
      data: JSON.stringify(submitData),
      contentType: "application/json",
      complete: function(response){
        resData = response.responseJSON;
        // console.log(resData);
        if (resData.success == 1) {
          // $form.find("input").val("");
          // $form[0].reset();
          $('#review-form').modal('hide');
          $('#poc-table table tr[data-id='+id+']').remove();
        } else {
          $loader.fadeOut('fast');
        }
      }
    });
  });

  $('#review-form .modal-buttons .create-order').unbind().click(function(){
    $form.submit();
  });
}

function initCreateOrders() {
  var $createOrder = $('#create-orders');
  $form = $createOrder.find('form');

  country_list = $.map(country_list, function(value){
    return { id : value, name : value }
  });

  us_states = $.map(us_states, function(value){
    return { id : value, name : value }
  });

  // console.log(country_list);

  templateRender({
    el : '#product-select',
    data : { rows : inventory, select : 'Product Select' },
    tpl : '#product-select-tpl'
  });

  templateRender({
    el : '#product-select-2',
    data : { rows : inventory, select : 'Product Select' },
    tpl : '#product-select-tpl'
  });

  templateRender({
    el : '#country-select',
    data : { rows : country_list, select : 'Country Select' },
    tpl : '#product-select-tpl'
  });

  templateRender({
    el : '#state-select',
    data : { rows : us_states, select : 'State Select' },
    tpl : '#product-select-tpl'
  });

  // $("#product-select").prop("selectedIndex", -1);
  $('#product-select').on('change', function() {
    $('input[name="item1"]').val(this.value);
  });

  $('#product-select-2').on('change', function() {
    $('input[name="item2"]').val(this.value);
  });

  $('#country-select').on('change', function() {
    $('#create-orders input[name="state"]').val('');
    if (this.value == 'United States') {
      $('#state-select').show();
      $('#create-orders input[name="state"]').attr('hidden', true);
    } else {
      $('#state-select').hide();
      $('#create-orders input[name="state"]').removeAttr('hidden');
    }
  });

  $('#state-select').on('change', function() {
    $('#create-orders input[name="state"]').val(this.value);
  });


  $form.submit(function(e){
    $loading.fadeIn();
    e.preventDefault();
    var formData = $form.serializeArray(),
        submitData = {};

    formData.forEach(function(item){
      if (item.name == 'quantity1') {
        submitData[item.name] = (item.value) ? parseInt(item.value) : null;
      } else if (item.name == 'quantity2') {
        submitData[item.name] = (item.value) ? parseInt(item.value) : null;
      } else if (item.name == 'item2') {
        if (item.value == null) {
          submitData[item.name] = null;
          submitData['quantity2'] = null;
        } else {
          submitData[item.name] = item.value;
        }
      } else {
        submitData[item.name] = item.value;
      }
    });

    $.ajax({
      url: '/admin/create-order',
      type: "POST",
      data: JSON.stringify(submitData),
      contentType: "application/json",
      complete: function(response){
        resData = response.responseJSON;
        // console.log(resData);
        if (resData.success == 1) {
          // $form.find("input").val("");
          $form[0].reset();
          updateOrders();
        } else {
          $loading.fadeOut('fast');
        }
      }
    });
  });
}

function initOrders() {
  console.log('Orders Loaded');

  data = {
    orders : orders
  }

  data.orders.forEach(function(order){
    if (order.item1 != null) {
      order.item1 = _.find(inventory, ['id', order.item1]);
    }
    if (order.item2 != null) {
      order.item2 = _.find(inventory, ['id', order.item2]);
    }
  });

  // console.log(data);

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

function loadSubmittedOrders(){
  submitted.forEach(function(each){
    var product1 = _.find(inventory, ['id', each.item1]);
    var product2 = _.find(inventory, ['id', each.item2]);
    each.product1 = product1;
    each.product2 = product2;
  });

  // console.log(submitted);

  templateRender({
    el : '#submitted-orders-list',
    data : { rows : submitted }
  });
}

function initOrdersTable() {
  var $table = $('#orders-table'),
  $foldReveal = $table.find('i.fold-reveal[data-fold]'),
  $checkbox = $table.find('tbody input[type="checkbox"]'),
  $headCheckbox = $table.find('thead input[type="checkbox"]');
  $orderProcess = $('.orders-process');

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
      $headCheckbox.prop({ checked : false });
    }

    if ($table.find('tr.checked').length > 0) {
      $('#generate-order').removeAttr('disabled');
    } else {
      $('#generate-order').attr('disabled', true);
    }
  });

  $headCheckbox.change(function(){
    if(this.checked){
      $checkbox.prop({ checked : true });
    } else {
      $checkbox.prop({ checked : false });
    }
    $checkbox.trigger('change');
  });

  $('#generate-order').unbind().click(function(){
    formData = [];

    $loading.fadeIn('fast', function(){
      $orderProcess.find('.step-1').hide();
      $orderProcess.find('.step-2').show();

      var checked = $table.find('tr.checked');
      $(this).find('.orders').text('You have selected '+checked.length+' items.');
      $table.find('tr.checked').each(function(){
        var id = $(this).data().id;
        var order = _.find(data.orders, ['id', id]);
        delete order.product_id;
        formData.push(order);
      });

      initOrderList();
    });
  });

  $orderProcess.find('.step-2 .proceed').unbind().click(function(){
    $('#generate-modal').modal('hide');
    $loading.fadeIn('fast');

    $orderProcess.find('.step-2').hide();
    $orderProcess.find('.step-3').show();

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

  $orderProcess.find('.step-2 .go-back').click(function(){
    $orderProcess.find('.step-2').hide();
    $orderProcess.find('.step-1').show();
  });
}

function initOrderList(){
  templateRender({
    el : '#orders-list',
    data : { rows : formData }
  });
  $loading.fadeOut('slow', function(){
    var $list = $('#orders-list'),
    $del = $list.find('tr i.ion-android-close');

    _.each(formData, function(d){
      if (!d.item1) {
        // console.log('not found');
        $orderProcess.find('.step-2 .proceed').attr('disabled', true);
        return false;
      }

      $orderProcess.find('.step-2 .proceed').removeAttr('disabled');
    });

    $del.click(function(){
      var $thisRow = $(this).parents('tr'),
      $thisId = $thisRow.data().id;

      $loading.fadeIn('fast', function(){
        _.remove(formData, function(d) {
          return d.id == $thisId;
        });
        initOrderList();
      });
    });
  });
}

function initOrderSummary(){
  // console.log(resData);
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

function copyToClipboard(str) {
  var el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

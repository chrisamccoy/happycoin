var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/orders', function(req, res, next) {
  res.render('admin/index', { title: 'Storecoin | Admin' });
});

router.get('/get-orders', function(req, res, next) {
  request('http://teamapi.storeco.in/fetch/orders', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(response.body); // Print the google web page.
    }
  });
});

router.get('/get-inventory', function(req, res, next) {
  request('http://teamapi.storeco.in/fetch/inventory', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(response.body); // Print the google web page.
    }
  });
});

router.get('/get-submitted-orders', function(req, res, next) {
  request('http://teamapi.storeco.in/fetch/orders/submitted', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(response.body); // Print the google web page.
    }
  });
});

router.get('/poc-forms', function(req, res, next) {
  request('http://teamapi.storeco.in/fetch/poc-forms', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(response.body); // Print the google web page.
    }
  });
});

router.get('/poc-forms/remove/:id', function(req, res, next) {
  var id = req.params.id;
  request('http://teamapi.storeco.in/remove/poc-form/'+id, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(response.body); // Print the google web page.
    }
  });
});

router.post('/submit-orders', function(req, res, next) {
  var options = {
    method: 'post',
    body: req.body, // Javascript object
    json: true, // Use,If you are sending JSON data
    url: 'http://teamapi.storeco.in/submit/orders',
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(response.body); // Print the google web page.
    }
  });
});

router.post('/create-order', function(req, res, next) {
  var options = {
    method: 'post',
    body: req.body, // Javascript object
    json: true, // Use,If you are sending JSON data
    url: 'http://teamapi.storeco.in/create/order',
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(response.body); // Print the google web page.
    }
  });
});

module.exports = router;

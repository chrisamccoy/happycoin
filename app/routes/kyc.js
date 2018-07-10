var express = require('express');
var request = require('request');
var meta = require('../helpers/meta');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('kyc/login', { title: 'Storecoin | KYC', meta : meta({ title: 'KYC', url: req.protocol + '://' + req.get('host') + req.originalUrl })});
});

/* GET users listing. */
router.get('/:app_id', function(req, res, next) {
  var id = req.params.app_id;
  var applicant_id = new Buffer(id, 'base64').toString('ascii');

  request('http://teamapi.storeco.in/applicant/get/'+applicant_id, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var applicant = JSON.parse(response.body).applicant;
      res.render('kyc/index', { title: 'Storecoin | KYC', user : applicant , meta : meta()});
    }
  });
});

router.get('/logout', function(req, res, next) {
  req.session.user = null;
  res.redirect('/kyc');
});

router.get('/complete/:id/:app_id', function(req, res, next) {
  var url = 'http://teamapi.storeco.in/applicant/create-check/' +
              req.params.id + '/' +
              req.params.app_id;

  request(url, function (error, response, body) {
    var result = JSON.parse(response.body);
    console.log(result);

    res.send({
      success: result.success,
      message: result.message
    });
  });
});

router.post('/register', function(req, res, next) {
  var options = {
    method: 'post',
    body: req.body, // Javascript object
    json: true, // Use,If you are sending JSON data
    url: 'http://teamapi.storeco.in/applicant/new',
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(response.body);
    }
  });
});

router.post('/webhook', function(req, res, next) {
  var options = {
    method: 'post',
    body: req.body, // Javascript object
    json: true, // Use,If you are sending JSON data
    url: 'http://teamapi.storeco.in/applicant/webhook',
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send({ success: 1 });
    } else {
      res.send({ success: 0 });
    }
  });
});

router.post('/login', function(req, res, next) {
  var options = {
    method: 'post',
    body: req.body, // Javascript object
    json: true, // Use,If you are sending JSON data
    url: 'http://teamapi.storeco.in/applicant/get',
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      if (response.body.success === 1) {
        req.session.user = response.body.applicant;
      }

      res.redirect('/kyc');
    }
  });

});

router.post('/get-token', function(req, res, next) {
  var options = {
    method: 'post',
    body: req.body, // Javascript object
    json: true, // Use,If you are sending JSON data
    url: 'http://teamapi.storeco.in/applicant/token',
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(response.body);
    }
  });
});

module.exports = router;

var express = require('express');
var request = require('request');
var meta = require('../helpers/meta');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.user) {
    res.render('kyc/index', { title: 'Storecoin | KYC', user : req.session.user , meta : meta()});
  } else {
    res.render('kyc/login', { title: 'Storecoin | KYC', meta : meta()});
  }
});

router.get('/', function(req, res, next) {
  req.session.user = null;
  res.redirect('/kyc');
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
      if (response.body.success === 1) {
        req.session.user = response.body.applicant;
      }

      res.redirect('/kyc');
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

// router.get('/gen-token', function(req, res, next) {
//   request('http://teamapi.storeco.in/applicant/token', function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       res.send(response.body); // Print the google web page.
//     }
//   });
// });

module.exports = router;

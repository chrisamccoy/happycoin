var express = require('express');
var request = require('request');
var meta = require('../helpers/meta');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.render('kyc', { title: 'Storecoin', meta: meta() });
  console.log('page-load', req.session.user);
  res.render('kyc/index', { title: 'Storecoin | KYC' });
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
      res.send(response.body); // Print the google web page.
      req.session.user = response.body.applicant;
      res.send();
    }
  });
});

module.exports = router;

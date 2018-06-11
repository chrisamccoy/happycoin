var express = require('express');
var request = require('request');
var meta = require('../helpers/meta');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.render('kyc', { title: 'Storecoin', meta: meta() });
  res.render('kyc/index', { title: 'Storecoin | KYC' });
});

module.exports = router;

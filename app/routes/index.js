var express = require('express');
var router = express.Router();
var meta = require('../helpers/meta')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/ref/:email', function(req, res, next) {
  res.cookie('ref_email' , req.params.email).redirect('/');
});

/* GET home page. */
router.get('/whitepaper', function(req, res, next) {
  res.render('whitepaper', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/development', function(req, res, next) {
  res.render('development', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/community', function(req, res, next) {
  res.render('community', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/milestones', function(req, res, next) {
  res.render('milestones', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/firsttokensale', function(req, res, next) {
  res.render('firstico', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/secondtokensale', function(req, res, next) {
  res.render('second-token-sale', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/applytoforge', function(req, res, next) {
  res.render('apply-forge', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/dguard', function(req, res, next) {
  res.render('security-guard-app', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/firsttokensalefaq', function(req, res, next) {
  res.render('token-faq', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/blog', function(req, res, next) {
  res.render('blog', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/blog/load-testing-storecoins-dynamic-proof-of-stake-consensus-algorithm-test-1-of-7', function(req, res, next) {
  res.render('blog-load-testing', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/cryptoeconomics', function(req, res, next) {
  res.render('crypto-economics', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/coming-soon', function(req, res, next) {
  res.render('coming-soon', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/api', function(req, res, next) {
  res.render('developer-api', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/examples', function(req, res, next) {
  res.render('examples', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/faq', function(req, res, next) {
  res.render('faq', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/jointeam', function(req, res, next) {
  res.render('join-team', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/jobs', function(req, res, next) {
  res.render('jobs', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/press', function(req, res, next) {
  res.render('press', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/roadmap', function(req, res, next) {
  res.render('roadmap-temp', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/roadmap2', function(req, res, next) {
  res.render('roadmap', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/storecoin-blockchain', function(req, res, next) {
  res.render('storecoin-blockchain', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/subscribe', function(req, res, next) {
  res.render('subscribe', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/team', function(req, res, next) {
  res.render('team', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/terms', function(req, res, next) {
  res.render('terms', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/tokengrant', function(req, res, next) {
  res.render('token-grant', { title: 'Storecoin', meta: meta() });
});

/* ------------WALLET------------ */
router.get('/wallet/wallet-app', function(req, res, next) {
  res.render('wallet/index', { title: 'Storecoin', name : 'Home', header : false, meta: meta() });
});

router.get('/wallet/wallet-app/header', function(req, res, next) {
  res.render('wallet/index', { title: 'Storecoin', name : 'Home', header : true, meta: meta() });
});

router.get('/wallet/wallet-app/api', function(req, res, next) {
  res.render('wallet/api', { title: 'Storecoin', name : 'Home', header : true, meta: meta() });
});

router.get('/wallet', function(req, res, next) {
  res.render('wallet/index-desktop', { title: 'Storecoin', name : 'Home', meta: meta() });
});

router.get('/wallet2', function(req, res, next) {
  res.render('wallet/index-2', { title: 'Storecoin', name : 'Home', meta: meta() });
});

// router.get('/wallet/buy', function(req, res, next) {
//   res.render('wallet/buy', { title: 'Storecoin', name : 'Buy' });
// });
//
// router.get('/wallet/sell', function(req, res, next) {
//   res.render('wallet/sell', { title: 'Storecoin', name : 'Sell' });
// });
//
// router.get('/wallet/gift', function(req, res, next) {
//   res.render('wallet/gift', { title: 'Storecoin', name : 'Gift' });
// });

module.exports = router;

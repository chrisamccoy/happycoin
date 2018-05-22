var express = require('express');
var router = express.Router();
var meta = require('../helpers/meta');
var getblog = require('../helpers/blogs');
var getTokenSale = require('../helpers/tokensales');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/engineering', function(req, res, next) {
  res.render('engineering', { title: 'Storecoin', meta: meta() });
});

/* GET Tokensale 3 page. */
router.get('/tokensale3', function(req, res, next) {
  res.render('tokensale3', { title: 'Storecoin', meta: meta(), sale: getTokenSale('tokensale3') });
});

/* GET tokensale69 page. */
router.get('/tokensale69', function(req, res, next) {
  res.render('tokensale3', { title: 'Storecoin', meta: meta(), sale: getTokenSale('tokensale69') });
});

/* GET tokensale99 page. */
router.get('/tokensale99', function(req, res, next) {
  res.render('tokensale3', { title: 'Storecoin', meta: meta(), sale: getTokenSale('tokensale99') });
});

/* GET tokensale129 page. */
router.get('/tokensale129', function(req, res, next) {
  res.render('tokensale3', { title: 'Storecoin', meta: meta(), sale: getTokenSale('tokensale129') });
});

/* GET tokensale149 page. */
router.get('/tokensale149', function(req, res, next) {
  res.render('tokensale3', { title: 'Storecoin', meta: meta(), sale: getTokenSale('tokensale149') });
});

/* GET tokensale199 page. */
router.get('/tokensale199', function(req, res, next) {
  res.render('tokensale3', { title: 'Storecoin', meta: meta(), sale: getTokenSale('tokensale199') });
});

/* GET tokensale249 page. */
router.get('/tokensale249', function(req, res, next) {
  res.render('tokensale3', { title: 'Storecoin', meta: meta(), sale: getTokenSale('tokensale249') });
});


/* GET home page. */
router.get('/tenyears', function(req, res, next) {
  res.render('coming-soon', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/3', function(req, res, next) {
  res.render('coming-soon', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/code', function(req, res, next) {
  res.render('coming-soon', { title: 'Storecoin', meta: meta() });
});

router.get('/review', function(req, res, next) {
  res.render('coming-soon', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/tee', function(req, res, next) {
  res.render('tee', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/kyc', function(req, res, next) {
  res.render('kyc', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/messagenode', function(req, res, next) {
  res.render('coming-soon', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/research', function(req, res, next) {
  var mt = meta({
    title : 'Storecoin Research',
    url : 'http://storeco.in/research',
    desc: 'Original research from the Storecoin Team',
    image: 'http://storeco.in/images/logo-research.png',
    image_tw: 'http://storeco.in/images/logo-research.png'
  });
  res.render('research', { title: 'Storecoin', meta: mt });
});

/* GET consensus compare */
router.get('/consensuscompare', function(req, res, next) {
  res.redirect('https://docs.google.com/spreadsheets/d/1XEVSpnMD3rOuqhZj7KsDQalfd1i7c3zTkLEkpRaD_tU/edit?usp=sharing');
});

/* GET consensus compare */
router.get('/compare', function(req, res, next) {
  var mt = meta({
    title : 'How Storecoin Compares to other P2P Protocols and Payments Platforms',
    url : 'http://storeco.in/compare'
  });
  res.render('compare', { title: 'Storecoin', meta: meta });
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
  res.redirect('/newsletter');
});

/* GET home page. */
router.get('/devnotes', function(req, res, next) {
  res.render('devnotes', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/newsletter', function(req, res, next) {
  res.render('newsletter', { title: 'Storecoin', meta: meta() });
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
router.get('/validate', function(req, res, next) {
  res.render('apply-forge', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
// router.get('/blockfin', function(req, res, next) {
//   // res.render('blockfin', { title: 'Storecoin', meta: meta() });
//   res.render('coming-soon', { title: 'Storecoin', meta: meta() });
// });

router.get("/blockfin", function(req, res, next){

  // Grab the "Authorization" header.
  var auth = req.get("authorization");

  // On the first request, the "Authorization" header won't exist, so we'll set a Response
  // header that prompts the browser to ask for a username and password.
  if (!auth) {
    res.set("WWW-Authenticate", "Basic realm=\"Authorization Required\"");
    // If the user cancels the dialog, or enters the password wrong too many times,
    // show the Access Restricted error message.
    return res.status(401).send("Authorization Required");
  } else {
    // If the user enters a username and password, the browser re-requests the route
    // and includes a Base64 string of those credentials.
    var credentials = new Buffer(auth.split(" ").pop(), "base64").toString("ascii").split(":");
    if (credentials[0] === "storecoin" && credentials[1] === "forktolerant") {
      // The username and password are correct, so the user is authorized.
      return res.render('blockfin', { title: 'Storecoin', meta: meta() });
    } else {
      // The user typed in the username or password wrong.
      return res.status(404).send("Access Denied (incorrect credentials)");
    }
  }

});

/* GET home page. */
router.get('/dguard', function(req, res, next) {
  res.render('security-guard-app', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/onepoint', function(req, res, next) {
  res.render('onepoint', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/communityfund', function(req, res, next) {
  var email = req.query.email ? req.query.email : '',
      source = "https://docs.google.com/forms/d/e/1FAIpQLSfBH4E1zWjYW6Jud9KNv2P8B0SqPLiu6FXtGcVGFHeT8r6T0A/viewform?usp=pp_url&entry.83776163=" + email;

  res.render('community-fund', {
    title: 'Storecoin',
    meta: meta(),
    iframe: source,
  });
});

router.get('/cfc18', function(req, res, next) {
  res.render('cfc18', {
    title: 'Storecoin',
    meta: meta()
  });
});

/* GET home page. */
router.get('/firsttokensalefaq', function(req, res, next) {
  res.render('token-faq', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/url', function(req, res, next) {
  res.render('url', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/blog', function(req, res, next) {
  var blogs = getblog();
  res.render('blog', {
    title: 'Storecoin', meta: meta(), blogs : blogs,
    url : req.protocol + '://' + req.get('host') + req.originalUrl
   });
  // res.redirect('https://news.storeco.in/');
});

/* GET home page. */
router.get('/blog/:slug', function(req, res, next) {
  var bg = getblog(req.params.slug);

  if (!bg) {
    res.render('notfound', { url: req.url, meta: null });
    return;
  }

  var mt = meta({
    title: bg.title,
    twtitle : (bg.twtitle) ? bg.twtitle : false,
    desc: bg.desc,
    image: bg.img,
    image_tw: bg.img,
    url: req.protocol + '://' + req.get('host') + req.originalUrl,
    timeStamp : bg.date+' . '+bg.readTime
  });

  res.render(bg.template, { title: (bg.twtitle) ? bg.twtitle : bg.title, meta: mt });
});

/* GET home page. */
router.get('/cryptoeconomics', function(req, res, next) {
  res.render('crypto-economics', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/developer', function(req, res, next) {
  res.render('developer', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/govnode', function(req, res, next) {
  res.render('govnode', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/masternode', function(req, res, next) {
  res.render('masternode', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/careers', function(req, res, next) {
  res.render('careers', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/peltzinternational', function(req, res, next) {
  res.render('peltzinternational', { title: 'Storecoin', meta: meta() });
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

/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Storecoin', meta: meta() });
});

router.post('/login', function (req, res, next) {
  // you might like to do a database look-up or something more scalable here
  if (req.body.username && req.body.username === 'admin' && req.body.password && req.body.password === 'St0r3C01n') {
    req.session.authenticated = true;
    res.redirect('/admin/orders');
  } else {
    res.redirect('/login');
  }
});

router.get('/logout', function (req, res, next) {
  delete req.session.authenticated;
  res.redirect('/');
});

/* ------------WALLET------------ */
router.get('/wallet', function(req, res, next) {
  var ua = req.header('user-agent');
  var mt = meta();

  mt.url = 'http://storeco.in/wallet'
  if(/mobile/i.test(ua)) {
    res.render('wallet/index', {
      title: 'Storecoin',
      name : 'Home', header : false,
      meta: mt
    });
  } else {
    res.render('wallet/index-desktop', {
      title: 'Storecoin',
      name : 'Home',
      meta: mt
    });
  }
});

router.get('/wallet/wallet-app', function(req, res, next) {
  res.render('wallet/index', {
    title: 'Storecoin',
    name : 'Home', header : false,
    meta: meta()
  });
});

router.get('/wallet/wallet-app/header', function(req, res, next) {
  res.render('wallet/index', { title: 'Storecoin', name : 'Home', header : true, meta: meta() });
});

router.get('/wallet/wallet-app/api', function(req, res, next) {
  res.render('wallet/api', { title: 'Storecoin', name : 'Home', header : true, meta: meta() });
});

router.get('/api-m', function(req, res, next) {
  res.render('wallet/api', { title: 'Storecoin', name : 'Home', header : true, meta: meta() });
});

router.get('/wallet/wallet-app/royalty', function(req, res, next) {
  res.render('wallet/royalty', { title: 'Storecoin', name : 'Home', header : true, meta: meta() });
});


router.get('/wallet2', function(req, res, next) {
  res.render('wallet/index-2', { title: 'Storecoin', name : 'Home', meta: meta() });
});

/* GET home page. */
router.get('/api', function(req, res, next) {
  // res.render('developer-api', { title: 'Storecoin', meta: meta() });
  res.redirect('/wallet/#api');
});

/* GET home page. */
router.get('/dev', function(req, res, next) {
  res.redirect('/wallet/#dev');
});

/* GET home page. */
router.get('/royalty', function(req, res, next) {
  res.render('developer-royalty', { title: 'Storecoin', meta: meta() });
});

module.exports = router;

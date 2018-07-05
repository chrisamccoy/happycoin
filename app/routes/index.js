var express = require('express');
var router = express.Router();
var meta = require('../helpers/meta');
var getblog = require('../helpers/blogs');
var getTokenSale = require('../helpers/tokensales');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Storecoin', meta: meta({ title: 'Storecoin' }) });
});

/* GET home page. */
router.get('/engineering', function(req, res, next) {
  res.render('engineering', { title: 'Engineering', meta: meta({ title: 'Engineering' }) });
});

/* GET Tokensale 3 page. */
router.get('/tokensale3', function(req, res, next) {
  res.render('tokensale3', { title: 'Token Sale', meta: meta({ title: 'Token Sale' }), sale: getTokenSale('tokensale3') });
});

/* GET tokensale69 page. */
router.get('/tokensale69', function(req, res, next) {
  res.render('tokensale3', { title: 'Token Sale', meta: meta({ title: 'Token Sale' }), sale: getTokenSale('tokensale69') });
});

/* GET tokensale99 page. */
router.get('/tokensale99', function(req, res, next) {
  res.render('tokensale3', { title: 'Token Sale', meta: meta({ title: 'Token Sale' }), sale: getTokenSale('tokensale99') });
});

/* GET tokensale129 page. */
router.get('/tokensale129', function(req, res, next) {
  res.render('tokensale3', { title: 'Token Sale', meta: meta({ title: 'Token Sale' }), sale: getTokenSale('tokensale129') });
});

/* GET tokensale149 page. */
router.get('/tokensale149', function(req, res, next) {
  res.render('tokensale3', { title: 'Token Sale', meta: meta({ title: 'Token Sale' }), sale: getTokenSale('tokensale149') });
});

router.get('/tsale', function(req, res, next) {
  res.render('tokensale3', { title: 'Token Sale', meta: meta({ title: 'Token Sale' }), sale: getTokenSale('tokensale149') });
});

/* GET tokensale199 page. */
router.get('/tokensale199', function(req, res, next) {
  res.render('tokensale3', { title: 'Token Sale', meta: meta({ title: 'Token Sale' }), sale: getTokenSale('tokensale199') });
});

/* GET tokensale249 page. */
router.get('/tokensale249', function(req, res, next) {
  res.render('tokensale3', { title: 'Token Sale', meta: meta({ title: 'Token Sale' }), sale: getTokenSale('tokensale249') });
});


/* GET home page. */
router.get('/tenyears', function(req, res, next) {
  res.render('coming-soon', { title: 'Ten Years', meta: meta({ title: 'Ten Years' }) });
});

/* GET home page. */
router.get('/airdrop', function(req, res, next) {
  // res.render('poc-form', { title: 'Storecoin', meta: meta() });
  res.redirect('https://docs.google.com/forms/d/e/1FAIpQLSf5O8BRHTXUq0HMDm8b6jukERRAOsUCG5_seeePqdSaki897A/viewform');
});

/* GET home page. */
router.get('/tee', function(req, res, next) {
  // res.render('poc-form', { title: 'Storecoin', meta: meta() });
  res.redirect('https://docs.google.com/forms/d/e/1FAIpQLSf5O8BRHTXUq0HMDm8b6jukERRAOsUCG5_seeePqdSaki897A/viewform');
});

/* GET home page. */
router.get('/community', function(req, res, next) {
  res.redirect('https://docs.google.com/forms/d/e/1FAIpQLSf5O8BRHTXUq0HMDm8b6jukERRAOsUCG5_seeePqdSaki897A/viewform');
});

/* GET home page. */
router.get('/protocoltest', function(req, res, next) {
  res.render('protocol-test', { title: 'Protocol Test', meta: meta({ title: 'Protocol Test' }) });
});

/* GET home page. */
router.get('/tokensale', function(req, res, next) {
  res.render('poc-form', { title: 'Storecoin', meta: meta({ title: 'Token Sale' }) });
});

/* GET home page. */
router.get('/3', function(req, res, next) {
  res.render('coming-soon', { title: 'Storecoin', meta: meta() });
});

/* GET home page. */
router.get('/code', function(req, res, next) {
  res.render('coming-soon', { title: 'Storecoin', meta: meta({ title: 'Code' }) });
});

router.get('/review', function(req, res, next) {
  res.render('coming-soon', { title: 'Storecoin', meta: meta({ title: 'Review' }) });
});

/* GET home page. */
router.get('/messagenode', function(req, res, next) {
  res.render('coming-soon', { title: 'Storecoin', meta: meta({ title: 'Messagenode' }) });
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
  res.render('whitepaper', { title: 'Storecoin', meta: meta({ title: 'Whitepaper' }) });
});

/* GET home page. */
router.get('/development', function(req, res, next) {
  res.render('development', { title: 'Storecoin', meta: meta({ title: 'Development' }) });
});

/* GET home page. */
router.get('/accredited', function(req, res, next) {
  res.render('accredited', { title: 'Storecoin', meta: meta({ title: 'Accredited' }) });
});

/* GET home page. */
router.get('/devnotes', function(req, res, next) {
  res.render('devnotes', { title: 'Storecoin', meta: meta({ title: 'Dev Notes' }) });
});

/* GET home page. */
router.get('/subscribe', function(req, res, next) {
  res.render('newsletter', { title: 'Storecoin', meta: meta({ title: 'Subscribe' }) });
});

/* GET home page. */
router.get('/milestones', function(req, res, next) {
  res.render('milestones', { title: 'Storecoin', meta: meta({ title: 'Milestones' }) });
});

/* GET home page. */
router.get('/firsttokensale', function(req, res, next) {
  res.render('firstico', { title: 'Storecoin', meta: meta({ title: 'First Token Sale' }) });
});

/* GET home page. */
router.get('/secondtokensale', function(req, res, next) {
  res.render('second-token-sale', { title: 'Storecoin', meta: meta({ title: 'Second Token Sale' }) });
});

/* GET home page. */
router.get('/validate', function(req, res, next) {
  res.render('apply-forge', { title: 'Storecoin', meta: meta({ title: 'Validate' }) });
});

/* GET home page. */
// router.get('/blockfin', function(req, res, next) {
//   // res.render('blockfin', { title: 'Storecoin', meta: meta() });
//   res.render('coming-soon', { title: 'Storecoin', meta: meta() });
// });

router.get("/blockfin", function(req, res, next){
  var auth = req.headers['authorization'];  // auth is in base64(username:password)  so we need to decode the base64
  console.log("Authorization Header is: ", auth);

  if(!auth) {     // No Authorization header was passed in so it's the first time the browser hit us
    // Sending a 401 will require authentication, we need to send the 'WWW-Authenticate' to tell them the sort of authentication to use
    // Basic auth is quite literally the easiest and least secure, it simply gives back  base64( username + ":" + password ) from the browser
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

    res.end('<html><body>This page is protected. Refresh the page enter crendentials.</body></html>');
  }

  else if(auth) {    // The Authorization was passed in so now we validate it
    var tmp = auth.split(' ');   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part

    var buf = new Buffer(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
    var plain_auth = buf.toString();        // read it back out as a string

    console.log("Decoded Authorization ", plain_auth);

    // At this point plain_auth = "username:password"

    var creds = plain_auth.split(':');      // split on a ':'
    var username = creds[0];
    var password = creds[1];

    if((username == 'storecoin') && (password == 'forktolerant')) {   // Is the username/password correct?
      res.statusCode = 200;  // OK
      return res.render('blockfin', { title: 'Storecoin', meta: meta({ title: 'Blockfin' }) });
    }
    else {
      res.statusCode = 401; // Force them to retry authentication
      res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

      // res.statusCode = 403;   // or alternatively just reject them altogether with a 403 Forbidden

      res.end('<html><body>You shall not pass</body></html>');
    }
  }
});

/* GET home page. */
router.get('/dguard', function(req, res, next) {
  res.render('security-guard-app', { title: 'Storecoin', meta: meta({ title: 'dGuard' }) });
});

/* GET home page. */
router.get('/onepoint', function(req, res, next) {
  res.render('onepoint', { title: 'Storecoin', meta: meta({ title: 'Onepoint' }) });
});

/* GET home page. */
router.get('/communityfund', function(req, res, next) {
  var email = req.query.email ? req.query.email : '',
      source = "https://docs.google.com/forms/d/e/1FAIpQLSfBH4E1zWjYW6Jud9KNv2P8B0SqPLiu6FXtGcVGFHeT8r6T0A/viewform?usp=pp_url&entry.83776163=" + email;

  res.render('community-fund', {
    title: 'Community Fund',
    meta: meta(),
    iframe: source,
  });
});

router.get('/cfc18', function(req, res, next) {
  res.render('cfc18', {
    title: 'CFC18',
    meta: meta()
  });
});

/* GET home page. */
router.get('/firsttokensalefaq', function(req, res, next) {
  res.render('token-faq', { title: 'Storecoin', meta: meta({ title: 'First Token Sale FAQ' }) });
});

/* GET home page. */
router.get('/url', function(req, res, next) {
  res.render('url', { title: 'Storecoin', meta: meta({ title: 'URL' }) });
});

/* GET home page. */
router.get('/blog', function(req, res, next) {
  var blogs = getblog();
  res.render('blog', {
    title: 'Storecoin', meta: meta({ title: 'News' }), blogs : blogs,
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
  res.render('crypto-economics', { title: 'Storecoin', meta: meta({ title: 'Crypto Economics' }) });
});

/* GET home page. */
router.get('/developer', function(req, res, next) {
  res.render('developer', { title: 'Storecoin', meta: meta({ title: 'Developer' }) });
});

/* GET home page. */
router.get('/govnode', function(req, res, next) {
  res.render('govnode', { title: 'Storecoin', meta: meta({ title: 'Govnode' }) });
});

/* GET home page. */
router.get('/masternode', function(req, res, next) {
  res.render('masternode', { title: 'Storecoin', meta: meta({ title: 'Masternode' }) });
});

/* GET home page. */
router.get('/careers', function(req, res, next) {
  res.render('careers', { title: 'Storecoin', meta: meta({ title: 'Careers' }) });
});

/* GET home page. */
router.get('/peltzinternational', function(req, res, next) {
  res.render('peltzinternational', { title: 'Storecoin', meta: meta({ title: 'Peltz International' }) });
});

/* GET home page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Storecoin', meta: meta({ title: 'About' }) });
});

/* GET home page. */
router.get('/coming-soon', function(req, res, next) {
  res.render('coming-soon', { title: 'Storecoin', meta: meta({ title: 'Coming Soon' }) });
});

/* GET home page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Storecoin', meta: meta({ title: 'Contact' }) });
});

/* GET home page. */
router.get('/examples', function(req, res, next) {
  res.render('examples', { title: 'Storecoin', meta: meta({ title: 'Examples' }) });
});

/* GET home page. */
router.get('/faq', function(req, res, next) {
  res.render('faq', { title: 'Storecoin', meta: meta({ title: 'FAQ' }) });
});

/* GET home page. */
router.get('/jointeam', function(req, res, next) {
  res.render('join-team', { title: 'Storecoin', meta: meta({ title: 'Join Team' }) });
});

/* GET home page. */
router.get('/jobs', function(req, res, next) {
  res.render('jobs', { title: 'Storecoin', meta: meta({ title: 'Jobs' }) });
});

/* GET home page. */
router.get('/press', function(req, res, next) {
  res.render('press', { title: 'Storecoin', meta: meta({ title: 'Press' }) });
});

/* GET home page. */
router.get('/roadmap', function(req, res, next) {
  res.render('roadmap-temp', { title: 'Storecoin', meta: meta({ title: 'Roadmap' }) });
});

/* GET home page. */
router.get('/roadmap2', function(req, res, next) {
  res.render('roadmap', { title: 'Storecoin', meta: meta({ title: 'Roadmap' }) });
});

/* GET home page. */
router.get('/storecoin-blockchain', function(req, res, next) {
  res.render('storecoin-blockchain', { title: 'Storecoin', meta: meta({ title: 'Storecoin Blockchain' }) });
});

/* GET home page. */
router.get('/subscribe', function(req, res, next) {
  res.render('subscribe', { title: 'Storecoin', meta: meta({ title: 'Subscribe' }) });
});

/* GET home page. */
router.get('/team', function(req, res, next) {
  res.render('team', { title: 'Storecoin', meta: meta({ title: 'Team' }) });
});

/* GET home page. */
router.get('/terms', function(req, res, next) {
  res.render('terms', { title: 'Storecoin', meta: meta({ title: 'Terms' }) });
});

/* GET home page. */
router.get('/tokengrant', function(req, res, next) {
  res.render('token-grant', { title: 'Storecoin', meta: meta({ title: 'Token Grant' }) });
});

/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Storecoin', meta: meta({ title: 'Login' }) });
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
  var mt = meta({ title: 'Storecoin Wallet' });

  mt.url = 'http://storeco.in/wallet'
  if(/mobile/i.test(ua)) {
    res.render('wallet/index', {
      title: 'Storecoin Wallet',
      name : 'Home', header : false,
      meta: mt
    });
  } else {
    res.render('wallet/index-desktop', {
      title: 'Storecoin Wallet',
      name : 'Home',
      meta: mt
    });
  }
});

router.get('/wallet/wallet-app', function(req, res, next) {
  res.render('wallet/index', {
    title: 'Storecoin',
    name : 'Home', header : false,
    meta: meta({ title: 'Storecoin Wallet' })
  });
});

router.get('/wallet/wallet-app/header', function(req, res, next) {
  res.render('wallet/index', { title: 'Storecoin', name : 'Home', header : true, meta: meta({ title: 'Storecoin Wallet' }) });
});

router.get('/wallet/wallet-app/api', function(req, res, next) {
  res.render('wallet/api', { title: 'Storecoin', name : 'Home', header : true, meta: meta({ title: 'Storecoin Wallet' }) });
});

router.get('/api-m', function(req, res, next) {
  res.render('wallet/api', { title: 'Storecoin', name : 'Home', header : true, meta: meta({ title: 'Storecoin Wallet' }) });
});

router.get('/wallet/wallet-app/royalty', function(req, res, next) {
  res.render('wallet/royalty', { title: 'Storecoin', name : 'Home', header : true, meta: meta({ title: 'Storecoin Wallet' }) });
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

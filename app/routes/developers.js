var express = require('express');
var router = express.Router();

router.get('/guides/get-started', function(req, res, next) {
  res.render('developers/guides/get-started');
});

module.exports = router;

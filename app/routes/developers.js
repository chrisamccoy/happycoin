var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/guides/get-started', function(req, res, next) {
  res.render('developers/guides/get-started');
});

router.get('/', function(req, res, next) {
  var filename = path.join(__dirname+'/../views/developers/readme.html');
  res.sendFile(filename);
});

router.get('/:slug/:slug2?/:slug3?', function(req, res, next) {
  var params = req.params;
  var slugs = '';
  var json = JSON.parse(fs.readFileSync('./views/developers/directory.json').toString());

  for (var key in params) {
    if(params[key]){
      slugs += '/'+params[key];
    }
  }

  slugs = slugs.replace('/','');

  var pathname = json[slugs];
  var filename = '';

  if (pathname['is_dir']) {
    filename = path.join(__dirname+'/../views/developers/'+slugs+'/readme.html');
    // console.log(filename, pathname['is_dir']);
    res.sendFile(filename);
  } else {
    filename = path.join(__dirname+'/../views/developers/'+slugs+'.html');
    // console.log(filename, pathname['is_dir']);
    res.sendFile(filename);
  }
});

module.exports = router;

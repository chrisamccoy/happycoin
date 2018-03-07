var express = require('express');
var router = express.Router();
var Airtable = require('airtable');

router.post('/submit', function(req, res, next) {
  var base = new Airtable.base('appDPvHbcyAgHXAyQ');

  base('Orders').create({
    "Name": req.body.name,
    "Email": req.body.email,
    "Address": req.body.address,
    "City": req.body.city,
    "State": req.body.state,
    "Zipcode": req.body.zipcode,
    "Country": req.body.country,
    "Phone Number": req.body.phone,
    "Product": req.body.product,
    "Quantity": req.body.quantity
  }, function(err, record) {
    if (err) {
      console.error(err);
      res.json({
        success: 0
      });
      return;
    }

    res.json({
      success: 1,
      id: record.getId()
    });
  });
});

router.post('/update', function(req, res, next) {
  var base = new Airtable.base('appDPvHbcyAgHXAyQ');

  base('Orders').update(req.body.id, {
    "Status": "Pending"
  }, function(err, record) {
    if (err) {
      console.error(err);
      res.json({
        success: 0
      });
      return;
    }

    res.json({
      success: 1,
      status: record.get('Status')
    });
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();

router.post('/post_image', function (req, res, next) {
  var dataUrl = req.body.img;
  res.send(dataUrl);
});

module.exports = router;

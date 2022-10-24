var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/new', function (req, res, next) {
  res.status(201).send("User was created!");
});

module.exports = router;

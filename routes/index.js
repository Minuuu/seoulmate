var express = require('express');
var router = express.Router();
var login = require('./login/index');
var register = require('./register/index');
var image_find = require('./image_find/index')
router.use('/login',login);
router.use('/register',register);
router.use('/image_find',image_find);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Router');
});

module.exports = router;

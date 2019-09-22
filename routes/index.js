var express = require('express');
var router = express.Router();
var login = require('./login/index');
var register = require('./register/index');
var image_find = require('./image_find/index');
var find_place = require('./find_place/index');
var recent_search = require('./recent_search/index');


router.use('/login',login);
router.use('/register',register);
router.use('/image_find',image_find);
router.use('/find_place',find_place);
router.use('/recent_search',recent_search);

/* GET home page. */
router.get('/', function(req, res, next) {
	res.send('Router');
});
router.get('/front/reg', function(req, res, next) {
    res.render('register.html');
});
router.get('/front/main', function(req, res, next) {
    res.render('src/main.html');
});
router.get('/front/login', function(req, res, next) {
    res.render('src/login.html');
});
router.get('/front/map', function(req, res, next) {
    res.render('src/map.html');
});
router.get('/front/jslib', function(req, res, next) {
    res.render('js/js.lib');
});
router.get('/front/style', function(req, res, next) {
    res.render('css/style.css');
});

module.exports = router;

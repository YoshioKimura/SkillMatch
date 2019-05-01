var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.user_id == undefined) {
    console.log("hogehoge");
    res.render('login');
  }
  res.render('index', { title: 'Express' });
});



module.exports = router;

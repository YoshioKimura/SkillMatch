var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.user_id == undefined) {
    console.log("hogehoge");
    res.render('login');
  }
  const query_all_can = `SELECT * FROM content_can_teach `
  connection.query(query_all_can, function (err, rows) {
    console.log(rows);
    res.render('index', { 
      title: 'next',
      results_all_can:rows
  });
  
});

  
});



module.exports = router;

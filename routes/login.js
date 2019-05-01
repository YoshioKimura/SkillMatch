var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');

router.get('/', function(req, res, next) {
    if (req.session.user_id) {
      res.render('/index');
    } else {
      res.render('login', {
        title: 'ログイン'
      });
    }
});

router.post('/', function(req, res, next) {
    var userName = req.body.user_name;
    var loginId = req.body.login_id;
    var query = `SELECT * FROM users WHERE user_name ="${userName}" AND login_id = "${loginId}" LIMIT 1`;
    connection.query(query, function(err, rows) {
        console.log(rows);
      var userId;
      if(rows.length == true){
        userId = rows[0].user_id;
      }else{
        userId = false;
      }

      if (userId) {
        req.session.user_id = userId;
        console.log(req.session.user_id);
        res.render('index');
      } else {
        res.render('login', {
          title: 'ログイン',
          noUser: '一致するユーザーはいません'
        });
      }
    });
  });

module.exports = router;
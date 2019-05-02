var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection');

router.get('/', function(req, res, next) {
    res.render('register', { title: '新規会員登録' });
});

router.post('/', function(req, res, next) {
    var loginId = req.body.login_id;
    console.log(loginId);
    var userName = req.body.user_name;
    var fbUrl = req.body.fb_url;
    var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    var fbUrlExistsQuery = `SELECT * FROM users WHERE fb_url = "'  ${fbUrl}" LIMIT 1`;// 追加
    var registerQuery = `INSERT INTO users (user_id, user_name, login_id, fb_url, created_at) VALUES (NULL,"${userName}","${loginId}", "${fbUrl}", "${createdAt}")`; // 変更
    connection.query(fbUrlExistsQuery, function(err, fbUrl) {
      var fbUrlExists = fbUrl.length;
      if (fbUrlExists != 0) {
        res.render('register', {
          title: '新規会員登録',
          fbUrlExists: '既に登録されているユーザーです'
        });
      } else {
        connection.query(registerQuery, function(err, rows) {
          // if(){
            console.log(rows);
            res.redirect('/login');
          // }
        });
      }
    });
});

module.exports = router;
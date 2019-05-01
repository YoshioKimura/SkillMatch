var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection');

router.get('/', function(req, res, next) {
    res.render('register', { title: '新規会員登録' });
});

router.post('/', function(req, res, next) {
    var userId = req.body.user_id;
    var userName = req.body.user_name;
    var fbUrl = req.body.fb_url;
    var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    var fbUrlExistsQuery = `SELECT * FROM users WHERE fb_url = "'  ${fbUrl}" LIMIT 1`;// 追加
    var registerQuery = `INSERT INTO users (id, user_name, user_id, fb_url, created_at) VALUES (NULL,"${userName}","${userId}", "${fbUrl}", "${createdAt}")`; // 変更
    connection.query(fbUrlExistsQuery, function(err, fbUrl) {
      var fbUrlExists = fbUrl.length;
      if (fbUrlExists) {
        res.render('register', {
          title: '新規会員登録',
          fbUrlExists: '既に登録されているユーザーです'
        });
      } else {
        connection.query(registerQuery, function(err, rows) {
          res.redirect('/login');
        });
      }
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.user_id == undefined) {
        res.render('login');
    }
    console.log(req.session.user_id);
    const userId = req.session.user_id;







    return res.render('next', {
      title: 'next',
      results_learner:[],
      results_mentor:[]
    });
    next();
});

router.post('/',function(req,res,next){
    //var imagePath = result.url;
    var userId = req.session.user_id;
    var userName = req.body.name;
    var can1 = req.body.can1;
    var can2 = req.body.can2;
    var can3 = req.body.can3;
    var want_to_learn1 = req.body.want_to_learn1;
    var want_to_learn2 = req.body.want_to_learn2;
    var want_to_learn3 = req.body.want_to_learn3;
    console.log(want_to_learn1,want_to_learn2,want_to_learn3);
    // var password = req.body.password;
      var query = `INSERT INTO content_can_teach (id,user_id,user_name, can) VALUES (NULL,${userId},"${userName}","${can1}"),(NULL,${userId},"${userName}","${can2}"),(NULL,${userId},"${userName}","${can3}")`;
      var query3 = `INSERT INTO content_want_learn (id,user_id,user_name, want) VALUES (NULL,${userId},"${userName}","${want_to_learn1}"),(NULL,${userId},"${userName}","${want_to_learn2}"),(NULL,${userId},"${userName}","${want_to_learn3}")`;
      var query2 = `SELECT * FROM content_want_learn WHERE want="${can1}" or want="${can2}" OR want="${can3}"`;//教えて欲しい人をヒットさせる
      var query4 = `SELECT * FROM content_can_teach WHERE can="${want_to_learn1}" or can="${want_to_learn2}" OR can="${want_to_learn3}"`;//教えられる人をヒットさせる
    //   var rows5;
    connection.query(query, function (err, rows) {
        // console.log(query);
            // res.redirect(`/next`);
        connection.query(query2, function (err, rows2) {
            // rows5 = rows2;
            // console.log(rows2);
            connection.query(query3, function (err, rows3) {
                // console.log(rows2);
                connection.query(query4, function (err, rows4) {
                    console.log(query4);
                    console.log(rows4);
                    res.render(`next`,{
                        results_learner:rows2,
                        results_mentor:rows4
                        });
                });
            });

        });
    });
});

router.get('/', function(req, res, next) {

    if (req.session.login_id) {
      res.redirect('/login');
    } else {
      res.render('login', {
        title: 'ログイン'
      });
    }
});

module.exports = router;

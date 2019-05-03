const express = require('express');
const router = express.Router();
const connection = require('../mysqlConnection');

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.user_id == undefined) {
        res.render('login');
    }
    console.log(req.session.user_id);
    const userId = req.session.user_id;
    const query_can_teach = `SELECT *
    FROM content_can_teach
    WHERE can IN (
      SELECT want
      FROM content_want_learn
      where user_id=${userId})`;

    const query_want_learn = `
    SELECT *
    FROM content_want_learn
    WHERE want IN (
    SELECT can
    FROM content_can_teach
    where user_id=${userId})`;
    connection.query(query_want_learn, function (err, rows) {
      console.log(rows);
      connection.query(query_can_teach, function (err, rows2) {
        console.log(rows);
        console.log(rows2);
        return res.render(`next`,{
          title: 'next',
          results_learner:rows,
          results_mentor:rows2
      });
      
    });
  });
});

router.post('/',function(req,res,next){
    //var imagePath = result.url;
    const userId = req.session.user_id;
    const userName = req.session.user_name;
    const fbUrl = req.session.fb_url;
    console.log(userName);
    const can1 = req.body.can1;
    const can2 = req.body.can2;
    const can3 = req.body.can3;
    const want_to_learn1 = req.body.want_to_learn1;
    const want_to_learn2 = req.body.want_to_learn2;
    const want_to_learn3 = req.body.want_to_learn3;
    console.log(want_to_learn1,want_to_learn2,want_to_learn3);
    // const password = req.body.password;
      const query = `INSERT INTO content_can_teach (id,user_id,user_name, can, fb_url) VALUES (NULL,${userId},"${userName}","${can1}", "${fbUrl}"),(NULL,${userId},"${userName}","${can2}", "${fbUrl}"),(NULL,${userId},"${userName}","${can3}", "${fbUrl}")`;
      const query3 = `INSERT INTO content_want_learn (id,user_id,user_name, want, fb_url) VALUES (NULL,${userId},"${userName}","${want_to_learn1}", "${fbUrl}"),(NULL,${userId},"${userName}","${want_to_learn2}", "${fbUrl}"),(NULL,${userId},"${userName}","${want_to_learn3}", "${fbUrl}")`;
      const query2 = `SELECT * FROM content_want_learn WHERE want="${can1}" or want="${can2}" OR want="${can3}"`;//教えて欲しい人をヒットさせる
      const query4 = `SELECT * FROM content_can_teach WHERE can="${want_to_learn1}" or can="${want_to_learn2}" OR can="${want_to_learn3}"`;//教えられる人をヒットさせる
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

module.exports = router;

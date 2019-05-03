var mysql = require('mysql2');

//local用
// var dbConfig = {
//   host: '127.0.0.1',
//   user: 'root',
//   password: '',
//   database: 'bulletin_issue'
// };

var dbConfig = {
  host: '*************************',
  user: '*************************',
  password: '**********',
  database: '*************************'
};

var connection;
// ysql://b81de1fc97d0cf:0ea4d4bf@us-cdbr-iron-east-03.cleardb.net/heroku_570104d33486c83?reconnect=true

function handleDisconnect() {
  connection = mysql.createPool(dbConfig); // Recreate the connection, since
                                           // the old one cannot be reused.
  connection.getConnection(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log("エラーです"); 
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                       // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

setInterval(function() {
  connection.query('SELECT 1');
}, 50000);

module.exports = connection;

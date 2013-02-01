define([
  'mysql'
], function(Mysql) {

  var Db = Mysql.createConnection({
    host: 'localhost',
    user: 'democrat',
    password: 'democrat',
    database: 'democratic_playlist'
  });

  Db.connect();

  return Db;
});

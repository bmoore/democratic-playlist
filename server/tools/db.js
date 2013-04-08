define([
  'mysql'
], function(Mysql) {

  var Db = Mysql.createConnection({
    host: 'volsys.net',
    user: 'democrat',
    password: 'democrat',
    database: 'democratic_playlist'
  });

  Db.connect();

  Db.modelException = function(message, model) {
    this.name = "Db.modelException";
    this.message = message;
    this.model = model;
  };

  return Db;
});

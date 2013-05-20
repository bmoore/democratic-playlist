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

  Db.run = function(query, options) {
    if (options.values === undefined) options.values = [];
    if (typeof query === 'string') query = {sql: query};
    query.values = options.values;
    Db.query(query, function(err, results) {

      if (!err && results === undefined) {
        results = [];
      }

      var error = options.error;
      options.error = function(query) {
        if (error) error(err, query, options);
      };

      if (err) options.error(this);
      if (results) options.success(results);

    });
  };

  return Db;
});

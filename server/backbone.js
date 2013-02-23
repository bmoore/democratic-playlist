define(function (exports) {
  var Db = requirejs("server/tools/db");
  var Backbone = requirejs("backbone");
  var _ = requirejs("lodash");

  Backbone.sync = function(method, model, options) {
    try {

    // Get table information
    if (model.models !== undefined) {
      var m = new model.model();
      if (m.table !== undefined) {
        var table = m.table;
      }
    } else if (model.table !== undefined) {
      var table = model.table;
    }

    if (table === undefined) {
      throw new Db.modelException("Table not defined", model);
    }
    //END TABLE INFO

    //don't process data on non-read
    if (method == 'read') {

      var query = "SELECT * FROM " + table;

      if (options.where) {
        query += " WHERE " + options.where;
      }

      var query = Db.query(query, options.params, function(err, results) {

        if (model.models == undefined) {
          results = results.shift();
        }
        
        var success = options.success;
        options.success = function(resp) {
          if (success) success(model, resp, options);
          model.trigger('sync', model, resp, options);
        };

        var error = options.error;
        options.error = function(xhr) {
          if (error) error(model, xhr, options);
          model.trigger('error', model, xhr, options);
        };

        if (err) options.error(this);
        if (results) options.success(results);
      });
    }

    } catch (e) {
      console.log(e);
    }
  };
});

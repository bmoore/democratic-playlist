define(function (exports) {
  var Db = requirejs("server/tools/db");
  var Backbone = requirejs("backbone");
  var _ = requirejs("lodash");

  Backbone.toJSON = function(options) {
    var attrs = _.clone(this.attributes);
    for (key in attrs) {
      if (typeof(attrs[key].toJSON) == 'function') {
        attrs[key] = attrs[key].toJSON();
      }
    }
    return attrs;
  };

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
      if (options.query) {
        var query = options.query.toString();
      } else if (method == 'read') {
        var query = "SELECT * FROM " + table;

        if (options.where) {
          query += " WHERE " + options.where;
        }
      }

      var query = Db.query(query, options.params, function(err, results) {

        if (model.models == undefined) {
          if (results != undefined) {
            results = results.shift();
          }
          if (results == undefined) {
            results = {};
          }
        }

        var error = options.error;
        options.error = function(resp) {
          if (error) error(model, resp, options);
          console.log(model, resp, options);
          model.trigger('error', model, resp, options);
        };

        this.err = err;
        if (err) options.error(this);
        if (results) options.success(results);
      });

    } catch (e) {
      console.log(e);
    }
  };
});

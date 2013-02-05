define([
  'backbone',
  'modules/song',
  'server/tools/db'
], function(Backbone, Song, Db) {

  console.log(Song);

  Song.Collection = Song.Collection.extend({
    /*
    sync: function(method, model, options) {
      //get the method
      //ensure we have the appropriate request data.
      //don't process data on non-read
      console.log(method);
      if (method == 'read') {
        var query = Db.query('SELECT * FROM song WHERE album_id = ?', options.album_id, function(err, results) {
          console.log("ERRORS: ", err);
          console.log("RESULTS: ", results);

          var success = options.success;
          options.success = function(resp) {
            if (success) success(model, resp, options);
            model.trigger('sync', model, resp, options);
          };

          var error = options.error;
          options.error = function(xhr) {
            if (error) error(model, resp, options);
            model.trigger('error', model, xhr, options);
          };

          if (err) options.error(this);
          if (results) options.success(results);
        });
      }
    },
    
    */
  });

  return Song;
});

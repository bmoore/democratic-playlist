define([
  'backbone',
  'modules/song',
  'server/tools/db'
], function(Backbone, Song, Db) {

  console.log(Song);

  Song.Collection = Song.Collection.extend({
      sync: function(method, collection, options) {
      console.log(method);
      if (method == 'read') {
        var query = Db.query('SELECT * FROM song WHERE album_id = ?', options.album_id, function(err, results) {
          collection.reset(results);
        });
        console.log(query.sql);
      }
    }
  });

  return Song;
});

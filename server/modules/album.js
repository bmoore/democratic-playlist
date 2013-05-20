define([
  'server/tools/db',
  'squel'
], function(Db, Squel) {
  var Album = {
    get_albums: function(options) {
      var query = Squel.select().
        field("album.id").
        field("album.name").
        field("album.prefix").
        field("album.year").
        field("album.disk").
        field("IF(STDDEV(artist.id)=0, CONCAT_WS(', ', artist.name, artist.prefix), 'Various Artists') AS artist").
        from("album").
        left_join("song", null, "album.id = song.album_id").
        left_join("artist", null, "artist.id = song.artist_id").
        group("album.id").
        toString();

      Db.run(query, options);
    },

    get_album: function(options) {
      var query = Squel.select().
        from("album").
        left_join("song", null, "album.id = song.album_id").
        left_join("artist", null, "artist.id = song.artist_id").
        where("album.id = ?").
        toString();

      var success = options.success;
      options.success = function(results) {
        var album = results[0].album;
        album.songs = [];

        for (i in results) {
          album.songs.push(results[i].song);
        }

        if (success) success(album);
      };

      Db.run({sql: query, nestTables: true}, options);
    }
  };

  return Album;
});

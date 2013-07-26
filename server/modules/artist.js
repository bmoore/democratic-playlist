define([
  'server/tools/db',
  'squel'
], function(Db, Squel) {

  var Artist = {

    get_artist: function(options) {
      var query = Squel.select().
        from("artist").
        left_join("song", null, "artist.id = song.artist_id").
        left_join("album", null, "song.album_id = album.id").
        where("artist.id = ?").
        toString();

      var success = options.success;
      options.success = function(results) {
        var artist = results[0].artist;
        artist.songs = [];
        artist.albums = [];

        for (i in results) {
          artist.songs.push(results[i].song);
          artist.albums.push(results[i].album);
        }

        if (success) success(artist);
      };

      Db.run({sql: query, nestTables: true}, options);
    }

  };

  return Artist;
});

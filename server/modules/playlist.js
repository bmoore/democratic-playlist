define([
  'server/tools/db',
  'squel'
], function(Db, Squel) {
  var Playlist = {
    get_playlist: function(options) {
      var query = Squel.select().
        from("playlist").
        left_join("song", null, "playlist.song_id = song.id").
        left_join("artist", null, "song.artist_id = artist.id").
        left_join("album", null, "song.album_id = album.id").
        where("played IS NULL").
        group("song.id").
        toString();

      var success = options.success;
      options.success = function(results) {
        var playlist = {};
        playlist.songs = [];

        for (i in results) {
          var song = results[i].song;
          song.artist = results[i].artist;
          song.album = results[i].album;
          playlist.songs.push(song);
        }

        if (success) success(playlist);
      };

      Db.run({sql: query, nestTables: true}, options);
    }
  };

  return Playlist;
});

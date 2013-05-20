define([
  'server/tools/db',
  'squel'
], function(Db, Squel) {
  var Song = {
    get_song: function(options) {
      var query = Squel.select().
        field("*").
        field("COUNT(*) AS votes").
        from("song").
        left_join("playlist", null, "song.id = playlist.song_id").
        left_join("vote", null, "playlist.id = vote.playlist_id").
        left_join("artist", null, "song.artist_id = artist.id").
        left_join("album", null, "song.album_id = album.id").
        where("song.id = ?").
        group("song.id").
        toString();

      var success = options.success;
      options.success = function(results) {
        var song = results[0].song;
        song.artist = results[0].artist;
        song.album = results[0].album;
        song.votes = results[0][''].votes;

        if (success) success(song);
      };

      Db.run({sql: query, nestTables: true}, options);
    }
  };

  return Song;
});

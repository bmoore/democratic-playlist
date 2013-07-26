define([
  'server/tools/db',
  'squel'
], function(Db, Squel) {
  var Vote = {
    get_vote: function(options) {
      var query = Squel.select().
        field("*").
        field("COUNT(*) AS votes").
        from("vote").
        left_join("playlist", null, "vote.playlist_id = playlist.id").
        where("song_id = ?").
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

  return Vote;
});

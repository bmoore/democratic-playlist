define([
  'squel',
  'modules/song',
], function (Squel, Song) {

  var SongController = {};

  SongController.song = function(req, res) {
    var song = new Song.Model();

    song.fetch({
      query: Squel.select().
        field("song.id").
        field("title").
        field("artist_id").
        field("album_id").
        field("time").
        field("track").
        field("path").
        field("COUNT(*) AS votes").
        field("playlist_id").
        from("song").
        left_join("playlist", null, "song.id = playlist.song_id").
        left_join("vote", null, "playlist.id = vote.playlist_id").
        where("song.id = ?").
        group("song.id"),
      params: [req.params.id],
      success: function(m, r, o) {
        song.get('artist').fetch({
          where: "id = ?",
          params: [song.get('artist_id')],
          success: function(m, r, o) {
            song.get('album').fetch({
              where: "id = ?",
              params: [song.get('album_id')],
              success: function(m, r, o) {
                res.send(song.toJSON());
              }
            });
          }
        });
      },
      error: function(m, r, o) {
        res.send(404);
      }
    });
  };

  return SongController;
});

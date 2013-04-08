define([
  'squel',
  'modules/playlist'
], function (Squel, Playlist) {

  var PlaylistController = {};

  PlaylistController.playlist = function(req, res) {
    var playlist = new Playlist.Model();
    playlist.get('songs').fetch({
      where: "id IN (select song_id FROM playlist WHERE played IS NULL)",
      success: function(m, r, o) {
        var semaphore = 0;
        var try_send = function() {
          if (semaphore == playlist.get('songs').length) {
            res.send(playlist.toJSON());
          }
        };
        playlist.get('songs').each(function(song) {

          song.get('artist').fetch({
            where: "id = ?",
            params: [song.get('artist_id')],
            success: function(m, r, o) {
              song.get('album').fetch({
                where: "id = ?",
                params: [song.get('album_id')],
                success: function(m, r, o) {
                  semaphore++;
                  try_send();
                },
                error: function(m,r,o) {
                  res.send(500);
                }
              });
            },
            error: function(m,r,o) {
              res.send(500);
            }
          });
        });
        try_send();
      }
    });
  };

  return PlaylistController;
});

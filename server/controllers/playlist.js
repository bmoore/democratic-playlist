define([
  'modules/playlist'
], function (Playlist) {

  var PlaylistController = {};

  PlaylistController.get = function(req, res) {
    Playlist.get_playlist({
      success: function(results) {
        res.send(results);
      },
      error: function(err, query, options) {
        res.send(500);
      }
    });

  };

  return PlaylistController;
});

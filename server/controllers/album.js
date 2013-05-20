define([
  'squel',
  'modules/album',
  'modules/song'
], function (Squel, Album, Song) {

  var AlbumController = {};

  AlbumController.albums = function(req, res) {
    Album.get_albums({
      success: function(results) {
        res.send(results);
      },
      error: function(err, query, options) {
        console.log(err, query, options);
        res.send(500);
      }
    });
  };

  AlbumController.album = function(req, res) {
    Album.get_album({
      values: [
        req.params.id
      ],
      success: function(results) {
        res.send(results);
      },
      error: function(err, query, options) {
        console.log(err, query, options);
        res.send(500);
      }
    });
  };

  return AlbumController;
});

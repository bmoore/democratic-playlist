define([
  'modules/album',
], function (Album) {

  var AlbumController = {};

  AlbumController.list = function(req, res) {
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

  AlbumController.get = function(req, res) {
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

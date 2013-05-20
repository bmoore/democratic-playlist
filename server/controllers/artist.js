define([
  'modules/artist',
], function (Artist) {

  var ArtistController = {};

  ArtistController.artist = function(req, res) {
    Artist.get_artist({
      values: [
        req.params.id
      ],
      success: function(results) {
        res.send(results);
      },
      error: function(err, query, options) {
        res.send(500);
      }
    });
  };

  return ArtistController;
});

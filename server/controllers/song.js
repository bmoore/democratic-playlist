define([
  'modules/song',
], function (Song) {

  var SongController = {
    get: function(req, res) {
      Song.get_song({
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
    },
    put: function(req, res) {
      res.send(404);
    }
  };

  return SongController;
});

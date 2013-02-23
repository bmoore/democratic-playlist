define([
  'express',
  'server/modules/song',
  'server/modules/artist',
], function (Express, Song, Artist) {
  var Router = Express();
  var web_dir = 'client';

  Router.get('/', function(req, res) {
    res.sendfile(web_dir+'/index.html');
  });

  Router.get('/artist/:id', function(req, res) {
    var artist = new Artist.Model();

    artist.fetch({
      where: "id = ?",
      params: [req.params.id],
      success: function(model, response, options) {
        res.send(model.toJSON());
      }
    });
  });

  Router.get('/song/:id', function(req, res) {
    var song = new Song.Model();

    song.fetch({
      where: "id = ?",
      params: [req.params.id],
      success: function(model, response, options) {
        res.send(model.toJSON());
      },
      error: function(model, request, options) {
        console.log("ERROROROROR!");
        console.log("Model: ", model);
        console.log("Request: ", request);
        console.log("Options: ", options);
      }
    });
  });

  Router.get('/album/:id', function(req, res) {

    var songs = new Song.Collection();

    songs.fetch({
      where: "album_id = ?",
      params: [req.params.id],
      success: function(model, response, options) {
        console.log("Model: ", model);
        res.send(model.toJSON());
      },
      error: function(model, request, options) {
        console.log("ERROROROROR!");
        console.log("Model: ", model);
        console.log("Request: ", request);
        console.log("Options: ", options);
      }
    });

  });

  Router.use('/', Express.static(web_dir));
  Router.use('/core/', Express.static('core'));

  return Router;
});

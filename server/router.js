define([
  'express',
  'squel',
  'controllers/album',
  'controllers/artist',
  'controllers/playlist',
  'controllers/song'
], function (Express, Squel, AlbumController, ArtistController, PlaylistController, SongController) {
  var Router = Express();
  var web_dir = 'client';
  var core_dir = 'core';

  Router.get('/', function(req, res) {
    res.sendfile(web_dir+'/index.html');
  });

  Router.get('/artist/:id', ArtistController.artist);

  Router.get('/song/:id', SongController.song);

  Router.get('/albums', AlbumController.albums);
  Router.get('/album/:id', AlbumController.album);

  Router.get('/playlist', PlaylistController.playlist);

  Router.use('/', Express.static(web_dir));
  Router.use('/core/', Express.static(core_dir));

  return Router;
});

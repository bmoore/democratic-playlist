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

  Router.use(Express.bodyParser());
  Router.use(Express.methodOverride());
  Router.use(Express.query());

  Router.get('/', function(req, res) {
    res.sendfile(web_dir+'/index.html');
  });

  Router.get('/artist/:id', ArtistController.artist);

  Router.get('/song/:id', SongController.get);
  Router.put('/song/:id', SongController.put);

  Router.get('/albums', AlbumController.albums);
  Router.get('/album/:id', AlbumController.album);

  Router.get('/playlist', PlaylistController.playlist);

  Router.use('/', Express.static(web_dir));
  Router.use('/core/', Express.static(core_dir));

  return Router;
});

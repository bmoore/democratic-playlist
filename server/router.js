define([
  'express',
  'modules/song',
  'modules/artist',
  'modules/album',
  'modules/playlist',
], function (Express, Song, Artist, Album, Playlist) {
  var Router = Express();
  var web_dir = 'client';
  var core_dir = 'core';

  Router.get('/', function(req, res) {
    res.sendfile(web_dir+'/index.html');
  });

  Router.get('/artist/:id', function(req, res) {
    var artist = new Artist.Model();

    artist.fetch({
      where: "id = ?",
      params: [req.params.id],
      success: function(m, r, o) {
        res.send(artist.toJSON());
      }
    });
  });

  Router.get('/song/:id', function(req, res) {
    var song = new Song.Model();

    song.fetch({
      where: "id = ?",
      params: [req.params.id],
      success: function(m, r, o) {
        res.send(song.toJSON());
      },
    });
  });

  Router.get('/album/:id', function(req, res) {
    var album = new Album.Model();
    album.fetch({
      where: "id = ?",
      params: [req.params.id],
      success: function(m, r, o) {
        res.send(album.toJSON());
      },
    })
  });

  Router.get('/playlist', function(req, res) {
    var playlist = new Playlist.Model();
    playlist.get('songs').fetch({
      where: "id IN (select song_id FROM playlist WHERE played IS NULL)",
      success: function(m, r, o) {
        res.send(playlist.toJSON());
      }
    });
  });

  Router.use('/', Express.static(web_dir));
  Router.use('/core/', Express.static(core_dir));

  return Router;
});

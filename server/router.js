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
        artist.get('songs').fetch({
          where: "artist_id = ?",
          params: [artist.get('id')],
          success: function(m, r, o) {
            artist.get('albums').fetch({
              where: "id IN (SELECT album_id FROM song WHERE artist_id = ?)",
              params: [artist.get('id')],
              success: function(m, r, o) {
                res.send(artist.toJSON());
              }
            });
          }
        });
      }
    });
  });

  Router.get('/song/:id', function(req, res) {
    var song = new Song.Model();

    song.fetch({
      where: "id = ?",
      params: [req.params.id],
      success: function(m, r, o) {
        song.get('artist').fetch({
          where: "id = ?",
          params: [song.get('artist_id')],
          success: function(m, r, o) {
            song.get('album').fetch({
              where: "id = ?",
              params: [song.get('album_id')],
              success: function(m, r, o) {
                res.send(song.toJSON());
              }
            });
          }
        });
      },
      error: function(m, r, o) {
        res.send(404);
      }
    });
  });

  Router.get('/album/:id', function(req, res) {
    var album = new Album.Model();
    album.fetch({
      where: "id = ?",
      params: [req.params.id],
      success: function(m, r, o) {
        album.get('songs').fetch({
          where: "album_id = ?",
          params: [album.get('id')],
          success: function(m, r, o) {
            var semaphore = 0;
            var try_send = function() {
              if (semaphore == album.get('songs').length) {
                res.send(album.toJSON());
              }
            };
            album.get('songs').each(function(song) {
              song.get('artist').fetch({
                where: "id = ?",
                params: [song.get('artist_id')],
                success: function(m,r,o) {
                  semaphore++;
                  try_send();
                }
              });
            });
          }
        });
      },
    })
  });

  Router.get('/playlist', function(req, res) {
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
                  console.log(m,r,o);
                }
              });
            },
            error: function(m,r,o) {
              res.send(500);
              console.log(m,r,o);
            }
          });
        });
      }
    });
  });

  Router.use('/', Express.static(web_dir));
  Router.use('/core/', Express.static(core_dir));

  return Router;
});

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
    var songs = new Song.Collection();
    var albums = new Album.Collection();

    artist.fetch({
      where: "id = ?",
      params: [req.params.id],
      success: function(m, r, o) {
        songs.fetch({
          where: "artist_id = ?",
          params: [artist.get('id')],
          success: function(m, r, o) {
            artist.set('songs', songs);
            albums.fetch({
              where: "id IN (SELECT album_id FROM song WHERE artist_id = ?)",
              params: [artist.get('id')],
              success: function(m, r, o) {
                artist.set('albums', albums);
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

  Router.get('/albums', function(req, res) {
    var albums = new Album.Collection();
    var songs = new Song.Collection();
    albums.fetch({
      success: function(m, r, o) {
        var album_sem = 0;
        var try_send = function() {
          if (album_sem == albums.length) {
            res.send(albums.toJSON());
          }
        };
        albums.each(function(album) {
          songs.fetch({
            where: "album_id = ?",
            params: [album.get('id')],
            success: function(m, r, o) {
              album.set('songs', songs);
              var song_sem = 0;
              var song_done = function() {
                if (song_sem == songs.length) {
                  album_sem++;
                  try_send();
                }
              };
              songs.each(function(song) {
                song.get('artist').fetch({
                  where: "id = ?",
                  params: [song.get('artist_id')],
                  success: function(m,r,o) {
                    song_sem++;
                    song_done();
                  }
                });
              });
            }
          });
        });
      },
    })
  });

  Router.get('/album/:id', function(req, res) {
    var album = new Album.Model();
    var songs = new Song.Collection();
    album.fetch({
      where: "id = ?",
      params: [req.params.id],
      success: function(m, r, o) {
        songs.fetch({
          where: "album_id = ?",
          params: [album.get('id')],
          success: function(m, r, o) {
            album.set('songs', songs);
            var semaphore = 0;
            var try_send = function() {
              if (semaphore == songs.length) {
                res.send(album.toJSON());
              }
            };
            songs.each(function(song) {
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

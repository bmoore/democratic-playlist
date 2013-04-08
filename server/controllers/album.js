define([
  'squel',
  'modules/album',
  'modules/song'
], function (Squel, Album, Song) {

  var AlbumController = {};

  AlbumController.albums = function(req, res) {
    var albums = new Album.Collection();
    albums.fetch({
      query: Squel.select().
        field("album.id").
        field("album.name").
        field("album.prefix").
        field("album.year").
        field("album.disk").
        field("IF(STDDEV(artist.id)=0, CONCAT_WS(', ', artist.name, artist.prefix), 'Various Artists') AS artist").
        from("album").
        left_join("song", null, "album.id = song.album_id").
        left_join("artist", null, "artist.id = song.artist_id").
        group("album.id"),
      success: function(m, r, o) {
        res.send(albums.toJSON());
      },
    })
  };

  AlbumController.album = function(req, res) {
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
  };

  return AlbumController;
});

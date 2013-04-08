define([
  'squel',
  'modules/artist',
  'modules/song',
  'modules/album',
], function (Squel, Artist, Song, Album) {

  var ArtistController = {};

  ArtistController.artist = function(req, res) {
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
  };

  return ArtistController;
});

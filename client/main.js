require([
  "jquery",
  "backbone",
  "modules/playlist",
  "modules/song",
  "modules/album"
], function($, Backbone, Playlist, Song, Album) {
  $(function() {
    var playlist = new Playlist.Model();
    playlist.fetch({
      success: function(m,r,o) {
        var playlist_view = new Playlist.Views.Model({
          model: playlist,
          el: '#playlist'
        });

        playlist_view.render();
      }
    });

    var albums = new Album.Collection();
    albums.fetch({
      success: function(m,r,o) {
        var albums_view = new Album.Views.Collection({
          collection: albums,
          el: '#albums'
        });
        albums_view.render();
      }
    });

    var album = new Album.Model({id: 1});
    album.fetch({
      success: function(m,r,o) {
        var album_view = new Album.Views.ModelDetail({
          model: album,
          el: '#album-detail',
          template_type: 'detail'
        });
        album_view.render();
      }
    });
  });
});

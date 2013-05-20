define([
  "jquery",
  "backbone",
  "modules/playlist",
  "modules/song",
  "modules/album"
], function($, Backbone, Playlist, Song, Album) {
  var LibraryRouter = Backbone.Router.extend({
    initialize: function() {
      var that = this;

      //Get Albums
      this.albums = new Album.Collection([],{
        comparator: function(album) {
          return album.get('artist').toLowerCase()+album.get('name').toLowerCase();
        }
      });

      this.albums.fetch({
        success: function(m,r,o) {
          var albums_view = new Album.Views.Collection({
            collection: that.albums,
            el: '#albums'
          });
          albums_view.render();
        }
      });


      this.album = new Album.Model();
    },
    routes: {
      "album/:id": "album_detail",
    },
    album_detail: function(album_id) {
      that = this;
      this.album = new Album.Model({id: album_id});
      this.album.fetch({
        success: function(m,r,o) {
          var album_view = new Album.Views.ModelDetail({
            model: that.album,
            el: '#album-detail .jacket',
          });
          album_view.render();

          var songs = new Song.Collection(that.album.get('songs'), {
            comparator: function(song) {
              return song.get('track');
            },
          });

          var songs_view = new Song.Views.Collection({
            collection: songs,
            el: '#album-detail .tracks',
          });

          songs_view.render();
        }
      });
    }
  });
  return LibraryRouter;
});

define([
  "jquery",
  "backbone",
  "modules/playlist",
  "modules/song",
  "modules/album"
], function($, Backbone, Playlist, Song, Album) {
  var MainRouter = Backbone.Router.extend({
    initialize: function() {
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
   },
    routes: {
      "": "index",
    },
    index: function() {
    }
  });
  return MainRouter;
});

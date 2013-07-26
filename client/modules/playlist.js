define([
  'backbone',
  'modules/views/playlist',
  'modules/song'
], function(Backbone, PlaylistViews, Song) {
  
  // Extend Parent
  var Playlist = {};

  Playlist.Model = Backbone.Model.extend({
    initialize: function() {
      this.set('songs', new Song.Collection());
    },
		defaults: {
      songs: {},
      title: 'Playlist'
    },
    url: 'playlist',
    parse: function (response, options) {
      this.set('songs', new Song.Collection(response.songs));
    }
  });

  // attach to #playlist,
  // pass a Playlist.Model
  Playlist.Views = PlaylistViews;

  return Playlist;
});

define([
  'backbone',
  'modules/song'
], function(Backbone, Song) {
  var Playlist = {};

  Playlist.Model = Backbone.Model.extend({
    initialize: function() {
      this.set('songs', new Song.Collection());
    },
		defaults: {
      songs: {},
    }
  });

  return Playlist;
});

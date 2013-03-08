define([
  'backbone',
  'modules/song'
], function(Backbone, Song) {
  var Playlist = {};

  Playlist.Model = Backbone.Model.extend({
    initialize: function() {
    },
		defaults: {
      songs: new Song.Collection(), // can't call 'new' here 
    }
  });

  return Playlist;
});

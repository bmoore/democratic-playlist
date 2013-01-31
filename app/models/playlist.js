define([
  'backbone',
  'app/models/song'
], function(Backbone, Song) {
  var Playlist = {};

  Playlist.Model = Backbone.Model.extend({
    initialize: function() {
      songs.fetch();
    },
		defaults: {
      songs: new Song.Collection()
    }
  });

  return Playlist;
});

define([
  'backbone',
  'app/models/song'
], function(Backbone, Song) {
  var Album = {};

  Album.Model = Backbone.Model.extend({
    initialize: function() {
      songs.fetch();
    },
		defaults: {
      songs: new Song.Collection()
    }
  });

  Album.Collection = Backbone.Collection.extend({
    model: Album.Model
  });

  return Album;
});

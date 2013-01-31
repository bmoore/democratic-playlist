define([
  'backbone',
  'modules/song'
], function(Backbone, Song) {
  var Album = {};

  Album.Model = Backbone.Model.extend({
    initialize: function() {
      songs.fetch();
    },
		defaults: {
      name: 'Departed',
      prefix: 'The',
      year: '1998',
      disk: '1',
      songs: new Song.Collection(),
    }
  });

  Album.Collection = Backbone.Collection.extend({
    model: Album.Model
  });

  return Album;
});

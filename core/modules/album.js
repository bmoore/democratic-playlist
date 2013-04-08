define([
  'backbone',
], function(Backbone) {
  var Album = {};

  Album.Model = Backbone.Model.extend({
    initialize: function() {
    },
		defaults: {
      name: '<Untitled>',
      prefix: '',
      year: '1970',
      disk: '',
      songs: [],
      artist: '<Orphaned>',
    }
  });

  Album.Collection = Backbone.Collection.extend({
    model: Album.Model
  });

  return Album;
});

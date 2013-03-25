define([
  'backbone',
], function(Backbone, Song) {
  var Album = {};

  Album.Model = Backbone.Model.extend({
    initialize: function() {
      var Song = requirejs('modules/song');
      this.set('songs', new Song.Collection());
    },
		defaults: {
      name: '<Untitled>',
      prefix: '',
      year: '1970',
      disk: ''
    }
  });

  Album.Collection = Backbone.Collection.extend({
    model: Album.Model
  });

  return Album;
});

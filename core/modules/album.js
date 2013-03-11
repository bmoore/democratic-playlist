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
      name: 'Departed',
      prefix: 'The',
      year: '1998',
      disk: '1'
    }
  });

  Album.Collection = Backbone.Collection.extend({
    model: Album.Model
  });

  return Album;
});

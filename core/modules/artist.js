define([
  'backbone',
], function(Backbone) {
  var Artist = {};

  Artist.Model = Backbone.Model.extend({
    initialize: function() {
      var Album = requirejs('modules/album');
      var Song = requirejs('modules/song');
      this.set('albums', new Album.Collection());
      this.set('songs', new Song.Collection());
    },
		defaults: {
      name: "Cars",
      prefix: "The",
    }
  });

  return Artist;
});

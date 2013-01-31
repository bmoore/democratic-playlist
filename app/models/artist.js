define([
  'backbone',
  'app/models/album',
  'app/models/song',
], function(Backbone, Album, Song) {
  var Artist = {};

  Artist.Model = Backbone.Model.extend({
    initialize: function() {
    },
		defaults: {
      name: "Cars",
      prefix: "The",
      albums: new Album.Collection(),
      songs: new Song.Collection()
    }
  });

  return Artist;
});

define([
  'core/modules/artist'
], function(CoreArtist) {
  var Artist = {};
  _.extend(Artist, CoreArtist);

  Artist.Model = CoreArtist.Model.extend({
    initialize: function(args) {
      CoreArtist.Model.prototype.initialize.call(this, args);
    }
  });

  return Artist;
});

define([
  'core/modules/artist',
  'lodash'
], function(CoreArtist, _) {
  var Artist = {};
  _.extend(Artist, CoreArtist);

  Artist.Model = CoreArtist.Model.extend({
    initialize: function(args) {
      CoreArtist.Model.prototype.initialize.call(this, args);
      this.table = "artist";
    }
  });

  return Artist;
});

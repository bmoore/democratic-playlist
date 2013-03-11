define([
  'core/modules/album',
  'lodash'
], function(CoreAlbum, _) {
  var Album = {};
  _.extend(Album, CoreAlbum);

  Album.Model = CoreAlbum.Model.extend({
    initialize: function(args) {
      CoreAlbum.Model.prototype.initialize.call(this, args);
      this.table = "album";
    }
  });

  Album.Collection = CoreAlbum.Collection.extend({
    model: Album.Model
  });

  return Album;
});

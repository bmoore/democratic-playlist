define([
  'core/modules/album',
  'modules/views/album'
], function(CoreAlbum, AlbumViews) {
  var Album = {};
  _.extend(Album, CoreAlbum);

  Album.Model = CoreAlbum.Model.extend({
    initialize: function(args) {
      CoreAlbum.Model.prototype.initialize.call(this, args);
    },

    urlRoot: '/album',
  });

  Album.Collection = CoreAlbum.Collection.extend({
    model: Album.Model,
    url: 'albums'
  });

  Album.Views = AlbumViews;

  return Album;
 });

define([
  'backbone',
  'modules/views/album'
], function(Backbone, AlbumViews) {
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
    },
    urlRoot: '/album',
  });

  Album.Collection = Backbone.Collection.extend({
    model: Album.Model,
    url: 'albums'
  });

  Album.Views = AlbumViews;

  return Album;
 });

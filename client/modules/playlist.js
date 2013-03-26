define([
  'backbone',
  'core/modules/playlist',
  'modules/views/playlist',
  'modules/song'
], function(Backbone, CorePlaylist, PlaylistViews, Song) {
  
  // Extend Parent
  var Playlist = {};
  _.extend(Playlist, CorePlaylist); // essentially cloning

  // Model
  Playlist.Model = CorePlaylist.Model.extend({
    initialize: function(args) {
      CorePlaylist.Model.prototype.initialize.call(this, args);
      console.log('client playlist model init');
    },
    defaults: _.extend({
      title: 'Playlist'
    }, CorePlaylist.Model.prototype.defaults),
    url: 'playlist',
    parse: function (response, options) {
      this.set('songs', new Song.Collection(response.songs));
    }
  });


  // attach to #playlist,
  // pass a Playlist.Model
  Playlist.Views = PlaylistViews;

  return Playlist;
});

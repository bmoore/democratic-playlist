define([
  'core/modules/playlist',
  'lodash'
], function(CorePlaylist, _) {
  var Playlist = {};
  _.extend(Playlist, CorePlaylist);

  Playlist.Model = CorePlaylist.Model.extend({
    initialize: function(args) {
      CorePlaylist.Model.prototype.initialize.call(this, args);
      this.table = "playlist";
    }
  });

  return Playlist;
});

define([
  'backbone',
	'core/modules/playlist',
  'core/modules/song'
], function(Backbone, CorePlaylist, CoreSong) {
	
	var Playlist = {};
	_.extend(Playlist, CorePlaylist); // essentially cloning

  Playlist.Model = CorePlaylist.Model.extend({
    initialize: function(args) {
			CorePlaylist.Model.prototype.initialize.call(this, args);
			console.log('client playlist model init');
    },
		defaults: _.extend({
			title: 'Playlist'
		}, CorePlaylist.Model.prototype.defaults)
	});

  return Playlist;
});

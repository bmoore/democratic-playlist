define([
  'backbone',
  'core/modules/song'
], function(Backbone, Song) {
  var Playlist = {};

  Playlist.Model = Backbone.Model.extend({
    initialize: function() {
			console.log('core playlist init');
			this.set({
				songs: new Song.Collection()
			});
      //this.get('songs').fetch(); // TODO needs a URL
    },
		defaults: {
      songs: null, // can't call 'new' here 
			title: 'Core Playlist',
			createdBy: 'Default'
    }
  });

  return Playlist;
});

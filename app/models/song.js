define([
  'backbone'
], function(Backbone) {
  var Song = {};

  // Default Model.
  Song.Model = Backbone.Model.extend({
    initialize: function() {
    },
		defaults: {
			// id is a special attr - set to song_id on model create
			title: 'The Nosebleed Section',
			artist: 'Hilltop Hoods',
			album: 'State of the Art',
      path: '/path/to/song.mp3',
			time: 219, // Time in seconds. Will be stored as seconds.
			track: 16,
			votes: 0,
			votedFor: false,
			playlistId: null // this will be the playlist primary key IF the song is in the playlist and now played - used for sorting if votes are tied
		
		}

  });

  // Default Collection.
  Song.Collection = Backbone.Collection.extend({
    model: Song.Model
  });

  /* It layout manager doesn't exist yet
  // Default View.
  Song.Views.Layout = Backbone.Layout.extend({
    template: "song"
  });
  */

  // Return the module for AMD compliance.
  return Song;

});

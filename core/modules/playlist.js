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
			this.get('songs').add([
				{
					title: 'The Nosebleed Section',
					artist: 'Hilltop Hoods',
					album: 'State of the Art'
				},
				{
					title: 'The River, The Woods',
					artist: 'Astronautalis',
					album: 'This Is Our Science'
				},
				{
					title: 'Take A Walk',
					artist: 'Passion Pit',
					album: 'Gossamer'
				},
				{
					title: 'No One Loves Me & Neither Do I',
					artist: 'Them Crooked Vultures',
					album: 'Them Crooked Vultures'
				}
			]);
    },
		defaults: {
      songs: null, // can't call 'new' here 
			title: 'Core Playlist',
			createdBy: 'Default'
    }
  });

  return Playlist;
});

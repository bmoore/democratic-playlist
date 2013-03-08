define([
  'backbone',
	'core/modules/playlist',
  'modules/song'
], function(Backbone, CorePlaylist, Song) {
	
	// Extend Parent
	var Playlist = {};
	_.extend(Playlist, CorePlaylist); // essentially cloning

  // Model
	Playlist.Model = CorePlaylist.Model.extend({
    initialize: function(args) {
			CorePlaylist.Model.prototype.initialize.call(this, args);
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
			console.log('client playlist model init');
    },
		defaults: _.extend({
			title: 'Playlist'
		}, CorePlaylist.Model.prototype.defaults)
	});


	// attach to #playlist,
	// pass a Playlist.Model
	Playlist.View = Backbone.View.extend({
		initialize: function(){
			this.model.on('change', this.render, this);
			this.model.get('songs').on('change', this.render, this);
		},
		events: {
		},
		render: function(){
			this.$('.tracks').empty();
			this.model.get('songs').each(function(song){
				this.$('.tracks').append(new Song.View({model: song}).render().el );
			}, this);
			return this;
		},
		vote: function(e){
			e.preventDefault();
			if(!this.model.get('votedFor')){
				this.model.set({
					votedFor: true,
					votes: this.model.get('votes') + 1
				});
			}
		}
	
	
	
	});

  return Playlist;
});

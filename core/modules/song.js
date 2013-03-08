define([
  'backbone',
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
			artist_id: 0,
			album: 'State of the Art',
			album_id: 0,
      path: '/path/to/song.mp3',
			time: 219, // Time in seconds. Will be stored as seconds.
			track: 16,
			votes: 0,
			voted_for: false,
			playlist_id: null // this will be the playlist primary key IF the song is in the playlist and now played - used for sorting if votes are tied
		
		}

  });

  // Default Collection.
  Song.Collection = Backbone.Collection.extend({
		initialize: function(){
			this.on('change:votes', this.sort, this);
		},
    model: Song.Model,
		comparator: function(s, t){
			// TODO should break ties with playlist ID
			if(s.get('votes') > t.get('votes')){
				return -1;
			}else if(s.get('votes') < t.get('votes')){
				return 1;
			}
			return 0;
		}
  });

  return Song;

});
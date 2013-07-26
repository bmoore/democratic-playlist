define([
  'backbone',
  'modules/views/song',
  'modules/artist',
  'modules/album',
], function(Backbone, SongViews, Artist, Album) {

  // Extend Parent
  var Song = {};

  Song.Model = Backbone.Model.extend({
    initialize: function(args) {
      this.set('artist', new Artist.Model());
      this.set('album', new Album.Model());
      if (args) {
        if (args.artist) {
          this.set('artist', new Artist.Model(args.artist));
        }

        if (args.album) {
          this.set('album', new Album.Model(args.album));
        }
      }
   },
    defaults: {
      // id is a special attr - set to song_id on model create
      title: '<Untitled>',
      artist_id: '',
      artist: {}, //Artist.Model
      album_id: '',
      album: {}, //Album.Model
      path: '',
      time: '', // Time in seconds. Will be stored as seconds.
      track: '',
      votes: '',
      voted_for: false,
      playlist_id: null // this will be the playlist primary key IF the song is in the playlist and now played - used for sorting if votes are tied
    },

    urlRoot: '/song',

    parse: function(response, options) {
    },

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

  Song.Views = SongViews;

  return Song;

});

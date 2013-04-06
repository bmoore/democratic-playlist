define([
  'backbone',
  'core/modules/song',
  'modules/views/song',
  'modules/artist',
  'modules/album',
], function(Backbone, CoreSong, SongViews, Artist, Album) {

  // Extend Parent
  var Song = {};
  _.extend(Song, CoreSong);

  // Default Model
  Song.Model = CoreSong.Model.extend({

    initialize: function(args) {
      CoreSong.Model.prototype.initialize.call(this, args);
      if (args) {
        if (args.artist) {
          this.set('artist', new Artist.Model(args.artist));
        }

        if (args.album) {
          this.set('album', new Album.Model(args.album));
        }
      }
    },

    defaults: _.extend({
    }, CoreSong.Model.prototype.defaults),

    parse: function(response, options) {
    },

  });

  // Default Collection.
  Song.Collection = CoreSong.Collection.extend({
    model: Song.Model,
  });

  Song.Views = SongViews;

  return Song;

});

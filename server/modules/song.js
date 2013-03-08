define([
  'core/modules/song',
  'lodash'
], function(CoreSong, _) {
  var Song = {};
  _.extend(Song, CoreSong);

  Song.Model = CoreSong.Model.extend({
    initialize: function(args) {
      CoreSong.Model.prototype.initialize.call(this, args);
      this.table = "song";
    }
  });

  Song.Collection = CoreSong.Collection.extend({
    model: Song.Model
  });


  return Song;
});

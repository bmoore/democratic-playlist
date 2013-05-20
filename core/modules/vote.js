define([
  'backbone',
  'modules/playlist'
], function(Backbone, Playlist) {
  var Vote = {};

  Vote.Model = Backbone.Model.extend({
    initialize: function() {
    },
		defaults: {
     user_id : 0,
     playlist_id : 0,
    }
  });

  return Vote;
});

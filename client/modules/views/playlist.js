define([
  'backbone',
  'modules/song'
], function(Backbone, Song) {
  var PlaylistViews = {};

  // attach to #playlist,
  // pass a Playlist.Model
  PlaylistViews.Model = Backbone.View.extend({
    initialize: function(){
      this.model.on('change', this.render, this);
      this.model.get('songs').on('change', this.render, this);
    },
    events: {
    },
    render: function(){
      this.$('.tracks').empty();
      this.model.get('songs').each(function(song){
        this.$('.tracks').append(new Song.Views.Model({model: song}).render().el );
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

  return PlaylistViews;
});

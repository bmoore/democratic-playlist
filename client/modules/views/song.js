define([
  'backbone',
  'text!templates/song.model.html'
], function(Backbone, ModelHtml) {
  
  var SongViews = {};

  // View for a single Song Model
  // init with el and song.model
  SongViews.Model = Backbone.View.extend({
    initialize: function(){
      this.model.on('change', this.render, this);
    },
    tagName: 'li',
    template: _.template(ModelHtml),
    events: {
      'click .upvote': 'vote'
    },
    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
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

  return SongViews;

});

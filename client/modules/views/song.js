define([
  'backbone',
  'text!templates/song.model.html'
], function(Backbone, ModelHtml) {
  
  var SongViews = {};

  // View for a single Song Model
  // init with el and song.model
  SongViews.Model = Backbone.View.extend({
    initialize: function(){
      this.listenTo(this.model, 'change', this.render);
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
      if(!this.model.get('voted_for')){
        this.model.set({
          voted_for: true,
          votes: this.model.get('votes') + 1
        });
        this.model.save({
          success: function(m,r,o) {
            console.log("SUCCESS:", m,r,o);
          },
          error: function(m,r,o) {
            console.log("ERROR:", m,r,o);
          }
        });
      }
    }
  });

  SongViews.Collection = Backbone.View.extend({
    initialize: function(){
    },
    tagName: 'ol',
    className: 'tracks',
    render: function(){
      this.$el.empty();
      this.collection.each(function(song){
        var songView = new SongViews.Model({model:song});
        this.$el.append(songView.render().el );
      }, this);
      return this;
    },
  });
  return SongViews;

});

define([
  'backbone',
	'core/modules/song',
	'text!templates/song.model.html'
], function(Backbone, CoreSong, html) {

	// Extend Parent
  var Song = {};
	_.extend(Song, CoreSong);

  // Default Model
  Song.Model = CoreSong.Model.extend({
    initialize: function(args) {
			CoreSong.Model.prototype.initialize.call(this, args);
			console.log('init client song model');
    },
		defaults: _.extend({
		}, CoreSong.Model.prototype.defaults)

  });

  // Default Collection.
/*  Song.Collection = Backbone.Collection.extend({
    model: Song.Model,
  }); */

	// View for a single Song Model
	// init with el and song.model
	Song.View = Backbone.View.extend({
		initialize: function(){
			this.model.on('change', this.render, this);
		},
		tagName: 'li',
		template: _.template(html),
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

  return Song;

});

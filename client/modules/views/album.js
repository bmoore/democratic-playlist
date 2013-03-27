define([
  'text!templates/album.model.list.html',
  'text!templates/album.model.detail.html'
], function(ListTemplate, DetailTemplate) {
  AlbumViews = {};

  AlbumViews.ModelDetail = Backbone.View.extend({
    initialize: function(args) {
    },

    tagName: 'div',
    className: 'jacket',
    template: _.template(DetailTemplate),

    events: {
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

  AlbumViews.ModelList = Backbone.View.extend({
    initialize: function(args) {
    },

    tagName: 'li',

    template: _.template(ListTemplate),

    events: {
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  AlbumViews.Collection = Backbone.View.extend({
    initialize: function() {
    },

    render: function() {
      this.$('.list').empty();
      this.collection.each(function(album) {
        this.$('.list').append(new AlbumViews.ModelList({model: album, template_type: 'list'}).render().el );
      }, this);
      return this;
    },
  });

  return AlbumViews;
 });

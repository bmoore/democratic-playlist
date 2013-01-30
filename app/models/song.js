define([
  'backbone'
],

// Map dependencies from above array.
function(Backbone) {
  // Default Model.
  Song.Model = Backbone.Model.extend({
    initialize: function() {
    },

  });

  // Default Collection.
  Song.Collection = Backbone.Collection.extend({
    model: Song.Model
  });

  // Default View.
  Song.Views.Layout = Backbone.Layout.extend({
    template: "song"
  });

  // Return the module for AMD compliance.
  return Song;

});

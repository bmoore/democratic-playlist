// Song module
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Song = app.module();

  // Default Model.
  Song.Model = Backbone.Model.extend({
  
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

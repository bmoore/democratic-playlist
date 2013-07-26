define([
  'backbone'
], function(Backbone) {
  var Artist = {};

  Artist.Model = Backbone.Model.extend({
    initialize: function(args) {
    },

		defaults: {
      name: "<Unknown>",
      prefix: "",
    }
  });

  return Artist;
});

define([
  'backbone',
], function(Backbone) {
  var Artist = {};

  Artist.Model = Backbone.Model.extend({
    initialize: function() {
    },
		defaults: {
      name: "<Unknown>",
      prefix: "",
    }
  });

  return Artist;
});

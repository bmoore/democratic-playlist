define([
  'backbone'
], function(Backbone) {
  var User = {};

  User.Model = Backbone.Model.extend({
    initialize: function() {
    },
		defaults: {
      name: 'John Doe',
      username: 'jdoe',
      password: 'SHA1 hash or something',
      email: 'jdoe@mailinator.com'
    }
  });

  return User;
});

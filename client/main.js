require([
  "jquery",
  "backbone",
  "routers/main",
  "routers/library",
], function($, Backbone, MainRouter, LibraryRouter) {
  $(function() {
    new MainRouter();
    new LibraryRouter();
    Backbone.history.start();
  });
});

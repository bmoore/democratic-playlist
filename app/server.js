define([
  'http',
  'router'
], function (Http, Router) {
  var Server = Http.createServer(Router);

  return Server
});

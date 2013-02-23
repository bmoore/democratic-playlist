requirejs([
  'server/router',
  'server/server',
  'server/sockets',
], function (Router, Server, Sockets) {
  Server.listen(3000);
});

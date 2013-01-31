var requirejs = require('requirejs');

requirejs.config({
  deps: [
  ],
  paths: {
  },
  shim: {
  },
  nodeRequire: require
});

requirejs([
  'server/router',
  'server/server',
  'server/sockets'
], function (Router, Server, Sockets) {
  Server.listen(3000);
});

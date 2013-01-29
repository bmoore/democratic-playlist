var requirejs = require('requirejs');

requirejs.config({
  deps: [
  ],
  paths: {
    router: './app/router',
    server: './app/server',
    sockets: './app/sockets'
  },
  shim: {
  },
  nodeRequire: require
});

requirejs([
  'router',
  'server',
  'sockets'
], function (Router, Server, Sockets) {
  Server.listen(3000);
});

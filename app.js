var requirejs = require('requirejs');

requirejs.config({
  deps: [
  ],
  paths: {
    router: './app/router',
    server: './app/server',
    sockets: './app/sockets',
    player: './app/player'
  },
  shim: {
  },
  nodeRequire: require
});

requirejs([
  'router',
  'server',
  'sockets',
  'player'
], function (Router, Server, Sockets, Player) {
  Server.listen(3000);
});

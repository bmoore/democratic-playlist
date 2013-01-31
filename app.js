var requirejs = require('requirejs');

requirejs.config({
  deps: [
  ],
  paths: {
    router: './app/router',
    server: './app/server',
    sockets: './app/sockets',
    player: './app/player',
    playlist: './app/models/playlist'
  },
  shim: {
  },
  nodeRequire: require
});

requirejs([
  'router',
  'server',
  'sockets',
  'player',
  'playlist'
], function (Router, Server, Sockets, Player, Playlist) {
  Server.listen(3000);
  console.log(Playlist);
});

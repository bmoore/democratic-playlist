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
  'server/sockets',
  'server/modules/song',
], function (Router, Server, Sockets, Song, Player) {
  Server.listen(3000);

  Songs = new Song.Collection();
  Songs.fetch({album_id: 1});

});

requirejs([
  'server/router',
  'server/server',
  'server/sockets',
  'server/tools/player'
], function (Router, Server, Sockets, Player) {
  Server.listen(3000);
  Player.play({path: 'music/Discovery/08 High Life.mp3'});
});

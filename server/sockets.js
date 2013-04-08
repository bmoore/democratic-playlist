define([
  'socket.io',
  'server/server'
], function(IO, Server) {
  Sockets = IO.listen(Server).sockets;

  Sockets.on('connection', function (socket) {
    socket.emit('news', {hello: 'world'});
    socket.on('shout', function(data) {
    });
  });

  return Sockets;
});

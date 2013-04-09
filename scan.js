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
  'fs',
  'musicmetadata'
], function(FS, MM) {
  var parser = new MM(FS.createReadStream('music/Discovery/01 One More Time Daft Punk Discovery.mp3'));

  parser.on('metadata', function(res) {
    console.log(res);
  });
});

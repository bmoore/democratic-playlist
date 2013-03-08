var requirejs = require('requirejs');

requirejs.config({
  deps: [
    "server/backbone", "main"
  ],
  paths: {
    'modules': 'server/modules'
  },
  shim: {
  },
  nodeRequire: require
});

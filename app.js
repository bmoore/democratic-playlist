var requirejs = require('requirejs');

requirejs.config({
  deps: [
    "server/backbone", "main"
  ],
  paths: {
    'modules': 'server/modules',
    'controllers': 'server/controllers'
  },
  shim: {
  },
  nodeRequire: require
});

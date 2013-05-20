var requirejs = require('requirejs');

requirejs.config({
  deps: [
    "main"
  ],
  paths: {
    'modules': 'server/modules',
    'controllers': 'server/controllers'
  },
  shim: {
  },
  nodeRequire: require
});

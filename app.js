var requirejs = require('requirejs');

requirejs.config({
  deps: [
    "server/backbone", "main"
  ],
  paths: {
  },
  shim: {
  },
  nodeRequire: require
});

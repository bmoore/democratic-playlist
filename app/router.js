define([
  'express'
], function (Express) {
  var Router = Express();
  var web_dir = 'public';

  Router.get('/', function(req, res) {
    res.sendfile(web_dir+'/index.html');
  });

    Router.use('/static', Express.static(web_dir));

  return Router;
});

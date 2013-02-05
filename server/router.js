define([
  'express'
], function (Express) {
  var Router = Express();
  var web_dir = 'client';

  Router.get('/', function(req, res) {
    res.sendfile(web_dir+'/index.html');
  });

  Router.use('/', Express.static(web_dir));
  Router.use('/core/', Express.static('core'));

  return Router;
});

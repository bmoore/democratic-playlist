define([
  'modules/vote',
], function (Vote) {

  var VoteController = {
    get: function(req, res) {
      Vote.get_vote({
        values: [
          req.params.id
        ],
        success: function(results) {
          res.send(results);
        },
        error: function(err, query, options) {
          console.log(err, query, options);
          res.send(500);
        }
      });
    },
    post: function(req, res) {
      res.send(404);
    }
  };

  return VoteController;
});

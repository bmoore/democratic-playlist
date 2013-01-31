requirejs.config({
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        }
    }
});

require(["jquery", "backbone", "modules/playlist"], 
function($, Backbone, Playlist) {
    $(function() {
				console.log(_);
				console.log(Playlist);
    });
});

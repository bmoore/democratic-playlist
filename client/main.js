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


require(["jquery", "backbone", "modules/jquery.alpha", "modules/jquery.beta", "modules/playlist"], 
function($, Backbone,  Alpha, Beta, Playlist) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
				console.log(_);
        $('body').alpha().beta();
				console.log(Playlist);
    });
});

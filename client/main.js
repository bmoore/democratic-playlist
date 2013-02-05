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

require(["jquery", "backbone", "modules/playlist", "modules/song"], 
function($, Backbone, Playlist, Song) {
    $(function() {
				var pl = new Playlist.Model();
				var song = new Song.Model();

				// song view test
				//var sv = new Song.View({model: song, el: $('#playlist').find('li').eq(1) });
				//sv.render();

				// playlist view test
				var plv = new Playlist.View({model: pl, el: '#playlist' });
				plv.render();
    });
});

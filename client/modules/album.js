define([
  'core/modules/album',
  'modules/views/album'
], function(CoreAlbum, AlbumViews) {
  var Album = {};
  _.extend(Album, CoreAlbum);

  Album.Model = CoreAlbum.Model.extend({
    initialize: function(args) {
      CoreAlbum.Model.prototype.initialize.call(this, args);
      if (args) {
        if (args.songs) {
          this.set('songs', args.songs);
          this.setArtist();
        }
      }
    },

    parse: function(response, options) {
      this.set('id', response.id);
      this.set('name', response.name);
      this.set('prefix', response.prefix);
      this.set('disk', response.disk);
      this.set('year', response.year);
      if (response.songs) {
        this.set('songs', response.songs);
        this.setArtist();
      }
    },

    urlRoot: '/album',

    setArtist: function() {
      var name = false;
      if (this.get('songs')) {
        _.each(this.get('songs'), function(song) {
          if (name && name != song.artist.name) {
            name = 'Various';
          } else {
            name = song.artist.name;
          }
        });
      }
      this.set('artist', name);
    }
  });

  Album.Collection = CoreAlbum.Collection.extend({
    model: Album.Model,
    url: 'albums'
  });

  Album.Views = AlbumViews;

  return Album;
 });

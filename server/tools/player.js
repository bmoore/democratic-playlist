define([
  'fs',
  'lame',
  'speaker',
  'modules/playlist',
], function(File, Lame, Speaker, Playlist){
  var Player = {
    playing: false,

    initialize: function() {
      //get playlist
      this.playlist = new Playlist.Model();
      this.playlist.fetch();

      //play next song
      this.play_next_song();

      //set event on speaker.end
      this.speaker.on("end",function() {
        Player.play_next_song();
      });
    },

    playlist: {},

    decoder: {},

    speaker: {},

    stream: {},

    play: function(song) {
      if (song == undefined) {
      }

      this.stop();
      this.decoder = new Lame.Decoder();

      this.stream = File.createReadStream(song.path);
      this.stream.pipe(this.decoder);

      this.decoder.on('format', function(format) {
        Player.speaker = new Speaker(format);
        this.pipe(Player.speaker);
      });

      this.playing = true;
    },

    stop: function() {
      if (this.playing) {
        this.speaker.end();
        this.decoder.end();
        this.stream.destroy();
        this.playing = false;
      }
    },
  };

  return Player;
});

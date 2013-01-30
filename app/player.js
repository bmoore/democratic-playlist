define([
  'fs',
  'lame',
  'speaker'
], function(File, Lame, Speaker){
  var Player = {
    playing: false,

    decoder: {},

    speaker: {},

    stream: {},

    play: function(song) {
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
    }
  };

  return Player;
});

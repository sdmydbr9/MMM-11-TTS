Module.register("MMM-11-TTS", {
  defaults: {
    apiKey: "",
    voiceId: "",
    languageId: "en_us",
    startUpText: "Welcome to MagicMirror"
  },

  // other functions

  start: function() {
    Log.info("Starting module: " + this.name);
    this.sendSocketNotification("MMM-11-TTS_START", this.config);
  }
});

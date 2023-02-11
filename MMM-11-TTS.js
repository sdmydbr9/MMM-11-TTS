Module.register("MMM-11-TTS", {
  defaults: {
    useScreenReader: true,
    useNotification: true,
    voice: "default",
    ttsAPIKey: "",
    ttsModelID: "21m00Tcm4TlvDq8ikWAM",
    ttsLanguageID: "en-US",
    welcome: {
      enabled: true,
      message: "Hello, welcome to your MagicMirror!"
    }
  },

  start: function() {
    Log.info("Starting module: " + this.name);
    this.sendSocketNotification("INIT", this.config);
    if (this.config.welcome.enabled) {
      this.sendSocketNotification("SAY", this.config.welcome.message);
    }
  },

  notificationReceived: function(notification, payload, sender) {
    if (this.config.useNotification && notification == "TTS_SAY") {
      this.sendSocketNotification("SAY", payload);
    } else if (this.config.useScreenReader && notification == "SHOW_ALERT") {
      var message = payload.message;
      this.sendSocketNotification("READ", message);
    }
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification == "TTS_END") {
      this.sendNotification("TTS_SAY_ENDING", payload);
    } else if (notification == "TTS_ERROR") {
      this.sendNotification("TTS_SAY_ERROR", payload);
    }
  },

  notificationTrigger: {
    "TEST_TTS": "Test TTS notification is coming",
    "SHOW_ALERT": (payload, sender) => {
      return payload.message;
    }
  },

  notifications: {
    TTS_SAY: "TTS_SAY",
    TTS_SAY_STARTING: "TTS_SAY_STARTING",
    TTS_SAY_ENDING: "TTS_SAY_ENDING",
    TTS_SAY_ERROR: "TTS_SAY_ERROR"
  }
});

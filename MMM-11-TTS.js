Module.register("MMM-11-TTS", {
  // ... other code ...
  socketNotificationReceived: function (notification, payload) {
    if (notification === "SHOW_ALERT") {
      console.log("Received socket notification:", payload);
    }
  },
});

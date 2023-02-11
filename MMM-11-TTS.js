Module.register("MMM-11-TTS", {

    // Define module defaults
    defaults: {
        apiKey: "",
        voiceId: "",
        languageId: "en_us",
        text: "Hello World"
    },

    // Define required scripts
    getScripts: function() {
        return ["node_helper.js"];
    },

    // Define required styles
    getStyles: function() {
        return [];
    },

    // Define start function
    start: function() {
        Log.info("Starting module: " + this.name);
    },

    // Define notification handler
    notificationReceived: function(notification, payload, sender) {
        if (notification === "SHOW_ALERT") {
            Log.info("Notification received: " + notification);
            this.sendSocketNotification("TTS_PLAY", payload);
        }
    }
});

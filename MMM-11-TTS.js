Module.register("MMM-11-TTS",{

    // Default config options
    defaults: {
        apiKey: "",
        voiceId: ""
    },

    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");
        return wrapper;
    },

    // Start the module
    start: function() {
        Log.info("Starting module: " + this.name);
        this.config = Object.assign({}, this.defaults, this.config);

        this.sendSocketNotification("MMM-11-TTS_START", this.config);
    },

    // Handle notifications
    socketNotificationReceived: function(notification, payload) {
        if (notification === "SHOW_ALERT") {
            var text = payload;
            this.sendSocketNotification("MMM-11-TTS_TEXT", text);
        }
    }
});

Module.register("MMM-11-TTS", {
    // Default config options
    defaults: {
        apiKey: "",
        voiceId: "",
        startUpMessage: "MMM-11-TTS module has started"
    },

    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");
        return wrapper;
    },

    // Start the module
    start: function() {
        console.log(this.config.startUpMessage);
        console.log("Starting module: " + this.name);
        this.config = Object.assign({}, this.defaults, this.config);

        this.sendSocketNotification("MMM-11-TTS_START", this.config);
    },

    // Handle notifications
    socketNotificationReceived: function(notification, payload) {
        console.log("Received socket notification:", notification);
        if (notification === "SHOW_ALERT") {
            console.log("Received SHOW_ALERT payload:", payload);
            var text = payload.message;
            console.log("SHOW_ALERT message:", text);
            this.sendSocketNotification("MMM-11-TTS_TEXT", text);
        }
    }
});

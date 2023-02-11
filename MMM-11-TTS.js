Module.register("MMM-11-TTS", {
    start: function() {
        console.log(`Starting module: ${this.name}`);
    },

    notificationReceived: function(notification, payload) {
        if (notification === 'SHOW_ALERT') {
            console.log(`Received notification: ${notification}`);
            console.log(`Payload: ${payload}`);
        }
    }
});

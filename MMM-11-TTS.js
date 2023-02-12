Module.register("MMM-11-TTS", {
    defaults: {
    },

    start: function() {
        console.log(`Starting module: ${this.name}`);
    },

    getStyles: function() {
        return [];
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.innerHTML = "Hello World!";
        return wrapper;
    },

    notificationReceived: function(notification, payload) {
        if (notification === 'SHOW_ALERT') {
            console.log(`Received notification: ${notification}`);
            console.log(`Payload: ${payload}`);
        }
    }
});

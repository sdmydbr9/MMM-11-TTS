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

    notificationReceived: function(notification, payload, sender) {
        if (notification === 'SHOW_ALERT') {
            console.log(`Received notification: ${notification} from ${sender.name}`);
            console.log(`Payload: ${JSON.stringify(payload)}`);
        }
    }
});

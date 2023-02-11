Module.register("MMM-11-TTS", {
    notificationReceived: function(notification, payload) {
        if (notification === 'SHOW_ALERT') {
            console.log("Received SHOW_ALERT notification: " + payload.message);
            this.sendSocketNotification("TTS", payload);
            this.tts = payload;
            this.updateDom();
        }
    }
});

Module.register("MMM-11-TTS", {
    notificationReceived(notification, payload) {
        if (notification === "SHOW_ALERT") {
            console.log("Received SHOW_ALERT notification: " + payload.message);
        }
    }
});

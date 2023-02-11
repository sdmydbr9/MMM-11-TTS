const { spawn } = require("child_process");

module.exports = NodeHelper.create({
  start: function() {
    console.log(`Starting module helper: ${this.name}`);
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "SHOW_ALERT") {
      console.log(`Received notification: ${notification}`);
      this.runScript(payload);
    }
  },

  runScript: function(payload) {
    console.log(`Running Python script with text: ${payload.text}`);
    const process = spawn("python3", ["./main.py", payload.text, payload.voice_id, payload.api_key]);
    process.stdout.on("data", data => {
      console.log(`Script output: ${data.toString()}`);
    });
    process.stderr.on("data", data => {
      console.log(`Script error: ${data.toString()}`);
    });
    process.on("close", code => {
      console.log(`Script finished with code: ${code}`);
    });
  }
});

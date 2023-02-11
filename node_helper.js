const NodeHelper = require("node_helper");
const { spawn } = require("child_process");

module.exports = NodeHelper.create({
  start: function() {
    console.log(`Starting module helper: ${this.name}`);
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "MMM-11-TTS_TEXT") {
      console.log("Received text for TTS:", payload);
      this.runScript(payload, this.config.apiKey, this.config.voiceId);
    }
  },

  runScript: function(text, apiKey, voiceId) {
    console.log(`Running Python script with text: ${text}`);
    const process = spawn("python3", ["./main.py", text, voiceId, apiKey]);
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

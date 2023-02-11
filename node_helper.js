var exec = require("child_process").exec;
var PythonShell = require("python-shell");

module.exports = NodeHelper.create({
  start: function() {
    console.log("MMM-11-TTS helper started");
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "SHOW_ALERT") {
      var options = {
        mode: "text",
        pythonPath: "/usr/bin/python3",
        pythonOptions: ["-u"],
        scriptPath: "/home/pi/MagicMirror/modules/MMM-11-TTS",
        args: [payload]
      };

      PythonShell.run("main.py", options, function(err, results) {
        if (err) throw err;
        console.log("results: %j", results);
      });
    }
  }
});

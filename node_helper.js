var NodeHelper = require("node_helper");
var request = require("request");
var fs = require("fs");
var exec = require("child_process").exec;

module.exports = NodeHelper.create({
  start: function() {
    console.log("[MMM-11-TTS] Initializing node helper for: " + this.name);
  },

  getTTS: function(payload, response) {
    var self = this;
    var options = {
      method: "POST",
      url: "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM",
      headers: {
        "accept": "audio/mpeg",
        "xi-api-key": "add37c5c39741c022b1cfa0d6af24e0b",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "text": payload.text,
        "model_id": payload.model_id,
        "language_id": payload.language_id
      })
    };

    request(options, function(error, response, body) {
      if (error) {
        console.log("[MMM-11-TTS] Error: " + error);
        response.send("ERROR");
        return;
      }

      if (response.statusCode === 200) {
        self.playTTS(payload, response, body);
      } else {
        console.log("[MMM-11-TTS] API error: " + response.statusCode);
        response.send("ERROR");
      }
    });
  },

  playTTS: function(payload, response, buffer) {
    var filename = this.tmpFile + "/" + payload.uid + ".mp3";
    var self = this;

    fs.writeFile(filename, buffer, function(error) {
      if (error) {
        console.log("[MMM-11-TTS] Error: " + error);
        response.send("ERROR");
        return;
      }

      self.sendSocketNotification("TTS_FILE", {
        uid: payload.uid,
        file: filename,
        type: "mp3"
      });

      response.send("OK");
    });
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "TTS_END") {
      this.sendNotification("TTS_SAY_ENDING", payload);

      // Play the audio as soon as it's received
      var playCommand = "aplay " + payload;
      exec(playCommand, function(error, stdout, stderr) {
        if (error) {
          console.error(error);
        }
      });
    } else if (notification === "TTS_ERROR") {
      this.sendNotification("TTS_SAY_ERROR", payload);
    }
  }
});

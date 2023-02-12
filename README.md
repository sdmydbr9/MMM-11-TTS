# MMM-11-TTS
this module is dependent on MMM-Notification-Trigger module 
after cloning the modules, add the following lines

config file



``` 
{
  module: "MMM-NotificationTrigger",
  config: {
    useWebhook:true,
    triggers:[
      {
        trigger: "SHOW_ALERT",
        fires: [
          {
            fire: "python3",
            payload: function(payload) {
              return {
                command: `python3 /home/pi/MagicMirror/modules/MMM-11-TTS/main.py "${payload.message}" ${apiKey} ${voiceId}`,
                env: {
                  apiKey: '',
                  voiceId: ''
                }
              }
            },
          },
        ],
      },
    ]
  }
}

var startUpMessage = `python3 /home/pi/MagicMirror/modules/MMM-11-TTS/main.py "Welcome to the Magic Mirror" ${apiKey} ${voiceId}`;
var env = {
  apiKey: 'api key',
  voiceId: 'voice id'
};



``` 

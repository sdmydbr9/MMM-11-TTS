# MMM-11-TTS
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
	],
      }
 }


``` 

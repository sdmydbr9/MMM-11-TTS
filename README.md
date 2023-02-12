This module adds text to speech functionality with the api from 11 labs. 

First install the MMM-NotificationTrigger module
clone this module
Run pip3 install -r requirements.txt
edit the config.ini with you credentials 
edit the config and add the following lines

config file

  
```
{
  module: "MMM-NotificationTrigger",
  config: {
    triggers:[
      {
        trigger: "SHOW_ALERT",
        fires: [
          {
            fire:"MY_COMMAND",
            exec: (payload) => `python3 /home/pi/MagicMirror/modules/MMM-11-TTS/main.py "${payload.message}"`,
          },
        ],
      },
    ]
  }
}

```

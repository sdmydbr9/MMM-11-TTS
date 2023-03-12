This module adds text to speech functionality with the api from 11 labs. 

First install the MMM-NotificationTrigger module

## Edit main.py and add your api keys from eleven labs


clone this module

Run 
```
pip3 install -r requirements.txt
```

edit the config.ini with you credentials 


edit the config.js and add the following lines

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

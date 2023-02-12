first install the MMM-NotificationTrigger module
clone this module
edit the config.ini with you credentials 
edit the comfig and add the following lines

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

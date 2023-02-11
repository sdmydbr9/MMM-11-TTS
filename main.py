import requests
import subprocess

class MMM_11_TTS:
    def __init__(self, config):
        self.api_key = config["api_key"]
        self.voice_id = config["voice_id"]
        self.language_id = config["language_id"]
        self.url = f"https://api.elevenlabs.io/v1/text-to-speech/{self.voice_id}"
        self.headers = {
            "accept": "audio/mpeg",
            "xi-api-key": self.api_key,
            "Content-Type": "application/json",
        }

    def play_tts(self, text):
        data = {
            "text": text,
            "model_id": "prod",
            "language_id": self.language_id
        }

        response = requests.post(self.url, headers=self.headers, json=data)

        if response.status_code == 200:
            with open("hello_world.mp3", "wb") as f:
                f.write(response.content)
                print("Audio generated and saved to hello_world.mp3")
                subprocess.call(['ffmpeg', '-i', 'hello_world.mp3', 'hello_world.wav'])
                print("Audio converted to wav format and saved as hello_world.wav")
                subprocess.call(['aplay', 'hello_world.wav'])
                print("Audio playing...")
                subprocess.call(['rm', 'hello_world.mp3'])
                subprocess.call(['rm', 'hello_world.wav'])
                print("Files deleted.")
        else:
            print("Request failed with status code:", response.status_code)

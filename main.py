import argparse
import requests
import subprocess

API_KEY = "api" #from https://beta.elevenlabs.io/speech-synthesis
VOICE_ID = "EXAVITQu4vr4xnSDxMaL" #any voice you want 

def execute_script(text):
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}"
    headers = {
        "accept": "audio/mpeg",
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
    }

    data = {
        "text": text,
        "model_id": "eleven_monolingual_v1",
        "language_id": "en_us"
    }

    response = requests.post(url, headers=headers, json=data)

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

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('text', nargs='+', help="Text to be synthesized, enclosed in single quotes")
    args = parser.parse_args()

    text = ' '.join(args.text)
    execute_script(text)
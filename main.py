import argparse
import requests
import subprocess

parser = argparse.ArgumentParser()
parser.add_argument("text", help="The text to be synthesized")
parser.add_argument("voice_id", help="The voice ID")
parser.add_argument("api_key", help="The API key")
args = parser.parse_args()

url = f"https://api.elevenlabs.io/v1/text-to-speech/{args.voice_id}"
headers = {
    "accept": "audio/mpeg",
    "xi-api-key": args.api_key,
    "Content-Type": "application/json",
}

data = {
    "text": args.text,
    "model_id": "prod",
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

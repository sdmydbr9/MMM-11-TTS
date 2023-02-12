import argparse
import requests
import subprocess

def execute_script(text, api_key, voice_id):
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    headers = {
        "accept": "audio/mpeg",
        "xi-api-key": api_key,
        "Content-Type": "application/json",
    }

    data = {
        "text": text,
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

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("text", type=str, help="Text to be synthesized")
    parser.add_argument("api_key", type=str, help="API key for the text-to-speech service")
    parser.add_argument("voice_id", type=str, help="ID of the voice to be used for synthesis")

    args = parser.parse_args()
    text = args.text
    api_key = args.api_key
    voice_id = args.voice_id

    execute_script(text, api_key, voice_id)

if __name__ == "__main__":
    main()

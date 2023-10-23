import argparse
from elevenlabs import generate, play, set_api_key

# Set your API key here
set_api_key("<YOUR_API_KEY>")

VOICE_ID = "EXAVITQu4vr4xnSDxMaL"  # any voice you want

def execute_script(text):
    audio = generate(
        text=text,
        voice=VOICE_ID,
        model="eleven_monolingual_v1"
    )

    play(audio)
    print("Audio playing...")

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('text', nargs='+', help="Text to be synthesized, enclosed in single quotes")
    args = parser.parse_args()

    text = ' '.join(args.text)
    execute_script(text)

#import config
import os
import glob
import whisper
import requests
print("hi")

TRANSCRIPT_FILE = "transcript.txt"
OUTPUT_FILE = "notes.txt"

os.makedirs("recordings", exist_ok=True)
recordings_dir = "recordings"
full_path = os.path.join("Models", "recordings")

model = whisper.load_model("base")

current_chunk = []
print("pls")
while True:
    files = sorted(glob.glob(os.path.join(recordings_dir, '*')), key=os.path.getctime)
    print(os.path.join(recordings_dir, '*'))
    if len(files) < 1:
        continue

    latest_recording = files[0]
    latest_recording = os.path.join(os.getcwd(), latest_recording).replace("\\","/")
    print(latest_recording[2:] + "hi")

    if os.path.exists(latest_recording[2:]):
        audio = whisper.load_audio(latest_recording[2:])
        audio = whisper.pad_or_trim(audio)
        mel = whisper.log_mel_spectrogram(audio).to(model.device)
        options = whisper.DecodingOptions(language= 'en', fp16=False)

        result = whisper.decode(model, mel, options)

        with open(TRANSCRIPT_FILE, 'a') as f:
            f.write(result.text)

        current_chunk.extend(result.text.split())

        os.remove(os.path.join(recordings_dir, latest_recording))
        print(os.path.join(recordings_dir, latest_recording))
    
    if (len(current_chunk) > 40 and result.text[-1] == '.') or len(current_chunk) > 80:
        text = " ".join(current_chunk)
        
        new_notes = requests.get("http://localhost:8080/notes", json={"text": text}).json()
        with open(OUTPUT_FILE, 'a') as f:
            f.write(text + "\n")
        
        res = requests.get("http://localhost:8080/vectorize", json={"text": text}).json()

        current_chunk = current_chunk[-10:]
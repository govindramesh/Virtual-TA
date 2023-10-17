import soundcard as sc
import soundfile as sf
import sounddevice as sd
from datetime import datetime
import time
import os

output_dir = "recordings"
os.makedirs(output_dir, exist_ok=True)

def listen_windows():
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    OUTPUT_FILE_NAME = os.path.join(output_dir, f"out_{timestamp}.wav")

    SAMPLE_RATE = 48000              # [Hz]. sampling rate.
    RECORD_SEC = 5                  # [sec]. duration recording audio.

    with sc.get_microphone(id=str(sc.default_speaker().name), include_loopback=True).recorder(samplerate=SAMPLE_RATE) as mic:
        # record audio with loopback from the default speaker.
        data = mic.record(numframes=SAMPLE_RATE * RECORD_SEC)
        time.sleep(5)
        sf.write(file=OUTPUT_FILE_NAME, data=data[:, 0], samplerate=SAMPLE_RATE)


def listen_mac():
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    OUTPUT_FILE_NAME = os.path.join(output_dir, f"out_{timestamp}.wav")

    SAMPLE_RATE = 48000     
    sd.default.samplerate = SAMPLE_RATE
    sd.default.channels = 1
    duration = 5  # seconds

    myrecording = sd.rec(int(duration * SAMPLE_RATE), dtype='float64')
    sd.wait()

    sf.write(file=OUTPUT_FILE_NAME, data=myrecording[:, 0], samplerate=SAMPLE_RATE)

if os.name == "posix":
    while True:
        listen_mac()
else:
    while True:
        print("hi")
        listen_windows()
        print("bye")
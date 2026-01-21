from fastapi import FastAPI
from pydantic import BaseModel
from transformers import MusicgenForConditionalGeneration, AutoProcessor
import torch
import numpy as np
import scipy.io.wavfile as wav
import uuid
from fastapi.responses import FileResponse

app = FastAPI()

device = "cpu"

torch.set_num_threads(4)
torch.set_grad_enabled(False)

processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small").to(
    device
)
model.eval()

with torch.no_grad():
    _ = model.generate(
        **processor(text="warm up", return_tensors="pt"),
        max_new_tokens=32,
        do_sample=True,
        temperature=1.0,
    )


class Req(BaseModel):
    prompt: str


@app.post("/generate")
def generate(req: Req):
    inputs = processor(text=req.prompt, return_tensors="pt")

    with torch.no_grad():
        audio_values = model.generate(
            **inputs, max_new_tokens=384, do_sample=True, temperature=1.0
        )

    audio = audio_values[0].cpu().numpy()

    if audio.ndim == 2:
        audio = np.mean(audio, axis=0)

    audio = np.clip(audio, -1.0, 1.0)
    audio_int16 = (audio * 32767).astype(np.int16)

    filename = f"{uuid.uuid4()}.wav"
    wav.write(filename, 32000, audio_int16)

    return {"audioUrl": f"http://localhost:8001/{filename}"}


@app.get("/{file}")
def get_file(file: str):
    return FileResponse(file)

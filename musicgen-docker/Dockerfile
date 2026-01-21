FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    ffmpeg \
    git \
    && rm -rf /var/lib/apt/lists/*

ENV NUMPY_EXPERIMENTAL_ARRAY_API=0

COPY requirements.txt .

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

RUN python - <<EOF
from transformers import AutoProcessor, MusicgenForConditionalGeneration
AutoProcessor.from_pretrained("facebook/musicgen-small")
MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")
EOF


COPY app.py .

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8001"]

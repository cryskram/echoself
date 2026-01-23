import os
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
)

AUDIO_ROOT = "./public/music"
CLOUDINARY_ROOT = "echoself/music"

for genre in os.listdir(AUDIO_ROOT):
    genre_path = os.path.join(AUDIO_ROOT, genre)
    if not os.path.isdir(genre_path):
        continue

    for file in os.listdir(genre_path):
        if not file.endswith(".wav"):
            continue

        full_path = os.path.join(genre_path, file)
        public_id = f"{CLOUDINARY_ROOT}/{genre}/{file.replace('.wav','')}"

        print(f"Uploading {genre}/{file}")

        cloudinary.uploader.upload(
            full_path,
            resource_type="video",
            public_id=public_id,
            overwrite=True,
        )

print("Upload complete")

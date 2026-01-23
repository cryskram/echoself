const CLOUDINARY_AUDIO_BASE = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/echoself/music`;

const MUSIC: Record<string, string[]> = {
  rock: ["rock_1.wav", "rock_2.wav", "rock_3.wav", "rock_4.wav"],
  edm: ["edm_1.wav", "edm_2.wav", "edm_3.wav", "edm_4.wav"],
  chill: ["chill_1.wav", "chill_2.wav", "chill_3.wav", "chill_4.wav"],
  jazz: ["jazz_1.wav", "jazz_2.wav", "jazz_3.wav", "jazz_4.wav"],
  hindustani: [
    "hindustani_1.wav",
    "hindustani_2.wav",
    "hindustani_3.wav",
    "hindustani_4.wav",
  ],
  carnatic: [
    "carnatic_1.wav",
    "carnatic_2.wav",
    "carnatic_3.wav",
    "carnatic_4.wav",
  ],
  indian: ["indian_1.wav", "indian_2.wav", "indian_3.wav", "indian_4.wav"],
  bollywood: [
    "bollywood_1.wav",
    "bollywood_2.wav",
    "bollywood_3.wav",
    "bollywood_4.wav",
  ],
};

export function getRandomMusic(genre: string) {
  const tracks = MUSIC[genre];
  if (!tracks) return null;

  const file = tracks[Math.floor(Math.random() * tracks.length)];

  return {
    file,
    url: `${CLOUDINARY_AUDIO_BASE}/${genre}/${file}`,
  };
}

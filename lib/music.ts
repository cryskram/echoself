const MUSIC: Record<string, string[]> = {
  rock: [
    "/music/rock/rock_1.wav",
    "/music/rock/rock_2.wav",
    "/music/rock/rock_3.wav",
    "/music/rock/rock_4.wav",
  ],
  edm: [
    "/music/edm/edm_1.wav",
    "/music/edm/edm_2.wav",
    "/music/edm/edm_3.wav",
    "/music/edm/edm_4.wav",
  ],
  chill: [
    "/music/chill/chill_1.wav",
    "/music/chill/chill_2.wav",
    "/music/chill/chill_3.wav",
    "/music/chill/chill_4.wav",
  ],
  jazz: [
    "/music/jazz/jazz_1.wav",
    "/music/jazz/jazz_2.wav",
    "/music/jazz/jazz_3.wav",
    "/music/jazz/jazz_4.wav",
  ],
};

export function getRandomMusic(genre: string) {
  const tracks = MUSIC[genre];
  if (!tracks) return null;
  return tracks[Math.floor(Math.random() * tracks.length)];
}

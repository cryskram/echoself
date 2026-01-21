export const GENRES = ["rock", "edm", "chill", "jazz"];

export const imagePrompt = (genre: string) => `
    Professional album cover portrait of the same person,
    ${genre} music aesthetic,
    cinematic lighting,
    studio photography,
    high fashion,
    award winning album cover,
    sharp focus, ultra-detailed
`;

export const musicPrompt = (genre: string) =>
  `Instrumental ${genre} music, studio quality`;

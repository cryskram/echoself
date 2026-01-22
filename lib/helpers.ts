export const GENRES = ["rock", "edm", "chill", "jazz"] as const;

const GENRE_STYLES: Record<string, string> = {
  rock: `
    dark rock concert stage,
    gritty atmosphere,
    leather jacket, distressed clothing,
    dramatic shadows, high contrast lighting,
    rebellious, raw energy
  `,
  edm: `
    futuristic neon club environment,
    cyberpunk lighting,
    LED lights, lasers, holograms,
    modern streetwear, bold colors,
    energetic, high saturation
  `,
  chill: `
    calm minimalist background,
    soft pastel colors,
    cozy oversized clothing,
    warm ambient lighting,
    dreamy, relaxed mood
  `,
  jazz: `
    elegant vintage jazz club,
    warm golden lighting,
    classy tailored outfit,
    timeless, sophisticated atmosphere
  `,
};

export const imagePrompt = (genre: string) => `
Use the uploaded image as a strict identity reference.

The person must be the SAME individual:
- same face
- same facial features
- same identity
- realistic likeness

Completely change EVERYTHING ELSE:
- replace background
- replace clothing
- replace lighting and color palette

Create a professional album cover portrait.

STYLE:
${GENRE_STYLES[genre]}

TEXT ON IMAGE:
- Include the genre name "${genre.toUpperCase()}"
- Displayed as clean, bold album-cover typography
- Positioned either at the top or bottom of the image
- High contrast and clearly readable
- Modern, stylish font appropriate for the genre
- Text must be spelled correctly
- No other text besides the genre name

PHOTOGRAPHY:
- cinematic studio lighting
- shallow depth of field
- sharp focus on subject
- ultra-detailed
- award-winning album cover quality

No logos, no watermarks, no extra text.
`;

// export const musicPrompt = (genre: string) =>
//   `Instrumental ${genre} music, studio quality`;

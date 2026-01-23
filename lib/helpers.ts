export const GENRES = [
  "rock",
  "edm",
  "chill",
  "jazz",
  "hindustani",
  "carnatic",
  "indian",
  "bollywood",
] as const;

const GENRE_STYLES: Record<string, string> = {
  rock: `
    gritty modern rock album cover,
    moody concert-stage atmosphere,
    dark textured background with subtle grain,
    leather or denim clothing with rugged details,
    dramatic directional lighting,
    high contrast shadows,
    rebellious, intense, raw energy,
    bold masculine or edgy aesthetic
  `,

  edm: `
    futuristic electronic music album cover,
    neon-lit club or abstract digital environment,
    vibrant cyan, magenta, purple lighting,
    LED glow, light streaks, subtle motion blur,
    modern streetwear or minimal tech fashion,
    high saturation, glossy finish,
    energetic, night-life driven atmosphere
  `,

  chill: `
    chill lo-fi album cover aesthetic,
    soft minimalist background,
    muted pastel color palette,
    cozy oversized clothing or casual wear,
    warm diffused lighting,
    relaxed body language,
    dreamy, introspective, calm mood,
    gentle cinematic softness
  `,

  jazz: `
    classic jazz album cover,
    intimate vintage jazz club environment,
    warm amber and golden lighting,
    elegant formal or semi-formal attire,
    timeless cinematic composition,
    subtle film grain,
    sophisticated, soulful, late-night atmosphere
  `,

  hindustani: `
    hindustani classical album cover,
    serene and meditative atmosphere,
    rich earthy tones (deep browns, maroon, gold),
    traditional north indian attire (kurta, shawl, dupatta inspired styling),
    soft warm stage lighting,
    spiritual and contemplative mood,
    dignified classical elegance,
    refined cultural authenticity
  `,

  carnatic: `
    carnatic classical album cover,
    south indian classical concert aesthetic,
    bright yet warm color palette,
    traditional south indian attire (silk textures, veshti or saree inspired styling),
    temple or heritage auditorium inspired backdrop,
    rhythmic, disciplined, energetic mood,
    cultural richness with refined precision
  `,

  indian: `
    modern indian fusion album cover,
    culturally rooted yet contemporary aesthetic,
    warm rich colors inspired by indian art (indigo, ivory, gold, maroon),
    elegant indo-fusion clothing,
    handcrafted fabric textures,
    cinematic lighting with emotional depth,
    calm, expressive, soulful atmosphere,
    premium cultural elegance
  `,

  bollywood: `
    cinematic Bollywood movie poster aesthetic,
    modern Indian film styling,
    dramatic cinematic lighting with soft glow,
    expressive emotional mood,
    stylish contemporary Indian outfit (movie-style, not traditional concert wear),
    rich colors with warm highlights,
    shallow depth of field,
    glamorous yet grounded look,
    polished commercial film production feel
    influenced by modern Indian cinema and mainstream film posters
  `,
};

export const imagePrompt = (genre: string) => `
The uploaded image is a FACE IDENTITY REFERENCE.

CRITICAL IDENTITY RULES (HIGHEST PRIORITY):
- The generated person must be IDENTICAL to the uploaded person
- Preserve exact facial structure, proportions, and bone structure
- Preserve eye shape, nose shape, lip shape, jawline, and cheekbones
- Preserve skin tone, age, gender, and ethnicity
- This is NOT a new person
- This is NOT a reinterpretation
- This is NOT a look-alike
- It is the SAME person photographed in a different scene

FORBIDDEN CHANGES:
- Do NOT redesign or beautify the face
- Do NOT alter facial proportions or symmetry
- Do NOT stylize the face
- Do NOT exaggerate features
- Do NOT add heavy makeup that changes face shape

HAIR RULES:
- Hairstyle must remain very similar to the uploaded image
- Same hair length and hairline
- Only minor styling adjustments allowed

ALLOWED CHANGES (DO NOT AFFECT FACE):
- Background
- Clothing
- Environment
- Lighting and color palette

Create a professional ALBUM COVER PORTRAIT.

STYLE DIRECTION:
${GENRE_STYLES[genre]}

TEXT ON IMAGE:
- Include the genre name "${genre.toUpperCase()}"
- Clean, bold album-cover typography
- Positioned at top or bottom of the image
- High contrast and clearly readable
- Modern, genre-appropriate font
- Correct spelling
- NO other text

PHOTOGRAPHY:
- photorealistic
- cinematic studio lighting
- shallow depth of field
- sharp focus on face
- ultra-detailed
- award-winning album cover quality

FINAL CONSTRAINTS:
- Face must look photorealistic and consistent with the original photo
- No illustration, no cartoon, no anime, no painterly style
- No logos
- No watermarks
- No extra text
`;

// export const musicPrompt = (genre: string) =>
//   `Instrumental ${genre} music, studio quality`;

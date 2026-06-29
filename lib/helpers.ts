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

export type Genre = (typeof GENRES)[number];

type GenreDetails = {
  mood: string;
  environment: string;
  lighting: string;
  composition: string;
  pose: string;
  camera: string;
  typography: string;
};

const ATTIRE_CONFIG: Record<Genre, { male: string; female: string }> = {
  rock: {
    male: "black leather jacket, vintage band tee, ripped black jeans, combat boots, layered silver chains",
    female:
      "black leather jacket, graphic tee, ripped jeans, ankle boots, layered silver jewelry",
  },
  edm: {
    male: "holographic bomber jacket, cargo pants and futuristic sneakers",
    female: "metallic holographic outfit with platform boots",
  },
  chill: {
    male: "overshirt, henley, chinos and white sneakers",
    female: "oversized cardigan over a floral dress",
  },
  jazz: {
    male: "tailored charcoal three-piece suit",
    female: "black velvet evening gown with pearl jewelry",
  },
  hindustani: {
    male: "traditional white kurta-pajama with embroidered shawl",
    female: "royal blue anarkali with silver embroidery",
  },
  carnatic: {
    male: "traditional silk pattu veshti with gold-bordered angavastram",
    female: "Kanchipuram silk saree with temple jewelry",
  },
  indian: {
    male: "modern navy kurta with off-white trousers",
    female: "embroidered kurta dress with mirror work",
  },
  bollywood: {
    male: "luxurious ivory sherwani with intricate gold embroidery",
    female: "grand crimson and gold lehenga",
  },
};

const GENRE_STYLES: Record<Genre, GenreDetails> = {
  rock: {
    mood: "Raw, rebellious, explosive live-performance energy.",
    environment:
      "Industrial concert venue with smoke, sparks, worn concrete, giant stage lights and amplifiers.",
    lighting:
      "Realistic red and white concert lighting. The same stage lights must illuminate the face, clothing and background consistently.",
    composition:
      "Wide cinematic concert framing from slightly below eye level.",
    pose: "Captured during the peak of a live performance with dynamic body language, weight shifted forward and authentic stage presence. Avoid static portrait poses.",
    camera:
      "35mm documentary concert photography, natural motion, subtle lens imperfections, HDR, shallow depth of field, editorial realism.",
    typography: "Distressed metallic chrome title.",
  },
  edm: {
    mood: "Futuristic festival euphoria.",
    environment:
      "Massive neon festival with lasers, holograms and volumetric fog.",
    lighting:
      "Neon cyan and magenta practical lighting affecting the entire subject consistently.",
    composition: "Centered cinematic portrait.",
    pose: "Immersed in the music with natural movement.",
    camera: "35mm festival photography, HDR editorial realism.",
    typography: "Chrome futuristic typography.",
  },
  chill: {
    mood: "Peaceful and nostalgic.",
    environment: "Golden-hour meadow with wildflowers.",
    lighting: "Warm sunset light naturally wrapping around the subject.",
    composition: "Relaxed editorial portrait.",
    pose: "Natural candid posture.",
    camera: "85mm portrait photography with creamy bokeh.",
    typography: "Elegant handwritten title.",
  },
  jazz: {
    mood: "Timeless sophistication.",
    environment: "Art Deco jazz lounge.",
    lighting: "Warm amber practical lighting with noir shadows.",
    composition: "Luxury editorial portrait.",
    pose: "Relaxed seated confidence.",
    camera: "85mm classic editorial photography.",
    typography: "Classic brass serif.",
  },
  hindustani: {
    mood: "Spiritual and meditative.",
    environment: "Ancient sandstone courtyard at sunrise.",
    lighting: "Natural sunrise lighting.",
    composition: "Centered portrait.",
    pose: "Calm seated posture.",
    camera: "85mm editorial portrait.",
    typography: "Traditional gold calligraphy.",
  },
  carnatic: {
    mood: "Devotional classical performance.",
    environment:
      "Ancient South Indian temple illuminated by brass oil lamps and incense.",
    lighting:
      "Warm flame-lit lighting. Oil lamps must illuminate the face exactly as they illuminate the surroundings.",
    composition: "Medium performance portrait.",
    pose: "Expressive singing with authentic classical hand gestures.",
    camera: "85mm low-light editorial photography.",
    typography: "South Indian ornamental gold lettering.",
  },
  indian: {
    mood: "Modern authentic lifestyle.",
    environment: "Indian street during blue hour with fairy lights.",
    lighting: "Natural evening practical lighting.",
    composition: "Fashion editorial portrait.",
    pose: "Relaxed confident lifestyle pose.",
    camera: "50mm lifestyle photography.",
    typography: "Minimal modern typography.",
  },
  bollywood: {
    mood: "Heroic blockbuster charisma.",
    environment: "Royal palace balcony during sunset.",
    lighting:
      "Epic golden-hour cinematic lighting affecting the whole subject consistently.",
    composition: "Blockbuster hero framing.",
    pose: "Powerful heroic stance.",
    camera: "85mm cinema photography with HDR.",
    typography: "Grand embossed gold title.",
  },
};

export const imagePrompt = (genre: Genre) => {
  const s = GENRE_STYLES[genre];
  const a = ATTIRE_CONFIG[genre];

  return `
Create an ultra-realistic premium music album cover.

The uploaded image is ONLY an identity reference.

This is NOT a face swap.
This is NOT a Photoshop edit.
This is NOT an image compositing task.

Imagine this person genuinely attended this photoshoot.

Generate a completely NEW photograph from scratch.

Ignore the original photo's:
- lighting
- pose
- facial expression
- camera angle
- framing

Use it ONLY to recognize who the person is.

## Identity

The generated person should clearly resemble the reference.

Do NOT copy the face.

Do NOT transplant facial pixels.

Reconstruct the same identity naturally.

Allow realistic changes in:

- expression
- head angle
- gaze
- perspective
- skin texture
- facial muscles
- body posture

The person should resemble the reference the way two professional photos of the same person resemble each other.

## Gender

Determine gender presentation from the reference.

If male:
${a.male}

If female:
${a.female}

Never misgender the subject.

## Creative Direction

Mood:
${s.mood}

Environment:
${s.environment}

Lighting:
${s.lighting}

Pose:
${s.pose}

Composition:
${s.composition}

Camera:
${s.camera}

## Photography

Luxury editorial photography.

Photorealistic.

Realistic skin pores.

Natural facial hair.

Natural skin imperfections.

No beauty filter.

Realistic fabric textures.

Accurate anatomy.

Consistent shadows.

Consistent perspective.

Consistent color temperature.

Professional cinematic color grading.

The face must receive illumination ONLY from the light sources visible in the environment.

The face, neck and body must share identical lighting, rendering style and texture.

Everything should appear captured in a single camera exposure.

## Typography

Leave clean negative space for a title.

Do not generate readable text, logos or watermarks.

Typography inspiration:
${s.typography}

## Avoid

- face swap appearance
- pasted face
- copied selfie
- Photoshop look
- beauty filter
- oversmoothed skin
- inconsistent lighting
- inconsistent shadows
- inconsistent perspective
- duplicate faces
- AI artifacts
- distorted hands
- random text

The final result should be indistinguishable from a genuine editorial photoshoot while remaining clearly recognizable as the same person.
`.trim();
};

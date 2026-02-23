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

type GenreDetails = {
  scene: string;
  typography: string;
};

const ATTIRE_CONFIG: Record<string, { male: string; female: string }> = {
  carnatic: {
    male: "a professional South Indian Pattu Veshti with a gold-bordered Angavastram draped over the shoulder and a formal high-collar silk shirt.",
    female:
      "a resplendent Kanchipuram silk saree in deep jewel tones with a gold zari border, a structured silk blouse, jasmine flowers adorning her hair, long gold jhumka earrings, and layered gold temple necklaces.",
  },
  hindustani: {
    male: "a pristine white formal Kurta-Pajama with a richly patterned dupatta shawl and traditional embroidered mojris.",
    female:
      "an elegant Anarkali suit in deep royal blue with intricate silver threadwork, a sheer dupatta draped gracefully over her shoulders, and classic Kundan jewelry with matching bangles.",
  },
  bollywood: {
    male: "an opulent full-length ivory Sherwani with gold embroidery, a structured Nehru collar, and a silk stole.",
    female:
      "a show-stopping floor-length sequined lehenga in crimson and gold, a fitted embroidered choli, a dramatic dupatta flowing behind her, and statement Polki jewelry.",
  },
  jazz: {
    male: "a sharp charcoal three-piece suit with a crisp white shirt, a silk tie, and a pocket square.",
    female:
      "a sophisticated floor-length black velvet gown with long sleeves, a strand of pearls, long vintage chandelier earrings, and classic red lips.",
  },
  rock: {
    male: "a structured black leather jacket over a vintage band tee, dark ripped denim, and chunky boots.",
    female:
      "a fitted black moto leather jacket over a graphic tee, dark skinny jeans with a silver chain belt, heeled ankle boots, and layered silver jewelry.",
  },
  edm: {
    male: "an iridescent holographic bomber jacket over a black fitted tee, cargo pants, and futuristic LED-detail sneakers.",
    female:
      "a holographic metallic crop jacket, a matching high-waisted metallic mini skirt, thigh-high platform boots, and glowing neon body jewelry.",
  },
  chill: {
    male: "a thick corduroy overshirt in earthy amber layered over a cream henley, with relaxed chinos and white sneakers.",
    female:
      "an oversized chunky-knit cream cardigan over a flowy floral midi dress, delicate gold jewelry, and tan ankle boots.",
  },
  indian: {
    male: "a modern structured navy kurta paired with slim off-white trousers and a denim jacket, styled with leather loafers.",
    female:
      "a flowy embroidered kurta dress in soft mauve with delicate mirror-work details, a cropped denim jacket, and embroidered juttis.",
  },
};

const GENRE_STYLES: Record<string, GenreDetails> = {
  rock: {
    scene:
      "Hyper-dynamic gritty album art. Wide-legged power stance. Environment: dystopian crumbling city at twilight with dramatic cinematic smoke and flickering neon signs. High contrast, deep moody shadows.",
    typography:
      "Jagged, distressed metallic chrome lettering with a cracked texture, positioned at the top center.",
  },
  edm: {
    scene:
      "Retro-futuristic Synthwave dreamscape. Confident stance surrounded by floating geometric cubes, laser grid floors, and electric neon light trails. Deep purple and cyan color palette.",
    typography:
      "Retro 80s chrome and neon gradient script font with a glow effect, positioned at the top.",
  },
  chill: {
    scene:
      "Organic warm cinematic film photography. Sitting on a wooden stool in a vast golden wheat field at sunset, soft bokeh and dreamy lens flare. Warm amber and honey tones throughout.",
    typography:
      "Elegant flowing handwritten script font in warm off-white, centered at the top.",
  },
  jazz: {
    scene:
      "Luxurious vintage noir aesthetic. Seated in a plush velvet armchair inside a smoky 1940s art-deco jazz lounge. Warm amber spotlights, dramatic shadows, a grand piano partially visible in the background.",
    typography:
      "Bold retro brass serif font with an aged-paper texture, positioned at the top.",
  },
  hindustani: {
    scene:
      "Ethereal spiritual painterly mood. Seated cross-legged in a meditative pose in an ancient stone courtyard at golden-hour dawn, soft mist rising, marigold petals scattered on the stone floor.",
    typography:
      "Flowing calligraphic gold brush lettering, positioned at the bottom.",
  },
  carnatic: {
    scene:
      "Vibrant rich cultural photography. Passionate mid-performance pose inside a richly decorated temple hall with ornate stone pillars, warm oil-lamp lighting, and garlands of marigolds and roses.",
    typography:
      "Ornamental South Indian classical style font in gold on a dark base, centered at the bottom.",
  },
  indian: {
    scene:
      "Modern indie-fusion urban aesthetic. Candid editorial portrait leaning casually against a textured brick wall strung with warm fairy lights. Relaxed, warm, magazine-quality mood.",
    typography:
      "Clean modern geometric sans-serif font in white, positioned at the bottom.",
  },
  bollywood: {
    scene:
      "Larger-than-life epic movie poster energy. Heroic dramatic pose on a grand Rajasthani palace balcony overlooking misty mountains at a fiery sunset. Rich jewel tones, cinematic grandeur.",
    typography:
      "Grand 3D metallic block font with a golden gradient and a bold drop shadow, positioned at the bottom center.",
  },
};

export const imagePrompt = (genre: string): string => {
  const style = GENRE_STYLES[genre];
  const attire = ATTIRE_CONFIG[genre] || ATTIRE_CONFIG["indian"];

  return `
### OUTPUT FORMAT ###
Generate EXACTLY ONE (1) full-bleed single-frame professional album cover.
NO image grids. NO panels. NO collages. ONE image only.

### STEP 1 — ANALYZE THE REFERENCE PHOTO FIRST ###
Before generating anything, carefully study the reference person in the photo:
- What is their gender presentation? Look at facial features, bone structure, hair, and overall physique.
- What is their skin tone and ethnicity?
- What are their specific facial features — eye shape, nose, lips, jawline?
Internally lock in these observations. Every decision you make below must be consistent with what you see.

### STEP 2 — GENDER PRESENTATION (self-detected from reference) ###
Render the subject with the EXACT gender presentation visible in the reference photo.

If the reference person presents as FEMALE:
- She must appear unmistakably female throughout the entire image.
- Soft feminine facial features, female physique, women's clothing, and styled hair.
- Do NOT masculinize her face, jawline, or body in any way.
- Dress her in: ${attire.female}

If the reference person presents as MALE:
- He must appear unmistakably male throughout the entire image.
- Strong masculine facial features, male physique, and men's clothing.
- Do NOT feminize his face or body in any way.
- Dress him in: ${attire.male}

CRITICAL: Do NOT default to male if the reference is female. Read the reference carefully and honor it.
CRITICAL: Do NOT androgynize or ambiguate the subject's gender. Match the reference exactly.

### STEP 3 — FACE & IDENTITY PRESERVATION ###
- Preserve the EXACT facial identity from the reference photo.
- Maintain their precise: face shape, eyes, nose, lips, skin tone, and ethnicity.
- The subject must be instantly recognizable as the same person from the reference.
- Only their wardrobe, styling, and scene context change — their face and identity do not.

### STEP 4 — SCENE & MOOD ###
${style.scene}

### STEP 5 — PHOTOGRAPHY QUALITY ###
- Professional album cover photography.
- Cinematic lighting with sharp focus on the face.
- 8K resolution quality feel.
- The subject should be the clear focal point of the composition.

### STEP 6 — TYPOGRAPHY ###
- The ONLY text rendered on this image is the album title: "${genre.toUpperCase()}"
- Do NOT add any other words, labels, or random text anywhere.
- Render the title in this exact style: ${style.typography}
- The title must look like professionally designed graphic art, fully integrated into the composition — not overlaid as an afterthought.
`.trim();
};

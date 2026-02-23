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
    scene: `
ENERGY: Raw, explosive, untamed rebellion. This is not a photo — this is a war cry frozen in time.
POSE: Mid-scream or mid-roar, head thrown slightly back, eyes intense and burning, veins of emotion visible in the neck. The body is electric with barely contained energy.
ENVIRONMENT: A collapsing dystopian cityscape at twilight — crumbling brutalist concrete towers, shattered glass raining in slow motion, industrial smoke billowing dramatically, electric sparks flying from downed power lines. The sky is a violent bruised purple and deep crimson.
LIGHTING: Harsh, aggressive side-lighting cutting sharp shadows across the face. A single blood-red spotlight from below carving dramatic contours. Lens flare from an explosion behind.
MOOD: You can almost hear the guitar feedback. The image should feel loud even in silence.
COLOR PALETTE: Desaturated blacks, ash greys, deep crimson accents, electric white highlights.`.trim(),
    typography:
      "Jagged, deeply distressed metallic chrome lettering — each letter fractured and splintered like shattered glass, with a raw rust-and-chrome texture. Positioned at the top center, slightly tilted, as if scratched into the image itself.",
  },

  edm: {
    scene: `
ENERGY: Transcendent euphoria at 3AM — the drop just hit and everything is light and frequency.
POSE: Arms slightly raised or outstretched, head tilted back in pure ecstasy, eyes closed or half-open glowing with reflected neon. The subject floats in the center of a digital universe.
ENVIRONMENT: A vast infinite Synthwave grid stretching to the horizon, giant glowing geometric prisms and translucent cubes orbiting the subject, cascading laser beams slicing through fog, holographic waveforms rippling outward from the subject's body like a pulse. A giant neon sun sets on the horizon grid.
LIGHTING: Backlit with a massive magenta and cyan halo. Light refracts off the holographic clothing creating rainbow prismatic scatter across the scene. Volumetric light beams cut through haze.
MOOD: Pure sensory overload. Euphoric. Futuristic. As if sound has been made visible.
COLOR PALETTE: Deep ultraviolet, electric cyan, hot magenta, neon coral, chrome white.`.trim(),
    typography:
      "Retro 80s chrome and neon gradient script — letters dripping with a glowing plasma edge, with a chromatic aberration shift offset. Positioned at the top with a subtle glow bloom behind it.",
  },

  chill: {
    scene: `
ENERGY: Slow exhale. Golden hour. Nothing needs to happen right now and that is everything.
POSE: Seated naturally on a weathered wooden stool or cross-legged in the grass — completely at ease, maybe eyes closed with a faint smile, or gazing softly into the middle distance. No performance. Just presence.
ENVIRONMENT: A vast open wheat field at the peak of golden hour — tall grass swaying gently, wildflowers scattered throughout, a lone tree on the horizon. The sun is low, casting everything in liquid amber and honey. Soft lens flare bleeds across the frame. Film grain texture overlaid.
LIGHTING: Warm, diffused golden backlight wrapping around the subject like a hug. No harsh shadows — everything is soft, hazy, and intimate. Shallow depth of field blurs the field into painterly bokeh.
MOOD: Like the first track of a Sunday morning playlist. Unhurried. Deeply human. A little nostalgic.
COLOR PALETTE: Burnt amber, honey gold, warm cream, dusty rose, soft sage green.`.trim(),
    typography:
      "An elegant, loose handwritten script — slightly imperfect, as if signed with a fountain pen, in warm off-white or pale gold. Centered at the top, with soft shadow underneath.",
  },

  jazz: {
    scene: `
ENERGY: Sophisticated, smoky, and impossibly cool. The kind of album you put on when you want to feel like you understand something about life.
POSE: Leaning back in a plush velvet chair with total ease — one leg crossed, perhaps holding a glass or resting a hand on a knee. Eyes half-lidded, knowing, a ghost of a smile. The pose says everything without trying.
ENVIRONMENT: A dimly lit 1940s art-deco jazz club — dark mahogany walls, ornate brass fixtures, circular amber spotlights cutting through cigarette smoke, a grand piano visible and partially lit in the background, a double bass leaning against the wall. The bar glitters faintly behind.
LIGHTING: Warm amber key light from above, deep theatrical shadows on one side of the face. Rim light in deep gold separating the subject from the dark background. Film noir contrast — rich blacks, warm golds.
MOOD: Like Miles Davis with a glass of bourbon. Timeless. Effortlessly cool. There is depth behind those eyes.
COLOR PALETTE: Deep mahogany, amber gold, ivory, soft brass, cigarette smoke grey.`.trim(),
    typography:
      "A bold classic brass serif font — heavy weight, slightly condensed, with a warm aged-paper patina and subtle letterpress texture. Positioned at the top, commanding and confident.",
  },

  hindustani: {
    scene: `
ENERGY: Ancient. Meditative. The kind of music that exists between notes — in the breath before the raga begins.
POSE: Seated cross-legged in perfect stillness — spine straight, hands resting in a mudra on the knees, eyes closed in deep inward focus. The face carries absolute serenity, as if the world has gone quiet.
ENVIRONMENT: An ancient sandstone courtyard at the precise moment of dawn — carved stone pillars framing the scene, mist rising from the stone floor in soft tendrils, a carpet of fresh marigold petals scattered around the subject, the first light of the sun painting the horizon in gold and rose. The sky transitions from deep indigo to warm saffron.
LIGHTING: The first ray of sunrise lands gently across the face — warm, sacred, directional. Soft volumetric god-rays filter through mist. The background remains deep and mysterious in pre-dawn shadow.
MOOD: As if the universe has paused to listen. A sense of infinite time. Deeply spiritual, profoundly still.
COLOR PALETTE: Deep indigo, saffron gold, marigold orange, soft rose, sandstone ivory.`.trim(),
    typography:
      "Flowing hand-painted calligraphic lettering in burnished gold — each stroke deliberate, like ink on a manuscript. Positioned reverently at the bottom of the frame.",
  },

  carnatic: {
    scene: `
ENERGY: Devotional fire. Mathematical precision fused with spiritual ecstasy — every note an offering.
POSE: Caught mid-performance — eyes open wide and burning with intensity, or closed with deep emotion, mouth open in song or locked in concentration. One hand raised gesturing a mudra or marking a beat, the body leaning forward into the music with complete surrender.
ENVIRONMENT: The inner sanctum of an ancient Dravidian temple — towering stone pillars carved with intricate sculptures, warm brass oil lamps (diyas) casting flickering golden light, garlands of marigolds and roses draped over stone, the faint suggestion of a deity's altar behind in deep shadow. Incense smoke curls upward.
LIGHTING: Dramatic warm oil-lamp lighting — golden and flickering, casting rich shadows across carved stone. The subject is lit from below and the sides with warm flame light, creating a sacred, ancient atmosphere. High contrast between glowing warmth and deep temple shadows.
MOOD: The devotion is palpable. This is music as prayer, as discipline, as surrender.
COLOR PALETTE: Deep ochre, temple gold, crimson, burnt sienna, sacred ash white.`.trim(),
    typography:
      "Ornamental South Indian classical lettering — inspired by ancient palm-leaf manuscript scripts, rendered in burnished gold with decorative flourishes. Centered at the bottom on a deep dark base.",
  },

  indian: {
    scene: `
ENERGY: Effortlessly cool, culturally rooted, completely modern. The sound of India right now — not nostalgic, not trying too hard.
POSE: Candid and relaxed — leaning against a textured wall with one shoulder, arms loosely crossed or hands in pockets, a genuine half-smile. The kind of portrait that feels like you caught them between moments. Authentic, not posed.
ENVIRONMENT: A vibrant urban alley in an Indian city at dusk — exposed brick walls covered in texture and peeling paint, strings of warm fairy lights draped above, potted plants spilling over from a balcony, the distant sound of city life implied in the background depth. Warm and alive.
LIGHTING: Soft warm fairy light glow mixing with the last of the evening's natural light — golden, intimate, editorial. Slight film grain. The mood of a magazine shoot that didn't try to feel like a magazine shoot.
MOOD: Grounded. Contemporary. The bridge between tradition and the present — and totally at home there.
COLOR PALETTE: Warm terracotta, mauve, dusty gold, soft cream, denim blue.`.trim(),
    typography:
      "A clean, confident geometric sans-serif — modern weight, generous spacing, in crisp white or soft off-white. Positioned at the bottom, understated and editorial.",
  },

  bollywood: {
    scene: `
ENERGY: MAXIMUM DRAMA. This is not an album cover — this is a monument. Every pixel radiates star power.
POSE: A full heroic stance — chin slightly raised, eyes burning directly into the camera with absolute confidence and magnetic charisma. One hand perhaps gesturing outward or placed over the heart. The subject owns every frame. This is a star.
ENVIRONMENT: The grand balcony of a colossal Rajasthani palace — ornate carved marble railings, towering sandstone archways behind, silk drapes billowing in a warm wind. Beyond the balcony: a sweeping panorama of misty mountains at a cinematic fiery sunset, the sky ablaze in gold, amber, and deep magenta. Rose petals drift through the air. The scale is staggering.
LIGHTING: Epic golden-hour cinematic lighting — warm key light bathing the subject in a heroic glow, deep rich shadows behind, a gentle rim light separating them magnificently from the palatial background. Think: the poster lighting of the greatest Bollywood film ever made.
MOOD: Larger than life. Emotionally overwhelming. You feel like applauding just looking at it.
COLOR PALETTE: Royal crimson, palace gold, deep amber, regal ivory, misty violet mountains.`.trim(),
    typography:
      "Grand cinematic 3D block lettering — thick strokes with a deep golden metallic gradient, dramatic embossed bevel, and a bold cinematic drop shadow. Positioned at the bottom center like a title card, commanding and unmissable.",
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

### STEP 4 — SCENE, MOOD & ENERGY ###
${style.scene}

### STEP 5 — PHOTOGRAPHY QUALITY ###
- Professional album cover photography.
- Cinematic lighting with sharp focus on the face.
- 8K resolution quality feel with appropriate color grading for the genre.
- The subject is the undisputed focal point of the entire composition.

### STEP 6 — TYPOGRAPHY ###
- The ONLY text rendered on this image is the album title: "${genre.toUpperCase()}"
- Do NOT add any other words, labels, or random text anywhere on the image.
- Render the title in this exact style: ${style.typography}
- The title must feel like it was designed specifically for this image — fully integrated, not an afterthought.
`.trim();
};

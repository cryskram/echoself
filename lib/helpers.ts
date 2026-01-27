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
    male: "a professional South Indian Pattu Veshti with a gold-bordered Angavastram fabric wrapped over the shoulder and a formal high-neck shirt.",
    female:
      "a conservative, high-neck traditional Kanchipuram silk ensemble with elaborate gold patterns and cultural temple jewelry.",
  },
  hindustani: {
    male: "a formal high-collar white Kurta-Pajama set with a traditional patterned fabric wrap or shawl.",
    female:
      "a formal, fully-covered traditional Anarkali garment with a cultural shoulder wrap.",
  },
  bollywood: {
    male: "an opulent, long-form ceremonial designer Sherwani with structured embroidery and a formal collar.",
    female:
      "a high-fashion, fully-lined designer evening gown with a long, elegant scarf accessory.",
  },
  jazz: {
    male: "a professional three-piece charcoal suit with a crisp button-down shirt and tie.",
    female:
      "a conservative, floor-length velvet evening gown with long sleeves.",
  },
  rock: {
    male: "a structured black leather jacket over a graphic band tee and dark denim.",
    female:
      "a structured black leather jacket over a graphic band tee and dark denim.",
  },
  edm: {
    male: "a tech-wear iridescent metallic bomber jacket with a clean black t-shirt.",
    female:
      "a tech-wear iridescent metallic bomber jacket with a clean black t-shirt.",
  },
  chill: {
    male: "a thick textured corduroy jacket and a formal flannel shirt.",
    female: "an oversized, thick chunky knit sweater with a high collar.",
  },
  indian: {
    male: "a modern designer denim jacket layered over a long, structured modern kurta.",
    female:
      "a modern designer denim jacket layered over a long, structured modern kurta.",
  },
};

const GENRE_STYLES: Record<string, GenreDetails> = {
  rock: {
    scene:
      "Hyper-dynamic, gritty album art. Wide-legged power stance. Environment: dystopian city ruin at twilight with cinematic smoke.",
    typography:
      "A jagged, metallic style logo with chrome textures, positioned at the top.",
  },
  edm: {
    scene:
      "Retro-futuristic Synthwave. Confident pose surrounded by floating geometric cubes and neon light trails.",
    typography:
      "A retro 80s chrome and neon gradient script font, positioned at the top.",
  },
  chill: {
    scene:
      "Organic cinematic film photography. Sitting on a stool in a vast golden field at sunset.",
    typography:
      "An elegant, flowing handwritten script font, centered at the top.",
  },
  jazz: {
    scene:
      "Luxurious vintage aesthetic. Seated in a plush velvet armchair in a smoky art-deco lounge.",
    typography: "A bold, retro-styled brass serif font, positioned at the top.",
  },
  hindustani: {
    scene:
      "Ethereal, spiritual style. Seated cross-legged in a meditative trance in an ancient stone courtyard at dawn.",
    typography:
      "A calligraphic, traditional brush font in gold, positioned at the bottom.",
  },
  carnatic: {
    scene:
      "Vibrant cultural photography. Passionate performance with a traditional instrument in a decorated temple sanctum.",
    typography:
      "An ornamental South Indian style font, centered at the bottom.",
  },
  indian: {
    scene:
      "Modern indie-fusion aesthetic. Candid-style portrait leaning against a textured wall with fairy lights.",
    typography: "A modern, clean, sans-serif font, positioned at the bottom.",
  },
  bollywood: {
    scene:
      "Larger-than-life epic movie poster. Heroic pose on a grand palace balcony overlooking mountains at sunset.",
    typography:
      "A grand, 3D metallic blocky font, positioned at the bottom center.",
  },
};

export const imagePrompt = (
  genre: string,
  gender: "male" | "female" = "male"
) => {
  const style = GENRE_STYLES[genre];
  const attire =
    ATTIRE_CONFIG[genre]?.[gender] || ATTIRE_CONFIG["indian"][gender];

  return `
### SINGLE IMAGE ENFORCEMENT ###
- GENERATE EXACTLY ONE (1) IMAGE. NO GRIDS. NO MULTI-SHOTS.
- This is a professional full-bleed album cover.

### IDENTITY LOCK ###
- Maintain the EXACT face, jawline, and eyes of the person in the reference photo.
- The subject's gender is ${gender}; they must remain ${gender}.
- 1:1 facial structure preservation is mandatory.

### WARDROBE & SCENE ###
- CLOTHING: The subject is wearing ${attire}.
- VIBE: ${style.scene}
- The clothing must be professional, formal, and fully-lined.

### PHOTOGRAPHY & TYPOGRAPHY ###
- Sharp focus on face, cinematic lighting, 8k resolution feel.
- Overlay the title "${genre.toUpperCase()}" using this style: ${style.typography}
- The text must look like professionally designed graphic art.
`;
};

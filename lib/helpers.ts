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
    The person is a gritty Rock Protagonist on a dark stage. 
    Wearing: A worn black leather jacket and metal accessories.
    Environment: Moody arena backdrop with hazy stage smoke and dramatic red/blue rim lighting.
    Vibe: Rebellious, high-contrast, raw concert energy.
  `,

  edm: `
    The person is a Headline DJ at a futuristic festival. 
    Wearing: Iridescent metallic streetwear or reflective tech-apparel.
    Environment: Cyberpunk club atmosphere with neon cyan and magenta laser beams and LED screens.
    Vibe: High-energy, digital, electric night-life.
  `,

  chill: `
    The person is a Lo-Fi artist in a peaceful, sun-drenched room. 
    Wearing: An oversized chunky knit sweater or cozy minimalist loungewear.
    Environment: Soft bokeh background with indoor plants and warm golden hour light through a window.
    Vibe: Dreamy, calm, introspective, soft focus.
  `,

  jazz: `
    The person is a sophisticated Jazz Virtuoso in a late-night club. 
    Wearing: A sharp tailored charcoal suit or a velvet evening gown.
    Environment: A dim-lit vintage lounge with a single amber spotlight and a blurred piano in the background.
    Vibe: Soulful, elegant, "Film Noir" aesthetic.
  `,

  hindustani: `
    The person is a Classical Maestro of Hindustani music. 
    Wearing: A premium white silk Kurta with a heavy embroidered shawl.
    Environment: A serene, ancient stone palace courtyard at dawn with soft ethereal mist.
    Vibe: Meditative, spiritual, legendary, timeless.
  `,

  carnatic: `
    The person is a Carnatic Music Legend. 
    Wearing: Traditional Kanchipuram silk with gold zari borders and temple-style gold jewelry.
    Environment: A grand South Indian heritage hall decorated with jasmine garlands and glowing brass lamps.
    Vibe: Culturally powerful, disciplined, rhythmic, vibrant.
  `,

  indian: `
    The person is a modern Indie-Fusion artist. 
    Wearing: A stylish fusion of a denim jacket over a traditional long kurta.
    Environment: A contemporary art studio with warm fairy lights and textured textile backdrops.
    Vibe: Soulful, creative, modern-ethnic "Hero" look.
  `,

  bollywood: `
    The person is a glamorous Bollywood Cinema Superstar. 
    Wearing: A dramatic, flying silk dupatta or a high-fashion designer Sherwani.
    Environment: A breathtaking Himalayan mountain peak or an opulent grand palace balcony.
    Vibe: Larger-than-life, romantic, epic cinematic hero, "Yash Chopra" style glow.
  `,
};

export const imagePrompt = (genre: string) => `
The person in the uploaded image is the SOLE SUBJECT of this photo. 

FAITHFUL IDENTITY PRESERVATION:
- This is a photorealistic transformation of the person in the reference photo.
- Maintain the EXACT facial structure, eye shape, nose, and jawline of the person in the photo.
- Do not change their ethnicity, age, or gender.
- They are the "Main Character" or "Hero" of this album cover.

GENRE THEME & WARDROBE:
${GENRE_STYLES[genre]}

PHOTOGRAPHY SPECS:
- Professional album cover photography.
- Sharp focus on the face, shallow depth of field (blurred background).
- Shot on 85mm lens, f/1.8, 8k resolution, cinematic lighting.
- NO cartoon, NO illustration, NO 3D render—must look like a real photograph.

TYPOGRAPHY:
- Overlay the word "${genre.toUpperCase()}" in the center-top or center-bottom.
- Use clean, bold, modern, and premium cinematic font styles.
- The text must be spelled correctly and look like a real music album title.
`;

// export const musicPrompt = (genre: string) =>
//   `Instrumental ${genre} music, studio quality`;

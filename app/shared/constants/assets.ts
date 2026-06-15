const PUBLIC_STORAGE_BASE_URL = process.env.NEXT_PUBLIC_STORAGE_BASE_URL ?? '';

export const IMAGES = {
  PLACEHOLDER: `${PUBLIC_STORAGE_BASE_URL}/photos/placeholder.png`,
  TERMS_LIATOSHYNSKY: `${PUBLIC_STORAGE_BASE_URL}/photos/terms-liatoshynsky.png`,
  TERMS_RETRO_COLLAGE: `${PUBLIC_STORAGE_BASE_URL}/photos/terms-retro-collage.jpg`,
  MAIN_FOUNDATION_SECTION: `${PUBLIC_STORAGE_BASE_URL}/photos/main-foundation-section.jpg`,
  MAIN_HERO_BACKGROUND_IMAGE: `${PUBLIC_STORAGE_BASE_URL}/photos/main-hero-background-image.png`,
  MAIN_HERO_CHARACTER_IMAGE: `${PUBLIC_STORAGE_BASE_URL}/photos/main-hero-character-image.png`,
  MAIN_EVENT_SECTION: (index: number) => `${PUBLIC_STORAGE_BASE_URL}/photos/main-event-section-${index}.png`,
  WAR_IN_UKRAINE_VOLUNTEER_DONATION: `${PUBLIC_STORAGE_BASE_URL}/photos/war-in-ukraine-volunteer-donation.png`,
  WAR_IN_UKRAINE_CAROUSEL: (index: number) => `${PUBLIC_STORAGE_BASE_URL}/photos/war-in-ukraine-carousel-${index}.png`,
  BIOGRAPHY_LIATOSHYNSKY_HERO_SECTION: `${PUBLIC_STORAGE_BASE_URL}/photos/biography-liatoshynsky-hero-section.png`,
  MAIN_BIOGRAPHY_GALLERY: (index: number) => `${PUBLIC_STORAGE_BASE_URL}/photos/main-biography-gallery-${index}.png`,
  MEDIA_LF_OFFICE: (index: number) => `${PUBLIC_STORAGE_BASE_URL}/photos/media-lf-office-${index}.png`
} as const;

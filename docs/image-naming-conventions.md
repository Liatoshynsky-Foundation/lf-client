# File Naming Conventions

This document defines the image naming conventions used in the project.
It provides a consistent approach to image naming, improves code readability, and simplifies project maintenance.

## Image Storage Policy

To improve asset management and application performance, all content images must be stored in Cloudflare R2 and served through the Cloudflare CDN.

Cloudflare Dashboard:
https://dash.cloudflare.com/

### Rules

- UI assets such as icons, logos, and other small static interface resources may remain in the local project files.
- Content images (hero images, galleries, page illustrations, carousel images, biography photos, etc.) must be uploaded to Cloudflare R2.
- Remote image URLs must be accessed through constants defined in app/shared/constants/assets.ts.
- Do not add new content images to the local public/images directory.
- Do not hardcode Cloudflare URLs directly in components.

### Why

Storing images in Cloudflare R2 and serving them through the Cloudflare CDN provides:

- Reduced repository size.
- Centralized asset management.
- Faster image delivery worldwide.
- Improved application performance through CDN caching.

Image loading speed is improved due to CDN caching.

---

## Image File Naming And Renaming

---

## Image File Naming And Renaming

### General Rules

Image file names should be lowercase and use kebab-case.

**Good:**

```text
main-hero-background-image.png
main-foundation-section.jpg
main-event-section-1.png
war-in-ukraine-carousel-1.png
biography-liatoshynsky-hero-section.png
```

**Avoid:**

```text
MainHeroImage.png
home page image.png
IMG_1234.png
photo-1.png
image.png
```

### Naming By Page Or Section

Use a clear prefix that shows where the image belongs.

For images used on the main page, use `main-`:

```text
main-hero-background-image.png
main-hero-character-image.png
main-foundation-section.jpg
main-event-section-1.png
main-biography-gallery-1.png
```

For images used only on a specific page, use the page name:

```text
war-in-ukraine-1.png
war-in-ukraine-carousel-1.png
biography-liatoshynsky-hero-section.png
```

For reusable fallback images, use a generic name:

```text
placeholder.png
```

### Constants In Code

All remote image URLs should be stored in:

```text
app/shared/constants/assets.ts
```

Use `IMAGES` constants instead of hardcoded image URLs in components.

**Good:**

```ts
imageSrc: IMAGES.MAIN_FOUNDATION_SECTION;
```

**Avoid:**

```ts
imageSrc: 'https://pub-.../photos/main-foundation-section.jpg';
```

Avoid local public paths for migrated images:

```ts
imageSrc: '/images/main-foundation-section.jpg';
```

### Constants Naming

Use uppercase snake case for constants.

**Good:**

```text
MAIN_FOUNDATION_SECTION
MAIN_EVENT_SECTION
MAIN_BIOGRAPHY_GALLERY
WAR_IN_UKRAINE_CAROUSEL
PLACEHOLDER
```

For numbered image groups, use a function:

```ts
MAIN_EVENT_SECTION: (index: number) => `${PUBLIC_STORAGE_BASE_URL}/photos/main-event-section-${index}.png`;
```

Usage:

```ts
IMAGES.MAIN_EVENT_SECTION(1);
IMAGES.MAIN_EVENT_SECTION(2);
IMAGES.MAIN_EVENT_SECTION(3);
```

### Renaming An Image

When an image is renamed, update both the file name and the constant name if the meaning changed.

Example:

Old:

```ts
HOME_EVENT_SECTION: (index: number) => `${PUBLIC_STORAGE_BASE_URL}/photos/home-event-section-${index}.png`;
```

New:

```ts
MAIN_EVENT_SECTION: (index: number) => `${PUBLIC_STORAGE_BASE_URL}/photos/main-event-section-${index}.png`;
```

Then update all usages:

```ts
IMAGES.HOME_EVENT_SECTION(1);
```

to:

```ts
IMAGES.MAIN_EVENT_SECTION(1);
```

### Renaming Checklist

1. Search for the old file name:

```bash
rg "home-event-section"
```

2. Search for the old constant name:

```bash
rg "HOME_EVENT_SECTION"
```

3. Update `app/shared/constants/assets.ts`.

4. Update all usages of the old constant.

5. Run TypeScript check:

```bash
npx tsc -p tsconfig.json --noEmit --pretty false
```

6. If the browser still shows the old image path, restart the dev server.

7. If the old path is still coming from `.next`, clear the Next.js cache:

```bash
rm -rf .next
npm run dev
```

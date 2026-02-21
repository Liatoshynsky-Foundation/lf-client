import { biographyGalleryPhotos } from './BiographyGallery.data';
import { biographyGallerySlots } from './BiographyGallery.styles';

export function buildFrameImages(photos = biographyGalleryPhotos) {
  return (photos ?? []).map((p, i) => {
    const slot = biographyGallerySlots[i % biographyGallerySlots.length];

    return {
      id: p.id,
      src: p.src,
      alt: p.alt,
      caption: p.caption,
      sizes: slot.sizes,
      alignSelf: slot.alignSelf,
      ml: slot.ml
    };
  });
}

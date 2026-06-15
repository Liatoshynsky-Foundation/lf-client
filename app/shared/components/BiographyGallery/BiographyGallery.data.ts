import type { Locale } from 'next-intl';

import { IMAGES } from '~/shared/constants/assets';

type LocalizedString = Record<Locale, string>;

export interface GalleryPhotoData {
  id: string;
  src: string;
  alt: LocalizedString;
  caption: LocalizedString | null;
}

export const biographyGalleryPhotos: GalleryPhotoData[] = [
  {
    id: 'bio-1',
    src: IMAGES.MAIN_BIOGRAPHY_GALLERY(1),
    alt: {
      uk: 'Портрет Бориса Лятошинського, 1910-ті роки',
      en: 'Portrait of Borys Liatoshynsky, 1910s'
    },
    caption: {
      uk: '1910-ті\nБорис Лятошинський',
      en: '1910s\nBorys Liatoshynsky'
    }
  },
  {
    id: 'bio-2',
    src: IMAGES.MAIN_BIOGRAPHY_GALLERY(2),
    alt: {
      uk: 'Борис Лятошинський у молоді роки',
      en: 'Borys Liatoshynsky in his youth'
    },
    caption: {
      uk: '1910-ті\nБорис Лятошинський',
      en: '1910s\nBorys Liatoshynsky'
    }
  },
  {
    id: 'bio-3',
    src: IMAGES.MAIN_BIOGRAPHY_GALLERY(3),
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-4',
    src: IMAGES.MAIN_BIOGRAPHY_GALLERY(4),
    alt: {
      uk: 'Борис Лятошинський у 1950-х роках',
      en: 'Borys Liatoshynsky in the 1950s'
    },
    caption: {
      uk: '1950-ті\nБорис Лятошинський',
      en: '1950s\nBorys Liatoshynsky'
    }
  },
  {
    id: 'bio-5',
    src: IMAGES.MAIN_BIOGRAPHY_GALLERY(5),
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-6',
    src: IMAGES.MAIN_BIOGRAPHY_GALLERY(6),
    alt: {
      uk: 'Борис Лятошинський сидить на лавці в Празі',
      en: 'Borys Liatoshynsky sitting on a bench in Prague'
    },
    caption: {
      uk: '1950-ті\nБорис Лятошинський (сидить на лавці) у Празі',
      en: '1950s\nBorys Liatoshynsky (sitting on a bench) in Prague'
    }
  },
  {
    id: 'bio-7',
    src: IMAGES.MAIN_BIOGRAPHY_GALLERY(7),
    alt: {
      uk: 'Борис Лятошинський з котами на дачі в Ворзелі',
      en: 'Borys Liatoshynsky with cats at his summer house in Vorzel'
    },
    caption: {
      uk: '1960-ті\nБорис Лятошинський з котами на дачі в Ворзелі.',
      en: '1960s\nBorys Liatoshynsky with cats at his summer house in Vorzel'
    }
  },
  {
    id: 'bio-8',
    src: IMAGES.MAIN_BIOGRAPHY_GALLERY(8),
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-9',
    src: IMAGES.MAIN_BIOGRAPHY_GALLERY(9),
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-10',
    src: IMAGES.MAIN_BIOGRAPHY_GALLERY(10),
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-11',
    src: IMAGES.MAIN_BIOGRAPHY_GALLERY(11),
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-12',
    src: IMAGES.MAIN_BIOGRAPHY_GALLERY(12),
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-13',
    src: IMAGES.MAIN_BIOGRAPHY_GALLERY(13),
    alt: {
      uk: 'Борис Лятошинський з Ігорем Белзою на дачі',
      en: 'Borys Liatoshynsky with Igor Belza at the summer house'
    },
    caption: {
      uk: '1950-ті\nБорис Лятошинський з Ігорем Белзою на дачі',
      en: '1950s\nBorys Liatoshynsky with Igor Belza at the summer house'
    }
  },
  {
    id: 'bio-14',
    src: IMAGES.MAIN_BIOGRAPHY_GALLERY(14),
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-15',
    src: IMAGES.MAIN_BIOGRAPHY_GALLERY(15),
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-16',
    src: IMAGES.MAIN_BIOGRAPHY_GALLERY(16),
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-17',
    src: IMAGES.MAIN_BIOGRAPHY_GALLERY(17),
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-18',
    src: IMAGES.MAIN_BIOGRAPHY_GALLERY(18),
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-19',
    src: IMAGES.MAIN_BIOGRAPHY_GALLERY(19),
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-20',
    src: IMAGES.MAIN_BIOGRAPHY_GALLERY(20),
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  }
];

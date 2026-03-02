import type { Locale } from 'next-intl';

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
    src: '/images/biography-gallery/1.png',
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
    src: '/images/biography-gallery/2.png',
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
    src: '/images/biography-gallery/3.png',
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-4',
    src: '/images/biography-gallery/4.png',
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
    src: '/images/biography-gallery/5.png',
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-6',
    src: '/images/biography-gallery/6.png',
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
    src: '/images/biography-gallery/7.png',
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
    src: '/images/biography-gallery/8.png',
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-9',
    src: '/images/biography-gallery/9.png',
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-10',
    src: '/images/biography-gallery/10.png',
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-11',
    src: '/images/biography-gallery/11.png',
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-12',
    src: '/images/biography-gallery/12.png',
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-13',
    src: '/images/biography-gallery/13.png',
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
    src: '/images/biography-gallery/14.png',
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-15',
    src: '/images/biography-gallery/15.png',
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-16',
    src: '/images/biography-gallery/16.png',
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-17',
    src: '/images/biography-gallery/17.png',
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-18',
    src: '/images/biography-gallery/18.png',
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-19',
    src: '/images/biography-gallery/19.png',
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  },
  {
    id: 'bio-20',
    src: '/images/biography-gallery/20.png',
    alt: {
      uk: 'Архівне фото Бориса Лятошинського',
      en: 'Archival photograph of Borys Liatoshynsky'
    },
    caption: null
  }
];

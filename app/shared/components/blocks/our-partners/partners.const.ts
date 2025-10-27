export const partners = {
  musicHouse: {
    link: '/',
    img: '/images/partners/national-music-house.png',
    name: 'Національний будинок музики'
  },
  philharmonic: {
    link: '/',
    img: '/images/partners/national-philharmonic.png',
    name: 'Національна філармонія України'
  },
  liatoshynsky: {
    link: '/',
    img: '/images/partners/liatoshynsky-space.png',
    name: 'Liatoshynsky Space'
  },
  masterKlass: {
    link: '/',
    img: '/images/partners/masterklass.png',
    name: 'Master Klass'
  },
  kolomyia: {
    link: '/',
    img: '/images/partners/kolomyia-philharmonic.png',
    name: 'Коломийська філармонія'
  },
  axon: {
    link: '/',
    img: '/images/partners/axon-partners.png',
    name: 'Axon Partners'
  },
  espreso: {
    link: '/',
    img: '/images/partners/espreso.png',
    name: 'Еспресо'
  },
  softserve: {
    link: '/',
    img: '/images/partners/softserve.png',
    name: 'SoftServe Academy'
  },
  opentech: {
    link: '/',
    img: '/images/partners/opentech.png',
    name: 'OpenTech'
  }
} as const;

export type PartnerKey = keyof typeof partners;

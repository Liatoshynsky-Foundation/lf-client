export interface Partner {
  id: string;
  link: string;
  img: string;
  name: string;
}

export const partnersMock: Partner[] = [
  {
    id: 'musicHouse',
    link: '/',
    img: '/images/partners/national-music-house.png',
    name: 'Національний будинок музики'
  },
  {
    id: 'philharmonic',
    link: '/',
    img: '/images/partners/national-philharmonic.png',
    name: 'Національна філармонія України'
  },
  {
    id: 'liatoshynsky',
    link: '/',
    img: '/images/partners/liatoshynsky-space.png',
    name: 'Liatoshynsky Space'
  },
  {
    id: 'masterKlass',
    link: '/',
    img: '/images/partners/masterklass.png',
    name: 'Master Klass'
  },
  {
    id: 'kolomyia',
    link: '/',
    img: '/images/partners/kolomyia-philharmonic.png',
    name: 'Коломийська філармонія'
  },
  {
    id: 'axon',
    link: '/',
    img: '/images/partners/axon-partners.png',
    name: 'Axon Partners'
  },
  {
    id: 'espreso',
    link: '/',
    img: '/images/partners/espreso.png',
    name: 'Еспресо'
  },
  {
    id: 'softserve',
    link: '/',
    img: '/images/partners/softserve.png',
    name: 'SoftServe Academy'
  },
  {
    id: 'opentech',
    link: '/',
    img: '/images/partners/opentech.png',
    name: 'OpenTech'
  }
];

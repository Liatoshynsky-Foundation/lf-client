import { ROUTES } from '../../constants/routes';

export interface Partner {
  id: string;
  link: string;
  img: string;
  name: string;
}

const partnerData: Partner[] = [
  {
    id: 'musicHouse',
    name: 'Національний будинок музики',
    img: 'national-music-house.png',
    link: 'https://nhm.com.ua/'
  },
  {
    id: 'philharmonic',
    name: 'Національна філармонія України',
    img: 'national-philharmonic.png',
    link: 'https://philarmonia.com.ua/'
  },
  {
    id: 'liatoshynsky',
    name: 'Liatoshynsky Space',
    img: 'liatoshynsky-space.png',
    link: ROUTES.HOME
  },
  {
    id: 'masterKlass',
    name: 'Master Klass',
    img: 'masterklass.png',
    link: 'https://dommk.org/'
  },
  {
    id: 'kolomyia',
    name: 'Коломийська філармонія',
    img: 'kolomyia-philharmonic.png',
    link: 'https://kocult.com/home/philharmonic'
  },
  {
    id: 'axon',
    name: 'Axon Partners',
    img: 'axon-partners.png',
    link: 'https://axon.partners/'
  },
  {
    id: 'espreso',
    name: 'Еспресо',
    img: 'espreso.png',
    link: 'https://espreso.tv/'
  },
  {
    id: 'softserve',
    name: 'SoftServe Academy',
    img: 'softserve.png',
    link: 'https://softserve.academy/'
  },
  {
    id: 'opentech',
    name: 'OpenTech',
    img: 'opentech.png',
    link: 'https://opentech.softserveinc.com/uk'
  }
];

export const partnersMock: Partner[] = partnerData.map((p) => ({
  ...p,
  img: `/images/partners/${p.img}`
}));

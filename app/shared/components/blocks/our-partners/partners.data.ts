export interface Partner {
  id: string;
  link: string;
  img: string;
  name: string;
}

const partnerData: Omit<Partner, 'link'>[] = [
  { id: 'musicHouse', name: 'Національний будинок музики', img: 'national-music-house.png' },
  { id: 'philharmonic', name: 'Національна філармонія України', img: 'national-philharmonic.png' },
  { id: 'liatoshynsky', name: 'Liatoshynsky Space', img: 'liatoshynsky-space.png' },
  { id: 'masterKlass', name: 'Master Klass', img: 'masterklass.png' },
  { id: 'kolomyia', name: 'Коломийська філармонія', img: 'kolomyia-philharmonic.png' },
  { id: 'axon', name: 'Axon Partners', img: 'axon-partners.png' },
  { id: 'espreso', name: 'Еспресо', img: 'espreso.png' },
  { id: 'softserve', name: 'SoftServe Academy', img: 'softserve.png' },
  { id: 'opentech', name: 'OpenTech', img: 'opentech.png' }
];

export const partnersMock: Partner[] = partnerData.map((p) => ({
  ...p,
  link: '/',
  img: `/images/partners/${p.img}`
}));

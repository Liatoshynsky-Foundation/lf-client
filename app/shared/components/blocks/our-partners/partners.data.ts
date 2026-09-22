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
    link: 'https://philarmonia.com.ua/project/ls/'
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
    link: 'https://www.facebook.com/kolomyia.filarmonia'
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
  },
  {
    id: 'ukrainianInstitute',
    name: 'Український інститут',
    img: 'ukrainian-institute.png',
    link: 'https://ui.org.ua/sectors/antologiya-ukrayinskoyi-kamernoyi-muzyky-borys-lyatoshynskyj-strunni-kvartety/'
  },
  {
    id: 'diplomaticAcademy',
    name: 'Дипломатична академія',
    img: 'dip-academy.png',
    link: 'https://da.mfa.gov.ua/'
  },
  {
    id: 'sshdir',
    name: 'Наукове товариство історії дипломатії',
    img: 'sshdir.svg',
    link: 'https://sshdir.org.ua/pro-tovarystvo/'
  },
  {
    id: 'lvivOpera',
    name: 'Львівська опера',
    img: 'lviv-opera.png',
    link: 'https://opera.lviv.ua/shows/zolotyy-obruch/'
  },
  {
    id: 'ucmFoundation',
    name: 'Фундація української класичної музики',
    img: 'ucm-foundation.png',
    link: 'https://www.facebook.com/ucmfoundation/'
  },
  {
    id: 'laboratoria',
    name: 'Видавництво «Лабораторія»',
    img: 'laboratoria.png',
    link: 'https://laboratory.ua/products/chasy-zadzerkallya-vybir-borysa-lyatoshynskogo'
  },

  {
    id: 'cowoGuru',
    name: 'Cowoguru',
    img: 'cowo-guru.png',
    link: 'https://www.cowo.guru/'
  },
  {
    id: 'kmbsAlumni',
    name: 'Alumni kmbs',
    img: 'kmbs-alumni.svg',
    link: 'https://alumni.kmbs.ua/'
  },
  {
    id: 'kyivCamerata',
    name: 'Київська камерата',
    img: 'kyiv-camerata.png',
    link: 'https://kyivcamerata.org/ua/ua/'
  }
];

export const partnersMock: Partner[] = partnerData.map((p) => ({
  ...p,
  img: `/images/partners/${p.img}`
}));

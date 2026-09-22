export interface Partner {
  id: string;
  link: string;
  img: string;
  name: string;
}

type PartnerRaw = [id: string, name: string, img: string, link: string];

const rawPartners: PartnerRaw[] = [
  ['musicHouse', 'Національний будинок музики', 'national-music-house.png', 'https://nhm.com.ua/'],
  ['philharmonic', 'Національна філармонія України', 'national-philharmonic.png', 'https://philarmonia.com.ua/'],
  ['liatoshynsky', 'Liatoshynsky Space', 'liatoshynsky-space.png', 'https://philarmonia.com.ua/project/ls/'],
  ['masterKlass', 'Master Klass', 'masterklass.png', 'https://dommk.org/'],
  ['kolomyia', 'Коломийська філармонія', 'kolomyia-philharmonic.png', 'https://www.facebook.com/kolomyia.filarmonia'],
  ['axon', 'Axon Partners', 'axon-partners.png', 'https://axon.partners/'],
  ['espreso', 'Еспресо', 'espreso.png', 'https://espreso.tv/'],
  ['softserve', 'SoftServe Academy', 'softserve.png', 'https://softserve.academy/'],
  ['opentech', 'OpenTech', 'opentech.png', 'https://opentech.softserveinc.com/uk'],
  [
    'ukrainianInstitute',
    'Український інститут',
    'ukrainian-institute.png',
    'https://ui.org.ua/sectors/antologiya-ukrayinskoyi-kamernoyi-muzyky-borys-lyatoshynskyj-strunni-kvartety/'
  ],
  ['diplomaticAcademy', 'Дипломатична академія', 'dip-academy.png', 'https://da.mfa.gov.ua/'],
  ['sshdir', 'Наукове товариство історії дипломатії', 'sshdir.svg', 'https://sshdir.org.ua/pro-tovarystvo/'],
  ['lvivOpera', 'Львівська опера', 'lviv-opera.png', 'https://opera.lviv.ua/shows/zolotyy-obruch/'],
  [
    'ucmFoundation',
    'Фундація української класичної музики',
    'ucm-foundation.png',
    'https://www.facebook.com/ucmfoundation/'
  ],
  [
    'laboratoria',
    'Видавництво «Лабораторія»',
    'laboratoria.png',
    'https://laboratory.ua/products/chasy-zadzerkallya-vybir-borysa-lyatoshynskogo'
  ],
  ['cowoGuru', 'Cowoguru', 'cowo-guru.png', 'https://www.cowo.guru/'],
  ['kmbsAlumni', 'Alumni kmbs', 'kmbs-alumni.svg', 'https://alumni.kmbs.ua/'],
  ['kyivCamerata', 'Київська камерата', 'kyiv-camerata.png', 'https://kyivcamerata.org/ua/ua/']
];

export const partnersMock: Partner[] = rawPartners.map(([id, name, img, link]) => ({
  id,
  name,
  img: `/images/partners/${img}`,
  link
}));

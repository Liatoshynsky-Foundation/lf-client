export interface Partner {
  id: string;
  name: string;
  img: string;
  link: string;
}

const createPartner = (id: string, name: string, img: string, link: string): Partner => ({
  id,
  name,
  img: `/images/partners/${img}`,
  link
});

export const partnersMock: Partner[] = [
  createPartner('musicHouse', 'Національний будинок музики', 'national-music-house.png', 'https://nhm.com.ua/'),
  createPartner(
    'philharmonic',
    'Національна філармонія України',
    'national-philharmonic.png',
    'https://philarmonia.com.ua/'
  ),
  createPartner(
    'liatoshynsky',
    'Liatoshynsky Space',
    'liatoshynsky-space.png',
    'https://philarmonia.com.ua/project/ls/'
  ),
  createPartner('masterKlass', 'Master Klass', 'masterklass.png', 'https://dommk.org/'),
  createPartner(
    'kolomyia',
    'Коломийська філармонія',
    'kolomyia-philharmonic.png',
    'https://www.facebook.com/kolomyia.filarmonia'
  ),
  createPartner('axon', 'Axon Partners', 'axon-partners.png', 'https://axon.partners/'),
  createPartner('espreso', 'Еспресо', 'espreso.png', 'https://espreso.tv/'),
  createPartner('softserve', 'SoftServe Academy', 'softserve.png', 'https://softserve.academy/'),
  createPartner('opentech', 'OpenTech', 'opentech.png', 'https://opentech.softserveinc.com/uk'),
  createPartner(
    'ukrainianInstitute',
    'Український інститут',
    'ukrainian-institute.png',
    'https://ui.org.ua/sectors/antologiya-ukrayinskoyi-kamernoyi-muzyky-borys-lyatoshynskyj-strunni-kvartety/'
  ),
  createPartner('diplomaticAcademy', 'Дипломатична академія', 'dip-academy.png', 'https://da.mfa.gov.ua/'),
  createPartner(
    'sshdir',
    'Наукове товариство історії дипломатії',
    'sshdir.svg',
    'https://sshdir.org.ua/pro-tovarystvo/'
  ),
  createPartner('cowoGuru', 'Cowoguru', 'cowo-guru.png', 'https://www.cowo.guru/'),
  createPartner('kmbsAlumni', 'Alumni kmbs', 'kmbs-alumni.svg', 'https://alumni.kmbs.ua/'),
  createPartner('kyivCamerata', 'Київська камерата', 'kyiv-camerata.png', 'https://kyivcamerata.org/ua/ua/'),
  createPartner('lvivOpera', 'Львівська опера', 'lviv-opera.png', 'https://opera.lviv.ua/shows/zolotyy-obruch/'),
  createPartner(
    'ucmFoundation',
    'Фундація української класичної музики',
    'ucm-foundation.png',
    'https://www.facebook.com/ucmfoundation/'
  ),
  createPartner(
    'laboratoria',
    'Видавництво «Лабораторія»',
    'laboratoria.png',
    'https://laboratory.ua/products/chasy-zadzerkallya-vybir-borysa-lyatoshynskogo'
  ),
  createPartner(
    'ostrozkiFoundation',
    'Благодійний фонд «Фундація імені князів Острозьких»',
    'ostrozki-foundation.png',
    'https://www.facebook.com/ostrozkifoundation/'
  ),
  createPartner('insoLviv', 'Оркестр INSO-Львів', 'inso-lviv.png', 'https://insolviv.com/')
];

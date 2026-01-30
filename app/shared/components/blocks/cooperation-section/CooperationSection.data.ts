import { partnersMock } from '../our-partners/partners.data';
import { TipTapDoc } from '~/types/types/tiptap.types';

import { makeDoc, normalText } from '~/lib/utils/tiptapHelpers';

type LocalizedTipTapDoc = {
  uk: TipTapDoc;
  en: TipTapDoc;
};

export const cooperationSectionTextContent: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Ми віримо, що великі ідеї народжуються у співпраці. Саме завдяки підтримці партнерів і друзів нам вдається реалізовувати проєкти, що популяризують українську музику у світі. Якщо вам близькі наші цінності — будемо раді знайомству.'
    )
  ]),
  en: makeDoc([
    normalText(
      'We believe that great ideas are born in collaboration. It is thanks to the support of partners and friends that we are able to implement projects that popularize Ukrainian music in the world. If our values are close to you — we will be happy to meet you.'
    )
  ])
};

export const cooperationSectionData = {
  title: {
    uk: 'НаШі ПаРтнЕрИ',
    en: 'OuR PaRtNeRs'
  },
  textContent: cooperationSectionTextContent,
  buttonText: {
    uk: 'Долучитись до співпраці',
    en: 'Join the Partnership'
  },
  buttonLink: '/cooperation',
  partners: partnersMock
};

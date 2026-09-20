import { partnersMock } from '../our-partners/partners.data';
import { TipTapDoc } from '~/types/types/tiptap.types';

import { makeDoc, normalText } from '~/lib/utils/tiptapHelpers';
import { ROUTES } from '~/shared/components/constants/routes';

type LocalizedTipTapDoc = {
  uk: TipTapDoc;
  en: TipTapDoc;
};

export const cooperationSectionTextContent: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Проєкти Фундації реалізуються у співпраці з музикантами, дослідниками, культурними інституціями, видавництвами та іншими партнерами в Україні й за кордоном. Ми відкриті до нових професійних партнерств і спільних проєктів, пов’язаних із дослідженням, виконанням і виданням музики Бориса Лятошинського.'
    )
  ]),
  en: makeDoc([
    normalText(
      'The Foundation’s projects are developed in collaboration with musicians, researchers, cultural institutions, publishers, and other partners in Ukraine and abroad. We are open to new professional partnerships and collaborative projects related to the research, performance, and publication of Borys Liatoshynsky’s music.'
    )
  ])
};

export const cooperationSectionData = {
  title: {
    uk: 'Наші партнери',
    en: 'Our Partners'
  },
  textContent: cooperationSectionTextContent,
  buttonText: {
    uk: 'Долучитись до співпраці',
    en: 'Join the Partnership'
  },
  buttonLink: ROUTES.COOPERATION,
  partners: partnersMock
};

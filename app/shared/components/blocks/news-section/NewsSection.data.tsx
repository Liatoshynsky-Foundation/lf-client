import { TipTapDoc } from '~/types/types/tiptap.types';

import { makeDoc, normalText } from '~/lib/utils/tiptapHelpers';
import { ROUTES } from '~/shared/components/constants/routes';

type LocalizedTipTapDoc = {
  uk: TipTapDoc;
  en: TipTapDoc;
};

export const newsSectionTextContent: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Концерти й фестивалі, нові видання та записи, дослідження, виставки, зустрічі й інші проєкти — тут ми розповідаємо про те, над чим працює Фундація і що відбувається навколо спадщини Бориса Лятошинського.'
    )
  ]),
  en: makeDoc([
    normalText(
      'Concerts and festivals, new publications and recordings, research, exhibitions, meetings, and other projects—here we share what the Foundation is working on and what is happening around the legacy of Borys Liatoshynsky.'
    )
  ])
};

export const newsSliderPrevLabel = {
  uk: 'Попередня новина',
  en: 'Previous news item'
};

export const newsSliderNextLabel = {
  uk: 'Наступна новина',
  en: 'Next news item'
};

export const newsSectionData = {
  title: {
    uk: 'Новини Фундації',
    en: 'Foundation News'
  },
  textContent: newsSectionTextContent,
  buttonText: {
    uk: 'Переглянути усі новини',
    en: 'View All News'
  },
  buttonLink: ROUTES.NEWS
};

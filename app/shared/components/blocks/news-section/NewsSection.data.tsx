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
      'Ми наполегливо працюємо, відкриваємо нове й ділимося натхненням. Концерти, фестивалі, дискусії, екскурсії, дослідження — наше життя насичене подіями, зустрічами та відкриттями. Найцікавішим із цього ми радо ділимося з нашими читачами.'
    )
  ]),
  en: makeDoc([
    normalText(
      'We work hard, discover new things, and share inspiration. From concerts and festivals to discussions, tours, and research—our lives are packed with events, encounters, and discoveries. We are delighted to share the most exciting highlights with our readers.'
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
    uk: 'НоВиНи ФунДаЦІЇ',
    en: 'FounDatION NeWs '
  },
  textContent: newsSectionTextContent,
  buttonText: {
    uk: 'Переглянути усі новини',
    en: 'View All News'
  },
  buttonLink: ROUTES.NEWS
};

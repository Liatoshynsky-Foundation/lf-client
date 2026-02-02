import { TipTapDoc } from '~/types/types/tiptap.types';

import { makeDoc, normalText } from '~/lib/utils/tiptapHelpers';

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

export const newsSectionData = {
  title: {
    uk: 'НаШі НоВиНи',
    en: 'OuR NeWs'
  },
  textContent: newsSectionTextContent,
  buttonText: {
    uk: 'Переглянути усі новини',
    en: 'View All News'
  },
  buttonLink: '/news'
};

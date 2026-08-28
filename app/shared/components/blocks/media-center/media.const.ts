import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

import { makeDoc, normalText } from '~/lib/utils/tiptapHelpers';
import { IMAGES } from '~/shared/constants/assets';

type LocalizedTipTapDoc = {
  uk: TipTapDoc;
  en: TipTapDoc;
};

export const mediaBigDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'У цьому розділі ми зібрали все, чим живе Фундація Лятошинського просто зараз. Концерти, лекції, новини, відео й архівні скарби — тут звучить не лише музика, а й події, що формують українську культурну реальність.'
    )
  ]),
  en: makeDoc([
    normalText(
      'In this section, we have gathered everything that the Liatoshynsky Foundation is currently working on. Concerts, lectures, news, videos, and archival treasures — here you will find not only music, but also events that shape Ukrainian cultural reality.'
    )
  ])
};

export const mockNewsList = [
  {
    _id: '1',
    publishedAt: '2024-03-16T14:30:00.000Z',
    newsDate: '2024-01-15T00:00:00.000Z',
    title: 'Новини українськлю',

    description: 'Опис новин українськлю',

    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'Уся інформацію щодо цієї новини українською'
            }
          ]
        }
      ]
    },
    slug: 'news-title-1',
    coverImage: {
      src: IMAGES.PLACEHOLDER,
      alt: 'Альтернативний текст для зображення 1',

      caption: 'Підпис до зображення 1',
      isTmp: false
    },
    status: 'published',
    meta: {
      views: 1000
    }
  }
];

export const mockPressList = [
  {
    _id: '1',
    publishedAt: '2024-07-12T11:40:00.000Z',
    newsDate: '2024-02-05T00:00:00.000Z',
    title: 'ЗМІ українською',

    description: 'Тут буде опис',

    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'тут буде повний текст'
            }
          ]
        }
      ]
    },
    slug: 'press-title-1',
    coverImage: {
      src: IMAGES.PLACEHOLDER,
      alt: 'Альтернативний текст для зображення 1',

      caption: 'Підпис до зображення 1',
      isTmp: false
    },
    status: 'published',
    meta: {
      views: 1400
    }
  }
];

export const mockEventsList = [
  {
    _id: '1',
    title: '131 років від дня народження',
    eventDateTimeStart: '2025-05-21T00:00:00.000Z',
    eventDateTimeEnd: null,
    status: 'published',
    publishedAt: '2025-05-20T00:00:00.000Z',
    description: 'Опис події',
    slug: 'event-title-1',
    coverImage: {
      src: IMAGES.PLACEHOLDER,
      alt: 'Альтернативний текст',
      caption: 'Підпис',
      isTmp: false
    },
    meta: {
      views: 100
    }
  }
];

export const mediaSmallDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Слідкуйте за анонсами, повертайтеся до вже пережитого, шукайте натхнення — Лятошинський і сьогодні має, що сказати.'
    )
  ]),
  en: makeDoc([
    normalText(
      'Follow the announcements, revisit past experiences, seek inspiration — Liatoshynsky still has something to say today.'
    )
  ])
};

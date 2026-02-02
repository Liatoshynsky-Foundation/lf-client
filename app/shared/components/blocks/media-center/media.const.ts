import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

import { makeDoc, normalText } from '~/lib/utils/tiptapHelpers';

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
      'In this section, we have gathered everything that the Lyatoshynsky Foundation is currently working on. Concerts, lectures, news, videos, and archival treasures — here you will find not only music, but also events that shape Ukrainian cultural reality.'
    )
  ])
};

export const mediaSmallDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Слідкуйте за анонсами, повертайтеся до вже пережитого, шукайте натхнення — Лятошинський і сьогодні має що сказати.'
    )
  ]),
  en: makeDoc([
    normalText(
      'Follow the announcements, revisit past experiences, seek inspiration — Lyatoshynsky still has something to say today.'
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
      src: '/images/placeholder.png',
      alt: 'Альтернативний текст для зображення 1',

      caption: 'Підпис до зображення 1',
      isTmp: false
    },
    status: 'published',
    meta: {
      views: 1000
    }
  },
  {
    _id: '2',
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
      src: '/images/placeholder.png',
      alt: 'Альтернативний текст для зображення 1',

      caption: 'Підпис до зображення 1',
      isTmp: false
    },
    status: 'published',
    meta: {
      views: 1000
    }
  },
  {
    _id: '3',
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
      src: '/images/placeholder.png',
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
      src: '/images/placeholder.png',
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

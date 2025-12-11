import { TipTapNodeTypes } from '~/types/enums/common.enums';

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

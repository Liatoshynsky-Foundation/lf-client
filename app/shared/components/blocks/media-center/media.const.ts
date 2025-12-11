import { TipTapNodeTypes } from '~/types/enums/common.enums';

export const mockNewsList = [
  {
    _id: '651234567890abcdef123456',
    publishedAt: '2024-01-16T10:30:00.000Z',
    newsDate: '2024-01-15T00:00:00.000Z',
    title: 'Заголовок новини 1 українською',

    description: 'Короткий опис новини 1 українською мовою',

    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'Повний текст новини українською мовою...'
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
      views: 1250
    }
  },
  {
    _id: '651234567890abcdef123455',
    publishedAt: '2024-01-15T10:30:00.000Z',
    newsDate: '2024-01-15T00:00:00.000Z',
    title: 'Заголовок новини 1 українською',

    description: 'Короткий опис новини 1 українською мовою',

    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'Повний текст новини українською мовою...'
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
      views: 1250
    }
  },
  {
    _id: '651234567890abcdef123454',
    publishedAt: '2024-01-10T10:30:00.000Z',
    newsDate: '2024-01-15T00:00:00.000Z',
    title: 'Заголовок новини 1 українською',

    description:
      'Короткий опис новини 1 українською мовоюКороткий опис новини 1 українською мовоюКороткий опис новини 1 українською мовоюКороткий опис новини 1 українською мовоюКороткий опис новини 1 українською мовоюКороткий опис новини 1 українською мовою',

    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'Повний текст новини українською мовою...'
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
      views: 1250
    }
  },
  {
    _id: '651234567890abcdef123453',
    publishedAt: '2024-01-11T10:30:00.000Z',
    newsDate: '2024-01-15T00:00:00.000Z',
    title: 'Заголовок новини 1 українською',

    description: 'Короткий опис новини 1 українс ькою мовою',

    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'Повний текст новини українською мовою...'
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
      views: 1250
    }
  },
  {
    _id: '651234567890abcdef123452',
    publishedAt: '2024-01-25T10:30:00.000Z',
    newsDate: '2024-01-15T00:00:00.000Z',
    title: 'Заголовок новини 1 українською',
    description:
      'Короткий опис новини 1 українською мовоюКороткий опис новини 1 українською мовоюКороткий опис новини 1 українською мовоюКороткий опис новини 1 українською мовоюКороткий опис новини 1 українською мовоюКороткий опис новини 1 українською мовою',
    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'Повний текст новини українською мовою...'
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
      views: 1250
    }
  },
  {
    _id: '651234567890abcdef123451',
    publishedAt: '2024-01-21T10:30:00.000Z',
    newsDate: '2024-01-15T00:00:00.000Z',
    title: 'Заголовок новини 1 українською',

    description:
      'Короткий опис новини 1 українською мовоюКороткий опис новини 1 українською мовоюКороткий опис новини 1 українською мовоюКороткий опис новини 1 українською мовоюКороткий опис новини 1 українською мовоюКороткий опис новини 1 українською мовою',
    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'Повний текст новини українською мовою...'
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
      views: 1250
    }
  },
  {
    _id: '651234567890abcdef123450',
    publishedAt: '2024-01-06T10:30:00.000Z',
    newsDate: '2024-01-15T00:00:00.000Z',
    title: 'Заголовок новини 1 українською',

    description:
      'Короткий опис новини 1 українською мовоюКороткий опис новини 1 українською мовоюКороткий опис новини 1 українською мовоюКороткий опис новини 1 українською мовоюКороткий опис новини 1 українською мовоюКороткий опис новини 1 українською мовою',
    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'Повний текст новини українською мовою...'
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
      views: 1250
    }
  },
  {
    _id: '651234567890abcdef123457',
    publishedAt: '2024-01-01T10:30:00.000Z',
    newsDate: '2024-01-15T00:00:00.000Z',
    title: 'Заголовок новини 1 українською',
    description: 'Короткий опис новини 1 українською мовою',
    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'Повний текст новини українською мовою...'
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
      views: 1250
    }
  },
  {
    _id: '651234567890abcdef123458',
    publishedAt: '2024-01-30T10:30:00.000Z',
    newsDate: '2024-01-15T00:00:00.000Z',
    title: 'Заголовок новини 1 українською',

    description: 'Короткий опис новини 1 українською мовою',
    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'Повний текст новини українською мовою...'
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
      views: 1250
    }
  },
  {
    _id: '651234567890abcdef123459',
    publishedAt: '2024-01-28T10:30:00.000Z',
    newsDate: '2024-01-15T00:00:00.000Z',
    title: 'Заголовок новини 1 українською',
    description: 'Короткий опис новини 1 українською мовою',
    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'Повний текст новини українською мовою...'
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
      views: 1250
    }
  },
  {
    _id: '651234567890abcdef123460',
    publishedAt: '2024-01-25T10:30:00.000Z',
    newsDate: '2024-01-15T00:00:00.000Z',
    title: 'Заголовок новини 1 українською',
    description: 'Короткий опис новини 1 українською мовою',
    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'Повний текст новини українською мовою...'
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
      views: 1250
    }
  }
];

export const mockPressList = [
  {
    _id: '651234567890abcdef123490',
    publishedAt: '2024-01-16T10:30:00.000Z',
    newsDate: '2024-01-15T00:00:00.000Z',
    title: 'Заголовок ЗМІ 1 українською',

    description: 'Короткий опис ЗМІ 1 українською мовою',

    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'Повний текст ЗМІ українською мовою...'
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
      views: 1250
    }
  },
  {
    _id: '651234567890abcdef123491',
    publishedAt: '2024-01-15T10:30:00.000Z',
    newsDate: '2024-01-15T00:00:00.000Z',
    title: 'Заголовок ЗМІ 1 українською',

    description: 'Короткий опис ЗМІ 1 українською мовою',

    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'Повний текст ЗМІ українською мовою...'
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
      views: 1250
    }
  },
  {
    _id: '651234567890abcdef123492',
    publishedAt: '2024-01-10T10:30:00.000Z',
    newsDate: '2024-01-15T00:00:00.000Z',
    title: 'Заголовок ЗМІ 1 українською',

    description:
      'Короткий опис ЗМІ 1 українською мовоюКороткий опис ЗМІ 1 українською мовоюКороткий опис ЗМІ 1 українською мовоюКороткий опис ЗМІ 1 українською мовоюКороткий опис ЗМІ 1 українською мовоюКороткий опис ЗМІ 1 українською мовою',

    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'Повний текст ЗМІ українською мовою...'
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
      views: 1250
    }
  },
  {
    _id: '651234567890abcdef123493',
    publishedAt: '2024-01-11T10:30:00.000Z',
    newsDate: '2024-01-15T00:00:00.000Z',
    title: 'Заголовок ЗМІ 1 українською',

    description: 'Короткий опис ЗМІ 1 українс ькою мовою',

    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'Повний текст ЗМІ українською мовою...'
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
      views: 1250
    }
  },
  {
    _id: '651234567890abcdef123494',
    publishedAt: '2024-01-25T10:30:00.000Z',
    newsDate: '2024-01-15T00:00:00.000Z',
    title: 'Заголовок ЗМІ 1 українською',
    description:
      'Короткий опис ЗМІ 1 українською мовоюКороткий опис ЗМІ 1 українською мовоюКороткий опис ЗМІ 1 українською мовоюКороткий опис ЗМІ 1 українською мовоюКороткий опис ЗМІ 1 українською мовоюКороткий опис ЗМІ 1 українською мовою',
    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'Повний текст ЗМІ українською мовою...'
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
      views: 1250
    }
  },
  {
    _id: '651234567890abcdef123495',
    publishedAt: '2024-01-21T10:30:00.000Z',
    newsDate: '2024-01-15T00:00:00.000Z',
    title: 'Заголовок ЗМІ 1 українською',

    description:
      'Короткий опис ЗМІ 1 українською мовоюКороткий опис ЗМІ 1 українською мовоюКороткий опис ЗМІ 1 українською мовоюКороткий опис ЗМІ 1 українською мовоюКороткий опис ЗМІ 1 українською мовоюКороткий опис ЗМІ 1 українською мовою',
    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'Повний текст ЗМІ українською мовою...'
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
      views: 1250
    }
  },
  {
    _id: '651234567890abcdef123496',
    publishedAt: '2024-01-06T10:30:00.000Z',
    newsDate: '2024-01-15T00:00:00.000Z',
    title: 'Заголовок ЗМІ 1 українською',

    description:
      'Короткий опис ЗМІ 1 українською мовоюКороткий опис ЗМІ 1 українською мовоюКороткий опис ЗМІ 1 українською мовоюКороткий опис ЗМІ 1 українською мовоюКороткий опис ЗМІ 1 українською мовоюКороткий опис ЗМІ 1 українською мовою',
    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'Повний текст ЗМІ українською мовою...'
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
      views: 1250
    }
  },
  {
    _id: '651234567890abcdef123497',
    publishedAt: '2024-01-01T10:30:00.000Z',
    newsDate: '2024-01-15T00:00:00.000Z',
    title: 'Заголовок ЗМІ 1 українською',
    description: 'Короткий опис ЗМІ 1 українською мовою',
    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'Повний текст ЗМІ українською мовою...'
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
      views: 1250
    }
  },
  {
    _id: '651234567890abcdef123498',
    publishedAt: '2024-01-30T10:30:00.000Z',
    newsDate: '2024-01-15T00:00:00.000Z',
    title: 'Заголовок ЗМІ 1 українською',

    description: 'Короткий опис ЗМІ 1 українською мовою',
    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'Повний текст ЗМІ українською мовою...'
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
      views: 1250
    }
  },
  {
    _id: '651234567890abcdef123499',
    publishedAt: '2024-01-28T10:30:00.000Z',
    newsDate: '2024-01-15T00:00:00.000Z',
    title: 'Заголовок ЗМІ 1 українською',
    description: 'Короткий опис ЗМІ 1 українською мовою',
    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'Повний текст ЗМІ українською мовою...'
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
      views: 1250
    }
  },
  {
    _id: '651234567890abcdef123480',
    publishedAt: '2024-01-25T10:30:00.000Z',
    newsDate: '2024-01-15T00:00:00.000Z',
    title: 'Заголовок ЗМІ 1 українською',
    description: 'Короткий опис ЗМІ 1 українською мовою',
    content: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [
            {
              type: TipTapNodeTypes.text as const,
              text: 'Повний текст ЗМІ українською мовою...'
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
      views: 1250
    }
  }
];

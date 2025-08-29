import { Locale } from 'next-intl';

import { createPagesDataService } from './pagesDataService';

import { PageServiceDeps } from '~/domain/services/pagesService.type';
import { createLocalizedAboutUsPageSchema } from '~/validators/pagesSchemas/pages/about-us.schema';

jest.mock('~/validators/pagesSchemas/pages/privacy-policy.schema', () => ({
  createLocalizedPrivacyPolicyPageSchema: jest.fn()
}));

jest.mock('~/validators/pagesSchemas/pages/about-us.schema', () => ({
  createLocalizedAboutUsPageSchema: jest.fn()
}));

const mockPagesDataRepository = {
  getPageData: jest.fn()
};

const mockedCreateLocalizedAboutUsPageSchema = createLocalizedAboutUsPageSchema as jest.Mock;

describe('createPagesDataService', () => {
  let service: ReturnType<typeof createPagesDataService>;

  const pageDataFromRepo = {
    _id: 'page_id',
    pageType: 'AboutUsPage',
    slug: 'about-us',
    title: { uk: 'Про нас', en: 'About Us' },
    status: 'published',
    blocks: {
      IntroSection: {
        title: { uk: 'Вступ', en: 'Introduction' },
        image: { url: 'intro.jpg', alt: { uk: 'Вступне зображення', en: 'Intro image' } },
        quote: { text: { uk: 'Цитата', en: 'Quote' }, author: { uk: 'Автор', en: 'Author' } }
      },
      FoundationInfo: {
        ourOrganisation: { uk: { content: 'Org content uk' }, en: { content: 'Org content en' } },
        ourName: { uk: { content: 'Name content uk' }, en: { content: 'Name content en' } },
        ourBelief: { uk: { content: 'Belief content uk' }, en: { content: 'Belief content en' } },
        image: { url: 'foundation.jpg', alt: { uk: 'Фундація', en: 'Foundation' } }
      },
      OurMission: {
        title: { uk: 'Наша місія', en: 'Our Mission' },
        smallImage: { url: 'small.jpg', alt: { uk: 'Мале зображення', en: 'Small image' } },
        bigImage: { url: 'big.jpg', alt: { uk: 'Велике зображення', en: 'Big image' } },
        list: [{ uk: { content: 'Mission item uk' }, en: { content: 'Mission item en' } }]
      },
      OurGoals: {
        title: { uk: 'Наші цілі', en: 'Our Goals' },
        goals: [
          {
            title: { uk: 'Ціль', en: 'Goal' },
            description: { uk: { content: 'Goal desc uk' }, en: { content: 'Goal desc en' } }
          }
        ]
      },
      LiatoshynskyOffice: {
        quote: { text: { uk: 'Офіс цитата', en: 'Office quote' }, author: { uk: 'Автор', en: 'Author' } }
      },
      WhatWeDo: {
        title: { uk: 'Що ми робимо', en: 'What We Do' },
        items: [
          {
            title: { uk: 'Пункт', en: 'Item' },
            description: { uk: { content: 'Item desc uk' }, en: { content: 'Item desc en' } }
          }
        ]
      },
      FoundationFounders: {
        titleText: { uk: { content: 'Founders intro uk' }, en: { content: 'Founders intro en' } },
        listTitle: { uk: 'Засновники', en: 'Founders' },
        members: [
          {
            photo: { url: 'member.jpg', alt: { uk: 'Фото', en: 'Photo' } },
            name: { uk: 'Імʼя', en: 'Name' },
            description: { uk: 'Опис', en: 'Description' }
          }
        ]
      }
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = createPagesDataService({
      pagesDataRepository: mockPagesDataRepository
    } as PageServiceDeps);
  });

  const slug = 'about-us';
  const locale: Locale = 'uk';

  it('should return null if page data is not found', async () => {
    mockPagesDataRepository.getPageData.mockResolvedValue(null);

    const result = await service.getPageData(slug, locale);

    expect(result).toBeNull();
    expect(mockPagesDataRepository.getPageData).toHaveBeenCalledWith(slug);
    expect(mockedCreateLocalizedAboutUsPageSchema).not.toHaveBeenCalled();
  });

  it('should return localized page data when page is found', async () => {
    const localizedPageData = {
      slug,
      title: 'Про нас',
      status: 'published',
      blocks: {
        IntroSection: {
          title: 'Вступ',
          image: { url: 'intro.jpg', alt: 'Вступне зображення' },
          quote: { text: 'Цитата', author: 'Автор' }
        },
        FoundationInfo: {
          ourOrganisation: { content: 'Org content uk' },
          ourName: { content: 'Name content uk' },
          ourBelief: { content: 'Belief content uk' },
          image: { url: 'foundation.jpg', alt: 'Фундація' }
        },
        OurMission: {
          title: 'Наша місія',
          smallImage: { url: 'small.jpg', alt: 'Мале зображення' },
          bigImage: { url: 'big.jpg', alt: 'Велике зображення' },
          list: [{ content: 'Mission item uk' }]
        },
        OurGoals: {
          title: 'Наші цілі',
          goals: [{ title: 'Ціль', description: { content: 'Goal desc uk' } }]
        },
        LiatoshynskyOffice: {
          quote: { text: 'Офіс цитата', author: 'Автор' }
        },
        WhatWeDo: {
          title: 'Що ми робимо',
          items: [{ title: 'Пункт', description: { content: 'Item desc uk' } }]
        },
        FoundationFounders: {
          titleText: { content: 'Founders intro uk' },
          listTitle: 'Засновники',
          members: [
            {
              photo: { url: 'member.jpg', alt: 'Фото' },
              name: 'Імʼя',
              description: 'Опис'
            }
          ]
        }
      }
    };

    const mockSchema = { parse: jest.fn().mockReturnValue(localizedPageData) };
    mockedCreateLocalizedAboutUsPageSchema.mockReturnValue(mockSchema);
    mockPagesDataRepository.getPageData.mockResolvedValue(pageDataFromRepo);

    const result = await service.getPageData(slug, locale);

    expect(mockPagesDataRepository.getPageData).toHaveBeenCalledWith(slug);
    expect(mockedCreateLocalizedAboutUsPageSchema).toHaveBeenCalledWith(locale);
    expect(mockSchema.parse).toHaveBeenCalledWith(pageDataFromRepo);
    expect(result).toEqual(localizedPageData);
  });

  it('should throw an error if schema parsing fails', async () => {
    const validationError = new Error('Zod validation failed');
    const mockSchema = {
      parse: jest.fn().mockImplementation(() => {
        throw validationError;
      })
    };
    mockedCreateLocalizedAboutUsPageSchema.mockReturnValue(mockSchema);
    mockPagesDataRepository.getPageData.mockResolvedValue(pageDataFromRepo);

    await expect(service.getPageData(slug, locale)).rejects.toThrow(validationError);

    expect(mockPagesDataRepository.getPageData).toHaveBeenCalledWith(slug);
    expect(mockedCreateLocalizedAboutUsPageSchema).toHaveBeenCalledWith(locale);
    expect(mockSchema.parse).toHaveBeenCalledWith(pageDataFromRepo);
  });
});

import PageModel from '~/infrastructure/models/pages/pages';
import { pagesDataRepository } from '~/infrastructure/repositories/pages-data/pagesData.repository';
import { PageSchema } from '~/validators/pagesSchemas/pages';

jest.mock('~/infrastructure/db/connect', () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock('~/infrastructure/models/pages/pages', () => ({
  __esModule: true,
  default: {
    findOne: jest.fn()
  }
}));

jest.mock('~/validators/pagesSchemas/pages', () => ({
  ...jest.requireActual('~/validators/pagesSchemas/pages'),
  PageSchema: {
    parse: jest.fn()
  }
}));

const mockedParse = PageSchema.parse as jest.Mock;
const mockedFindOne = PageModel.findOne as jest.Mock;

describe('pagesDataRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const slug = 'about-us';

  it('should return parsed page data when found and valid', async () => {
    const mockDbData = {
      _id: 'db_id',
      pageType: 'AboutUsPage',
      slug,
      title: { uk: 'Про нас', en: 'About Us' },
      status: 'published',
      blocks: {
        IntroSection: {
          title: { uk: 'Вступ', en: 'Introduction' },
          image: { url: 'intro.jpg', alt: { uk: 'Вступне зображення', en: 'Intro image' } },
          quote: { text: { uk: 'Цитата', en: 'Quote' }, author: { uk: 'Автор', en: 'Author' } }
        },
        FoundationInfo: {
          ourOrganisation: { content: 'Org content' },
          ourName: { content: 'Name content' },
          ourBelief: { content: 'Belief content' },
          image: { url: 'foundation.jpg', alt: { uk: 'Фундація', en: 'Foundation' } }
        },
        OurMission: {
          title: { uk: 'Наша місія', en: 'Our Mission' },
          smallImage: { url: 'small.jpg', alt: { uk: 'Мале зображення', en: 'Small image' } },
          bigImage: { url: 'big.jpg', alt: { uk: 'Велике зображення', en: 'Big image' } },
          list: [{ content: 'Mission item' }]
        },
        OurGoals: {
          title: { uk: 'Наші цілі', en: 'Our Goals' },
          goals: [{ title: { uk: 'Ціль', en: 'Goal' }, description: { content: 'Goal desc' } }]
        },
        LiatoshynskyOffice: {
          quote: { text: { uk: 'Офіс цитата', en: 'Office quote' }, author: { uk: 'Автор', en: 'Author' } }
        },
        WhatWeDo: {
          title: { uk: 'Що,we do', en: 'What We Do' },
          items: [{ title: { uk: 'Пункт', en: 'Item' }, description: { content: 'Item desc' } }]
        },
        FoundationFounders: {
          titleText: { content: 'Founders intro' },
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

    const mockParsedData = { ...mockDbData };

    const execMock = jest.fn().mockResolvedValue(mockDbData);
    const leanMock = jest.fn().mockReturnValue({ exec: execMock });
    mockedFindOne.mockReturnValue({ lean: leanMock });

    mockedParse.mockReturnValue(mockParsedData);

    const result = await pagesDataRepository.getBySlugAndStatus(slug, 'published');

    expect(mockedFindOne).toHaveBeenCalledWith({ slug, status: 'published' });
    expect(leanMock).toHaveBeenCalled();
    expect(mockedParse).toHaveBeenCalledWith(mockDbData);
    expect(result).toEqual(mockParsedData);
  });

  it('should return null if page is not found in the database', async () => {
    const execMock = jest.fn().mockResolvedValue(null);
    const leanMock = jest.fn().mockReturnValue({ exec: execMock });
    mockedFindOne.mockReturnValue({ lean: leanMock });

    const result = await pagesDataRepository.getBySlugAndStatus(slug, 'published');

    expect(result).toBeNull();
    expect(mockedFindOne).toHaveBeenCalledWith({ slug, status: 'published' });
    expect(leanMock).toHaveBeenCalled();
    expect(mockedParse).not.toHaveBeenCalled();
  });

  it('should throw an error if page data is invalid', async () => {
    const invalidDbData = { _id: 'some_id', slug, pageType: 'AboutUsPage' };
    const validationError = new Error('Zod validation failed');

    const execMock = jest.fn().mockResolvedValue(invalidDbData);
    const leanMock = jest.fn().mockReturnValue({ exec: execMock });
    mockedFindOne.mockReturnValue({ lean: leanMock });

    mockedParse.mockImplementation(() => {
      throw validationError;
    });

    await expect(pagesDataRepository.getBySlugAndStatus(slug, 'published')).rejects.toThrow(validationError);

    expect(mockedFindOne).toHaveBeenCalledWith({ slug, status: 'published' });
    expect(leanMock).toHaveBeenCalled();
    expect(mockedParse).toHaveBeenCalledWith(invalidDbData);
  });
});

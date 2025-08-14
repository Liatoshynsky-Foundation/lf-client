import { Locale } from 'next-intl';

import { createPagesDataService } from './pagesDataService';
import { transformPageForFrontend } from '~/utils/pageTransformer';

import { PageServiceDeps } from '~/domain/services/pagesService.type';
import { Page as PageType } from '~/validators/page2/page.schema';

jest.mock('~/utils/pageTransformer', () => ({
  transformPageForFrontend: jest.fn()
}));

const mockPagesDataRepository = {
  getPageData: jest.fn()
};

const mockedTransformPageForFrontend = transformPageForFrontend as jest.Mock;

describe('createPagesDataService', () => {
  let service: ReturnType<typeof createPagesDataService>;

  beforeEach(() => {
    jest.clearAllMocks();
    service = createPagesDataService({
      pagesDataRepository: mockPagesDataRepository
    } as PageServiceDeps);
  });

  const slug = 'test';
  const locale: Locale = 'uk';

  it('should return null if page data is not found', async () => {
    mockPagesDataRepository.getPageData.mockResolvedValue(null);

    const result = await service.getPageData(slug, locale);

    expect(result).toBeNull();
    expect(mockPagesDataRepository.getPageData).toHaveBeenCalledWith(slug);
    expect(mockedTransformPageForFrontend).not.toHaveBeenCalled();
  });

  it('should return transformed page data when page is found', async () => {
    const pageDataFromRepo: PageType = {
      _id: 'page_id',
      slug,
      title: { uk: 'Тест', en: 'Test' },
      status: 'published',
      blocks: [
        {
          _id: 'block_id',
          elements: [
            {
              elementType: 'Paragraph',
              content: {
                uk: { type: 'doc', content: [{ type: 'text', text: 'Some content' }] },
                en: { type: 'doc', content: [{ type: 'text', text: 'Some content' }] }
              }
            }
          ]
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const transformedPageData: ReturnType<typeof transformPageForFrontend> = {
      _id: 'page_id',
      slug,
      title: 'Тест',
      status: 'published',
      blocks: [
        {
          _id: 'block_id',
          elements: [
            {
              elementType: 'Paragraph',
              content: { type: 'doc', content: [{ type: 'text', text: 'Some content' }] }
            }
          ]
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockPagesDataRepository.getPageData.mockResolvedValue(pageDataFromRepo);
    mockedTransformPageForFrontend.mockReturnValue(transformedPageData);

    const result = await service.getPageData(slug, locale);

    expect(mockPagesDataRepository.getPageData).toHaveBeenCalledWith(slug);
    expect(mockedTransformPageForFrontend).toHaveBeenCalledWith(pageDataFromRepo, locale);
    expect(result).toEqual(transformedPageData);
  });

  it('should return null if transformPageForFrontend returns null', async () => {
    const pageDataFromRepo: PageType = {
      _id: 'page_id',
      slug,
      title: { uk: 'Тест', en: 'Test' },
      status: 'published',
      blocks: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockPagesDataRepository.getPageData.mockResolvedValue(pageDataFromRepo);
    mockedTransformPageForFrontend.mockReturnValue(null);

    const result = await service.getPageData(slug, locale);

    expect(mockPagesDataRepository.getPageData).toHaveBeenCalledWith(slug);
    expect(mockedTransformPageForFrontend).toHaveBeenCalledWith(pageDataFromRepo, locale);
    expect(result).toBeNull();
  });
});

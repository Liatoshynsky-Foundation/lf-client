import { Locale } from 'next-intl';

import { createPagesDataService } from './pagesDataService';

import { PageServiceDeps } from '~/domain/services/pagesService.type';
import { blockTransformers } from '~/services/strategy/blockStrategy/blockTransformStrategy';
import { AnyBlock } from '~/validators/page/blocks/anyBlock.schema';

jest.mock('~/services/strategy/blockStrategy/blockTransformStrategy', () => ({
  blockTransformers: {
    IntroSection: jest.fn(),
    FoundationInfo: jest.fn(),
    OurMission: jest.fn(),
    OurGoals: jest.fn(),
    LiatoshynskyOffice: jest.fn(),
    WhatWeDo: jest.fn(),
    FoundationFounders: jest.fn()
  }
}));

const mockPagesDataRepository = {
  getPageData: jest.fn()
};

const mockedBlockTransformers = blockTransformers as jest.Mocked<typeof blockTransformers>;
const testMockBlock: AnyBlock = {
  _id: 'test-block-id',
  componentName: 'FoundationInfo',
  blockType: 'ContentConstructorBlock',
  content: {
    elements: []
  }
};
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

  test('should return null if page data is not found', async () => {
    mockPagesDataRepository.getPageData.mockResolvedValue(null);

    const result = await service.getPageData(slug, locale);

    expect(result).toBeNull();
    expect(mockPagesDataRepository.getPageData).toHaveBeenCalledWith(slug);
  });

  test('should return an empty object if page has no blocks', async () => {
    mockPagesDataRepository.getPageData.mockResolvedValue({ blocks: [] });

    const result = await service.getPageData(slug, locale);

    expect(result).toEqual({});
    expect(mockPagesDataRepository.getPageData).toHaveBeenCalledWith(slug);
  });

  test('should transform block and return transformed result', async () => {
    const pageDataFromRepo = {
      blocks: [testMockBlock]
    };

    const transformedIntro = { componentName: 'FoundationInfo', transformedTitle: 'Трансформований Вступ' };

    mockPagesDataRepository.getPageData.mockResolvedValue(pageDataFromRepo);
    mockedBlockTransformers.FoundationInfo.mockReturnValue(transformedIntro);

    const result = await service.getPageData(slug, locale);

    expect(mockPagesDataRepository.getPageData).toHaveBeenCalledWith(slug);
    expect(mockedBlockTransformers.FoundationInfo).toHaveBeenCalledWith(testMockBlock, locale);

    expect(result).toEqual({ FoundationInfo: transformedIntro });
  });
});

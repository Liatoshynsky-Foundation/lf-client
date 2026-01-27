import { PageStatus } from '~/types/enums/common.enums';
import { WrapError, WrapSuccess } from '~/types/types/result';

import DraftPageModel from '~/infrastructure/models/pages/draftPages.model';
import PageModel from '~/infrastructure/models/pages/pages';
import newPagesDataRepo from '~/infrastructure/repositories/pages-data/pagesData.repository';
import { PageSchema as PageZodSchema } from '~/validators/pagesSchemas/pages';

jest.mock('~/infrastructure/db/connect', () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock('~/infrastructure/models/pages/pages', () => ({
  __esModule: true,
  default: { findOne: jest.fn() }
}));

jest.mock('~/infrastructure/models/pages/draftPages.model', () => ({
  __esModule: true,
  default: { findOne: jest.fn() }
}));

jest.mock('~/validators/pagesSchemas/pages', () => ({
  ...jest.requireActual('~/validators/pagesSchemas/pages'),
  PageSchema: { parse: jest.fn() }
}));

const mockedParse = PageZodSchema.parse as jest.Mock;
const mockedFindOnePublished = (PageModel as unknown as { findOne: jest.Mock }).findOne;
const mockedFindOneDraft = (DraftPageModel as unknown as { findOne: jest.Mock }).findOne;

const pagesDataRepository = newPagesDataRepo();

describe('pagesDataRepository', () => {
  const slug = 'about-us';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return parsed published page when found and valid', async () => {
    const mockDbData = { _id: 'db_id', slug, pageType: 'AboutUsPage', status: PageStatus.Published, blocks: {} };
    const mockParsed = { ...mockDbData };

    const execMock = jest.fn().mockResolvedValue(mockDbData);
    const leanMock = jest.fn().mockReturnValue({ exec: execMock });
    mockedFindOnePublished.mockReturnValue({ lean: leanMock });

    mockedParse.mockReturnValue(mockParsed);

    const result = await pagesDataRepository.getBySlug(slug);

    expect(mockedFindOnePublished).toHaveBeenCalledWith({ slug, status: PageStatus.Published });
    expect(leanMock).toHaveBeenCalled();
    expect(mockedParse).toHaveBeenCalledWith(mockDbData);
    expect(result).toEqual(WrapSuccess(mockParsed));
  });

  it('should return null when published page is not found', async () => {
    const execMock = jest.fn().mockResolvedValue(null);
    const leanMock = jest.fn().mockReturnValue({ exec: execMock });
    mockedFindOnePublished.mockReturnValue({ lean: leanMock });

    const result = await pagesDataRepository.getBySlug(slug);

    expect(result).toEqual(WrapError(`No page found with slug: ${slug} and status: ${PageStatus.Published}`));
    expect(mockedFindOnePublished).toHaveBeenCalledWith({ slug, status: PageStatus.Published });
    expect(leanMock).toHaveBeenCalled();
    expect(mockedParse).not.toHaveBeenCalled();
  });

  it('should throw when published page fails validation', async () => {
    const invalidDb = { _id: 'x', slug, pageType: 'AboutUsPage' };
    const execMock = jest.fn().mockResolvedValue(invalidDb);
    const leanMock = jest.fn().mockReturnValue({ exec: execMock });
    mockedFindOnePublished.mockReturnValue({ lean: leanMock });

    const err = new Error('Zod validation failed');
    mockedParse.mockImplementation(() => {
      throw err;
    });

    const result = await pagesDataRepository.getBySlug(slug);
    expect(result).toEqual(WrapError('Unexpected error during parsing:\n' + err.message));
    expect(mockedFindOnePublished).toHaveBeenCalledWith({ slug, status: PageStatus.Published });
    expect(leanMock).toHaveBeenCalled();
    expect(mockedParse).toHaveBeenCalledWith(invalidDb);
  });

  it('should return parsed draft page when found and valid', async () => {
    const mockDbData = { _id: 'db_id', slug, pageType: 'AboutUsPage', status: PageStatus.Draft, blocks: {} };
    const mockParsed = { ...mockDbData };

    const execMock = jest.fn().mockResolvedValue(mockDbData);
    const leanMock = jest.fn().mockReturnValue({ exec: execMock });
    mockedFindOneDraft.mockReturnValue({ lean: leanMock });

    mockedParse.mockReturnValue(mockParsed);

    const result = await pagesDataRepository.getDraftBySlug(slug);

    expect(mockedFindOneDraft).toHaveBeenCalledWith({ slug, status: PageStatus.Draft });
    expect(leanMock).toHaveBeenCalled();
    expect(mockedParse).toHaveBeenCalledWith(mockDbData);
    expect(result).toEqual(WrapSuccess(mockParsed));
  });

  it('should return null when draft page is not found', async () => {
    const execMock = jest.fn().mockResolvedValue(null);
    const leanMock = jest.fn().mockReturnValue({ exec: execMock });
    mockedFindOneDraft.mockReturnValue({ lean: leanMock });

    const result = await pagesDataRepository.getDraftBySlug(slug);

    expect(result).toEqual(WrapError(`No page found with slug: ${slug} and status: ${PageStatus.Draft}`));
    expect(mockedFindOneDraft).toHaveBeenCalledWith({ slug, status: PageStatus.Draft });
    expect(leanMock).toHaveBeenCalled();
    expect(mockedParse).not.toHaveBeenCalled();
  });

  it('should throw when draft page fails validation', async () => {
    const invalidDb = { _id: 'x', slug, pageType: 'AboutUsPage' };
    const execMock = jest.fn().mockResolvedValue(invalidDb);
    const leanMock = jest.fn().mockReturnValue({ exec: execMock });
    mockedFindOneDraft.mockReturnValue({ lean: leanMock });

    const err = new Error('Zod validation failed');
    mockedParse.mockImplementation(() => {
      throw err;
    });

    const result = await pagesDataRepository.getDraftBySlug(slug);
    expect(result).toEqual(WrapError('Unexpected error during parsing:\n' + err.message));
    expect(mockedFindOneDraft).toHaveBeenCalledWith({ slug, status: PageStatus.Draft });
    expect(leanMock).toHaveBeenCalled();
    expect(mockedParse).toHaveBeenCalledWith(invalidDb);
  });
});

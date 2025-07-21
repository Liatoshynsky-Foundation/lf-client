import dbConnect from '~/infrastructure/db/connect';
import PagesData from '~/infrastructure/models/pages-data/pagesData';
import { pagesDataRepository } from '~/infrastructure/repositories/pages-data/pagesData.repository';
import { PopulatedPage, populatedPageSchema } from '~/validators/page/page.schema';

jest.mock('~/infrastructure/db/connect', () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock('~/infrastructure/models/pages-data/pagesData', () => ({
  __esModule: true,
  default: {
    findOne: jest.fn()
  }
}));

jest.mock('~/infrastructure/models/pages-data/block/blockBase', () => ({}));

jest.mock('~/validators/page/page.schema', () => ({
  ...jest.requireActual('~/validators/page/page.schema'),
  populatedPageSchema: {
    parse: jest.fn()
  }
}));

const mockedDbConnect = dbConnect as jest.Mock;
const mockedParse = populatedPageSchema.parse as jest.Mock;
const mockedFindOne = PagesData.findOne as jest.Mock;

describe('pagesDataRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const slug = 'test-home-page';

  it('should return parsed page data when found and valid', async () => {
    const mockDbData = { _id: 'db_id', slug, title: { uk: 'Тест' }, blocks: [] };
    const mockParsedData: PopulatedPage = {
      _id: 'parsed_id',
      slug,
      title: { uk: 'Тест', en: 'Test' },
      blocks: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const execMock = jest.fn().mockResolvedValue(mockDbData);
    const leanMock = jest.fn().mockReturnValue({ exec: execMock });
    const populateMock = jest.fn().mockReturnValue({ lean: leanMock });
    mockedFindOne.mockReturnValue({ populate: populateMock });

    mockedParse.mockReturnValue(mockParsedData);

    const result = await pagesDataRepository.getPageData(slug);

    expect(mockedDbConnect).toHaveBeenCalledTimes(1);
    expect(mockedFindOne).toHaveBeenCalledWith({ slug });
    expect(populateMock).toHaveBeenCalledWith('blocks');
    expect(result).toEqual(mockParsedData);
  });

  it('should return null if page is not found in the database', async () => {
    const execMock = jest.fn().mockResolvedValue(null);
    const leanMock = jest.fn().mockReturnValue({ exec: execMock });
    const populateMock = jest.fn().mockReturnValue({ lean: leanMock });
    mockedFindOne.mockReturnValue({ populate: populateMock });

    const result = await pagesDataRepository.getPageData(slug);

    expect(result).toBeNull();
    expect(mockedFindOne).toHaveBeenCalledWith({ slug });
    expect(mockedParse).not.toHaveBeenCalled();
  });

  it('should throw an error if page data is invalid', async () => {
    const invalidDbData = { _id: 'some_id' };
    const validationError = new Error('Zod validation failed');

    const execMock = jest.fn().mockResolvedValue(invalidDbData);
    const leanMock = jest.fn().mockReturnValue({ exec: execMock });
    const populateMock = jest.fn().mockReturnValue({ lean: leanMock });
    mockedFindOne.mockReturnValue({ populate: populateMock });

    mockedParse.mockImplementation(() => {
      throw validationError;
    });

    await expect(pagesDataRepository.getPageData(slug)).rejects.toThrow(validationError);

    expect(mockedFindOne).toHaveBeenCalledWith({ slug });
    expect(mockedParse).toHaveBeenCalledWith(invalidDbData);
  });
});

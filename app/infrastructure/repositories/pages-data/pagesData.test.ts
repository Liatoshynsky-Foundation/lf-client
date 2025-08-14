import PagesData from '~/infrastructure/models/pages-data/pagesData';
import { pagesDataRepository } from '~/infrastructure/repositories/pages-data/pagesData.repository';
import { PageSchema } from '~/validators/page2/page.schema';

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

jest.mock('~/validators/page2/page.schema', () => ({
  ...jest.requireActual('~/validators/page2/page.schema'),
  PageSchema: {
    parse: jest.fn()
  }
}));

const mockedParse = PageSchema.parse as jest.Mock;
const mockedFindOne = PagesData.findOne as jest.Mock;

describe('pagesDataRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const slug = 'test-home-page';

  it('should return parsed page data when found and valid', async () => {
    const mockDbData = {
      _id: 'db_id',
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
                uk: { content: 'Some content' },
                en: { content: 'Some content' }
              }
            }
          ]
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const mockParsedData = {
      _id: 'parsed_id',
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
                uk: { content: 'Some content' },
                en: { content: 'Some content' }
              }
            }
          ]
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const execMock = jest.fn().mockResolvedValue(mockDbData);
    const leanMock = jest.fn().mockReturnValue({ exec: execMock });
    mockedFindOne.mockReturnValue({ lean: leanMock });

    mockedParse.mockReturnValue(mockParsedData);

    const result = await pagesDataRepository.getPageData(slug);

    expect(mockedFindOne).toHaveBeenCalledWith({ slug });
    expect(leanMock).toHaveBeenCalled();
    expect(result).toEqual(mockParsedData);
  });

  it('should return null if page is not found in the database', async () => {
    const execMock = jest.fn().mockResolvedValue(null);
    const leanMock = jest.fn().mockReturnValue({ exec: execMock });
    mockedFindOne.mockReturnValue({ lean: leanMock });

    const result = await pagesDataRepository.getPageData(slug);

    expect(result).toBeNull();
    expect(mockedFindOne).toHaveBeenCalledWith({ slug });
    expect(leanMock).toHaveBeenCalled();
    expect(mockedParse).not.toHaveBeenCalled();
  });

  it('should throw an error if page data is invalid', async () => {
    const invalidDbData = { _id: 'some_id', slug }; // Missing required fields
    const validationError = new Error('Zod validation failed');

    const execMock = jest.fn().mockResolvedValue(invalidDbData);
    const leanMock = jest.fn().mockReturnValue({ exec: execMock });
    mockedFindOne.mockReturnValue({ lean: leanMock });

    mockedParse.mockImplementation(() => {
      throw validationError;
    });

    await expect(pagesDataRepository.getPageData(slug)).rejects.toThrow(validationError);

    expect(mockedFindOne).toHaveBeenCalledWith({ slug });
    expect(leanMock).toHaveBeenCalled();
    expect(mockedParse).toHaveBeenCalledWith(invalidDbData);
  });
});

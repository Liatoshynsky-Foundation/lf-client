import { compositionsRepository } from './сompositions.repository';

import { Category } from '~/infrastructure/models/artistry/artistryCategoriesData';
import { Genre } from '~/infrastructure/models/artistry/artistryGenreData';
import { Compositions } from '~/infrastructure/models/artistry/artistryTableData';
import { compositionSchema } from '~/validators/artistry/composition.schema';
import { namedFilterSchema } from '~/validators/artistry/namedFilter.schema';
import { ArraySchema } from '~/validators/constants';

jest.mock('~/infrastructure/db/connect', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(undefined)
}));

jest.mock('~/infrastructure/models/artistry/artistryGenreData', () => ({
  Genre: {
    find: jest.fn()
  }
}));

jest.mock('~/infrastructure/models/artistry/artistryTableData', () => ({
  Compositions: {
    find: jest.fn()
  }
}));

jest.mock('~/infrastructure/models/artistry/artistryCategoriesData', () => ({
  Category: {
    find: jest.fn()
  }
}));

jest.mock('~/infrastructure/models/artistry/artistryOpusData', () => ({
  Opus: jest.fn()
}));

const mockLean = (value: unknown) => ({
  lean: jest.fn().mockResolvedValue(value)
});

const mockGenres = [
  {
    _id: '6866deda82872a835b24055d',
    key: 'romance',
    name: {
      en: 'Romance',
      uk: 'Романс'
    }
  }
];

const mockCategories = [
  {
    _id: '63f8b3b7a8b3d6c1b3e8e4d1',
    key: 'classical',
    name: { en: 'Classical', uk: 'Класична' }
  }
];

const mockCompositions = [
  {
    _id: '6866deda82872a835b24055d',
    title: { uk: 'Тестовий заголовок', en: 'Test Title' },
    year: 2020,
    audioAvailable: true,
    sheetAvailable: false,
    sheetMusic: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    opusId: {
      _id: '6866deda82872a835b24055d',
      number: 'op.1',
      title: { en: 'Opus Title', uk: 'Назва опуса' },
      releaseYear: 2020,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    genres: mockGenres
  }
];

describe('compositionsRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllGenres', () => {
    it('should return parsed genres', async () => {
      (Genre.find as jest.Mock).mockReturnValueOnce(mockLean(mockGenres));

      const result = await compositionsRepository.getAllGenres();

      expect(Genre.find).toHaveBeenCalled();
      expect(result).toEqual(ArraySchema(namedFilterSchema).parse(mockGenres));
    });
  });

  describe('getAllCategories', () => {
    it('should return parsed categories', async () => {
      (Category.find as jest.Mock).mockReturnValueOnce(mockLean(mockCategories));

      const result = await compositionsRepository.getAllCategories();

      expect(Category.find).toHaveBeenCalled();
      expect(result).toEqual(ArraySchema(namedFilterSchema).parse(mockCategories));
    });
  });

  describe('getAllCompositions', () => {
    it('should return parsed compositions', async () => {
      const populateMock = jest.fn().mockReturnThis();
      const leanMock = jest.fn().mockResolvedValue(mockCompositions);
      const searchFilter = '';
      (Compositions.find as jest.Mock).mockReturnValue({ populate: populateMock, lean: leanMock });

      const result = await compositionsRepository.getAllCompositions(searchFilter);

      expect(Compositions.find).toHaveBeenCalled();
      expect(populateMock).toHaveBeenCalledTimes(3);
      expect(result).toEqual(ArraySchema(compositionSchema).parse(mockCompositions));
    });

    it('should return empty array if no compositions found', async () => {
      const searchFilter = '';
      const populateMock = jest.fn().mockReturnThis();
      const leanMock = jest.fn().mockResolvedValue([]);
      (Compositions.find as jest.Mock).mockReturnValue({ populate: populateMock, lean: leanMock });

      const result = await compositionsRepository.getAllCompositions(searchFilter);

      expect(result).toEqual([]);
    });
  });
});

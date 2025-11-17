import { createArtistryService } from '~/services/artistry/artistryService';

const mockRawGenres = [
  {
    _id: '63f8b3b7a8b3d6c1b3e8e4a1',
    key: 'romance',
    name: { en: 'Romance', uk: 'Романс' }
  }
];

const mockRawCategories = [
  {
    _id: '63f8b3b7a8b3d6c1b3e8e4d1',
    key: 'classical',
    name: { en: 'Classical', uk: 'Класична' }
  }
];

const mockRawCompositions = [
  {
    _id: '63f8b3b7a8b3d6c1b3e8e4b1',
    title: { uk: 'Красива пісня', en: 'A Beautiful Song' },
    year: 2022,
    audioAvailable: true,
    sheetAvailable: false,
    sheetMusic: [],
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
    opusId: {
      _id: '63f8b3b7a8b3d6c1b3e8e4c1',
      number: 'op. 1',
      title: { en: 'First Opus', uk: 'Перший опус' },
      releaseYear: 2022,
      createdAt: new Date('2022-01-01'),
      updatedAt: new Date('2022-01-01')
    },
    genres: [mockRawGenres[0]]
  }
];

const compositionServiceMock = {
  getAllGenres: jest.fn(),
  getAllCategories: jest.fn(),
  getAllCompositions: jest.fn(),
  getAllCompositionTitles: jest.fn(),
  getCompositionsYearRange: jest.fn()
};

const artistryService = createArtistryService({
  compositionsRepo: compositionServiceMock
});

describe('artistryService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllGenres', () => {
    it('should fetch genres, localize them and return the result', async () => {
      const locale = 'uk';
      compositionServiceMock.getAllGenres.mockResolvedValue(mockRawGenres);

      const result = await artistryService.getAllGenres(locale);

      expect(result).toEqual([
        {
          key: 'romance',
          name: 'Романс'
        }
      ]);
      expect(compositionServiceMock.getAllGenres).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAllCategories', () => {
    it('should fetch categories, localize them and return the result', async () => {
      const locale = 'uk';
      compositionServiceMock.getAllCategories.mockResolvedValue(mockRawCategories);

      const result = await artistryService.getAllCategories(locale);

      expect(result).toEqual([
        {
          key: 'classical',
          name: 'Класична'
        }
      ]);
      expect(compositionServiceMock.getAllCategories).toHaveBeenCalledTimes(1);
    });

    describe('getAllCompositions', () => {
      it('should fetch compositions, localize them and return the result', async () => {
        const locale = 'uk';
        const searchFilter = '';
        compositionServiceMock.getAllCompositions.mockResolvedValue(mockRawCompositions);

        const result = await artistryService.getAllCompositions(locale, searchFilter);
        expect(result).toEqual([
          {
            id: mockRawCompositions[0]._id,
            name: mockRawCompositions[0].title.uk,
            year: mockRawCompositions[0].year,
            audioAvailable: mockRawCompositions[0].audioAvailable,
            sheetAvailable: mockRawCompositions[0].sheetAvailable,
            sheetMusic: mockRawCompositions[0].sheetMusic,
            createdAt: mockRawCompositions[0].createdAt,
            updatedAt: mockRawCompositions[0].updatedAt,
            opus: mockRawCompositions[0].opusId.number,
            opusTitle: mockRawCompositions[0].opusId.title.uk,
            genre: [mockRawCompositions[0].genres[0].name.uk]
          }
        ]);
        expect(compositionServiceMock.getAllCompositions).toHaveBeenCalledTimes(1);
      });

      it('should return an empty array if composition service returns null or undefined', async () => {
        const locale = 'uk';
        const searchFilter = '';
        compositionServiceMock.getAllCompositions.mockResolvedValue(null);

        const result = await artistryService.getAllCompositions(locale, searchFilter);

        expect(result).toEqual([]);
        expect(compositionServiceMock.getAllCompositions).toHaveBeenCalledTimes(1);
      });

      it('should return an empty array if composition service returns an empty array', async () => {
        const locale = 'uk';
        const searchFilter = '';
        compositionServiceMock.getAllCompositions.mockResolvedValue([]);

        const result = await artistryService.getAllCompositions(locale, searchFilter);

        expect(result).toEqual([]);
        expect(compositionServiceMock.getAllCompositions).toHaveBeenCalledTimes(1);
      });
    });
  });
});

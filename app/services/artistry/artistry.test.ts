import type { CompositionRepository } from '~/infrastructure/repositories/artistry/compositions.repo';
import { createArtistryService } from '~/services/artistry/artistry.service';
import type {
  RawCompositionDTO,
  RawOpusDetailsDTO,
  RawOpusListItemDTO
} from '~/validators/artistry/composition.schema';
import type { RawCategoryDTO } from '~/validators/constants';

const createMockOpus = (overrides: Partial<RawOpusListItemDTO> = {}): RawOpusListItemDTO =>
  ({
    _id: '1',
    number: 1,
    numberKind: 'op',
    slug: 'opus-1',
    name: { en: 'First Opus', uk: 'Перший опус' },
    title: { en: 'First Title', uk: 'Перша Назва' },
    creationYear: '2022',
    genre: { en: 'Genre', uk: 'Жанр' },
    compositions: [],
    ...overrides
  }) as RawOpusListItemDTO;

const createMockCompositionDetails = (overrides: Partial<RawOpusDetailsDTO> = {}): RawOpusDetailsDTO =>
  ({
    _id: '1',
    slug: 'ukrainian-quintet',
    number: 16,
    numberKind: 'bo',
    name: { uk: 'Квінтет', en: 'Quintet' },
    title: { uk: 'Український квінтет', en: 'Ukrainian Quintet' },
    creationYear: '1929',
    introDescription: { uk: { type: 'doc', content: [] }, en: { type: 'doc', content: [] } },
    description: { uk: 'SEO Опис', en: 'SEO Desc' },
    compositions: [],
    performances: [],
    gallery: [],
    ...overrides
  }) as RawOpusDetailsDTO;

const createMockRawComposition = (overrides: Partial<RawCompositionDTO> = {}): RawCompositionDTO =>
  ({
    _id: '1',
    name: { uk: 'Композиція', en: 'Composition' },
    audioAvailable: false,
    sheetAvailable: false,
    ...overrides
  }) as RawCompositionDTO;

describe('ArtistryService', () => {
  let compositionsRepoMock: jest.Mocked<CompositionRepository>;
  let artistryService: ReturnType<typeof createArtistryService>;

  beforeEach(() => {
    compositionsRepoMock = {
      getAllCategories: jest.fn(),
      getAllCompositions: jest.fn(),
      getCompositionsYearRange: jest.fn(),
      getOpusBySlug: jest.fn()
    };

    artistryService = createArtistryService({
      compositionsRepo: compositionsRepoMock
    });
  });

  describe('getAllCategories', () => {
    it('should fetch and localize categories successfully', async () => {
      const mockRawCategories = [{ _id: '1', key: 'classical', name: { en: 'Classical', uk: 'Класична' } }];
      compositionsRepoMock.getAllCategories.mockResolvedValue(mockRawCategories as RawCategoryDTO[]);

      const result = await artistryService.getAllCategories('uk');

      expect(result).toEqual([{ key: 'classical', name: 'Класична' }]);
      expect(compositionsRepoMock.getAllCategories).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAllCompositions', () => {
    it('should fetch, localize, and correctly map a list of compositions', async () => {
      const mockOpus = createMockOpus({
        compositions: [
          createMockRawComposition({
            _id: 'c1',
            name: { uk: 'Красива пісня', en: 'A Beautiful Song' },
            sheetMusic: [],
            audios: [],
            year: 2022,
            genre: 'Romance'
          })
        ]
      });
      compositionsRepoMock.getAllCompositions.mockResolvedValue([mockOpus]);

      const result = await artistryService.getAllCompositions('uk', '');

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        _id: '1',
        name: 'Перший опус',
        title: 'Перша Назва',
        slug: 'opus-1',
        number: 'op. 1',
        year: '2022',
        genre: 'Жанр'
      });
      expect(result[0].compositions?.[0]).toMatchObject({
        _id: 'c1',
        name: 'Красива пісня'
      });
    });

    it('should return an empty array when the repository returns null', async () => {
      compositionsRepoMock.getAllCompositions.mockResolvedValue(null as unknown as RawOpusListItemDTO[]);

      const result = await artistryService.getAllCompositions('uk', '');

      expect(result).toEqual([]);
    });

    it('should filter returned compositions based on search query', async () => {
      compositionsRepoMock.getAllCompositions.mockResolvedValue([
        createMockOpus({ _id: '1', name: { en: 'Matcha', uk: 'Чай' } }),
        createMockOpus({ _id: '2', name: { en: 'Coffee', uk: 'Кава' } })
      ]);

      const result = await artistryService.getAllCompositions('uk', 'чай');

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Чай');
    });

    it('should filter returned compositions based on composition name search query', async () => {
      compositionsRepoMock.getAllCompositions.mockResolvedValue([
        createMockOpus({
          _id: '1',
          name: { en: 'Matcha', uk: 'Чай' },
          compositions: [createMockRawComposition({ _id: 'c1', name: { uk: 'Зелений', en: 'Green' } })]
        }),
        createMockOpus({ _id: '2', name: { en: 'Coffee', uk: 'Кава' } })
      ]);

      const result = await artistryService.getAllCompositions('uk', 'зелений');

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Чай');
    });
  });

  describe('getSearchAutocompleteOptions', () => {
    it('should generate autocomplete options mapping compositions and genres correctly', async () => {
      const mockOpus = createMockOpus({
        _id: 'opus1',
        name: { uk: 'Опус 1', en: 'Opus 1' },
        genre: { uk: 'Соната', en: 'Sonata' },
        compositions: [
          {
            _id: 'comp1',
            name: { uk: 'Композиція 1', en: 'Composition 1' },
            genre: 'Симфонія',
            audioAvailable: false,
            sheetAvailable: false,
            sheetMusic: [],
            audios: []
          }
        ]
      });
      compositionsRepoMock.getAllCompositions.mockResolvedValue([mockOpus]);

      const result = await artistryService.getSearchAutocompleteOptions('uk', { search: '' });

      expect(result).toContainEqual({ _id: 'opus1', name: 'Опус 1', type: 'opus' });
      expect(result).toContainEqual({ _id: 'comp1', name: 'Композиція 1', type: 'composition' });
      expect(result).toContainEqual({ _id: expect.any(String), name: 'Соната', type: 'genre' });
      expect(result).toContainEqual({ _id: expect.any(String), name: 'Симфонія', type: 'genre' });
    });

    it('should ignore opuses and compositions that do not match the query or lack names', async () => {
      const mockOpus1 = createMockOpus({
        _id: 'opus1',
        name: { uk: 'Опус 1', en: 'Opus 1' },
        compositions: [
          createMockRawComposition({
            _id: 'comp1',
            name: { uk: 'Композиція 1', en: 'Composition 1' }
          })
        ]
      });
      const mockOpus2 = createMockOpus({
        _id: 'opus2',
        name: { uk: '', en: '' },
        compositions: [
          createMockRawComposition({
            _id: 'comp2',
            name: { uk: '', en: '' }
          })
        ]
      });
      compositionsRepoMock.getAllCompositions.mockResolvedValue([mockOpus1, mockOpus2]);

      const result = await artistryService.getSearchAutocompleteOptions('uk', { search: 'неіснуючий' });

      expect(result).not.toContainEqual(expect.objectContaining({ _id: 'opus1' }));
      expect(result).not.toContainEqual(expect.objectContaining({ _id: 'opus2' }));
      expect(result).not.toContainEqual(expect.objectContaining({ _id: 'comp1' }));
      expect(result).not.toContainEqual(expect.objectContaining({ _id: 'comp2' }));
    });
  });

  describe('getCompositionsYearRange', () => {
    it('should fetch and return the correct year boundaries', async () => {
      compositionsRepoMock.getCompositionsYearRange.mockResolvedValue({ minYear: 1950, maxYear: 2024 });

      const result = await artistryService.getCompositionsYearRange();

      expect(result).toEqual({ min: 1950, max: 2024 });
    });
  });

  describe('getOpusDetailsBySlug', () => {
    it('should return null when the opus cannot be found by slug', async () => {
      compositionsRepoMock.getOpusBySlug.mockResolvedValue(null);

      const result = await artistryService.getOpusDetailsBySlug('uk', 'missing-slug');

      expect(result).toBeNull();
    });

    it('should map raw opus details correctly using the artistry mapper', async () => {
      const rawOpus = createMockCompositionDetails({
        compositions: [
          {
            _id: 'c1',
            name: { uk: 'Частина 1', en: 'Part 1' },
            sheetAvailable: true,
            sheetMusic: [{ url: 'free.pdf' }]
          }
        ],
        performances: [{ videoUrl: 'https://youtube.com/watch?v=123' }],
        gallery: [{ _id: 'g1', src: 'img.jpg', altText: { uk: 'Фото', en: 'Photo' } }]
      } as RawOpusDetailsDTO);
      compositionsRepoMock.getOpusBySlug.mockResolvedValue(rawOpus);

      const result = await artistryService.getOpusDetailsBySlug('uk', 'ukrainian-quintet');

      expect(result).toEqual({
        _id: '1',
        slug: 'ukrainian-quintet',
        number: 'op. 16',
        name: 'Квінтет',
        title: 'Український квінтет',
        year: '1929',
        genre: undefined,
        introDescription: null,
        description: 'SEO Опис',
        movements: undefined,
        sheetMusic: null,
        videos: [],
        compositions: [
          {
            _id: 'c1',
            name: 'Частина 1',
            sheetAvailable: true,
            sheetMusic: [{ url: 'free.pdf' }]
          }
        ],
        gallery: [{ id: 'g1', src: 'img.jpg', alt: 'Фото', caption: undefined, crop: undefined }]
      });
    });

    it('should map raw opus details correctly when optional fields are missing or null', async () => {
      const rawOpus = createMockCompositionDetails({
        introDescription: undefined,
        description: undefined,
        performances: undefined
      });
      compositionsRepoMock.getOpusBySlug.mockResolvedValue(rawOpus);

      const result = await artistryService.getOpusDetailsBySlug('uk', 'ukrainian-quintet');

      expect(result).toMatchObject({
        introDescription: null,
        description: null,
        videos: [],
        sheetMusic: null
      });
    });
  });
});

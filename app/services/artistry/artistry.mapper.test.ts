import {
  deriveGenre,
  extractAndCollectGenres,
  formatOpusNumber,
  mapCompositionsForDetails,
  mapMovements,
  mapOpusCompositions,
  mapOpusGallery,
  mapVideos,
  mapYear,
  pickDescription,
  pickGenre
} from './artistry.mapper';

import { LocalizedTipTap } from '~/lib/utils/tiptapHelpers';
import {
  OpusDocument,
  RawCompositionDTO,
  RawOpusDetailsDTO,
  RawPerformanceDTO
} from '~/validators/artistry/composition.schema';

const createMockRawComposition = (overrides: Partial<RawCompositionDTO> = {}): RawCompositionDTO =>
  ({
    _id: '1',
    name: { uk: 'Композиція', en: 'Composition' },
    audioAvailable: false,
    sheetAvailable: false,
    ...overrides
  }) as RawCompositionDTO;

const createMockOpusDocument = (overrides: Partial<OpusDocument> = {}): OpusDocument =>
  ({
    _id: 'opus-1',
    name: { uk: 'Опус 1', en: 'Opus 1' },
    title: { uk: 'Опус 1', en: 'Opus 1' },
    slug: 'opus-1',
    number: 1,
    numberKind: 'op',
    creationYear: '1950',
    compositions: [],
    ...overrides
  }) as OpusDocument;

const createMockOpusDetails = (overrides: Partial<RawOpusDetailsDTO> = {}): RawOpusDetailsDTO =>
  ({
    ...createMockOpusDocument(),
    compositions: [],
    ...overrides
  }) as RawOpusDetailsDTO;

describe('Artistry Mappers', () => {
  describe('deriveGenre', () => {
    it('should return the first non-empty genre found in compositions', () => {
      const compositions = [
        createMockRawComposition({ genre: '' }),
        createMockRawComposition({ genre: '  ' }),
        createMockRawComposition({ genre: 'Sonata' }),
        createMockRawComposition({ genre: 'Symphony' })
      ];

      const result = deriveGenre(compositions);

      expect(result).toBe('Sonata');
    });

    it('should return undefined if no compositions have a genre', () => {
      const compositions = [createMockRawComposition({ genre: '' }), createMockRawComposition({ genre: undefined })];

      const result = deriveGenre(compositions);

      expect(result).toBeUndefined();
    });
  });

  describe('mapYear', () => {
    it('should format year range if endYear is present', () => {
      const opus = createMockOpusDetails({ creationYear: '1950', endYear: '1955' });

      const result = mapYear(opus);

      expect(result).toBe('1950 - 1955');
    });

    it('should format single year if endYear is missing', () => {
      const opus = createMockOpusDetails({ creationYear: '1950' });

      const result = mapYear(opus);

      expect(result).toBe('1950');
    });
  });

  describe('pickGenre', () => {
    it('should prefer opus genre for the given locale if it is not empty', () => {
      const opus = createMockOpusDocument({ genre: { uk: 'Опус Жанр', en: 'Opus Genre' } });
      const compositions = [createMockRawComposition({ genre: 'Composition Genre' })];

      const result = pickGenre(opus, compositions, 'uk');

      expect(result).toBe('Опус Жанр');
    });

    it('should fallback to deriveGenre if opus genre for the locale is missing or empty', () => {
      const opus = createMockOpusDocument({ genre: { uk: '  ', en: '' } });
      const compositions = [createMockRawComposition({ genre: 'Composition Genre' })];

      const result = pickGenre(opus, compositions, 'uk');

      expect(result).toBe('Composition Genre');
    });
  });

  describe('pickDescription', () => {
    it('should return parsed TipTap content if text is not empty', () => {
      const description: LocalizedTipTap = {
        uk: JSON.parse('{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Текст"}]}]}'),
        en: JSON.parse('{"type":"doc","content":[]}')
      };

      const result = pickDescription(description, 'uk');

      expect(result).not.toBeNull();
      expect(result).toMatchObject({ type: 'doc' });
    });

    it('should return null if the description text is completely empty or just whitespace', () => {
      const description: LocalizedTipTap = {
        uk: JSON.parse('{"type":"doc","content":[{"type":"paragraph"}]}'),
        en: JSON.parse('{"type":"doc","content":[]}')
      };

      const result = pickDescription(description, 'uk');

      expect(result).toBeNull();
    });
  });

  describe('mapMovements', () => {
    it('should split localized string by newline and filter out empty lines', () => {
      const parts = { uk: 'Частина 1 \n \n Частина 2\n', en: 'Part 1\nPart 2' };

      const result = mapMovements(parts, 'uk');

      expect(result).toEqual(['Частина 1', 'Частина 2']);
    });

    it('should return undefined if text is missing', () => {
      const parts = { uk: '', en: 'Part 1' };

      const result = mapMovements(parts, 'uk');

      expect(result).toBeUndefined();
    });
  });

  describe('formatOpusNumber', () => {
    it('should format standard opus number correctly', () => {
      const opus = { number: 1, numberKind: 'op' };

      const result = formatOpusNumber(opus);

      expect(result).toBe('op. 1');
    });

    it('should format sine op correctly and append additionalText if present', () => {
      const opus = { number: 2, numberKind: 'sineop', additionalText: 'revised' };

      const result = formatOpusNumber(opus);

      expect(result).toBe('sine op. 2. revised');
    });
  });

  describe('mapVideos', () => {
    it('should map valid youtube videos correctly and filter invalid ones', () => {
      const performances: RawPerformanceDTO[] = [
        { _id: '1', videoUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ', title: { uk: 'Відео', en: 'Video' } },
        { _id: '2', videoUrl: 'not_a_video_url', title: { uk: 'Інше', en: 'Other' } }
      ];

      const result = mapVideos(performances, 'uk');

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        _id: '1',
        youTubeId: 'dQw4w9WgXcQ',
        title: 'Відео'
      });
    });

    it('should return empty array if performances list is empty or undefined', () => {
      const result = mapVideos([], 'uk');
      expect(result).toEqual([]);
    });
  });

  describe('mapOpusCompositions', () => {
    it('should properly map raw compositions to localized flattened format', () => {
      const compositions = [
        createMockRawComposition({
          _id: 'c1',
          name: { uk: 'Назва', en: 'Name' },
          year: 1999,
          genre: 'Romance'
        })
      ];

      const result = mapOpusCompositions(compositions, 'uk');

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        _id: 'c1',
        name: 'Назва',
        year: 1999,
        genre: 'Romance',
        audioAvailable: false,
        sheetAvailable: false,
        audios: undefined,
        sheetMusic: undefined
      });
    });
  });

  describe('mapMovements edge case', () => {
    it('should return undefined if lines are all empty after trim', () => {
      const parts = { uk: '   \n  ', en: '' };
      const result = mapMovements(parts, 'uk');
      expect(result).toBeUndefined();
    });
  });

  describe('mapVideos edge case', () => {
    it('should fallback to youTubeId if _id is missing', () => {
      const performances = [
        {
          videoUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
          title: { uk: 'Відео', en: 'Video' }
        } as RawPerformanceDTO
      ];
      const result = mapVideos(performances, 'uk');
      expect(result[0]._id).toBe('dQw4w9WgXcQ');
    });
  });

  describe('mapCompositionsForDetails', () => {
    it('should map compositions for details slice', () => {
      const compositions = [
        createMockRawComposition({ _id: '1', name: { uk: 'Test', en: 'Test' }, sheetAvailable: true, sheetMusic: [] }),
        createMockRawComposition({ _id: '2', name: { uk: 'Test2', en: 'Test2' }, sheetAvailable: false })
      ];
      const result = mapCompositionsForDetails(compositions, 'uk');
      expect(result).toHaveLength(2);
      expect(result[0].sheetAvailable).toBe(true);
      expect(result[0].sheetMusic).toEqual([]);
      expect(result[1].sheetAvailable).toBe(false);
      expect(result[1].sheetMusic).toBeNull();
    });
  });

  describe('mapOpusGallery', () => {
    it('should map gallery and handle undefined or empty', () => {
      expect(mapOpusGallery(undefined, 'uk')).toBeUndefined();
      expect(mapOpusGallery([], 'uk')).toBeUndefined();

      const gallery = [
        { _id: 'img1', src: 'img.png', altText: { uk: 'Альт', en: 'Alt' }, description: { uk: 'Опис', en: 'Desc' } },
        {
          src: 'img2.png',
          altText: { uk: 'Альт2', en: 'Alt2' },
          crop: { unit: '%', x: 0, y: 0, width: 100, height: 100 }
        }
      ];

      // @ts-expect-error - testing with partial gallery objects
      const result = mapOpusGallery(gallery, 'uk');
      expect(result![0].id).toBe('img1');
      expect(result![1].id).toBe('img2.png');
      expect(result![1].crop).toBeDefined();
    });
  });

  describe('extractAndCollectGenres', () => {
    it('should extract genres and add to set if matches query or query is empty', () => {
      const set = new Set<string>();
      extractAndCollectGenres(undefined, '', set);
      expect(set.size).toBe(0);

      extractAndCollectGenres('rock, pop', '', set);
      expect(set.has('rock')).toBe(true);
      expect(set.has('pop')).toBe(true);

      extractAndCollectGenres('jazz, blues', 'jazz', set);
      expect(set.has('jazz')).toBe(true);
      expect(set.has('blues')).toBe(true);

      extractAndCollectGenres('metal', 'country', set);
      expect(set.has('metal')).toBe(false);
    });
  });
});

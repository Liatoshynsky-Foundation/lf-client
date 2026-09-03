import { renderHook } from '@testing-library/react';

import { useGroupedCompositions } from './useGroupedCompositions';

import { OpusListDTO } from '~/domain/dto/composition.dto';
import { CompositionItem } from '~/domain/entities/artistry.entity';

const createMockCompositionItem = (overrides: Partial<CompositionItem> = {}): CompositionItem => ({
  _id: 'comp-1',
  name: 'Mock Composition',
  audioAvailable: false,
  sheetAvailable: false,
  ...overrides
});

const createMockOpusListDTO = (overrides: Partial<OpusListDTO> = {}): OpusListDTO => ({
  _id: 'opus-1',
  name: 'Mock Opus',
  title: 'Mock Title',
  slug: 'mock-slug',
  number: '1',
  year: '1920',
  ...overrides
});

describe('useGroupedCompositions', () => {
  it('should map valid rawData into grouped compositions format', () => {
    const rawData = [
      createMockOpusListDTO({
        _id: 'opus-123',
        name: 'Symphony No. 1',
        genre: 'Symphony',
        compositions: [
          createMockCompositionItem({
            _id: 'comp-1',
            name: 'Movement I',
            year: 1921,
            genre: 'Allegro',
            audioAvailable: true
          }),
          createMockCompositionItem({
            _id: 'comp-2',
            name: 'Movement II'
          })
        ]
      })
    ];

    const { result } = renderHook(() => useGroupedCompositions(rawData));

    expect(result.current).toHaveLength(1);
    expect(result.current[0].label).toBe('opus-123');
    expect(result.current[0].items).toHaveLength(2);

    expect(result.current[0].items[0]).toEqual(
      expect.objectContaining({
        id: 'comp-1',
        opus: '1',
        opusName: 'Symphony No. 1',
        opusTitle: 'Mock Title',
        opusYear: '1920',
        slug: 'mock-slug',
        opusGenres: ['Symphony'],
        compositionName: 'Movement I',
        compositionYear: 1921,
        compositionGenre: ['Allegro'],
        audioAvailable: true,
        sheetAvailable: false,
        sheetMusic: null,
        audios: null,
        opusId: 'opus-123'
      })
    );
  });

  it('should return empty items array if compositions array is missing or empty', () => {
    const rawData = [createMockOpusListDTO({ compositions: null })];

    const { result } = renderHook(() => useGroupedCompositions(rawData));

    expect(result.current).toHaveLength(1);
    expect(result.current[0].items).toEqual([]);
  });

  it('should handle optional fields and fallback to defaults if absent', () => {
    const rawData = [
      createMockOpusListDTO({
        genre: undefined,
        compositions: [
          createMockCompositionItem({
            year: null,
            genre: undefined,
            audios: undefined,
            sheetMusic: null
          })
        ]
      })
    ];

    const { result } = renderHook(() => useGroupedCompositions(rawData));

    const mappedItem = result.current[0].items[0];

    expect(mappedItem.opusGenres).toEqual([]);
    expect(mappedItem.compositionYear).toBeNull();
    expect(mappedItem.compositionGenre).toEqual([]);
    expect(mappedItem.audios).toBeNull();
    expect(mappedItem.sheetMusic).toBeNull();
  });

  it('should return empty array if rawData is empty', () => {
    const { result } = renderHook(() => useGroupedCompositions([]));

    expect(result.current).toEqual([]);
  });
});

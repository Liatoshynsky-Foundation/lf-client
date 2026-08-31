import { mapOpusDetailsToProps } from './opusDetailsMapper';

import type { OpusDetailsDTO } from '~/domain/dto/composition.dto';

const opusDetailsDto: OpusDetailsDTO = {
  _id: '63f8b3b7a8b3d6c1b3e8e4c1',
  name: 'First Opus Name',
  title: 'First Opus Title',
  slug: 'first-opus',
  number: 'op. 1',
  year: '1929',
  genre: 'Classical',
  movements: ['I. Allegro', 'II. Lento'],
  sheetMusic: { url: 'https://example.com/opus-score.pdf', name: 'opus-score' },
  introDescription: '{"type":"doc","content":[]}',
  description: 'A description',
  gallery: [],
  compositions: [
    {
      _id: '63f8b3b7a8b3d6c1b3e8e4b1',
      name: 'After the battle',
      sheetAvailable: true,
      sheetMusic: [{ url: 'https://example.com/composition-score.pdf', name: 'composition-score' }]
    }
  ],
  videos: [
    {
      _id: '63f8b3b7a8b3d6c1b3e8e4a1',
      youTubeId: 'abc123',
      title: 'Live performance'
    }
  ]
};

describe('mapOpusDetailsToProps', () => {
  it('should map the DTO to component props and rename _id to id', () => {
    const result = mapOpusDetailsToProps(opusDetailsDto);

    expect(result).toEqual({
      name: 'First Opus Name',
      number: 'op. 1',
      year: '1929',
      genre: 'Classical',
      movements: ['I. Allegro', 'II. Lento'],
      sheetMusic: { url: 'https://example.com/opus-score.pdf', name: 'opus-score' },
      introDescription: { type: 'doc', content: [] },
      gallery: [],
      compositions: [
        {
          id: '63f8b3b7a8b3d6c1b3e8e4b1',
          index: 1,
          name: 'After the battle',
          sheetMusic: [{ url: 'https://example.com/composition-score.pdf', name: 'composition-score' }]
        }
      ],
      videos: [
        {
          id: '63f8b3b7a8b3d6c1b3e8e4a1',
          youTubeId: 'abc123',
          title: 'Live performance'
        }
      ]
    });
  });

  it('should map empty composition and video lists to empty arrays', () => {
    const result = mapOpusDetailsToProps({ ...opusDetailsDto, compositions: [], videos: [] });

    expect(result.compositions).toEqual([]);
    expect(result.videos).toEqual([]);
  });

  it('should handle undefined optional fields and fallback properly', () => {
    const result = mapOpusDetailsToProps({
      _id: '123',
      name: 'Name',
      title: 'Title',
      slug: 'slug',
      number: '1',
      year: '2023',
      genre: undefined,
      movements: undefined,
      sheetMusic: undefined,
      introDescription: undefined,
      description: 'Desc',
      gallery: [],
      compositions: undefined,
      videos: [{ _id: 'vid1', youTubeId: 'abc1234', title: undefined }]
    });

    expect(result.compositions).toEqual([]);
    expect(result.videos).toEqual([{ id: 'vid1', youTubeId: 'abc1234', title: '' }]);
    expect(result.genre).toBeUndefined();
    expect(result.introDescription).toBeNull();
    expect(result.movements).toBeUndefined();
    expect(result.sheetMusic).toBeNull();
  });
});

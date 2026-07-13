import { mapOpusDetailsToProps } from './opusDetailsMapper';

import type { OpusDetailsDTO } from '~/domain/dto/composition.dto';

const opusDetailsDto: OpusDetailsDTO = {
  _id: '63f8b3b7a8b3d6c1b3e8e4c1',
  number: 'op. 1',
  title: 'First Opus',
  creationDate: '1929',
  genre: 'Classical',
  movements: ['I. Allegro', 'II. Lento'],
  sheetMusicUrl: 'https://example.com/opus-score.pdf',
  description: 'A description',
  compositions: [
    {
      _id: '63f8b3b7a8b3d6c1b3e8e4b1',
      index: 1,
      title: 'After the battle',
      sheetMusicUrl: 'https://example.com/composition-score.pdf'
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
      title: 'First Opus',
      number: 'op. 1',
      creationDate: '1929',
      genre: 'Classical',
      movements: ['I. Allegro', 'II. Lento'],
      sheetMusicUrl: 'https://example.com/opus-score.pdf',
      description: 'A description',
      compositions: [
        {
          id: '63f8b3b7a8b3d6c1b3e8e4b1',
          index: 1,
          title: 'After the battle',
          sheetMusicUrl: 'https://example.com/composition-score.pdf'
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
});

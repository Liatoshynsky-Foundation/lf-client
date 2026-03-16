import { buildFrameImages } from './buildBiographyFrameImages';

describe('buildFrameImages', () => {
  it('should return empty array when photos is null (branch coverage)', () => {
    expect(buildFrameImages(null as any)).toEqual([]);
  });

  it('should return empty array when an empty array is passed', () => {
    expect(buildFrameImages([])).toEqual([]);
  });

  it('should use default photos when undefined or no argument is passed', () => {
    const result = buildFrameImages(undefined as any);
    expect(result.length).toBeGreaterThan(0);

    const resultNoArgs = buildFrameImages();
    expect(resultNoArgs.length).toBeGreaterThan(0);
  });

  it('should map photos to slots correctly using modulo', () => {
    const mockPhotos = [
      { id: '1', src: '1.jpg', alt: { uk: 'А', en: 'A' }, caption: null },
      { id: '2', src: '2.jpg', alt: { uk: 'Б', en: 'B' }, caption: null }
    ];

    const result = buildFrameImages(mockPhotos as any);

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('1');
    expect(result[0]).toHaveProperty('sizes');
  });
});

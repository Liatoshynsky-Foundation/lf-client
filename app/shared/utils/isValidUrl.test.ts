import { isValidUrl } from './isValidUrl';

describe('isValidUrl', () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  it.each([
    ['empty string', ''],
    ['null', null],
    ['undefined', undefined]
  ])('should return false for %s without warning', (_, input) => {
    expect(isValidUrl(input)).toBe(false);
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it.each([
    ['/images/test.png'],
    ['/avatar.jpg'],
    ['https://example.com/image.jpg'],
    ['http://localhost:3000/media/pic.png'],
    ['photo.jpg'],
    ['graphic.png?v=123'],
    ['icon.svg']
  ])('should return true for valid URL: %s', (url) => {
    expect(isValidUrl(url)).toBe(true);
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it.each([['http_invalid_:\\\\example.com'], ['not-a-valid-url']])(
    'should return false and log a warning for invalid URL: %s',
    (url) => {
      expect(isValidUrl(url)).toBe(false);
      expect(warnSpy).toHaveBeenCalled();
    }
  );
});

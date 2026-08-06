import { hexToRGBA } from './hexToRGBA';

describe('hexToRGBA', () => {
  it('should convert 6-digit hex color to rgba correctly', () => {
    expect(hexToRGBA('#D9E8FF', 0.4)).toBe('rgba(217, 232, 255, 0.4)');
    expect(hexToRGBA('#000000', 1)).toBe('rgba(0, 0, 0, 1)');
    expect(hexToRGBA('#FFFFFF', 0.5)).toBe('rgba(255, 255, 255, 0.5)');
    expect(hexToRGBA('#FF0000', 0.8)).toBe('rgba(255, 0, 0, 0.8)');
  });

  it('should work without # prefix', () => {
    expect(hexToRGBA('D9E8FF', 0.4)).toBe('rgba(217, 232, 255, 0.4)');
  });

  it('should handle edge case of lowercase hex', () => {
    expect(hexToRGBA('#d9e8ff', 0.4)).toBe('rgba(217, 232, 255, 0.4)');
  });

  it('should convert to rgb when alpha is undefined to cover line 8 branch', () => {
    expect(hexToRGBA('#D9E8FF')).toBe('rgb(217, 232, 255)');
  });
});

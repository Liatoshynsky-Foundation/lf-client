import { validateSvgColor, validateSvgSize } from './ColoredSvg.validations';

jest.mock('./ColoredSvg.helpers', () => ({
  isColor: jest.fn(),
  isSize: jest.fn()
}));

import { isColor, isSize } from './ColoredSvg.helpers';

const mockIsColor = isColor as jest.Mock;
const mockIsSize = isSize as jest.Mock;

describe('ColoredSvg.validations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validateSvgColor', () => {
    it('should return true for "none"', () => {
      expect(validateSvgColor('none')).toBe(true);
      expect(mockIsColor).not.toHaveBeenCalled();
    });

    it('should validate color using helper', () => {
      mockIsColor.mockReturnValue(true);

      expect(validateSvgColor('#fff')).toBe(true);
      expect(mockIsColor).toHaveBeenCalledWith('#fff');
    });

    it('should return false for invalid color', () => {
      mockIsColor.mockReturnValue(false);

      expect(validateSvgColor('invalid')).toBe(false);
    });
  });

  describe('validateSvgSize', () => {
    it('should validate string sizes', () => {
      mockIsSize.mockReturnValue(true);

      expect(validateSvgSize('24px', '48px')).toBe(true);
      expect(mockIsSize).toHaveBeenCalledWith('24px');
      expect(mockIsSize).toHaveBeenCalledWith('48px');
    });

    it('should validate responsive object sizes', () => {
      mockIsSize.mockReturnValue(true);

      expect(validateSvgSize({ xs: '24px', md: '32px' }, { lg: '48px' })).toBe(true);
    });

    it('should return false for invalid breakpoint', () => {
      mockIsSize.mockReturnValue(true);

      expect(validateSvgSize({ mobile: '24px' } as never, '24px')).toBe(false);
    });

    it('should return false when helper returns false', () => {
      mockIsSize.mockImplementation((value) => value !== 'bad');

      expect(validateSvgSize({ xs: 'bad' }, '24px')).toBe(false);
    });

    it('should return false for invalid width type', () => {
      expect(validateSvgSize(null as never, '24px')).toBe(false);
    });

    it('should return false for invalid height type', () => {
      mockIsSize.mockReturnValue(true);

      expect(validateSvgSize('24px', undefined as never)).toBe(false);
    });

    it('should return false when height is invalid', () => {
      mockIsSize.mockReturnValue(true);

      expect(validateSvgSize('24px', null as never)).toBe(false);
    });
  });
});

import { generateSizesAttribute } from './generateSizesAttribute';

describe('generateSizesAttribute', () => {
  it('should return a correct sizes string based on breakpoints', () => {
    const input = {
      width: {
        xs: 400,
        sm: 600,
        md: 800,
        xl: 1000,
        xxl: 816
      }
    };

    const result = generateSizesAttribute(input);

    expect(result).toBe(
      '(max-width: 376px) 400px, (max-width: 768px) 600px, (max-width: 1024px) 800px, (max-width: 1448px) 1000px, 816px'
    );
  });

  it('should return "100vw" if no valid breakpoints are provided', () => {
    const input = {
      width: {}
    };

    const result = generateSizesAttribute(input);
    expect(result).toBe('100vw');
  });
});

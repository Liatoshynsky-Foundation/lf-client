import { isValidPreviewSecret } from './isValidPreviewSecret';

describe('isValidPreviewSecret', () => {
  const originalPreviewSecret = process.env.PREVIEW_SECRET;

  afterEach(() => {
    process.env.PREVIEW_SECRET = originalPreviewSecret;
  });

  it('returns false when PREVIEW_SECRET is not configured', () => {
    process.env.PREVIEW_SECRET = undefined;

    expect(isValidPreviewSecret('any-secret')).toBe(false);
  });

  it('returns false when secret does not match', () => {
    process.env.PREVIEW_SECRET = 'valid-secret';

    expect(isValidPreviewSecret('wrong-secret')).toBe(false);
  });

  it('returns true when secret matches', () => {
    process.env.PREVIEW_SECRET = 'valid-secret';

    expect(isValidPreviewSecret('valid-secret')).toBe(true);
  });
});

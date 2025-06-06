import { SocialMediaTypes } from '~/types/enums/common.enums';
import { sanitizeSocialMediaType } from './sanitizeSocialMediaType';

describe('sanitizeImageType', () => {
  it('should turn a string into a social media type', () => {
    const testString = 'instagram';
    const expectedResult = SocialMediaTypes.Instagram;
    const result = sanitizeSocialMediaType(testString);
    expect(result).toBe(expectedResult);
  });
  it('should turn any string that does not align with said types into another social media', () => {
    const testString = 'test';
    const expectedResult = SocialMediaTypes.AnotherMedia;
    const result = sanitizeSocialMediaType(testString);
    expect(result).toBe(expectedResult);
  });
});

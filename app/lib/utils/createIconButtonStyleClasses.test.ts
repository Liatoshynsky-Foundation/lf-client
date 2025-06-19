import { createIconButtonStyleClasses } from './createIconButtonStyleClasses';
import { IconButtonColorVariant, IconButtonVariant } from '~/types/enums/common.enums';

describe('create style classes for IconButton', () => {
  it('should return combined classes', () => {
    const testVariant = IconButtonColorVariant.Primary;
    const testType = IconButtonVariant.outlined;
    const expectedResult = 'primaryOutlined';

    expect(createIconButtonStyleClasses(testVariant, testType)).toBe(expectedResult);
  });
  it('should return a single class', () => {
    const testVariant = IconButtonColorVariant.Error;
    const testType = IconButtonVariant.outlined;
    const expectedResult = 'error';

    expect(createIconButtonStyleClasses(testVariant, testType)).toBe(expectedResult);
  });
});

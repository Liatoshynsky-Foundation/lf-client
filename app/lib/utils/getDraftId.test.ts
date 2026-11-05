import { getDraftId } from './getDraftId';

describe('getDraftId', () => {
  it('should return undefined when searchParams is missing', () => {
    expect(getDraftId()).toBeUndefined();
  });

  it('should return undefined when draftId is missing', () => {
    expect(getDraftId({})).toBeUndefined();
  });

  it('should return draftId when it is a string', () => {
    expect(getDraftId({ draftId: 'draft-123' })).toBe('draft-123');
  });

  it('should return the first draftId when it is an array', () => {
    expect(getDraftId({ draftId: ['draft-123', 'draft-321'] })).toBe('draft-123');
  });
});

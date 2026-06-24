import { z } from 'zod';

import { parseArraySafely } from './parseArraySafely';

describe('parseArraySafely', () => {
  const testSchema = z.object({
    id: z.string(),
    title: z.string()
  });

  it('should return all items when all items are valid', () => {
    const items = [
      { id: '1', title: 'First' },
      { id: '2', title: 'Second' }
    ];

    const result = parseArraySafely(items, testSchema);

    expect(result).toEqual({
      validItems: items,
      invalidCount: 0
    });
  });

  it('should skip invalid items and return only valid ones', () => {
    const validItem1 = { id: '1', title: 'First' };
    const validItem2 = { id: '2', title: 'Second' };

    const items = [validItem1, { id: null, title: 'Invalid' }, validItem2, { id: '3', title: null }];

    const result = parseArraySafely(items, testSchema);

    expect(result).toEqual({
      validItems: [validItem1, validItem2],
      invalidCount: 2
    });
  });

  it('should return empty array when all items are invalid', () => {
    const items = [
      { id: null, title: 'Invalid' },
      { id: 123, title: null }
    ];

    const result = parseArraySafely(items, testSchema);

    expect(result).toEqual({
      validItems: [],
      invalidCount: 2
    });
  });

  it('should return empty result for empty input array', () => {
    const result = parseArraySafely([], testSchema);

    expect(result).toEqual({
      validItems: [],
      invalidCount: 0
    });
  });

  it('should preserve parsed values returned by zod', () => {
    const schema = z.object({
      id: z.coerce.string()
    });

    const result = parseArraySafely([{ id: 123 }], schema);

    expect(result).toEqual({
      validItems: [{ id: '123' }],
      invalidCount: 0
    });
  });
});

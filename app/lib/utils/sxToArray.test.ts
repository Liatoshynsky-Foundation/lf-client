import { SxProps, Theme } from '@mui/material';

import { sxToArray } from './sxToArray';

describe('sxToArray', () => {
  it('should return an empty array when sx is undefined', () => {
    const result = sxToArray(undefined);
    expect(result).toEqual([]);
  });

  it('should return the same array when sx is already an array to cover line 9 branch', () => {
    const mockArray: SxProps<Theme> = [{ display: 'flex' }, { margin: 2 }];
    const result = sxToArray(mockArray);
    expect(result).toBe(mockArray);
    expect(result).toHaveLength(2);
  });

  it('should wrap a single sx object into an array', () => {
    const mockObject: SxProps<Theme> = { color: 'primary.main' };
    const result = sxToArray(mockObject);
    expect(result).toEqual([mockObject]);
  });
});

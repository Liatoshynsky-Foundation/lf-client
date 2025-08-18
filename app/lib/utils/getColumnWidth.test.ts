import { getColumnWidths } from './getColumnWidth';

jest.mock('~/shared/components/tables/CompositionTable/tableColumnWidth', () => ({
  DESKTOP_COLUMN_WIDTHS: {
    expander: '72px',
    opus: '48px',
    play: '48px',
    name: '504px',
    year: '140px',
    genre: '248px',
    actions: 'auto'
  },
  LAPTOP_COLUMN_WIDTHS: {
    expander: '72px',
    opus: '44px',
    play: '44px',
    name: '440px',
    year: '112px',
    genre: '124px',
    actions: 'auto'
  },
  TABLET_COLUMN_WIDTHS: { expander: '48px', name: 'auto', actions: '40px' },
  MOBILE_COLUMN_WIDTHS: { expander: '48px', name: 'auto' }
}));

import type { Breakpoints } from '~/types/types/common.types';

import {
  DESKTOP_COLUMN_WIDTHS,
  LAPTOP_COLUMN_WIDTHS,
  MOBILE_COLUMN_WIDTHS,
  TABLET_COLUMN_WIDTHS
} from '~/shared/components/tables/CompositionTable/tableColumnWidth';

const createBp = (overrides: Partial<Breakpoints> = {}): Breakpoints => ({
  isDesktop: false,
  isLaptopAndAbove: false,
  isLaptop: false,
  isTablet: false,
  isMobile: false,
  ...overrides
});

describe('getColumnWidths', () => {
  it('should return DESKTOP_COLUMN_WIDTHS when isDesktop is true', () => {
    expect(getColumnWidths(createBp({ isDesktop: true }))).toBe(DESKTOP_COLUMN_WIDTHS);
  });

  it('should return LAPTOP_COLUMN_WIDTHS when isLaptop is true', () => {
    expect(getColumnWidths(createBp({ isLaptop: true }))).toBe(LAPTOP_COLUMN_WIDTHS);
  });

  it('should return TABLET_COLUMN_WIDTHS when isTablet is true', () => {
    expect(getColumnWidths(createBp({ isTablet: true }))).toBe(TABLET_COLUMN_WIDTHS);
  });

  it('should return MOBILE_COLUMN_WIDTHS when isMobile is true', () => {
    expect(getColumnWidths(createBp({ isMobile: true }))).toBe(MOBILE_COLUMN_WIDTHS);
  });

  it('should return MOBILE_COLUMN_WIDTHS by default when all breakpoints are false', () => {
    expect(getColumnWidths(createBp())).toBe(MOBILE_COLUMN_WIDTHS);
  });

  it('should prioritize desktop over other breakpoints', () => {
    expect(getColumnWidths(createBp({ isDesktop: true, isLaptop: true, isTablet: true, isMobile: true }))).toBe(
      DESKTOP_COLUMN_WIDTHS
    );
  });

  it('should prioritize laptop over tablet and mobile when desktop is false', () => {
    expect(getColumnWidths(createBp({ isLaptop: true, isTablet: true, isMobile: true }))).toBe(LAPTOP_COLUMN_WIDTHS);
  });

  it('should prioritize tablet over mobile when desktop and laptop are false', () => {
    expect(getColumnWidths(createBp({ isTablet: true, isMobile: true }))).toBe(TABLET_COLUMN_WIDTHS);
  });
});

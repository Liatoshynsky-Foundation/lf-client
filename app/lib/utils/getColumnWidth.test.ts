import { createGetColumnWidths } from './getColumnWidth';
import type { Breakpoints } from '~/types/types/common.types';

type ColKey = 'k';

const WIDTHS = {
  DESKTOP: { k: 'desktop' } as Record<ColKey, string>,
  LAPTOP: { k: 'laptop' } as Record<ColKey, string>,
  TABLET: { k: 'tablet' } as Partial<Record<ColKey, string>>,
  MOBILE: { k: 'mobile' } as Partial<Record<ColKey, string>>
};

const getColumnWidths = createGetColumnWidths<ColKey>(WIDTHS);

const createBp = (overrides: Partial<Breakpoints> = {}): Breakpoints => ({
  isDesktop: false,
  isLaptopAndAbove: false,
  isLaptop: false,
  isTablet: false,
  isMobile: false,
  ...overrides
});

describe('createGetColumnWidths', () => {
  it('should return DESKTOP when isDesktop is true', () => {
    expect(getColumnWidths(createBp({ isDesktop: true }))).toBe(WIDTHS.DESKTOP);
  });

  it('should return LAPTOP when isLaptop is true', () => {
    expect(getColumnWidths(createBp({ isLaptop: true }))).toBe(WIDTHS.LAPTOP);
  });

  it('should return TABLET when isTablet is true', () => {
    expect(getColumnWidths(createBp({ isTablet: true }))).toBe(WIDTHS.TABLET);
  });

  it('should return MOBILE when isMobile is true', () => {
    expect(getColumnWidths(createBp({ isMobile: true }))).toBe(WIDTHS.MOBILE);
  });

  it('should return MOBILE by default when all breakpoints are false', () => {
    expect(getColumnWidths(createBp())).toBe(WIDTHS.MOBILE);
  });

  it('should prioritize desktop over all other breakpoints', () => {
    expect(getColumnWidths(createBp({ isDesktop: true, isLaptop: true, isTablet: true, isMobile: true }))).toBe(
      WIDTHS.DESKTOP
    );
  });

  it('should prioritize laptop over tablet and mobile when desktop is false', () => {
    expect(getColumnWidths(createBp({ isLaptop: true, isTablet: true, isMobile: true }))).toBe(WIDTHS.LAPTOP);
  });

  it('should prioritize tablet over mobile when desktop and laptop are false', () => {
    expect(getColumnWidths(createBp({ isTablet: true, isMobile: true }))).toBe(WIDTHS.TABLET);
  });
});

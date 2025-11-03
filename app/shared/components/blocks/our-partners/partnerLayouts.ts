import { Partner } from './partners.data';

type LayoutItem = string | null;

interface LayoutPattern {
  [breakpoint: string]: number[];
}

export function generateLayouts(partners: Partner[], patterns: LayoutPattern) {
  const breakpoints = Object.keys(patterns);
  const layouts: Record<string, LayoutItem[]> = {};

  for (const bp of breakpoints) {
    const pattern = patterns[bp];
    const layout: LayoutItem[] = [];
    let index = 0;
    let patternIndex = 0;

    while (index < partners.length) {
      const count = pattern[patternIndex % pattern.length];
      layout.push(...partners.slice(index, index + count).map((p) => p.id));
      index += count;
      if (index < partners.length) layout.push(null);
      patternIndex++;
    }

    layouts[bp] = layout;
  }

  return layouts;
}

const largePattern = [2, 5, 2];

const mediumPattern = [3, 4, 3];

const smallPattern = [1, 1, 1];

export const patterns = {
  xxl: largePattern,
  xl: largePattern,
  lg: largePattern,
  md: mediumPattern,
  sm: mediumPattern,
  xs: smallPattern
};

export const gridConfigs = [
  { key: 'xxl', min: 'xxl', max: null, columns: 5, rows: 3 },
  { key: 'xl', min: 'xl', max: 'xxl', columns: 4, rows: 3 },
  { key: 'lg', min: 'lg', max: 'xl', columns: 4, rows: 3 },
  { key: 'md', min: 'md', max: 'lg', columns: 3, rows: 4 },
  { key: 'sm', min: 'sm', max: 'md', columns: 3, rows: 4 }
] as const;

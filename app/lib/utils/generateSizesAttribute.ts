import { theme } from '~/ds-components/theme/Theme';

import { ElementSizes } from '~/types/types/common.types';

type BreakpointKey = keyof typeof theme.breakpoints.values;

export function generateSizesAttribute(sizes: Pick<ElementSizes, 'width'>): string {
  const breakpoints = theme.breakpoints.values;

  const entries = Object.entries(sizes.width || {})
    .filter(([bp]) => bp in breakpoints)
    .sort((a, b) => breakpoints[a[0] as BreakpointKey] - breakpoints[b[0] as BreakpointKey])
    .map(([bp, val], index, arr) => {
      const max = breakpoints[bp as BreakpointKey];
      const isLast = index === arr.length - 1;
      return isLast ? `${val}px` : `(max-width: ${max}px) ${val}px`;
    });

  return entries.length > 0 ? entries.join(', ') : '100vw';
}

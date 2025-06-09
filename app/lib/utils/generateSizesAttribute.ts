import { theme } from '~/ds-components/theme/Theme';

import { ElementSizes } from '~/types/types/common.types';

export function generateSizesAttribute(sizes: Pick<ElementSizes, 'width'>): string {
  const breakpoints = theme.breakpoints.values;

  const entries = Object.entries(sizes.width)
    .filter(([bp]) => bp in breakpoints)
    .sort((a, b) => breakpoints[a[0] as keyof typeof breakpoints] - breakpoints[b[0] as keyof typeof breakpoints])
    .map(([bp, val], index, arr) => {
      const max = breakpoints[bp as keyof typeof breakpoints];
      const isLast = index === arr.length - 1;
      return isLast ? `${val}px` : `(max-width: ${max}px) ${val}px`;
    });

  return entries.join(', ');
}

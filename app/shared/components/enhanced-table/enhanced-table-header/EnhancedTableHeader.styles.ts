import { mainHexPallete } from '~/ds-components/theme/colors';

import { hexToRGBA } from '~/lib/utils/hexToRGBA';

const borderWithOpacity = hexToRGBA(mainHexPallete.blue[200], 0.4);

export const enhancedTableHeaderStyles = {
  row: {
    borderBottom: `1px solid ${borderWithOpacity}`
  },
  cell: {
    py: 3,
    px: 0,
    border: 'none'
  }
};

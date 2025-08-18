import { mainHexPallete } from '../../design-system/all-components/theme/colors';

import { hexToRGBA } from '~/lib/utils/hexToRGBA';

const borderWithOpacity = hexToRGBA(mainHexPallete.blue[200], 0.4);

export const enhancedTableRowStyles = {
  cell: {
    py: 1.5,
    px: 0,
    pl: { xs: 1, sm: 2, md: 0 },
    border: 'none',
    borderBottom: `2px solid ${borderWithOpacity}`
  }
};

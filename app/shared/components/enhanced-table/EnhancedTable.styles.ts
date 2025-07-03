import { mainHexPallete } from '~/ds-components/theme/colors';

import { hexToRGBA } from '~/lib/utils/hexToRGBA';

const borderWithOpacity = hexToRGBA(mainHexPallete.blue[200], 0.4);

export const enhancedTableStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    py: 20,
    mx: -3,
    gap: 3,
    gridColumn: '1 / -1'
  },
  container: {
    width: '100%',
    boxShadow: 'none',
    border: 'none'
  },
  paginationWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 3,
    alignItems: 'center'
  },
  tableCell: {
    border: 'none',
    borderBottom: `2px solid ${borderWithOpacity}`
  },
  title: {
    pl: 9
  }
};

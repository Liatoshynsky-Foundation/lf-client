import { mainHexPallete } from '~/ds-components/theme/colors';

import { commonSx } from '~/shared/styles/commonSx';

export const styles = {
  gridContainer: {
    display: 'grid',
    gridColumn: '1 / -1',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    columnGap: commonSx.layout.standardGrid.columnGap,
    mt: { xs: '56px', sm: '104px', md: '128px' }
  },
  typography: {
    textAlign: 'left',
    gridColumn: { xs: '1', sm: '4 / 9', md: '6 / -1' },
    textIndent: commonSx.layout.textIndent.textIndentThirdColumn,
    color: mainHexPallete.brown[700]
  },
  papersContainer: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1 / -1',
      sm: 'repeat(2, 296px)',
      lg: 'repeat(4, 272px)',
      xl: 'repeat(4, 296px)'
    },
    gridColumn: { xs: '1', sm: '1 / -1' },
    columnGap: { xs: '0px', sm: '40px', md: '25px', lg: '16px', xl: '40px' },
    rowGap: { xs: '0px', sm: '45px', md: '35px', lg: '0px' },
    justifyContent: { xs: 'center', sm: 'end' },
    mt: { xs: '64px', lg: '80px' }
  },
  mobileSwiperContainer: {
    gridColumn: '1 / -1',
    width: '100vw',
    marginLeft: '50%',
    transform: 'translateX(-50%)',
    mt: '24px',
    overflow: 'hidden',

    '& .swiper': {
      width: '100%',
      paddingLeft: '16px',
      paddingRight: '0px',
      overflow: 'visible'
    },
    '& .swiper-slide': {
      width: 'auto',
      display: 'flex'
    }
  },

  paper: (index: number) => ({
    position: 'relative',
    top: { xs: '0px', sm: `-${index * 12}px` },
    maxWidth: {
      xs: 'calc(100vw - 16px)',
      sm: '296px'
    },
    Width: '100%'
  })
};

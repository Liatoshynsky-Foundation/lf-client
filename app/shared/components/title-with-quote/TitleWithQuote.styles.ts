import { commonSx } from '~/shared/styles/commonSx';

export const getStyles = (color: 'black' | 'brown') => ({
  mainContainer: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    mt: { sx: '95px', sm: '68px', md: '96px', lg: '128px' }
  },

  titleSection: {
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / 5',
      md: '1 / 7'
    },
    display: 'flex',
    maxWidth: '496px'
  },

  titleText: {
    fontFamily: 'Oswald, sans-serif',
    fontWeight: 600,
    lineHeight: 'normal',
    letterSpacing: '0px',

    color: color === 'black' ? 'black' : 'brown.700',

    whiteSpace: 'pre-line',
    mt: {
      xs: '80px',
      sm: '60px',
      md: '44px'
    },
    mb: { xs: '44px', sm: '0px' },
    fontSize: commonSx.layout.typography.heroTitle
  },

  quoteSection: {
    gridColumn: {
      xs: '1 / -1',
      sm: '5 / -1',
      md: '8 / -1'
    },
    display: 'flex'
  }
});

import { mainHexPallete } from '../design-system/all-components/theme/colors';

const container = {
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)'
};

export const styles = {
  desktopView: {
    ...container,
    gridColumn: '1 / -1',
    gridTemplateRows: 'repeat(6, auto)',
    columnGap: '44px',
    width: '100%',
    position: 'relative'
  },
  mobileView: {
    gridColumn: '1 / -1',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px'
  },
  quoteContainer: {
    position: 'relative',
    color: mainHexPallete.burgundy[800],
    '&::before': {
      content: '""',
      display: 'block',
      width: '24px',
      height: '20px',
      backgroundImage: 'url(/icons/quote.svg)',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      float: 'left',
      marginRight: '32px'
    }
  },
  icon: {
    gridColumn: '1/2'
  },
  sourceText: (isTablet: boolean) => ({
    gridColumn: isTablet ? '1/6' : '2/6',
    position: 'absolute',
    bottom: 0,
    textAlign: 'right',
    justifySelf: 'end',
    fontSize: '14px'
  }),
  quoteText: {
    gridColumn: '6/-1',
    color: mainHexPallete.burgundy[800],
    textIndent: '112px'
  }
};

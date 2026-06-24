import { commonSx } from '~/shared/styles/commonSx';

export const styles = {
  wrapper: {
    gridColumn: '1 / -1',
    mb: { xs: '80px', sm: '104px', md: '128px', lg: '144px' }
  },

  titleContainer: {
    gap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    }
  },

  text: {
    textIndent: commonSx.layout.textIndent.textIndentThirdColumn,
    gridColumn: { xs: '1 / -1', sm: '4 / -1', md: '6 / -1', xl: '6 / -1' },
    mb: { xs: '43px', sm: '104px' },
    maxWidth: { large: '743px' }
  },

  xsGrid: {
    display: { xs: 'flex', sm: 'none' },
    justifyContent: 'flex-start',
    overflowX: 'auto',
    overflowY: 'hidden',
    touchAction: 'pan-x',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    alignItems: 'center',
    gap: '4px',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },

  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '112px',
    height: '60px',
    flexShrink: 0
  },

  logoImage: {
    objectFit: 'contain',
    height: '100%',
    maxHeight: '60px',
    width: '100%'
  }
};

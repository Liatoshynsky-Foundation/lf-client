import { commonSx } from '~/shared/styles/commonSx';

export const style = {
  gridContainer: {
    display: { sm: 'grid' },
    gridColumn: '1 / -1',
    gridTemplateColumns: 'subgrid'
  },

  textBlockContainer: {
    gridColumn: { xs: '1 / -1', sm: '1 / -1', md: '6 / 13', lg: '6 / 13' },
    textIndent: commonSx.layout.textIndent.textIndentThirdColumnNarrow,
    alignSelf: { md: 'end', lg: 'end' },
    marginTop: { sm: '40px', lg: '155px' },
    marginBottom: { xs: '80px', lg: '96px' },
    maxWidth: '910px'
  },

  titleSection: {
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / 6',
      md: '1 / 6',
      lg: '1/6'
    },
    display: { sm: 'flex' }
  },

  titleText: {
    fontFamily: 'Oswald, sans-serif',
    fontWeight: 600,
    lineHeight: '120%',
    letterSpacing: '0px',
    color: 'black',
    whiteSpace: 'pre-line',
    mt: {
      xs: '80px',
      md: '108px',
      lg: '156px'
    },
    mb: { xs: '40px', sm: '0px' },
    fontSize: commonSx.layout.typography.heroTitle,
    width: { sm: '343px', lg: '393px' }
  },

  contentText: {
    gridColumn: '1 / -1',
    maxWidth: { md: '907px' },
    pt: { md: '230px', lg: '120px' }
  }
};

import { commonSx } from '~/shared/styles/commonSx';

export const styles = {
  gridContainer: {
    mt: '80px',
    mb: { xs: '64px', sm: '56px', md: '72px' },
    display: 'grid',
    gridColumn: '1 / -1',
    gridTemplateColumns: commonSx.layout.standardGrid.gridTemplateColumns,
    columnGap: commonSx.layout.standardGrid.columnGap
  },
  textBlockContainer: {
    pt: { xs: '40px', sm: '16px', lg: '44px' },
    gridColumn: {
      xs: '1 / 5',
      sm: '4 / -1',
      md: '6 / -1'
    }
  },
  titleSection: {
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / 4',
      md: '1 / 6'
    },
    height: 'fit-content'
  },
  titleText: {
    fontFamily: 'Oswald, sans-serif',
    fontWeight: 600,
    lineHeight: '120%',
    letterSpacing: '0px',
    color: 'black',
    whiteSpace: 'pre-line',
    // mt: {
    //   xs: '80px',
    //   sm: '108px',
    //   md: '156px'
    // },
    // mb: { xs: '44px', sm: '0px' },
    fontSize: commonSx.layout.typography.heroTitle
    // width: { md: '570px', lg: '560px' }
  },
  longText: {
    textIndent: commonSx.layout.textIndent.textIndentThirdColumn,
    gridColumn: '1 / -1'
  }
};

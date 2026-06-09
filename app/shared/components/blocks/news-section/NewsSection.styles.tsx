import { commonSx } from '~/shared/styles/commonSx';

export const styles = {
  mainContainer: {
    display: 'grid',
    gridColumn: '1 / -1',
    my: { xs: '80px' },
    ...commonSx.layout.standardGrid
  },
  title: {
    alignSelf: 'start',
    mb: { sm: '0px', md: '34px' },
    gridColumn: { xs: '1 / 2', sm: '1 / -1', md: '1 / -1' },
    fontSize: { xs: '48px', sm: '64px', md: '88px', lg: '104px', xl: '120px' }
  },
  textStyle: {
    textIndent: commonSx.layout.textIndent.textIndentThirdColumn,
    gridColumn: { xs: '1/ -1', sm: '4/ -1', md: '6/-1' }
  }
};

import { commonSx } from '~/shared/styles/commonSx';

export const styles = {
  mainContainer: {
    display: 'grid',
    gridColumn: '1 / -1',
    my: { xs: '80px', sm: '104px', md: '128px', lg: '144px' },
    ...commonSx.layout.standardGrid
  },
  textStyle: {
    textIndent: commonSx.layout.textIndent.textIndentThirdColumn,
    gridColumn: { xs: '1/ -1', sm: '4/ -1', md: '6/-1' }
  }
};

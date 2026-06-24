import { commonSx } from '~/shared/styles/commonSx';

export const styles = {
  mainContainer: {
    display: 'grid',
    gridColumn: '1 / -1',
    ...commonSx.layout.standardGrid
  },
  textStyle: {
    textIndent: commonSx.layout.textIndent.textIndentThirdColumn,
    gridColumn: { xs: '1/ -1', sm: '4/ -1', md: '6/-1' }
  }
};

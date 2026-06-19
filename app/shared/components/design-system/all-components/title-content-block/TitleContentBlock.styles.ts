import { AppTypography } from '~/constants';
import { commonSx } from '~/shared/styles/commonSx';

export const styles = {
  mainContainer: {
    display: 'grid',
    gridTemplateColumns: { xs: 'repeat(4,1fr)', sm: 'repeat(8, 1fr)', md: 'repeat(12, 1fr)' },
    gridColumn: '1 / -1',
    columnGap: commonSx.layout.standardGrid.columnGap,
    rowGap: { xs: '24px' }
  },
  title: {
    ...AppTypography.mulish24Bold,
    gridColumn: { xs: '1/-1', sm: '1/3', md: '1/6', lg: '1/6' },
    textTransform: 'uppercase',
    fontSize: { xs: '20px', md: '26px' },
    lineHeight: '150%'
  },
  contentBlock: {
    gridColumn: { xs: '1 / -1', sm: '4 / 9', md: '6 / 13' }
  },
  textStyle: {
    gridColumn: '1 / -1',
    textIndent: commonSx.layout.textIndent.textIndentThirdColumnCompact
  }
};

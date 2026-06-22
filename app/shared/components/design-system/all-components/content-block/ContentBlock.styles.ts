import { commonSx } from '~/shared/styles/commonSx';

export const styles = {
  container: {
    display: 'grid',
    gridColumn: '1 / -1',
    rowGap: { xs: '16px', sm: '20px', md: '40px' },
    columnGap: commonSx.layout.standardGrid.columnGap
  },
  textContent: {
    gridColumn: { xs: '2/ -1', sm: '4/ -1', md: '6/-1' },
    gap: '8px',
    maxWidth: '906px'
  }
};

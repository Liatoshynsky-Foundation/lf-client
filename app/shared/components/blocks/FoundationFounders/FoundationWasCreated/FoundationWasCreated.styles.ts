import { commonSx } from '~/shared/styles/commonSx';

export const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: commonSx.layout.standardGrid.gridTemplateColumns,
    columnGap: commonSx.layout.standardGrid.columnGap,
    width: '100%',
    mt: {
      xs: '13px',
      sm: '27px',
      md: '62px',
      xl: '53px'
    }
  },
  ellipseWrapper: {
    gridColumn: {
      xs: '1 / 2'
    }
  },
  text: {
    gridColumn: {
      xs: '2 / 5',
      sm: '4 / -1',
      md: '6 / -1'
    },
    maxWidth: '744px'
  },
  title: {
    display: 'block',
    mb: {
      xs: 3,
      sm: '29px',
      md: '48px'
    },
    fontFamily: 'var(--font-mulish)',
    textTransform: 'uppercase',
    fontSize: { xs: '14px', sm: '16px', md: '26px' },
    color: 'black',
    fontWeight: 700,
    lineHeight: '180%'
  },
  description: {
    fontFamily: 'var(--font-mulish)',
    textTransform: 'uppercase',
    fontSize: { xs: '14px', sm: '16px', md: '26px' },
    color: 'black',
    fontWeight: 400,
    lineHeight: '180%',
    '& span:nth-child(2)': {
      display: 'block',
      textIndent: {
        xs: '40px',
        md: '70px'
      }
    }
  }
};

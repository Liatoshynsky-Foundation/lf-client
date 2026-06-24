import type { SxProps, Theme } from '@mui/material/styles';

import { AppTypography } from '~/constants';
import { commonSx } from '~/shared/styles/commonSx';

export const styles = (theme: Theme): Record<string, SxProps<Theme>> => ({
  titleWrapper: {
    gridColumn: { xs: '1 / -1', sm: '1 / 5', md: '1 / 8' },
    display: 'flex',
    maxWidth: '496px'
  },
  title: {
    ...AppTypography.oswald64Semibold,
    display: 'flex',
    gridColumnStart: '1',
    gridColumnEnd: '5',
    alignSelf: 'center',
    marginTop: { sm: '108px', md: '156px' },
    marginBottom: { sm: '40px', md: '56px' },
    gridRow: '1',
    [theme.breakpoints.down('md')]: {
      fontSize: '40px'
    },
    [theme.breakpoints.down('sm')]: {
      gridColumn: '1/-1',
      marginBottom: '60px',
      marginTop: { xs: '80px' },
      fontSize: '40px'
    }
  },
  introGrid: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    gridTemplateRows: 'repeat(6, auto)',
    columnGap: '40px',
    position: 'relative',
    marginBottom: '180px'
  },
  trustAndSecurityParagraph: {
    gridColumn: { xs: '1/-1', sm: '4/-1', md: '6/-1', xl: '6 / -1' },
    gridRow: '2',
    fontSize: { xs: '16px', sm: '18px', md: '20px' },
    lineHeight: 1.6,
    textIndent: commonSx.layout.textIndent.textIndentThirdColumnNarrow,
    mb: { xs: '40px', md: '64px' }
  },
  agreementParagraph: {
    gridColumn: { xs: '1/-1', sm: '1/7', md: '1/11', lg: '1 / 9' },
    gridRow: '3',
    fontSize: { xs: '16px', sm: '18px', md: '20px' },
    textIndent: commonSx.layout.textIndent.textIndentFirstColumnNarrow
  }
});

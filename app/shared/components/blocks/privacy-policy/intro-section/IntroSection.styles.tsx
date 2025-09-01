import { SxProps, Theme } from '@mui/material/styles';

import { AppTypography } from '~/constants';

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
    marginTop: '75px',
    fontSize: '64px',
    gridRow: '1',
    [theme.breakpoints.down('md')]: {
      fontSize: '40px'
    },
    [theme.breakpoints.down('sm')]: {
      gridColumn: '1/-1',
      marginBottom: '60px',
      marginTop: '159px',
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
    textIndent: {
      xs: 'calc((100vw - 48px) / 4 * 1 + 6px)',
      sm: 'calc((100vw - 112px) / 8 * 3 - 11px)',
      md: 'calc((100vw - 144px) / 12 * 3 + 11px)',
      xxl: 'calc((1448px - 144px) / 12 * 3 + 11px)'
    },
    mb: { xs: '40px', md: '64px' }
  },
  agreementParagraph: {
    gridColumn: { xs: '1/-1', sm: '1/7', md: '1/11', lg: '1 / 9' },
    gridRow: '3',
    fontSize: { xs: '16px', sm: '18px', md: '20px' },
    textIndent: {
      xs: '0px',
      sm: 'calc((100vw - 112px) / 8 * 1 + 3px)',
      md: 'calc((100vw - 144px) / 12 * 1 + 40px)',
      lg: 'calc((1448px - 144px) / 12 * 1 + 3px)'
    }
  }
});

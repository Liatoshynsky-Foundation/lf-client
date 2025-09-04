import type { SxProps, Theme } from '@mui/material/styles';

import { AppTypography } from '~/constants';
import { mainHexPallete } from '~/shared/components/design-system/all-components/theme/colors';

export const styles = (theme: Theme): Record<string, SxProps<Theme>> => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    mb: '144px',
    [theme.breakpoints.down('lg')]: {
      mb: '128px'
    },
    [theme.breakpoints.down('md')]: {
      mb: '104px'
    },
    [theme.breakpoints.down('sm')]: {
      mb: '80px'
    }
  },
  description: {
    ...AppTypography.mulish20Regular,
    color: mainHexPallete.brown[600],
    [theme.breakpoints.down('md')]: {
      ...AppTypography.mulish18Regular
    },
    [theme.breakpoints.down('sm')]: {
      ...AppTypography.mulish16Regular
    }
  },
  listWrapper: {
    display: 'grid',
    gap: '32px',
    mt: '64px',
    [theme.breakpoints.down('md')]: {
      gap: '16px',
      mt: '40px'
    }
  },
  sectionWrapper: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    rowGap: '16px',
    mt: '64px',
    [theme.breakpoints.down('md')]: {
      mt: '40px'
    }
  },
  subtitle: {
    ...AppTypography.mulish20Bold,
    [theme.breakpoints.down('md')]: {
      ...AppTypography.mulish18Medium
    },
    [theme.breakpoints.down('sm')]: {
      ...AppTypography.mulish16Medium
    }
  },
  sectionListWrapper: {
    display: 'grid',
    gap: '24px'
  },
  paragraph: {
    ...AppTypography.mulish20Regular,
    [theme.breakpoints.down('md')]: {
      ...AppTypography.mulish18Regular
    },
    [theme.breakpoints.down('sm')]: {
      ...AppTypography.mulish16Regular
    },
    '&:not(:last-child)': {
      marginBottom: '16px'
    }
  }
});

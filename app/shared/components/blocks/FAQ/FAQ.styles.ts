import { SxProps, Theme } from '@mui/material';

import { commonSx } from '~/shared/styles/commonSx';

export const styles: Record<string, SxProps<Theme>> = {
  gridContainer: {
    display: 'grid',
    gridColumn: '1 / -1',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    columnGap: commonSx.layout.standardGrid.columnGap,
    m: { xs: '56px 0 96px 0', sm: '104px 0', md: '128px 0 160px 0' }
  },
  contacts: {
    overflow: 'hidden',
    position: 'relative',
    gridColumn: '1 / 5',
    maxWidth: '400px',
    display: { xs: 'none', md: 'block' }
  },
  typography: {
    fontFamily: 'Mulish',
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: '150%'
  },
  contactsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    mt: '32px'
  },
  contactsItem: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    borderRadius: '2px',
    '& a, & button': {
      borderRadius: '2px',
      '&:focus-visible': {
        outline: '2px solid #631B2B',
        outlineOffset: '2px'
      }
    },
    '& .icon-wrapper': {
      position: 'relative',
      '& .hover-icon': {
        display: 'none',
        position: 'absolute',
        top: 0,
        left: 0
      }
    },
    '&:hover .icon-wrapper': {
      '& .default-icon': {
        display: 'none'
      },
      '& .hover-icon': {
        display: 'block'
      }
    }
  },
  faq: {
    gridColumn: { xs: '1 / -1', sm: '4 / -1', md: '6 / -1' },
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  }
};

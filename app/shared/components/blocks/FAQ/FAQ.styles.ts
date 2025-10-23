import { mainHexPallete } from '~/ds-components/theme/colors';

export const styles = {
  gridContainer: {
    display: 'grid',
    gridColumn: '1 / -1',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    columnGap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    },
    p: '160px 0'
  },
  title: {
    display: 'flex',
    width: '100%',
    gap: { xs: '10%', sm: '25%', md: '40%' }
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
    alignItems: 'center'
  },
  linkItem: {
    fontFamily: 'Mulish',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '110%',
    textDecoration: 'underline',

    '&:hover': {
      color: '#5F0E0F',
      cursor: 'pointer'
    },

    '&:active': {
      color: mainHexPallete.black
    },

    '&.Mui-disabled, &[aria-disabled="true"], &:disabled': {
      color: mainHexPallete.blue[500],
      pointerEvents: 'none',
      textDecoration: 'underline'
    }
  },
  iconButton: {
    backgroundColor: 'rgba(25, 13, 3, 0.1)',
    '&:disabled': {
      backgroundColor: 'rgba(25, 13, 3, 0.1)'
    }
  },
  faq: {
    gridColumn: { xs: '1fr', sm: '4 / -1', md: '6 / -1' },
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  }
};

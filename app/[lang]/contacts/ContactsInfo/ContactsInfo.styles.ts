import { mainHexPallete } from '~/shared/components/design-system/all-components/theme/colors';

export const styles = {
  wrapper: {
    display: 'flex',
    mt: '160px',
    height: '100vh'
  },

  title: {
    lineHeight: '120%'
  },

  contactsInfoWrapper: {
    pt: '56px'
  },

  contactsDetails: {
    display: 'grid',
    gridTemplateColumns: '118px 209px',
    columnGap: '68px',
    mt: '40px',

    h6: {
      color: mainHexPallete.brown[700]
    },

    a: {
      lineHeight: '110%',
      mt: '8px'
    }
  },

  socialMediaWrapper: {
    mt: '40px',
    pb: '10px'
  }
};

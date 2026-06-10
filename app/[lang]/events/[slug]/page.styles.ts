import { mainHexPallete } from '~/ds-components/theme/colors';

export const styles = {
  registrationBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexShrink: 0,
    height: '100%',
    marginLeft: { md: 'calc((100% - 584px) * 3 / 12 + 115px)' }
  },
  fieldLabel: {
    color: mainHexPallete.brown[500]
  },
  fieldValue: {
    color: mainHexPallete.black,
    mt: '2px'
  },
  registerButtonWrapper: {
    position: { xs: 'fixed', md: 'sticky' },
    top: { xs: '83px', md: '93px' },
    zIndex: { xs: 10, md: 'auto' },
    left: { xs: '50%', md: 'auto' },
    transform: { xs: 'translateX(-50%)', md: 'none' }
  },
  registerButton: {
    width: '240px',
    height: '40px',
    bgcolor: mainHexPallete.black,
    color: mainHexPallete.white,
    textTransform: 'uppercase',
    '&:hover': { bgcolor: mainHexPallete.brown[900] }
  }
};

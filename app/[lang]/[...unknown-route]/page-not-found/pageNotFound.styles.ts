import { mainHexPallete } from '../../../shared/components/design-system/all-components/theme/colors';
import { Typography } from '../../../shared/components/title-with-description/TitleWithDescription.styles';

export const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    gridColumn: '1 / -1',
    my: { xs: '50px', sm: '100px' }
  },
  titleText: {
    lineHeight: '120%',
    color: mainHexPallete.black,
    whiteSpace: 'pre-line',
    mb: '16px',
    fontSize: {
      xs: '40px',
      md: '64px'
    }
  },

  blockDescription: {
    ...Typography.blockDescription,
    mb: '24px',
    textAlign: 'center'
  },
  icon: {
    position: 'relative',
    width: { xs: 273, sm: 422, md: 700 },
    height: { xs: 180, sm: 279, md: 458 },
    mt: '60px'
  }
};

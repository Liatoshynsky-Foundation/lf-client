import { mainHexPallete } from '~/ds-components/theme/colors';
import { theme } from '~/ds-components/theme/Theme';

export const styles = {
  container: {
    display: 'grid',
    gridColumn: '1 / -1',
    marginBottom: {
      xs: '64px',
      sm: '80px',
      md: '112px'
    }
  },
  contentContainer: {
    marginBottom: {
      xs: '48px',
      sm: '64px'
    }
  },
  titleContainer: {
    position: 'relative'
  },
  spanText: {
    width: {
      xs: '200px',
      sm: '230px',
      md: '296px'
    },
    position: {
      xs: 'static',
      sm: 'absolute'
    },
    justifySelf: {
      xs: 'end',
      sm: 'none'
    },
    marginBottom: '16px',
    top: {
      sm: 0,
      md: '47px',
      lg: '64px',
      xl: '76px'
    },
    left: 0,
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px'
    },
    fontStyle: 'italic',
    fontWeight: 500,
    lineHeight: '140%',
    color: mainHexPallete.blue[800]
  },
  title: {
    fontSize: {
      xs: '40px',
      sm: '64px',
      md: '88px',
      lg: '104px',
      xl: '120px'
    },
    lineHeight: '110%',
    textIndent: {
      xs: '26%',
      sm: '39.5%',
      md: '44%',
      lg: '43%',
      xl: '37.5%'
    },
    marginLeft: {
      xl: '8.5%'
    }
  },
  text: {
    textIndent: {
      xs: '27%',
      sm: '58%',
      md: '60%',
      lg: '46%',
      xl: '45%'
    },
    [theme.breakpoints.down('sm')]: {
      gridColumn: '1 / -1'
    }
  },
  cta: {
    paddingX: {
      xs: '16px',
      md: '24px'
    },
    width: 'fit-content'
  }
};

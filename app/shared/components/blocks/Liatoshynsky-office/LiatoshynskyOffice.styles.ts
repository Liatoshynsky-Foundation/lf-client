import { mainHexPallete } from '~/ds-components/theme/colors';

export const styles = {
  mainContainer: {
    gridColumn: '1 / -1',
    position: 'relative',
    pt: {
      xs: 'calc(100vw * 0.035)',
      sm: 'calc(100% * 0.035)'
    },
    mb: {
      xs: '110px',
      sm: '117px',
      md: '128px',
      lg: '180px',
      xxl: '175px'
    }
  },
  trapezoid: {
    position: 'absolute',
    left: {
      xs: '-24px',
      sm: '0px'
    },
    zIndex: -2,
    width: {
      xs: '100vw',
      sm: '100%'
    },
    height: {
      xs: 'calc(100% - (100vw * 0.035))',
      ms: 'calc(100% - ((100vw - 112px) * 0.035))',
      md: 'calc(100% - ((100vw - 144px) * 0.035))',
      xxl: 'calc(100% - (1584px * 0.035))'
    },
    background: mainHexPallete.yellow['500'],
    transform: 'skewY(-2deg)',
    transformOrigin: 'top left'
  },
  contentContainer: {
    p: {
      xs: '39px 0 65px',
      sm: '18px 46px 72px 35px',
      md: '18px 56px 83px 52px',
      lg: '0 75px 137px 70px',
      xl: '0 87px 139px 78px',
      xxl: '0 113px 144px 119px'
    },
    mt: {
      xxl: '-5px'
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  quoteBlock: {
    display: 'flex',
    justifyContent: {
      xs: 'center',
      sm: 'right'
    }
  },
  quoteSx: {
    width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%' },
    maxWidth: {
      xs: '272px',
      sm: '362px',
      md: '460px',
      lg: '520px'
    },
    gap: {
      xs: '25px',
      sm: '18px',
      md: '32px'
    }
  },
  textBlock: {
    width: '100%',
    maxWidth: {
      xs: '272px',
      sm: 'none'
    },
    pt: {
      xs: '23px',
      sm: '2px'
    },
    mx: {
      xs: 'auto',
      sm: 0
    },
    mt: {
      md: '-65px',
      lg: '-95px'
    }
  },
  text: {
    fontFamily: 'var(--font-oswald)',
    fontWeight: 700,
    fontSize: { xs: '40px', sm: '68px', md: '92px', lg: '116px' },
    lineHeight: '100%',
    letterSpacing: '-2px',
    color: 'white'
  },
  indentedLine: {
    mt: {
      xs: '8px',
      sm: '6px',
      md: '8px',
      lg: '4px'
    },
    ml: {
      sm: '33px',
      md: '111px'
    },
    textAlign: {
      xs: 'right',
      sm: 'left'
    }
  },
  media: {
    mt: {
      xs: '-12px',
      sm: '-82px',
      md: '-62px',
      lg: '-75px'
    },
    mr: {
      xs: '-20px',
      sm: '-5px',
      md: '-8px',
      lg: '10px',
      xxl: '120px'
    },
    display: 'flex',
    justifyContent: {
      xs: 'center',
      sm: 'right'
    }
  },
  buttonBlock: {
    mt: {
      xs: '39px',
      sm: '-10px',
      md: '-35px',
      lg: '-55px'
    },
    mx: {
      xs: 'auto',
      sm: '5px',
      md: '24px',
      lg: '25px',
      xl: '28px'
    }
  },
  button: { py: '8px', height: { xs: '40px', md: '56px' }, width: { xs: '208px', md: '264px' } }
};

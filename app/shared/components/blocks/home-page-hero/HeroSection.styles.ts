import { mainHexPallete } from '~/shared/components/design-system/all-components/theme/colors';

export const heroSectionStyles = {
  imageTextGap: {
    xs: '16px',
    md: '32px',
    lg: '40px'
  },

  textGap: {
    xs: '12px',
    md: '16px',
    lg: '24px'
  },

  iconWidth: {
    xs: '40px',
    md: '50px',
    lg: '60px'
  },

  heroSection: {
    position: 'relative' as const,
    width: '100vw',
    marginLeft: 'calc(50% - 50vw)',
    marginRight: 'calc(50% - 50vw)',
    gridColumn: '1/-1'
  },

  clickableArea: {
    display: 'block',
    width: '100%',
    position: 'relative',
    cursor: 'none',
    outline: 'none',
    userSelect: 'none'
  },

  backgroundContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    height: {
      xs: '500px',
      lg: '60vh',
      xl: '65vh'
    },
    maxHeight: {
      sm: '60vh',
      md: '600px',
      xl: '800px'
    },
    width: '100%',
    clipPath: {
      xs: 'polygon(0 0, 100% 0, 100% 90%, 0 95%)',
      sm: 'polygon(0 0, 100% 0, 100% 90%, 0 98%)',
      md: 'polygon(0 0, 100% 0, 100% 89%, 0 97%)',
      lg: 'polygon(0 0, 100% 0, 100% 88%, 0 98%)'
    }
  },

  heroCharacter: {
    position: 'absolute' as const,
    left: {
      sm: '0',
      md: '-84px'
    },
    bottom: '0',
    top: '0',
    width: {
      xs: '100%',
      sm: '65%'
    }
  },

  textLogoStyle: {
    position: 'relative',
    width: '100%',
    maxWidth: '1728px',
    margin: '0 auto',
    padding: 0,
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  },

  cursorButton: {
    position: 'fixed',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '44px',
    width: '200px',
    gap: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: '10px 20px 10px 16px',
    backdropFilter: 'blur(5px)',
    borderRadius: '48px',
    '@media (hover: none) and (pointer: coarse)': {
      display: 'none'
    }
  },

  cursorButtonText: {
    fontWeight: '600',
    fontSize: '16px',
    letterSpacing: '-2%',
    color: mainHexPallete?.brown?.[700] || '#574139'
  },

  contentWrapper: {
    position: 'relative' as const,
    zIndex: 10,
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(4, 1fr)',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    columnGap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    },
    px: {
      xs: '24px',
      sm: '56px',
      md: '72px'
    },
    maxWidth: '1728px',
    margin: '0 auto',
    width: '100%',
    flex: 1,
    paddingTop: {
      xs: '32px',
      md: '200px'
    },
    paddingBottom: {
      xs: '56px',
      md: '150px'
    }
  },

  rightContentBlock: {
    gridColumn: {
      xs: '1 / -1',
      sm: '4 / -1',
      md: '6 / -1',
      lg: '8 / -1'
    },
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: {
      xs: 'flex-start',
      sm: 'flex-end'
    },
    justifyContent: 'center',
    marginBottom: {
      sm: '80px',
      md: '96px'
    },
    pointerEvents: 'none',
    userSelect: 'none'
  }
};

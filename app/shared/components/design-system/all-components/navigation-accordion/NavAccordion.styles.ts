export const textStates = {
  default: {
    color: 'burgundy.900'
  },
  hover: {
    '@media (min-width: 900px)': { color: 'burgundy.700' }
  },
  pressed: {
    color: 'burgundy.900'
  },
  active: {
    color: 'burgundy.700'
  }
};

export const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  itemWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    border: 'none !important',
    boxShadow: 'none !important'
  },

  titleButton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    paddingY: { xs: '6px', md: '4px' },
    paddingX: '8px',
    marginX: '-8px',
    width: 'calc(100% + 16px)',
    color: textStates.default.color,
    transition: 'color 0.2s ease, box-shadow 0.2s ease',
    borderRadius: '8px',
    border: 'none !important',
    outline: 'none !important',
    textDecoration: 'none !important',
    background: 'transparent !important',

    '&:focus, &:focus-visible, &:focus-within': {
      outline: 'none !important',
      boxShadow: '0 0 0 2px #631B2B !important',
      borderRadius: '8px',
      color: 'burgundy.700 !important',
      textDecoration: 'none !important'
    },

    '&:hover': {
      ...textStates.hover,
      textDecoration: 'none !important',
      '& svg *': {
        stroke: 'burgundy.700'
      }
    },

    '&:active': {
      ...textStates.pressed,
      textDecoration: 'none !important',
      '& svg *': {
        stroke: 'burgundy.900'
      }
    }
  },

  title: (isActive: boolean) => ({
    fontSize: { xs: '24px', md: '40px' },
    fontFamily: 'Oswald',
    fontWeight: 600,
    lineHeight: '160%',
    textTransform: 'uppercase',
    transition: 'color 0.2s ease',
    color: isActive ? textStates.active : 'inherit',
    textDecoration: 'none !important'
  }),

  submenuItem: {
    fontSize: { xs: '22px', md: '28px' },
    fontFamily: 'Oswald',
    fontWeight: 500,
    lineHeight: '120%',
    cursor: 'pointer',
    color: `${textStates.default.color} !important`,
    transition: 'color 0.2s ease, box-shadow 0.2s ease',
    paddingY: '6px',
    paddingX: '8px',
    marginX: '-8px',
    width: 'calc(100% + 16px)',
    display: 'block',
    border: 'none !important',
    outline: 'none !important',
    textDecoration: 'none !important',
    background: 'transparent !important',

    '&:focus, &:focus-visible': {
      outline: 'none !important',
      boxShadow: '0 0 0 2px #631B2B !important',
      color: 'burgundy.700 !important',
      textDecoration: 'none !important'
    },

    '&:hover': {
      ...textStates.hover,
      textDecoration: 'none !important'
    },
    '&:active': {
      ...textStates.pressed,
      textDecoration: 'none !important'
    }
  },

  dropdownBox: (isOpen: boolean) => ({
    overflow: isOpen ? 'visible !important' : 'hidden !important',
    maxHeight: isOpen ? '20rem' : 0,

    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0)' : 'translateY(-6px)',

    transition: isOpen
      ? `
        max-height 700ms cubic-bezier(0.215, 0.610, 0.355, 1.000),
        opacity 500ms ease-out,
        transform 700ms cubic-bezier(0.215, 0.610, 0.355, 1.000),
        padding 500ms ease-out
      `
      : `
        max-height 500ms cubic-bezier(0.445, 0.050, 0.550, 0.950),
        opacity 400ms ease-in,
        transform 500ms cubic-bezier(0.445, 0.050, 0.550, 0.950),
        padding 400ms ease-in
      `,

    pt: isOpen ? '16px' : 0,
    pb: isOpen ? '16px' : 0,
    px: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  })
};

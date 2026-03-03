export const heroSectionStyles = {
  heroSection: {
    position: 'relative' as const,
    width: '100vw',
    marginLeft: 'calc(50% - 50vw)',
    marginRight: 'calc(50% - 50vw)',
    gridColumn: '1/-1'
  },

  clickableArea: {
    position: 'relative'
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
      lg: '70vh'
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

  // textParagraph: {
  //   textAlign: {
  //     xs: 'left',
  //     sm: 'right'
  //   },
  //   fontSize: {
  //     xs: '16px',
  //     lg: '18px'
  //   },
  //   marginTop: {
  //     xs: '16px',
  //     md: '32px',
  //     lg: '40px'
  //   },
  //   marginBottom: {
  //     xs: '12px',
  //     md: '16px',
  //     lg: '24px'
  //   },
  //   lineHeight: 1.6,
  //   color: '#190D03',
  //   maxWidth: {
  //     xs: '100%',
  //     md: '500px',
  //     lg: '700px'
  //   }
  // },

  // smallText: {
  //   fontStyle: 'italic',
  //   fontSize: {
  //     xs: '14px',
  //     lg: '16px'
  //   },
  //   fontWeight: {
  //     xs: '400',
  //     lg: '500'
  //   },
  //   lineHeight: 1.1,
  //   color: '#190D03',
  //   maxWidth: {
  //     xs: '100%',
  //     md: '700px',
  //     lg: '800px'
  //   }
  // },

  overlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 0
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
      lg: '7 / -1'
    },
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: {
      xs: 'flex-start',
      sm: 'flex-end'
    },
    justifyContent: 'center',
    marginBottom: {
      xs: '64px',
      sm: '80px',
      md: '96px'
    },
    pointerEvents: 'none'
  }
};

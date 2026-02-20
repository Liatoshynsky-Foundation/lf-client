export const heroSectionStyles = {
  backgroundContainer: {
    position: 'relative' as const,
    minHeight: '68vh',
    height: '68vh',
    width: '100vw',
    marginLeft: 'calc(50% - 50vw)',
    marginRight: 'calc(50% - 50vw)',
    gridColumn: '1 / -1',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' as const
  },

  backgroundImage: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    objectFit: 'fill' as const,
    objectPosition: 'center'
  },

  contentWrapper: {
    position: 'relative',
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
      xs: '120px',
      sm: '140px',
      md: '160px'
    },
    paddingBottom: {
      xs: '250px',
      sm: '280px',
      md: '300px'
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
    gap: {
      xs: '24px',
      sm: '32px',
      md: '40px'
    },
    alignItems: 'flex-end',
    marginBottom: {
      xs: '64px',
      sm: '80px',
      md: '96px'
    }
  },

  heroIcon: {
    width: {
      xs: '64px',
      sm: '80px',
      md: '96px',
      lg: '120px'
    },
    height: {
      xs: '64px',
      sm: '80px',
      md: '96px',
      lg: '120px'
    },
    objectFit: 'contain' as const
  },

  textParagraph: {
    textAlign: 'right',
    fontSize: {
      xs: '18px'
    },
    lineHeight: 1.6,
    color: '#190D03',
    maxWidth: {
      xs: '100%',
      md: '600px',
      lg: '700px'
    },
    opacity: 0.95
  },

  smallText: {
    textAlign: 'right',
    fontStyle: 'italic',
    fontSize: {
      xs: '16px'
    },
    lineHeight: 1.1,
    color: '#190D03',
    letterSpacing: '-0.02em',
    maxWidth: {
      xs: '100%',
      md: '700px',
      lg: '800px'
    }
  },

  buttonContainer: {
    gridColumn: '1 / -1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  ctaButton: {
    minWidth: {
      xs: '200px',
      sm: '240px',
      md: '280px'
    }
  },

  overlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 0
  }
};

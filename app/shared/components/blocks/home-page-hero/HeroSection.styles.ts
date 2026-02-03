export const heroSectionStyles = {
  // Full-bleed background container
  backgroundContainer: {
    position: 'relative' as const,
    minHeight: '68vh', // 80% of viewport - IntroAnimation logo takes 20%
    height: '68vh', // 80% of viewport - IntroAnimation logo takes 20%
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    marginRight: 'calc(-50vw + 50%)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' as const
  },

  // Full-bleed background image
  backgroundImage: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    objectFit: 'cover' as const,
    objectPosition: 'center'
  },

  // Content wrapper with grid layout
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

  // Right-aligned content block container
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
    alignItems: 'flex-start',
    marginBottom: {
      xs: '64px',
      sm: '80px',
      md: '96px'
    }
  },

  // Hero icon styling
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

  // Text paragraph styling
  textParagraph: {
    fontSize: {
      xs: '16px',
      sm: '18px',
      md: '20px',
      lg: '22px'
    },
    lineHeight: 1.6,
    color: '#FCFCFC',
    maxWidth: {
      xs: '100%',
      md: '600px',
      lg: '700px'
    },
    opacity: 0.95
  },

  // Main text styling
  mainText: {
    fontSize: {
      xs: '32px',
      sm: '48px',
      md: '64px',
      lg: '80px'
    },
    fontWeight: 700,
    lineHeight: 1.1,
    color: '#FCFCFC',
    letterSpacing: '-0.02em',
    maxWidth: {
      xs: '100%',
      md: '700px',
      lg: '800px'
    }
  },

  // Bottom button container - centered
  buttonContainer: {
    gridColumn: '1 / -1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  // Button styling
  ctaButton: {
    minWidth: {
      xs: '200px',
      sm: '240px',
      md: '280px'
    }
  },

  // Overlay for better text readability
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

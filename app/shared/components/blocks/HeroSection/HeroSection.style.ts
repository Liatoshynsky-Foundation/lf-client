export const heroSectionStyles = {
  mainContainer: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    paddingTop: '48px',
    rowGap: { xs: '64px', sm: '72px' }
  },

  topContainer: {
    display: 'contents',
    gap: { xs: '64px', sm: '24px', md: '40px', xl: '124px', xxl: '244px' }
  },

  titleWithQuoteContainer: {
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / 4',
      md: '1 / 6',
      lg: '1 / 5'
    },

    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    gap: {
      xs: '72px',
      sm: '72px',
      md: '124px',
      lg: '124px',
      xl: '124px',
      xxl: '124px'
    }
  },

  quoteContainer: {
    maxWidth: { xl: '408px' },
    width: '100%',
    gap: '24px!important'
  },

  title: {
    width: '100%',
    fontFamily: 'Oswald',
    fontWeight: 600,
    fontStyle: 'SemiBold',
    fontSize: { xs: '40px', md: '64px' },
    lineHeight: '120%',
    letterSpacing: { xs: '-2%', md: '0%' },
    verticalAlign: 'middle',
    textTransform: 'capitalize',
    wordBreak: 'break-word'
  },

  photoContainer: {
    gridColumn: {
      xs: '1 / -1',
      sm: '4 / -1',
      md: '6 / -1',
      lg: '6 / -1'
    }
  },

  imageWithCaptionContainer: {
    width: '100%',
    gap: { xs: '12px', md: '16px' },
    display: 'flex',
    flexDirection: 'column'
  },

  imageSizes: {
    width: { xs: 272, sm: 400, md: 496, lg: 646, xl: 744, xxl: 906 },
    height: { xs: 365, sm: 536, md: 664, lg: 864, xl: 960, xxl: 1169 }
  },

  caption: {
    width: '100%',
    margin: '0!important',
    fontFamily: 'Mulish',
    fontWeight: 400,
    fontStyle: 'Italic',
    fontSize: '14px',
    lineHeight: '140%',
    letterSpacing: '0px',
    alignSelf: 'end'
  },

  bottomContainer: {
    fontFamily: 'Mulish',
    gridColumn: '1 / -1!important',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  },

  biographyContainer: {
    gridColumn: '1 / -1',
    gridTemplateColumns: 'none',
    width: { xs: '100%', sm: '400px', md: '496px', lg: '646px', xl: '744px', xxl: '906px' },
    alignSelf: 'end'
  },

  biographyText: {
    fontWeight: 300,
    fontStyle: 'normal',
    fontSize: { xs: '18px', md: '24px' },
    lineHeight: '160%',
    letterSpacing: '0px',
    verticalAlign: 'middle',
    textIndent: { xs: '0px', sm: '230px', md: '336px' }
  },

  noteContainer: {
    gridColumn: '1 / -1',
    gridTemplateColumns: 'none',
    width: { xs: '100%', sm: '486px', md: '614px', lg: '784px', xl: '900px', xxl: '1083px' },
    alignSelf: 'start'
  },

  noteText: {
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: { xs: '18px', md: '20px' },
    lineHeight: { xs: '150%', md: '160%' },
    letterSpacing: '0px',
    verticalAlign: 'middle',
    textIndent: { xs: '72px', sm: '88px', md: '112px' }
  }
} as const;

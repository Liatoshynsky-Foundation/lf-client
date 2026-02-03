export const styles = {
  sectionContainer: {
    display: 'grid',
    gridColumn: '1 / -1',
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
    width: '100%',
    my: { xs: '80px', sm: '104px', md: '128px', lg: '144px', xl: '160px' }
  },

  title: {
    gridColumn: '1 / -1',
    gridRow: '1',
    fontSize: { xs: '48px', sm: '64px', md: '88px', lg: '104px', xl: '120px' },
    fontStyle: 'SemiBold',
    color: '#190D03',
    lineHeight: 1.1,
    fontWeight: 600,
    mb: { xs: '52px', sm: '52px', md: '52px', lg: '52px', xl: '52px' }
  },
  // replase || delete styles for component ButtonContentBlock (30-65 lines)
  descriptionWrapper: {
    gridColumn: { xs: '1 / -1', md: '6 / -1' },
    gridRow: '2',
    display: 'flex',
    mb: { xs: '32px', md: '17px', lg: '0px', xl: '0px' }
  },

  descriptionText: {
    fontSize: { xs: '20px', md: '20px', lg: '20px' },
    mt: { xs: '5px', md: '5px', lg: '5px' },
    lineHeight: 1.6,
    fontWeight: 400,
    color: '#190D03',
    textAlign: 'left',
    textIndent: { md: 'calc(8.33% + 40px)', xl: 'calc(8.33% + 330px)' },
    '@media (max-width: 900px)': { textIndent: 0 }
  },

  mainCta: {
    gridColumn: { xs: '1 / -1', md: '1 / 6' },
    gridRow: '2',
    justifySelf: 'end',
    mt: { xs: '20px', md: '100px', lg: '120px' },
    borderRadius: '40px',
    backgroundColor: '#FCBD28',
    color: '#190D03',
    '& .MuiButton-endIcon': {
      marginLeft: '1px'
    },
    fontSize: { xs: '10px', md: '16px', lg: '16px' },
    fontWeight: 500,
    lineHeight: 1.5,
    fontStyle: 'Medium',
    textTransform: 'none',
    '&:hover': { backgroundColor: '#e6a600' }
  },

  eventsList: {
    gridColumn: '1 / -1',
    gridRow: '3',
    display: 'flex',
    flexDirection: 'column',
    gap: '56px',
    mt: '80px',
    width: '100%'
  },

  eventItem: {
    display: 'grid',
    gridTemplateRows: { xs: 'auto auto', sm: 'auto auto', md: 'auto auto', lg: '1fr' },
    gridTemplateColumns: {
      xs: 'repeat(4, 1fr)',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    columnGap: { xs: '16px', sm: '24px', md: '40px' },
    width: '100%'
  },

  eventDate: {
    gridColumn: { xs: '1 / -1', sm: '1 / 4', md: '1 / 5', lg: '1 / 2', xl: '1 / 3' },
    gridRow: { xs: '1', sm: '1', md: '1' },
    fontSize: { xs: '20px', sm: '20px', md: '28px', lg: '28px' },
    fontWeight: 700,
    color: '#190D03',
    lineHeight: 1.4,
    fontStyle: 'SemiBold',
    fontFamily: 'Oswald'
  },

  eventTitle: {
    fontSize: { xs: '18px', sm: '18px', md: '24px', lg: '24px' },
    lineHeight: 1.5,
    fontWeight: 700,
    fontStyle: 'Bold',
    color: '#190D03',
    textTransform: 'uppercase',
    maxWidth: { sm: '100%', md: '100%', lg: '90%' },
    mb: '5px',
    mt: { xs: '32px', sm: '0px' },
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    WebkitLineClamp: { xs: 2, sm: 'none' }
  },

  publishDate: {
    fontSize: { xs: '16px', sm: '16px', md: '16px', lg: '16px' },
    color: '#08090b',
    lineHeight: 1.5,
    fontWeight: 500,
    fontStyle: 'Medium',
    mb: { xs: '10px', sm: '15px', md: '25px', lg: '25px' },
    display: 'block'
  },

  eventDescription: {
    fontSize: { xs: '16px', sm: '16px', md: '18px', lg: '18px' },
    lineHeight: 1.6,
    fontWeight: 400,
    color: '#000000',
    mb: { xs: '24px', sm: '0px', md: '20px', lg: '24px', xl: '24px' },

    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',

    WebkitLineClamp: {
      xs: 3,
      sm: 2,
      md: 2,
      lg: 2,
      xl: 3
    }
  },

  eventImage: {
    gridColumn: { xs: '1 / -1', sm: '1 / 4', md: '2 / 6', lg: '3 / 6' },
    gridRow: { xs: '2', sm: '2', md: '2', lg: '1' },
    width: '100%',
    height: { xs: '183px', sm: '169px', md: '191px', lg: '224px', xl: '248px' },
    clipPath: 'polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)',
    pl: { xs: '0px', md: '0px', lg: '0px', xl: '40px' },
    objectFit: 'cover'
  },

  eventInfo: {
    gridColumn: { xs: '1 / -1', sm: '4 / 9', md: '6 / 13', lg: '6 / 12' },
    gridRow: { xs: '3', sm: '1 / 3', md: '1 / 3', lg: '1' },
    display: 'flex',
    flexDirection: 'column'
  },

  buttonGroup: {
    display: 'flex',
    mt: { xs: 'auto', sm: '10px', md: 'auto', lg: 'auto' },
    alignItems: 'center',
    gap: { xs: '12px' }
  },

  actionButton: {
    borderRadius: '30px',
    fontSize: { xs: '16px', sm: '16px', md: '16px', lg: '16px' },
    lineHeight: 1.5,
    fontWeight: 500,
    fontStyle: 'Medium',
    border: '1px solid #190D03',
    color: '#190D03',
    pr: '20px',
    textTransform: 'none'
  },

  regButton: {
    textTransform: 'none',
    pl: { xs: '0px', sm: '20px' },
    p: { xs: 0, sm: '8px 24px' },
    fontWeight: 400,
    fontSize: { xs: '0px', sm: '16px', md: '16px', lg: '16px' },
    lineHeight: 1.1,
    display: 'flex',
    gap: '4px',
    minWidth: { xs: '40px', sm: 'auto' },
    width: { xs: '40px', sm: 'auto' },
    height: { xs: '40px', sm: 'auto' },
    borderRadius: { xs: '50%', sm: '30px' },
    border: { xs: '1px solid #190D03', sm: 'none' },
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    '& .MuiButton-endIcon': {
      m: 0,
      '& img': {
        width: 20,
        height: 20
      }
    }
  }
};

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
    fontSize: { xs: '40px', md: '100px', lg: '104px', xl: '120px' },
    fontStyle: 'SemiBold',
    color: '#190D03',
    lineHeight: 1.1,
    fontWeight: 600,
    mb: '52px'
  },

  descriptionWrapper: {
    gridColumn: { xs: '1 / -1', md: '6 / -1' },
    gridRow: '2',
    display: 'flex',
    flexDirection: 'column'
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
    gridTemplateColumns: 'repeat(12, 1fr)',
    columnGap: { xs: '16px', md: '40px' },
    width: '100%'
  },

  eventDate: {
    gridColumn: { xs: '1 / -1', md: '1 / 3' },
    fontSize: { xs: '18px', md: '24px', lg: '28px' },
    fontWeight: 700,
    color: '#190D03',
    lineHeight: 1.4,
    fontStyle: 'SemiBold',
    fontFamily: 'Oswald'
  },

  eventTitle: {
    fontSize: { xs: '20px', md: '24px', lg: '24px' },
    lineHeight: 1.5,
    fontWeight: 700,
    fontStyle: 'Bold',
    color: '#190D03',
    textTransform: 'uppercase',
    maxWidth: { md: '60%', lg: '90%' },
    mb: '5px'
  },

  publishDate: {
    fontSize: { xs: '20px', md: '24px', lg: '16px' },
    color: '#63666E',
    lineHeight: 1.5,
    fontWeight: 500,
    fontStyle: 'Medium',
    mb: '25px',
    display: 'block'
  },

  eventDescription: {
    fontSize: { xs: '20px', md: '24px', lg: '18px' },
    lineHeight: 1.6,
    fontWeight: 400,
    color: '#000000',
    mb: '24px'
  },

  eventImage: {
    gridColumn: { xs: '1 / -1', md: '3 / 6' },
    width: '100%',
    height: { xs: '200px', md: '250px', lg: '245px' },
    clipPath: 'polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)',
    pl: '40px',
    objectFit: 'cover'
  },

  eventInfo: {
    gridColumn: { xs: '1 / -1', md: '6 / 12' },
    display: 'flex',
    flexDirection: 'column'
  },

  buttonGroup: {
    display: 'flex',
    mt: 'auto',
    alignItems: 'center'
  },

  actionButton: {
    borderRadius: '30px',
    fontSize: { xs: '20px', md: '24px', lg: '16px' },
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
    pl: '20px',
    fontWeight: 400,
    fontSize: { xs: '20px', md: '24px', lg: '16px' },
    lineHeight: 1.1,
    display: 'flex',
    gap: '4px',
    textDecoration: 'none',
    '& .MuiButton-endIcon': {
      m: 0
    }
  }
};

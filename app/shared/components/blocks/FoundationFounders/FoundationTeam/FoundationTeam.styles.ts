export const getSpan = (start: number, span: number) => `${start} / span ${span}`;

export const styles = {
  container: {
    mt: { xs: '105px', sm: '60px', md: '80px', lg: '100px', xl: '120px' },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    pb: '100px'
  },
  titleWrapper: {
    display: 'grid',
    gridTemplateColumns: { xs: 'repeat(4, 1fr)', sm: 'repeat(8, 1fr)', md: 'repeat(12, 1fr)' },
    columnGap: { xs: '16px', sm: '40px' },
    width: '100%',
    mb: { xs: '43px', sm: '48px', md: '98px' }
  },
  title: {
    color: '#190D03',
    fontFamily: 'var(--font-oswald)',
    fontWeight: 700,
    fontSize: { xs: '20px', md: '28px' },
    lineHeight: '160%',
    textTransform: 'uppercase',
    letterSpacing: 0,
    gridColumn: { xs: getSpan(2, 3), sm: getSpan(4, 5), md: getSpan(6, 7), xxl: getSpan(6, 6) }
  },
  foundationTeam: {
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: {
      xs: 'repeat(1, 258px)',
      sm: 'repeat(2, 258px)',
      md: 'repeat(2, 296px)',
      lg: 'repeat(3, 296px)',
      xl: 'repeat(4, 296px)'
    },
    gap: { xs: '56px', sm: '40px' }
  },
  logo: {
    minWidth: '258px',
    height: '180px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

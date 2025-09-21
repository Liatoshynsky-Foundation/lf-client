const black = '#190D03';

export const getSpan = (start: number, span: number) => `${start} / span ${span}`;

export const styles = {
  container: {
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
    width: '100%',
    mt: '100px'
  },
  ellipseWrapper: {
    gridColumn: { xs: 1, sm: getSpan(1, 3), md: getSpan(1, 5) }
  },
  text: {
    gridColumn: { xs: getSpan(2, 3), sm: getSpan(4, 5), md: getSpan(6, 7), xxl: getSpan(6, 6) }
  },
  title: {
    display: 'block',
    mb: 5,
    fontFamily: 'var(--font-mulish)',
    textTransform: 'uppercase',
    fontSize: { xs: '14px', md: '26px' },
    color: black,
    fontWeight: 700
  },
  description: {
    fontFamily: 'var(--font-mulish)',
    textTransform: 'uppercase',
    fontSize: { xs: '14px', md: '26px' },
    color: black,
    fontWeight: 400,
    '& span:nth-child(2)': {
      display: 'block',
      textIndent: '2em'
    }
  }
};

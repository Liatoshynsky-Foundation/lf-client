const black = '#190D03';

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
    mt: '22px'
  },
  ellipseWrapper: {
    gridColumn: {
      xs: '1 / 2'
    }
  },
  text: {
    gridColumn: {
      xs: '2 / 5',
      sm: '4 / -1',
      md: '6 / -1'
    },
    maxWidth: '744px'
  },
  title: {
    display: 'block',
    mb: 3,
    fontFamily: 'var(--font-mulish)',
    textTransform: 'uppercase',
    fontSize: { xs: '14px', sm: '16px', md: '26px' },
    color: black,
    fontWeight: 700,
    lineHeight: '180%'
  },
  description: {
    fontFamily: 'var(--font-mulish)',
    textTransform: 'uppercase',
    fontSize: { xs: '14px', sm: '16px', md: '26px' },
    color: black,
    fontWeight: 400,
    lineHeight: '180%',
    '& span:nth-child(2)': {
      display: 'block',
      textIndent: {
        xs: '40px',
        md: '70px'
      }
    }
  }
};

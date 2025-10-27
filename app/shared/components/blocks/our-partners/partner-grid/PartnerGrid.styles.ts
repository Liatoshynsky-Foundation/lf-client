const styles = {
  grid: (columns: number, rows: number) => ({
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    gap: { xs: '12px', sm: '24px' },
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`
  }),
  logoBox: {
    justifySelf: 'center'
  },
  img: {
    objectFit: 'contain',
    height: 'auto',
    maxHeight: '112px',
    width: '100%'
  }
};

export default styles;

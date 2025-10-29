const styles = {
  grid: (columns: number) => ({
    display: 'grid',
    gap: { xs: '12px', sm: '24px' },
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridAutoRows: '1fr',
    width: '100%'
  }),
  logoBox: {
    justifySelf: 'center',
    alignSelf: 'center'
  },
  img: {
    objectFit: 'contain',
    width: '100%',
    maxWidth: '100%',
    maxHeight: '112px',
    height: 'auto'
  }
};

export default styles;

export const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: { xs: 'repeat(4,1fr)', sm: 'repeat(8,1fr)', md: 'repeat(12, 1fr)' },
    gridColumn: '1 / -1',
    gap: { xs: '16px', sm: '20px', md: '40px' }
  },
  textContent: (textIndent: string | object = '0px') => ({
    gridColumn: { xs: '2/ -1', sm: '4/ -1', md: '6/-1' },
    gap: '8px',
    maxWidth: '906px',
    textIndent: textIndent
  })
};

import { theme } from '../theme/Theme';

export const styles = {
  container: (mb?: number | string) => ({
    display: 'grid',
    gridTemplateColumns: { xs: 'repeat(4,1fr)', sm: 'repeat(8,1fr)', md: 'repeat(12,1fr)' },
    gridTemplateRows: 'auto auto',
    gridColumn: '1 / -1',
    alignItems: 'center',
    gap: { xs: '12px', sm: '24px', md: '40px' },
    mb: `${mb ?? 72}px`
  }),
  content: {
    gridColumn: { xs: '1 / -1', sm: '4 / -1', md: '6 / -1' },
    gridRow: { xs: '2', sm: '1' },
    justifySelf: 'start',
    fontSize: { xs: '16px', sm: '16px', md: '20px' },
    '& p, & li': {
      fontSize: { xs: '16px', sm: '16px', md: '20px' },
      margin: 0
    },
    textIndent: {
      xs: 'clamp(80px, calc(-0.42rem + 4vw), 410px)',
      sm: 'clamp(232px, calc(-0.42rem + 4vw), 410px)',
      lg: 'clamp(335px, calc(-0.42rem + 4vw), 410px)',
      xl: 'clamp(410px, calc(-0.42rem + 4vw), 410px)'
    }
  },
  title: (gridColumn?: object) => ({
    color: theme.palette.text.primary,
    gridRow: '1',
    gridColumn: gridColumn ?? { xs: '1 / 4', customxs: '1 / -1', sm: '1 / 5'},
    mb: { xs: 0, sm: '180px', md: '40px' },
    maxWidth: { xs: '300px', sm: '250px' },
    minWidth: 0,
    justifySelf: 'start',
    whiteSpace: 'normal',
    overflowWrap: 'break-word'
  })
};

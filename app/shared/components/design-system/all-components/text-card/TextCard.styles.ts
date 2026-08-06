import { Theme } from '@mui/material/styles';

export const styles = {
  card: {
    position: 'relative',
    width: { xs: '296px', md: '272px' },
    height: '351px',
    overflow: 'hidden'
  },
  background: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '402px',
    height: '337px',
    backgroundColor: 'background.default',
    transform: 'translate(-50%, -50%) rotate(-2deg)'
  },
  content: {
    position: 'relative',
    padding: { xs: '20px', sm: '40px 30px', lg: '48px 40px' },
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    background: 'transparent'
  },
  description: (theme: Theme) => ({
    ...theme.typography.customRegular16,
    color: 'black',
    maxWidth: '216px'
  }),
  title: (theme: Theme) => ({
    ...theme.typography.customBold20,
    lineHeight: '130%',
    color: 'black'
  })
};

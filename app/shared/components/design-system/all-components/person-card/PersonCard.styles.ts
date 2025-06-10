import { CSSProperties } from 'react';

export const styles = {
  container: {
    width: { xs: '258px', md: '296px' },
    fontFamily: 'var(--font-mulish)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '24px'
  },
  photoWrapper: {
    position: 'relative',
    width: '207px',
    height: '173px',
    overflow: 'hidden',
    transform: 'rotate(-25deg)',
    borderRadius: '50%',
    backgroundColor: '#B8AEA2'
  },
  textWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    color: '#190D03'
  },
  name: {
    fontSize: { xs: '20px', md: '24px' },
    fontWeight: 700,
    textAlign: 'left',
    fontFamily: 'inherit'
  },
  description: {
    fontSize: { xs: '16px', md: '20px' },
    fontWeight: 400,
    textAlign: 'left',
    fontFamily: 'inherit'
  },
  image: {
    objectFit: 'cover',
    borderRadius: '60% 40% 60% 40% / 55% 45% 55% 45%',
    position: 'absolute',
    top: '2px',
    left: '15px',
    transform: 'rotate(25deg)'
  } as CSSProperties
};

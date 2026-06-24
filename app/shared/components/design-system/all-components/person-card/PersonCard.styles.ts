import { CSSProperties } from 'react';

import { commonSx } from '~/shared/styles/commonSx';

export const styles = {
  container: {
    width: { xs: '258px', md: '296px' },
    fontFamily: 'var(--font-mulish)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: {
      xs: '30px'
    }
  },
  photoWrapper: {
    position: 'relative',
    width: '207px',
    height: '173px',
    overflow: 'hidden',
    transform: 'rotate(-25deg)',
    borderRadius: '50%',
    backgroundColor: 'brown.300'
  },
  textWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '5px', sm: '7px', md: '7px' },
    color: 'black'
  },
  name: {
    fontSize: { xs: '20px', md: '24px' },
    fontWeight: 700,
    textAlign: 'left',
    fontFamily: 'inherit',
    lineHeight: '140%'
  },
  description: {
    fontSize: commonSx.layout.typography.bodyLarge,
    fontWeight: 400,
    lineHeight: { xs: '150%', md: '160%' },
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

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
    height: '173px'
  },
  photoBackground: {
    position: 'absolute',
    inset: 0,
    transform: 'rotate(-25deg)',
    borderRadius: '50%',
    backgroundColor: 'brown.300'
  },
  photoImageWrapper: {
    position: 'absolute',
    top: '2px',
    left: '15px',
    width: '185px',
    height: '166px',
    overflow: 'hidden',
    borderRadius: '60% 40% 60% 40% / 55% 45% 55% 45%'
  },
  placeholderLogo: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '164px',
    height: '61px',
    transform: 'translate(-50%, -50%)',
    objectFit: 'contain',
    opacity: 0.48,
    pointerEvents: 'none'
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
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  } as CSSProperties
};

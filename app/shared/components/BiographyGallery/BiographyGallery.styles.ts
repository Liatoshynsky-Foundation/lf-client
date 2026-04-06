import { SxProps, Theme, TypographyProps } from '@mui/material';

export const styles = {
  root: {
    position: 'relative',
    left: '50%',
    right: '50%',
    width: '100vw',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    overflow: 'hidden'
  } as SxProps<Theme>,

  track: (durationSec: number, paused: boolean): SxProps<Theme> => ({
    display: 'flex',
    width: 'max-content',
    animation: `marquee ${durationSec}s linear infinite`,
    animationPlayState: paused ? 'paused' : 'running',
    willChange: 'transform',
    '@keyframes marquee': {
      '0%': { transform: 'translateX(0)' },
      '100%': { transform: 'translateX(-50%)' }
    }
  }),

  frame: {
    display: 'flex',
    alignItems: 'stretch',
    flex: '0 0 auto',
    height: { xs: 468, md: 553, lg: 592 }
  } as SxProps<Theme>,

  imageWrapper: {
    flex: '0 0 auto',
    flexShrink: 0,
    minWidth: 0,
    '&:hover .bioCaption--real': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  } as SxProps<Theme>,

  captionBase: {
    whiteSpace: 'pre-line',
    minHeight: '90px'
  } satisfies TypographyProps['sx'],

  captionAnimated: {
    opacity: 0,
    transform: 'translateY(6px)',
    transition: 'opacity 200ms ease, transform 200ms ease'
  } satisfies TypographyProps['sx']
};

export const biographyGallerySlots = [
  // 1) top, without ml
  {
    sizes: { width: { xs: 141, md: 159, lg: 183 }, height: { xs: 109, md: 123, lg: 142 } },
    alignSelf: 'flex-start',
    ml: 0
  },

  // 2) bottom, without ml
  {
    sizes: { width: { xs: 175, md: 200, lg: 224 }, height: { xs: 221, md: 253, lg: 283 } },
    alignSelf: 'flex-end',
    ml: 0
  },

  // 3) top, ml=24px
  {
    sizes: { width: { xs: 132, md: 159, lg: 183 }, height: { xs: 159, md: 191, lg: 220 } },
    alignSelf: 'flex-start',
    ml: 3
  },

  // 4) top, ml=24px
  {
    sizes: { width: { xs: 231, md: 272, lg: 296 }, height: { xs: 362, md: 447, lg: 486 } },
    alignSelf: 'flex-start',
    ml: 3
  },

  // 5) bottom, ml=24px
  {
    sizes: { width: { xs: 141, md: 159, lg: 183 }, height: { xs: 122, md: 137, lg: 158 } },
    alignSelf: 'flex-end',
    ml: 3
  }
] as const;

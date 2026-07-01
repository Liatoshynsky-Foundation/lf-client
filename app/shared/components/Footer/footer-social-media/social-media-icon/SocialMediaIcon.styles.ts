import { SxProps } from '@mui/material';

import { SocialMediaTypes } from '~/types/enums/common.enums';

type SocialMediaIconProps = Partial<Record<SocialMediaTypes, { backgroundColor?: string; backgroundImage?: string }>>;

const instagramGradient = 'linear-gradient(165deg, #800BFD 10%, #FC01D7 35%, #FF0069 55%, #FF2F2B 75%, #FF8000 100%)';

const baseButtonStyle: SxProps = {
  backgroundColor: 'black',
  borderRadius: '50%',
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const socialMediaHoverMap: SocialMediaIconProps = {
  [SocialMediaTypes.Instagram]: { backgroundImage: instagramGradient },
  [SocialMediaTypes.Facebook]: { backgroundColor: '#4053B3' },
  [SocialMediaTypes.YouTube]: { backgroundColor: '#FF0000' }
};

export const iconButtonBase = (type: SocialMediaTypes): SxProps => {
  if (type === SocialMediaTypes.Instagram) {
    return {
      ...baseButtonStyle,
      position: 'relative',
      overflow: 'hidden',

      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        background: instagramGradient,
        opacity: 0,
        transition: 'opacity 0.4s ease',
        zIndex: 0
      },

      '&:hover::before': { opacity: 1 },
      '&:focus': {
        backgroundColor: 'black'
      },
      '&:focus::before': {
        opacity: 0
      },

      '&:focus-visible': {
        backgroundColor: 'black'
      },
      '&:focus-visible::before': {
        opacity: 0
      },

      '& > *': {
        position: 'relative',
        zIndex: 1
      }
    };
  }

  return {
    ...baseButtonStyle,
    backgroundColor: 'black',
    transition: 'background-color 0.3s ease',

    '&:hover': socialMediaHoverMap[type],

    '&:focus': {
      backgroundColor: 'black'
    },

    '&:focus-visible': {
      backgroundColor: 'black'
    }
  };
};

export const styles: Record<string, SxProps> = {
  link: { display: 'inline-block' },
  iconWrapper: {
    filter: 'brightness(0) invert(1)',
    width: 24,
    height: 24
  }
};

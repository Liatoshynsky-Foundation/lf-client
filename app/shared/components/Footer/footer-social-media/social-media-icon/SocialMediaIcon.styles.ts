import { SxProps } from '@mui/material';

import { SocialMediaTypes } from '~/types/enums/common.enums';

export const socialMediaHoverMap: Partial<
  Record<SocialMediaTypes, { backgroundColor?: string; backgroundImage?: string }>
> = {
  [SocialMediaTypes.Instagram]: {
    backgroundImage: 'linear-gradient(165deg, #800BFD 10%, #FC01D7 35%, #FF0069 55%, #FF2F2B 75%, #FF8000 100%)'
  },
  [SocialMediaTypes.Facebook]: { backgroundColor: '#1877F2' },
  [SocialMediaTypes.YouTube]: { backgroundColor: '#FF0000' },
  [SocialMediaTypes.AnotherMedia]: { backgroundColor: '#1A1008' }
};

export const styles: Record<string, SxProps> = {
  link: {
    display: 'inline-block'
  },

  iconButtonBase: {
    backgroundColor: '#1A1008',
    borderRadius: '50%',
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  iconWrapper: {
    filter: 'brightness(0) invert(1)',
    width: 24,
    height: 24
  }
};

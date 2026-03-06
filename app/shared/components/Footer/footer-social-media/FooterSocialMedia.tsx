import { Box } from '@mui/material';

import { styles } from './FooterSocialMedia.styles';
import SocialMediaIcon from './social-media-icon/SocialMediaIcon';
import { SocialMediaTypes } from '~/types/enums/common.enums';

import { sanitizeSocialMediaType } from '~/lib/utils/sanitizeSocialMediaType';
export type LinkIcon = {
  icon: string | SocialMediaTypes;
  link: string;
};

interface FooterSocialMediaProps {
  media: LinkIcon[];
  containerSx?: object;
}

const FooterSocialMedia = ({ media, containerSx }: FooterSocialMediaProps) => {
  const socialMedias = media.map((item) => {
    if (typeof item.icon === 'string') {
      item.icon = sanitizeSocialMediaType(item.icon);
    }
    return <SocialMediaIcon key={item.link} icon={item.icon as SocialMediaTypes} href={item.link} />;
  });

  return <Box sx={{ ...styles.container, ...containerSx }}>{socialMedias}</Box>;
};
export default FooterSocialMedia;

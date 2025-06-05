import { Box } from '@mui/material';
import { styles } from './FooterSocialMedia.styles';
import { SocialMediaTypes } from '~/types/enums/common.enums';
import SocialMediaIcon from './social-media-icon/SocialMediaIcon';
import { sanitizeSocialMediaType } from '~/lib/utils/sanitizeSocialMediaType';
type LinkIcon = {
  icon: string | SocialMediaTypes;
  href: string;
};

interface FooterSocialMediaProps {
  media: LinkIcon[];
}

const FooterSocialMedia = ({ media }: FooterSocialMediaProps) => {
  const socialMedias = media.map((item) => {
    if (typeof item.icon === 'string') {
      item.icon = sanitizeSocialMediaType(item.icon);
    }
    return <SocialMediaIcon key={item.icon} icon={item.icon as SocialMediaTypes} href={item.href} />;
  });

  return <Box sx={styles.container}>{socialMedias}</Box>;
};
export default FooterSocialMedia;

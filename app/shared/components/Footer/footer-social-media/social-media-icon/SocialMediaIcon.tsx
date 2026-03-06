import { Box } from '@mui/material';

import { IconButton } from '~/ds-components/icon-button/IconButton';

import { iconButtonBase, styles } from './SocialMediaIcon.styles';
import { SocialMediaTypes } from '~/types/enums/common.enums';

import { SvgImage } from '~/shared/components/svg-image/SvgImage';

interface SocialMediaIconProps {
  icon: SocialMediaTypes;
  href: string;
}

const SocialMediaIcon = ({ icon, href }: SocialMediaIconProps) => (
  <IconButton component="a" href={href} target="_blank" rel="noopener noreferrer" sx={iconButtonBase(icon)}>
    <Box sx={styles.iconWrapper}>
      <SvgImage
        src={icon === SocialMediaTypes.AnotherMedia ? '/icons/share.svg' : `/icons/${icon}.svg`}
        alt={icon}
        width={24}
        height={24}
      />
    </Box>
  </IconButton>
);

export default SocialMediaIcon;

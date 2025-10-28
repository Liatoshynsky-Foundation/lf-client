import { Box, Link } from '@mui/material';

import { IconButton } from '~/ds-components/icon-button/IconButton';

import { iconButtonBase, styles } from './SocialMediaIcon.styles';
import { SocialMediaTypes } from '~/types/enums/common.enums';

import { SvgImage } from '~/shared/components/svg-image/SvgImage';

interface SocialMediaIconProps {
  icon: SocialMediaTypes;
  href: string;
}

const SocialMediaIcon = ({ icon, href }: SocialMediaIconProps) => (
  <Link href={href} key={icon} target="_blank" sx={styles.link}>
    <IconButton sx={iconButtonBase(icon)}>
      <Box sx={styles.iconWrapper}>
        <SvgImage
          src={icon === SocialMediaTypes.AnotherMedia ? '/icons/share.svg' : `/icons/${icon}.svg`}
          alt={icon}
          width={24}
          height={24}
        />
      </Box>
    </IconButton>
  </Link>
);

export default SocialMediaIcon;

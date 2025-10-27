'use client';

import { Link } from '@mui/material';

import { IconButton } from '~/ds-components/icon-button/IconButton';

import { socialMediaHoverMap, styles } from './SocialMediaIcon.styles';
import { SocialMediaTypes } from '~/types/enums/common.enums';

import { SvgImage } from '~/shared/components/svg-image/SvgImage';

interface SocialMediaIconProps {
  icon: SocialMediaTypes;
  href: string;
}

const SocialMediaIcon = ({ icon, href }: SocialMediaIconProps) => {
  const hoverStyle = socialMediaHoverMap[icon] ?? { backgroundColor: '#1A1008' };

  return (
    <Link href={href} key={icon} target="_blank" sx={styles.link}>
      <IconButton
        sx={{
          ...styles.iconButtonBase,
          '&:hover': {
            ...(hoverStyle || {})
          }
        }}
      >
        <div style={styles.iconWrapper as React.CSSProperties}>
          <SvgImage
            src={icon === SocialMediaTypes.AnotherMedia ? '/icons/share.svg' : `/icons/${icon}.svg`}
            alt={icon}
            width={24}
            height={24}
          />
        </div>
      </IconButton>
    </Link>
  );
};

export default SocialMediaIcon;

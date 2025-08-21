import { Link } from '@mui/material';

import { IconButton } from '~/ds-components/icon-button/IconButton';

import { SocialMediaTypes } from '~/types/enums/common.enums';

import { SvgImage } from '~/shared/components/svg-image/SvgImage';

interface SocialMediaIconProps {
  icon: SocialMediaTypes;
  href: string;
}

const SocialMediaIcon = ({ icon, href }: SocialMediaIconProps) => {
  return (
    <Link href={href} key={icon} target="_blank">
      <IconButton>
        <div
          style={{
            filter: 'brightness(0) invert(1)'
          }}
        >
          <SvgImage
            src={icon === SocialMediaTypes.AnotherMedia ? '/icons/share.svg' : `/icons/${icon}.svg`}
            alt={icon}
            width={20}
            height={20}
          />
        </div>
      </IconButton>
    </Link>
  );
};
export default SocialMediaIcon;

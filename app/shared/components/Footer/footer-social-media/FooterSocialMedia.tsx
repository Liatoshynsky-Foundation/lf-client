import Link from 'next/link';
import { IconButton } from '../../design-system/all-components/icon-button/IconButton';
import { SvgImage } from '../../svg-image/SvgImage';
import { Box } from '@mui/material';
import { styles } from './FooterSocialMedia.styles';
import { SocialMediaTypes } from '~/types/enums/common.enums';

type LinkIcon = {
  icon: string | SocialMediaTypes;
  href: string;
};

interface FooterSocialMediaProps {
  media: LinkIcon[];
}

const FooterSocialMedia = ({ media }: FooterSocialMediaProps) => {
  return (
    <Box sx={styles.container}>
      {media.map((item) => {
        return (
          <Link href={item.href} key={item.icon}>
            <IconButton>
              <div
                style={{
                  filter: 'brightness(0) invert(1)'
                }}
              >
                <SvgImage
                  src={item.icon === SocialMediaTypes.AnotherMedia ? '/icons/share.svg' : `/icons/${item.icon}.svg`}
                  alt={item.icon}
                  width={20}
                  height={20}
                />
              </div>
            </IconButton>
          </Link>
        );
      })}
    </Box>
  );
};
export default FooterSocialMedia;

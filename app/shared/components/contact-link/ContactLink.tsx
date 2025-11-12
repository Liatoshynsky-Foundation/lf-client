'use client';

import { Box, Link, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { useRef } from 'react';

import { Svg } from '~/components/colored-svg/ColoredSvg';
import { mainHexPallete } from '~/ds-components/theme/colors';

import { getContentBoxStyle, styles } from './ContactLink.styles';
import { iconSizes } from '~/constants/design';

import { sxToArray } from '~/lib/utils/sxToArray';
import { CopyButton, type CopyButtonIconSize } from '~/shared/components/copy-button/CopyButton';

type ContactLinkType = 'phone' | 'email';
type ContactLinkDirection = 'row' | 'column';
type ContactIconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;
type IconSize = keyof typeof iconSizes;

interface ContactLinkProps {
  type: ContactLinkType;
  value: string;
  label?: string;
  icon?: ContactIconType;
  iconSize?: IconSize;
  iconColor?: string;
  alertMsg?: string;
  isMobile?: boolean;
  disabled?: boolean;
  linkSx?: SxProps<Theme>;
  labelSx?: SxProps<Theme>;
  iconSx?: SxProps<Theme>;
  copyButtonSize?: CopyButtonIconSize;
  direction?: ContactLinkDirection;
  dataTestid?: string;
}

type LinkProps = Readonly<{ href: string; onClick?: () => void }>;

const getLinkProps = (type: ContactLinkType, value: string, isMobile: boolean): LinkProps | undefined => {
  if (type === 'phone') {
    return isMobile ? { href: `tel:${value}` } : undefined;
  }
  return { href: `mailto:${value}` };
};

export const ContactLink = ({
  type,
  value,
  label,
  icon,
  iconColor,
  alertMsg,
  linkSx,
  labelSx,
  iconSx,
  dataTestid,
  isMobile = false,
  disabled = false,
  direction = 'row',
  iconSize = 'medium',
  copyButtonSize = 'medium'
}: ContactLinkProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const linkProps = getLinkProps(type, value, isMobile);

  const isMobileClickable = isMobile && !disabled;
  const isCopyButtonVisibleOnDesktop = !isMobile && !disabled;
  const showInlineCopyButton = direction === 'column' && isCopyButtonVisibleOnDesktop;
  const showRowCopyButton = direction === 'row' && isCopyButtonVisibleOnDesktop;

  const content = (
    <Box sx={getContentBoxStyle(direction)}>
      {icon && (
        <Box sx={[styles.iconWrapper, ...sxToArray(iconSx)]}>
          <Svg
            Component={icon}
            stroke={iconColor ?? mainHexPallete.black}
            width={`${iconSizes[iconSize]}px`}
            height={`${iconSizes[iconSize]}px`}
            alt={`${type} icon`}
          />
        </Box>
      )}

      {label && <Typography sx={[styles.weakText, ...sxToArray(labelSx)]}>{label}:</Typography>}

      <Box sx={styles.valueBox}>
        <Typography ref={linkRef} sx={[styles.link, ...sxToArray(linkSx)]}>
          {value}
        </Typography>
        {showInlineCopyButton && <CopyButton targetRef={linkRef} hint={alertMsg} iconSize={copyButtonSize} />}
      </Box>
    </Box>
  );

  {
    return (
      <Box sx={styles.wrapper}>
        {isMobileClickable ? (
          <Link ref={linkRef} {...linkProps} sx={styles.mobileLink} data-testid={dataTestid}>
            {content}
          </Link>
        ) : (
          <Box sx={styles.copyButtonWrapper}>
            {content}
            {showRowCopyButton && <CopyButton targetRef={linkRef} hint={alertMsg} iconSize={copyButtonSize} />}
          </Box>
        )}
      </Box>
    );
  }
};

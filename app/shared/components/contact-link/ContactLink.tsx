'use client';

import { Box, Link, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';

import { Svg } from '~/components/colored-svg/ColoredSvg';
import { mainHexPallete } from '~/ds-components/theme/colors';
import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

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
  disabled?: boolean;
  linkSx?: SxProps<Theme>;
  labelSx?: SxProps<Theme>;
  iconSx?: SxProps<Theme>;
  copyButtonSize?: CopyButtonIconSize;
  direction?: ContactLinkDirection;
  dataTestid?: string;
}

type LinkProps = Readonly<{ href: string; onClick?: () => void }>;

const getLinkProps = (type: ContactLinkType, value: string): LinkProps => {
  if (type === 'phone') return { href: `tel:${value}` };
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
  disabled = false,
  direction = 'row',
  iconSize = 'medium',
  copyButtonSize = 'medium'
}: ContactLinkProps) => {
  const [isClient, setIsClient] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { isMobile } = useBreakpoints();

  const linkProps = getLinkProps(type, value);

  useEffect(() => setIsClient(true), []);

  const showCopy = isClient && !disabled && !isMobile;
  const hasLabelOutside = !!label && !isMobile;

  return (
    <Box sx={styles.wrapper} data-testid={dataTestid}>
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

        {hasLabelOutside && <Typography sx={[styles.weakText, ...sxToArray(labelSx)]}>{label}:</Typography>}

        <Box sx={styles.valueBox}>
          {isMobile ? (
            <Link ref={linkRef} {...linkProps} sx={[styles.link, ...sxToArray(linkSx)]}>
              {label && (
                <Typography component="span" sx={[styles.weakTextSmall, ...sxToArray(labelSx)]}>
                  {label}:
                </Typography>
              )}
              {value}
            </Link>
          ) : (
            <Link ref={linkRef} {...linkProps} sx={[styles.link, ...sxToArray(linkSx)]}>
              {value}
            </Link>
          )}

          {showCopy && <CopyButton targetRef={linkRef} hint={alertMsg} iconSize={copyButtonSize} />}
        </Box>
      </Box>
    </Box>
  );
};

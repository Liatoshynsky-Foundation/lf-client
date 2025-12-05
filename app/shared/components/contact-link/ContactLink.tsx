'use client';

import { Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

import { Svg } from '~/components/colored-svg/ColoredSvg';
import CopyLink from '~/ds-components/copy-link/CopyLink';
import { mainHexPallete } from '~/ds-components/theme/colors';
import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import { getContentBoxStyle, styles } from './ContactLink.styles';
import { iconSizes } from '~/constants/design';

import { sxToArray } from '~/lib/utils/sxToArray';

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
  labelSx?: SxProps<Theme>;
  iconSx?: SxProps<Theme>;
  copyLinkSize?: 'medium' | 'large';
  direction?: ContactLinkDirection;
  dataTestid?: string;
}

export const ContactLink = ({
  type,
  value,
  label,
  icon,
  iconColor,
  alertMsg,
  labelSx,
  iconSx,
  dataTestid,
  disabled = false,
  direction = 'row',
  iconSize = 'medium',
  copyLinkSize = 'medium'
}: ContactLinkProps) => {
  const { isMobile } = useBreakpoints();

  const hasLabelOutside = !!label && !isMobile;

  return (
    <Box sx={styles.wrapper} data-testid={dataTestid}>
      <Box sx={getContentBoxStyle(direction)}>
        {!isMobile && icon && (
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
          {isMobile && icon && (
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

          {isMobile && label && (
            <Typography component="span" sx={[styles.weakTextSmall, ...sxToArray(labelSx)]}>
              {label}:
            </Typography>
          )}

          <CopyLink value={value} hrefType={type} size={copyLinkSize} hint={alertMsg} disabled={disabled} />
        </Box>
      </Box>
    </Box>
  );
};

'use client';

import { Box, Link, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { useRef } from 'react';

import { Svg } from '~/components/colored-svg/ColoredSvg';
import { IconButton } from '~/ds-components/icon-button/IconButton';
import { mainHexPallete } from '~/ds-components/theme/colors';

import { styles } from './ContactLink.styles';

import { sxToArray } from '~/lib/utils/sxToArray';
import { CopyButton } from '~/shared/components/copy-button/CopyButton';

type ContactLinkType = 'phone' | 'email';
type ContactLinkDirection = 'row' | 'column';
type ContactIconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface ContactLinkProps {
  type: ContactLinkType;
  value: string;
  label?: string;
  icon?: ContactIconType;
  alertMsg?: string;
  isMobile?: boolean;
  disabled?: boolean;
  linkSx?: SxProps<Theme>;
  direction?: ContactLinkDirection;
  dataTestid?: string;
}

type LinkProps = {
  href: string;
  onClick?: () => void;
};

const getLinkProps = (type: ContactLinkType, value: string, isMobile: boolean): LinkProps => {
  if (type === 'phone') {
    return isMobile ? { href: `tel:${value}` } : { href: '#' };
  }
  return { href: `mailto:${value}` };
};

export const ContactLink = ({
  type,
  value,
  label,
  icon,
  alertMsg,
  linkSx,
  dataTestid,
  isMobile = false,
  disabled = false,
  direction = 'row'
}: ContactLinkProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const linkProps = getLinkProps(type, value, isMobile);

  return (
    <Box
      sx={{
        ...styles.wrapper,
        flexDirection: direction,
        alignItems: direction === 'column' ? 'flex-start' : 'center'
      }}
    >
      {icon && (
        <IconButton customStyles={styles.iconButton} disabled>
          <Svg Component={icon} stroke={mainHexPallete.black} width="20px" height="20px" alt={`${type} icon`} />
        </IconButton>
      )}

      {label && <Typography sx={styles.weakText}>{label}:</Typography>}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Link
          ref={linkRef}
          sx={[styles.link, ...sxToArray(linkSx)]}
          {...linkProps}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onClick={disabled ? (e) => e.preventDefault() : linkProps.onClick}
          data-testid={dataTestid}
        >
          {value}
        </Link>

        {!isMobile && !disabled && <CopyButton targetRef={linkRef} hint={alertMsg} />}
      </Box>
    </Box>
  );
};

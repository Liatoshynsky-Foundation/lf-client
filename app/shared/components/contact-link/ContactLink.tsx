import { Box, Link, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

import { Svg } from '~/components/colored-svg/ColoredSvg';
import { IconButton } from '~/ds-components/icon-button/IconButton';
import { mainHexPallete } from '~/ds-components/theme/colors';

import { styles } from './ContactLink.styles';

import { sxToArray } from '~/lib/utils/sxToArray';

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

type GetLinkPropsType = (type: ContactLinkType, value: string, isMobile: boolean, handleCopy: () => void) => LinkProps;

const getLinkProps: GetLinkPropsType = (type, value, isMobile, handleCopy) => {
  if (type === 'phone') {
    return isMobile ? { href: `tel:${value}` } : { href: '#', onClick: handleCopy };
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
  isMobile = false,
  disabled = false,
  direction = 'row',
  dataTestid
}: ContactLinkProps) => {
  const handleCopy = () => {
    if (disabled) return;
    navigator.clipboard.writeText(value);
    if (alertMsg) alert(alertMsg);
  };

  const linkProps = getLinkProps(type, value, isMobile, handleCopy);

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

      <Link
        sx={[styles.link, ...sxToArray(linkSx)]}
        {...linkProps}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={disabled ? (e) => e.preventDefault() : linkProps.onClick}
        data-testid={dataTestid}
      >
        {value}
      </Link>
    </Box>
  );
};

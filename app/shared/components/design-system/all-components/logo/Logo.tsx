import { Box, BoxProps } from '@mui/material';

import { logoSizes } from '~/constants';
import { Link } from '~/i18n/navigation';
import LogoImage from '~/public/images/logo.svg';

type LogoVariant = keyof typeof logoSizes;

interface LogoProps extends BoxProps {
  variant?: LogoVariant;
  color?: 'black' | 'white' | '#EDE8DF';
}

const Logo: React.FC<LogoProps> = ({ color = 'black', variant = 'header', sx, ...props }) => {
  const size = logoSizes[variant];

  const image = (
    <LogoImage
      width="100%"
      height="100%"
      style={{ color }}
      title="Company logo"
      aria-hidden={false}
      focusable={false}
    />
  );

  return (
    <Box
      sx={{
        display: 'inline-block',
        width: size.width,
        height: size.height,
        ...sx
      }}
      {...props}
    >
      {variant === 'office' ? image : <Link href="/">{image}</Link>}
    </Box>
  );
};

export default Logo;

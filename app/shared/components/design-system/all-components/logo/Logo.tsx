import { Link } from '~/i18n/navigation';
import { Box, BoxProps } from '@mui/material';
import LogoImage from '~/../public/images/logo.svg';
import { logoSizes } from '~/constants';

type LogoVariant = keyof typeof logoSizes;

interface LogoProps extends BoxProps {
  variant?: LogoVariant;
  color?: 'black' | 'white';
}

const Logo: React.FC<LogoProps> = ({ color = 'black', variant = 'header', sx, ...props }) => {
  const size = logoSizes[variant];

  const image = <LogoImage style={{ color }} width="100%" height="100%" role="img" aria-label="Company logo" />;

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

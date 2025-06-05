import { Box, BoxProps } from '@mui/material';
import Link from 'next/link';
import LogoImage from '~/../public/images/logo.svg';

const logoSizes = {
  footer: { width: 127, height: 53 },
  header: { width: 96, height: 40 },
  office: {
    width: { xs: 180, sm: 210, md: 240, lg: 270 },
    height: { xs: 50, sm: 70, md: 90, lg: 110 }
  }
} as const;

type LogoVariant = keyof typeof logoSizes;

interface LogoProps extends BoxProps {
  variant?: LogoVariant;
  color?: 'black' | 'white';
}

const Logo: React.FC<LogoProps> = ({ color = 'black', variant = 'header', sx, ...props }) => {
  const size = logoSizes[variant];

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
      <Link href="/">
        <LogoImage style={{ color }} width="100%" height="100%" role="img" aria-label="Company logo" />
      </Link>
    </Box>
  );
};

export default Logo;

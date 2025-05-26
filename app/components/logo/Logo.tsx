import Link from 'next/link';
import { Box, BoxProps } from '@mui/material';
import Image from 'next/image';

interface LogoProps extends BoxProps {
  variant?: 'header' | 'footer';
}

const Logo: React.FC<LogoProps> = ({ variant = 'header', sx, ...props }) => {
  const size =
    variant === 'header'
      ? { width: 96, height: 40 }
      : { width: 127, height: 53 };

  return (
    <Box sx={{ display: 'inline-block', ...sx }} {...props}>
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="logo"
          {...size}
          priority={variant === 'header'}
        />
      </Link>
    </Box>
  );
};

export default Logo;

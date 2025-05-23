import Link from 'next/link';
import { Box, BoxProps } from '@mui/material';
import Image from 'next/image';
import logo from '../../../public/logo.svg';
import logoLight from '../../../public/logo-light.svg';

interface LogoProps extends BoxProps {
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ light = false, sx, ...props }) => {
  return (
    <Box sx={{ display: 'inline-block', ...sx }} {...props}>
      <Link href="/">
        <Image alt="logo" src={light ? logoLight : logo} priority />
      </Link>
    </Box>
  );
};

export default Logo;

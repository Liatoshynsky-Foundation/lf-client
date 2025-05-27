import Image from 'next/image';
import { CustomLinkProps } from './Link.types';
import { linkStyles } from './Link.styles';
import Button from '@mui/material/Button';
import { NextLinkComposed } from './NextLink';
import { Box } from '@mui/material';

const CustomLink = ({ frontIcon, backIcon, path, children }: CustomLinkProps) => {
  const renderIcon = (icon?: CustomLinkProps['frontIcon']) => {
    if (!icon) return null;
    if (typeof icon === 'object' && 'src' in icon) {
      return <Image src={icon} alt="icon" width={24} height={24} />;
    }
    return icon;
  };

  return (
    <Box sx={{ flexDirection: '2', gap: 2 }}>
      <Button
        sx={linkStyles}
        component={NextLinkComposed}
        disableElevation={true}
        disableRipple={true}
        to={{
          pathname: path,
        }}
      > {renderIcon(frontIcon)}
        {children}
        {renderIcon(backIcon)}
      </Button>
    </Box>
  );
};

export default CustomLink;

import { Link, LinkProps, SxProps, Theme } from '@mui/material';

const link: SxProps<Theme> = {
  textDecoration: 'underline',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: '#5F0E0F'
  }
};

const TextLink: React.FC<LinkProps> = ({ children, sx, ...props }) => {
  return (
    <Link sx={[link, ...(Array.isArray(sx) ? sx : [sx])]} {...props}>
      {children}
    </Link>
  );
};

export default TextLink;

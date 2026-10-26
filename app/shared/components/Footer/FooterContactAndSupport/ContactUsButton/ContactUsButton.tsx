'use client';
import { usePathname } from 'next/navigation';

import Button from '~/ds-components/button/Button';

import { ButtonData } from '~/types/types/common.types';

import { SvgImage } from '~/shared/components/svg-image/SvgImage';

type ContactUsDataProps = {
  data: ButtonData;
};

const ContactUsButton: React.FC<ContactUsDataProps> = ({ data }) => {
  const pathname = usePathname() ?? '';

  const normalizePath = (path: string) => path.replace(/^\/[a-z]{2}(?=\/|$)/, '');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const targetPath = new URL(data.link, window.location.origin).pathname;

    if (normalizePath(pathname) === normalizePath(targetPath)) {
      event.preventDefault();
      window.dispatchEvent(new Event('focus-contact-name'));
    }
  };

  return (
    <Button
      size="medium"
      variant="contained"
      label={data.text}
      link={data.link}
      onClick={handleClick}
      startIcon={<SvgImage alt="Contact Us Button" src="/icons/mail-icon.svg" width={20} height={20} />}
      sx={{
        gap: '0px',
        '&:hover': {
          backgroundColor: 'primary.filledHovered'
        },
        '&:focus': {
          backgroundColor: '#190d03'
        }
      }}
    />
  );
};

export default ContactUsButton;

import Button from '~/ds-components/button/Button';

import { ButtonData } from '~/types/types/common.types';

import { SvgImage } from '~/shared/components/svg-image/SvgImage';

type ContactUsDataProps = {
  data: ButtonData;
};

const ContactUsButton: React.FC<ContactUsDataProps> = ({ data }) => {
  return (
    <Button
      size="medium"
      variant="contained"
      label={data.text}
      link={data.link}
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

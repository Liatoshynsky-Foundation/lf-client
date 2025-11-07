import { Box } from '@mui/material';
import React from 'react';

import { ContactLink } from '~/components/contact-link/ContactLink';
import ImageWithCaption from '~/components/image-with-caption/ImageWithCaption';
import SectionTitle from '~/components/section-title/SectionTitle';

import { imageSizes, styles } from './VolunteerDonation.styles';

interface PaymentMethod {
  label: string;
  value: string;
}

interface Props {
  title: string;
  paymentMethods: PaymentMethod[];
  imageSrc: string;
  caption?: string;
}

const VolunteerDonation: React.FC<Props> = ({ title, paymentMethods, imageSrc, caption }) => {
  return (
    <Box sx={styles.mainContainer}>
      <SectionTitle
        title={title}
        sx={styles.title}
        icon={false}
        gridColumn={{ xs: '1 / -1', sm: '3 / -1', md: '6 / -1' }}
      />

      <Box sx={styles.contentWrapper}>
        {paymentMethods.map((method, index) => (
          <Box key={index} sx={styles.card}>
            <ContactLink type="email" value={method.value} label={method.label} />
          </Box>
        ))}
      </Box>

      <ImageWithCaption
        src={imageSrc}
        alt={title}
        caption={caption ?? ''}
        captionSx={styles.captionSx}
        align="right"
        sizes={imageSizes.sizes}
        border={imageSizes.border}
        containerSx={styles.img}
        imageSx={imageSizes.imageSx}
      />
    </Box>
  );
};

export default VolunteerDonation;

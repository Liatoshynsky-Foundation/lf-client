import { Box } from '@mui/material';
import React from 'react';

import { ContactLink } from '~/components/contact-link/ContactLink';
import ImageWithCaption from '~/components/image-with-caption/ImageWithCaption';
import SectionTitle from '~/components/section-title/SectionTitle';

import { styles } from './VolunteerDonation.styles';

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
        sizes={{
          width: { xs: 224, sm: 457, md: 569, lg: 718, xl: 816, xxl: 979, ultra: 816 },
          height: { xs: 138, sm: 292, md: 336, lg: 498, xl: 498, xxl: 498, ultra: 498 }
        }}
        border={{
          sizes: {
            width: { xs: 31, sm: 38, md: 57, lg: 80 },
            height: { xs: 134, sm: 134, md: 204, lg: 360 }
          },
          top: { xs: 16, sm: 20, md: 36, lg: 38, xl: 40 },
          left: { xs: 16, sm: 26, md: 41, lg: 40, xl: 40 }
        }}
        containerSx={styles.img}
        imageSx={{
          width: { xs: '200px', sm: '400px', md: '496px', lg: '645px', xl: '744px', xxl: '806px', ultra: '1001px' }
        }}
      />
    </Box>
  );
};

export default VolunteerDonation;

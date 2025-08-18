import { Box, Link, Typography } from '@mui/material';

import { styles } from './ContactsInfo.styles';

// import FooterSocialMedia from '~/shared/components/Footer/footer-social-media/FooterSocialMedia';

export default function ContactsInfo() {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.contactsInfoWrapper}>
        <Typography variant="h2" sx={styles.title}>
          КонТактИ
        </Typography>
        <Box sx={styles.contactsDetails}>
          <Typography variant="subtitle1">Телефон:</Typography>
          <Typography variant="subtitle1">Email:</Typography>
          <Link variant="customSemiBold18">067 963 8366</Link>
          <Link variant="customSemiBold18">liatoshynsky@gmail.com</Link>
        </Box>
        <Box sx={styles.socialMediaWrapper}>
          <Typography variant="subtitle1">Ми в соцмережах:</Typography>
          {/* <FooterSocialMedia media={socialLinks} /> */}
        </Box>
      </Box>
      <Box></Box>
    </Box>
  );
}

'use client';

import { Box, Link, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import { Svg } from '~/components/colored-svg/ColoredSvg';
import SectionTitle from '~/components/section-title/SectionTitle';
import { FaqAccordion } from '~/ds-components/faq-accordion/FaqAccordion';
import { IconButton } from '~/ds-components/icon-button/IconButton';
import { mainHexPallete } from '~/ds-components/theme/colors';

import { styles } from './FAQ.styles';

import MailIcon from '~/public/icons/mail.svg';
import PhoneIcon from '~/public/icons/phone.svg';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

type FaqItemProps = {
  title: string;
  content: string;
};

type FaqProps = {
  contacts: {
    phone: string;
    email: string;
  };
  faq: FaqItemProps[];
};

const Faq = ({ data }: { readonly data: Readonly<FaqProps> }) => {
  const { contacts, faq } = data;

  const t = useTranslations('supportUs.faq');
  const { isMobile } = useBreakpoints();

  const copyPhoneToClipboard = () => {
    navigator.clipboard.writeText(contacts.phone);
    alert(t('phoneCopiedAlert'));
  };

  const telLinkProps = isMobile ? { href: `tel:${contacts.phone}` } : { onClick: copyPhoneToClipboard, href: '#' };

  const faqItems = faq.map((item) => {
    return <FaqAccordion key={item.title} title={item.title} content={item.content} />;
  });

  return (
    <Box sx={styles.gridContainer}>
      <SectionTitle
        title={t('title')}
        mb={48}
        gridColumn={{ xs: '2 ', sm: '4 / -1', md: '6 / -1', lg: '5 / -1', xl: '6 / -1' }}
      />
      <Box sx={styles.contacts}>
        <Typography sx={styles.typography}>{t('subtitle.question')}</Typography>
        <Typography sx={styles.typography}>{t('subtitle.answer')}</Typography>
        <Box sx={styles.contactsList}>
          <Box sx={styles.contactsItem}>
            <IconButton customStyles={styles.iconButton} disabled>
              <Svg Component={PhoneIcon} stroke={mainHexPallete.black} alt="phone icon" width="20px" height="20px" />
            </IconButton>
            <Link sx={styles.linkItem} {...telLinkProps}>
              {contacts.phone}
            </Link>
          </Box>
          <Box sx={styles.contactsItem}>
            <IconButton customStyles={styles.iconButton} disabled>
              <Svg Component={MailIcon} stroke={mainHexPallete.black} alt="mail icon" width="20px" height="20px" />
            </IconButton>
            <Link sx={styles.linkItem} href={`mailto:${contacts.email}`}>
              {contacts.email}
            </Link>
          </Box>
        </Box>
      </Box>
      <Box sx={styles.faq}>{faqItems}</Box>
    </Box>
  );
};

export default Faq;

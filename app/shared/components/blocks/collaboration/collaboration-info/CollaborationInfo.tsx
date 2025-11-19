import { Box } from '@mui/material';

//import { useLocale, useTranslations } from 'next-intl';
//import ButtonContentBlock from '../../terms-of-use/terms-content/button-content-block/ButtonContentBlock';
//import { infoDoc, partnersDoc, partnershipDoc, supportDoc } from './collaboration.const';
import { styles } from './CollaborationInfo.styles';

//import TitleContentBlock from '~/shared/components/design-system/all-components/title-content-block/TittleContentBlock';
//import SectionTitle from '~/shared/components/section-title/SectionTitle';

export default function CollaborationInfo() {
  //const t = useTranslations('collaboration.collaborationInfo');
  //const locale = useLocale();

  return (
    <Box sx={styles.mainContainer}>
      {/* <SectionTitle
        icon={true}
        title={t('title')}
        mb={0}
        gridColumn={{ xs: '1/ -1', sm: '4/ -1', md: '6/-1' }}
        sx={{ mb: { xs: '16px' } }}
      />
      <ButtonContentBlock
        content={infoDoc[locale]}
        buttonText={t('supportButton')}
        buttonColor="tertiary"
        sx={{ maxWidth: { xs: '246px' }, minWidth: { xs: '246px' } }}
        textSx={styles.textStyle}
        textContainerSx={{ marginBottom: { xs: '24px', md: '0px' } }}
        buttonContainerSx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}
      />
      <TitleContentBlock
        containerSx={{ mt: { xs: '56px', sm: '96px', md: '112px' } }}
        title={t('supportTitle')}
        content={supportDoc[locale]}
      />
      <TitleContentBlock
        containerSx={{ mt: { xs: '56px', sm: '96px', md: '112px' } }}
        title={t('partnersTitle')}
        content={partnersDoc[locale]}
      />
      <TitleContentBlock
        containerSx={{ mt: { xs: '56px', sm: '96px', md: '112px' } }}
        title={t('partnershipTitle')}
        content={partnershipDoc[locale]}
      /> */}
    </Box>
  );
}

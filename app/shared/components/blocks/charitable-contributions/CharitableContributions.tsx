'use client';

import Box from '@mui/material/Box';

import ContentBlock from '../../design-system/all-components/content-block/ContentBlock';
import ContentBlockWithTitle from '../../design-system/all-components/content-block-with-title/ContentBlockWithTitle';
import ButtonContentBlock from '../terms-of-use/terms-content/button-content-block/ButtonContentBlock';
import { styles } from './CharitableContributions.styles';
import { charitySupport } from './CharitableContributionsData';

const CharitableContributions: React.FC = () => {
  return (
    <Box sx={styles.wrapper}>
      <ContentBlock
        title={charitySupport.contributions.title}
        containerSx={styles.contributions.containerSx}
        textSx={styles.contributions.textSx}
        titleGridColumn={styles.contributions.titleGridColumn}
      />
      <ButtonContentBlock
        buttonText={charitySupport.contributions.buttonText}
        buttonColor="tertiary"
        content={charitySupport.contributions.contentDoc}
        buttonWidth={styles.buttonContent.buttonProps.buttonWidth}
        contentTextGridColumn={styles.buttonContent.buttonProps.contentTextGridColumn}
        buttonGridColumn={styles.buttonContent.buttonProps.buttonGridColumn}
        ml={styles.buttonContent.buttonProps.ml}
        textIndentation={styles.buttonContent.buttonProps.textIndentation}
        contentTextSx={styles.buttonContent.buttonProps.contentTextSx}
      />
      <ContentBlockWithTitle
        title={charitySupport.flexibleSupport.title}
        content={charitySupport.flexibleSupport.contentDoc}
        contentSx={styles.contentWithTitle.contentSx}
      />
      <ContentBlockWithTitle
        title={charitySupport.partnersRecognition.title}
        content={charitySupport.partnersRecognition.contentDoc}
        contentSx={styles.contentWithTitle.contentSx}
      />
      <ContentBlockWithTitle
        title={charitySupport.joinPartnership.title}
        content={charitySupport.joinPartnership.contentDoc}
        contentSx={styles.contentWithTitle.contentSx}
      />
    </Box>
  );
};
export default CharitableContributions;

import { Box, Typography } from '@mui/material';
import { useLocale } from 'next-intl';

import { ColumnGuides } from '../../column-guides/ColumnGuides';
import ButtonContentBlock from '../terms-of-use/terms-content/button-content-block/ButtonContentBlock';
import { styles } from './ArtistrySection.styles';
import { TipTapDoc } from '~/types/types/tiptap.types';

interface Props {
  subTitle: {
    uk: string;
    en: string;
  };
  textContent: {
    uk: TipTapDoc;
    en: TipTapDoc;
  };
  buttonText: {
    uk: string;
    en: string;
  };
  buttonLink: string;
}

const splitTipTapContent = (doc: TipTapDoc) => {
  const firstParagraph = doc.content?.[0];

  if (!firstParagraph?.content || firstParagraph.content.length < 2) {
    return { content: doc, additionalContent: undefined };
  }

  const firstTextNode = firstParagraph.content[0];
  const restTextNodes = firstParagraph.content.slice(1);

  return {
    content: {
      ...doc,
      content: [
        {
          ...firstParagraph,
          content: [firstTextNode]
        }
      ]
    },
    additionalContent: {
      ...doc,
      content: [
        {
          ...firstParagraph,
          content: restTextNodes
        }
      ]
    }
  };
};

export default function ArtistrySection({ subTitle, textContent, buttonText, buttonLink }: Readonly<Props>) {
  const locale = useLocale();
  const { content, additionalContent } = splitTipTapContent(textContent[locale]);

  return (
    <Box sx={styles.mainContainer}>
      <ColumnGuides />
      <Box sx={styles.transformContainer}>
        <Box sx={styles.contentContainer}>
          <Typography sx={styles.subTitle} variant="h5">
            {subTitle[locale]}
          </Typography>
          <ButtonContentBlock
            buttonText={buttonText[locale]}
            content={content as TipTapDoc}
            link={buttonLink}
            textSx={styles.textStyle}
            sx={styles.buttonStyle}
            buttonContainerSx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}
            textContainerSx={{ mt: { xs: '16px', md: '24px' }, mb: { xs: '24px', md: '0px' }, rowGap: { xs: '2px' } }}
            additionalDescription={additionalContent as TipTapDoc}
            additionalTextSx={styles.additionalTextStyle}
          />
        </Box>
      </Box>
    </Box>
  );
}

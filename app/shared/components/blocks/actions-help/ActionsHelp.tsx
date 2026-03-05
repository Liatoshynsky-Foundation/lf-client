import { Box, Typography } from '@mui/material';
import { useLocale } from 'next-intl';

import SectionTitle from '~/components/section-title/SectionTitle';
import TipTapContent from '~/components/tip-tap-content/TipTapContent';
import ButtonCard from '~/ds-components/button-card/ButtonCard';
import TextCard from '~/ds-components/text-card/TextCard';

import { styles } from './ActionsHelp.styles';
import { TipTapDoc } from '~/types/types/tiptap.types';

interface ActionsHelpProps {
  title: { uk: string; en: string };
  subtitle: TipTapDoc;
  paperItems: {
    title: { uk: string; en: string };
    description: { uk: string; en: string };
  }[];
  paperButton: {
    text: { uk: string; en: string };
    link: string;
  };
}

const ActionsHelp = ({ data }: { readonly data: Readonly<ActionsHelpProps> }) => {
  const { title, subtitle, paperItems, paperButton } = data;
  const locale = useLocale();
  const renderSubtitle = (children: React.ReactNode) => (
    <Typography variant="body2" sx={styles.typography} data-testid="ActionsHelp-subtitle">
      {children}
    </Typography>
  );

  const paperComponents = paperItems.map((paper, index) => {
    return (
      <TextCard
        sx={styles.paper(index)}
        key={paper.title[locale]}
        title={paper.title[locale]}
        description={paper.description[locale]}
        locale={locale}
      />
    );
  });

  return (
    <Box sx={styles.gridContainer} data-testid="ActionsHelp">
      <SectionTitle
        sx={{
          gridTemplateColumns: {
            xs: 'repeat(4, 1fr)',
            sm: 'repeat(8, 1fr)',
            md: 'repeat(12, 1fr)'
          }
        }}
        title={title}
        mb={52}
        gridColumn={{ xs: '2/4 ', sm: '4 / -1', md: '6 / -1' }}
        dataTestId="ActionsHelp-titleContainer"
      />
      <TipTapContent
        data={subtitle}
        locale={locale}
        nodeRenderers={{
          paragraph: renderSubtitle
        }}
      />
      <Box sx={styles.papersContainer} data-testid="ActionsHelp-papersContainer">
        {paperComponents}
        <ButtonCard
          sx={styles.paper(paperComponents.length)}
          text={paperButton.text[locale]}
          link={paperButton.link}
          dataTestId="ActionsHelp-buttonCard"
        />
      </Box>
    </Box>
  );
};

export default ActionsHelp;

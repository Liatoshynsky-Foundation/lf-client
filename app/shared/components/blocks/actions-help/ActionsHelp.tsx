import { Box, Typography } from '@mui/material';

import SectionTitle from '~/components/section-title/SectionTitle';
import TipTapContent from '~/components/tip-tap-content/TipTapContent';
import ButtonCard from '~/ds-components/button-card/ButtonCard';
import TextCard from '~/ds-components/text-card/TextCard';

import { styles } from './ActionsHelp.styles';
import { TipTapDoc } from '~/types/types/common.types';

interface ActionsHelpProps {
  title: string;
  subtitle: TipTapDoc;
  paperItems: {
    title: string;
    description: string;
  }[];
  paperButton: {
    text: string;
    link: string;
  };
}

const ActionsHelp = ({ data }: { readonly data: Readonly<ActionsHelpProps> }) => {
  const { title, subtitle, paperItems, paperButton } = data;

  const renderSubtitle = (children: React.ReactNode) => (
    <Typography variant="body2" sx={styles.typography}>
      {children}
    </Typography>
  );

  const paperComponents = paperItems.map((paper, index) => {
    return <TextCard sx={styles.paper(index)} key={paper.title} title={paper.title} description={paper.description} />;
  });

  return (
    <Box sx={styles.gridContainer}>
      <SectionTitle title={title} mb={52} sx={styles.title} />
      <TipTapContent
        data={subtitle}
        nodeRenderers={{
          paragraph: renderSubtitle
        }}
      />
      <Box sx={styles.papersContainer}>
        {paperComponents}
        <ButtonCard sx={styles.paper(paperComponents.length)} text={paperButton.text} link={paperButton.link} />
      </Box>
    </Box>
  );
};

export default ActionsHelp;

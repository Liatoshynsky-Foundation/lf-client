import { Box, Typography } from '@mui/material';

import { styles } from './CollaborationIntro.styles';
import { TipTapDoc } from '~/types/types/common.types';

import TipTapContent from '~/shared/components/tip-tap-content/TipTapContent';

interface CollaborationIntroProps {
  readonly title: string;
  readonly subtitle: string;
  readonly content: TipTapDoc;
}

export default function CollaborationIntro({ title, subtitle, content }: CollaborationIntroProps) {
  let paragraphIndex = 0;

  const renderContent = (children: React.ReactNode, index: number) => {
    return (
      <Typography variant="body2" sx={styles.text(index === 0)}>
        {children}
      </Typography>
    );
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h2" sx={styles.title}>
        {title}
      </Typography>
      <Box sx={styles.textContainer}>
        <Typography sx={styles.subtitle}>{subtitle}</Typography>
        <TipTapContent
          data={content}
          nodeRenderers={{
            paragraph: (children) => renderContent(children, paragraphIndex++)
          }}
        />
      </Box>
    </Box>
  );
}

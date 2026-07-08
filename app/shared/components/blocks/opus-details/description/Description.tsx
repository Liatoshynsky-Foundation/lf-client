import { Box, Typography } from '@mui/material';

import { styles } from './Description.styles';

export type DescriptionProps = {
  description: string;
};

const splitParagraphs = (description: string): string[] => {
  return description
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);
};

const Description = ({ description }: Readonly<DescriptionProps>) => {
  const paragraphs = splitParagraphs(description);

  return (
    <Box sx={styles.root} data-testid="OpusDetails-description">
      {paragraphs.map((paragraph, index) => (
        <Typography
          key={`${index}-${paragraph.slice(0, 24)}`}
          component="p"
          sx={index === 0 ? styles.firstParagraph : styles.paragraph}
        >
          {paragraph}
        </Typography>
      ))}
    </Box>
  );
};

export default Description;

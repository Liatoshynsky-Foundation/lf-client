import { Box, Typography } from '@mui/material';

import { styles } from './TitleWithDescription.styles';
import { TitleWithDescriptionProps } from '~/types/types/titleWithDescriptionComponent';

const TitleWithDescription = ({ variant, title, description }: TitleWithDescriptionProps) => {
  return (
    <Box sx={styles.container(variant)}>
      <Typography sx={styles.blockTitle()}>{title}</Typography>

      {description && <Typography sx={styles.blockDescription()}>{description}</Typography>}
    </Box>
  );
};

export default TitleWithDescription;

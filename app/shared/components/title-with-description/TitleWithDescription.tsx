import { Box, Typography } from '@mui/material';

import { styles } from './TitleWithDescription.styles';
import { TitleWithDescriptionProps } from '~/types/types/titleWithDescriptionComponent';

const TitleWithDescription = ({ variant, title, description, dataTestId }: TitleWithDescriptionProps) => {
  return (
    <Box sx={styles.container(variant)} data-testid={dataTestId}>
      <Typography sx={styles.blockTitle()}>{title}</Typography>

      {description && <Typography sx={styles.blockDescription()}>{description}</Typography>}
    </Box>
  );
};

export default TitleWithDescription;

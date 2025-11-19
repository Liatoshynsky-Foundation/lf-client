import { Box } from '@mui/material';

import { styles } from './ButtonContentBlock.styles';
import { TipTapDoc } from '~/types/types/tiptap.types';

import ArrowUpRight from '~/public/icons/arrow-up-right.svg';
import { Svg } from '~/shared/components/colored-svg/ColoredSvg';
import Button from '~/shared/components/design-system/all-components/button/Button';
import ContentBlock from '~/shared/components/design-system/all-components/content-block/ContentBlock';

type ButtonContentBlockProps = {
  buttonText: string;
  buttonColor?: 'primary' | 'secondary' | 'tertiary';
  content: TipTapDoc;
  sx?: object;
  containerSx?: object;
  textSx?: object;
  textContainerSx?: object;
  buttonContainerSx?: object;
};

const ButtonContentBlock = ({
  buttonText,
  buttonColor = 'primary',
  content,
  sx,
  containerSx,
  textSx,
  textContainerSx = { marginBottom: { xs: '24px', md: '0px' } },
  buttonContainerSx
}: ButtonContentBlockProps) => (
  <Box sx={{ ...styles.wrapper, ...containerSx }} data-testid="ButtonContentBlock">
    <Box sx={{ ...styles.buttonBox, ...buttonContainerSx }}>
      <Button
        variant="contained"
        color={buttonColor}
        fullWidth
        sx={{ ...styles.button, ...sx }}
        data-testid="ButtonContentBlock-button"
      >
        {buttonText}
        <Svg Component={ArrowUpRight} alt="icon" color="#000" width="20px" height="20px" sx={styles.icon} />
      </Button>
    </Box>

    <Box sx={styles.contentBox} data-testid="ButtonContentBlock-content">
      <ContentBlock textSx={textSx} description={content} containerSx={textContainerSx} />
    </Box>
  </Box>
);

export default ButtonContentBlock;

import { Theme } from '@emotion/react';
import { Box, SxProps } from '@mui/material';

import { styles } from './ButtonContentBlock.styles';
import { TipTapDoc } from '~/types/types/tiptap.types';

import ArrowUpRight from '~/public/icons/arrow-up-right.svg';
import { Svg } from '~/shared/components/colored-svg/ColoredSvg';
import Button from '~/shared/components/design-system/all-components/button/Button';
import ContentBlock from '~/shared/components/design-system/all-components/content-block/ContentBlock';
import { commonSx } from '~/shared/styles/commonSx';

type ButtonContentBlockProps = {
  buttonText: string;
  buttonColor?: 'primary' | 'secondary' | 'tertiary';
  content: TipTapDoc;
  sx?: object;
  containerSx?: object;
  textSx?: object;
  textContainerSx?: object;
  buttonContainerSx?: object;
  link?: string;
  additionalDescription?: TipTapDoc;
  additionalTextSx?: SxProps<Theme>;
};

const ButtonContentBlock = ({
  buttonText,
  buttonColor = 'primary',
  content,
  sx,
  containerSx,
  textSx,
  textContainerSx = {
    ...commonSx.layout.standardGrid,
    marginBottom: { xs: '24px', md: '0px' }
  },
  buttonContainerSx,
  link,
  additionalDescription,
  additionalTextSx
}: ButtonContentBlockProps) => (
  <Box sx={{ ...styles.wrapper, ...containerSx }} data-testid="ButtonContentBlock">
    <Box sx={{ ...styles.buttonBox, ...buttonContainerSx }}>
      <Button
        link={link}
        variant="contained"
        color={buttonColor}
        fullWidth
        sx={{ ...styles.button, ...sx }}
        data-testid="ButtonContentBlock-button"
      >
        {buttonText}
        <Svg
          Component={ArrowUpRight}
          alt="icon"
          color={buttonColor === 'primary' ? '#fff' : '#000'}
          width="20px"
          height="20px"
          sx={styles.icon}
        />
      </Button>
    </Box>

    <Box sx={styles.contentBox} data-testid="ButtonContentBlock-content">
      <ContentBlock
        textSx={textSx}
        description={content}
        containerSx={
          {
            ...commonSx.layout.standardGrid,
            ...textContainerSx
          } as SxProps<Theme>
        }
        additionalDescription={additionalDescription}
        additionalTextSx={additionalTextSx}
      />
    </Box>
  </Box>
);

export default ButtonContentBlock;

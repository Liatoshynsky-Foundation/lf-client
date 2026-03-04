'use client';
import { Box, type BoxProps } from '@mui/material';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import React from 'react';

import Button from '../button/Button';
import ContentBlock from '../content-block/ContentBlock';
import { styles } from './BulletTextWithLinks.styles';
import { TipTapDoc } from '~/types/types/tiptap.types';

import { generateSizesAttribute } from '~/lib/utils/generateSizesAttribute';
import { sxToArray } from '~/lib/utils/sxToArray';
import ArrowUpRight from '~/public/icons/arrow-up-right.svg';
import FacebookIcon from '~/public/icons/facebook.svg';
import { Svg } from '~/shared/components/colored-svg/ColoredSvg';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

type LocalizedString = {
  uk: string;
  en: string;
};

type ButtonItem = {
  shortText: LocalizedString;
  fullText: LocalizedString;
  link: string;
};

type RichContent = string | TipTapDoc;

type IconButtonContentBlockProps = BoxProps & {
  description?: RichContent;
  buttons: ButtonItem[];
  buttonText?: string;
  buttonLink?: string;
  showMainButton?: boolean;
  showShortButtonsText?: boolean;
};

const imageSizes = {
  width: {
    xs: 22,
    md: 32
  },
  height: {
    xs: 20,
    md: 30
  }
};

export default function BulletTextWithLinks({
  description,
  buttons,
  buttonText,
  buttonLink,
  showMainButton = true,
  showShortButtonsText = true,
  sx,
  ...props
}: Readonly<IconButtonContentBlockProps>) {
  const { isMobile } = useBreakpoints();
  const locale = useLocale() as 'uk' | 'en';
  const sizesAttribute = generateSizesAttribute(imageSizes);

  const imageBox = (
    <Box sx={styles.image} data-testid="BulletTextWithLinks-imageBox">
      <Image src="/icons/ellipse-gray.svg" alt="" fill sizes={sizesAttribute} />
    </Box>
  );

  return (
    <Box sx={[styles.wrapper, ...sxToArray(sx)]} data-testid="BulletTextWithLinks" {...props}>
      {isMobile && imageBox}
      {showMainButton && (
        <Box sx={styles.buttonBox} data-testid="BulletTextWithLinks-buttonBox">
          {!isMobile && imageBox}
          <Button size="medium" variant="contained" sx={{ ...styles.button }} link={buttonLink} externalLink={true}>
            {buttonText}
            <Svg Component={ArrowUpRight} alt="icon" color="#fff" width="20px" height="20px" sx={styles.icon} />
          </Button>
        </Box>
      )}
      <Box sx={styles.contentBox} data-testid="BulletTextWithLinks-contentBox">
        <ContentBlock
          dataTestId="BulletTextWithLinks-content"
          description={description}
          textSx={{ gridColumn: { xs: '1/ -1', sm: '4/ -1', md: '6/-1' } }}
        />
      </Box>
      <Box sx={styles.buttonsBox} data-testid="BulletTextWithLinks-buttonsBox">
        {buttons.map((button) => (
          <Button
            key={button.link}
            link={button.link}
            externalLink={true}
            variant="outlined"
            size="medium"
            endIcon={
              <Svg
                Component={FacebookIcon}
                fill="none"
                alt="icon"
                color="#000"
                width="24px"
                height="24px"
                sx={styles.icon}
              />
            }
          >
            {showShortButtonsText && isMobile ? button.shortText[locale] : button.fullText[locale]}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

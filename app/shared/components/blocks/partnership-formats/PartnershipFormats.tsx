'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

import ModalComponent from '~/components/modal-component/ModalComponent';
import SectionTitle from '~/components/section-title/SectionTitle';
import Button from '~/ds-components/button/Button';
import CardWithText from '~/ds-components/card-with-text/CardWithText';
import ImageWithBorder from '~/ds-components/image-with-border/ImageWithBorder';

import { styles } from './PartnershipFormats.styles';
import PartnershipSlider from './PartnershipSlider';

interface PartnershipCard {
  icon?: string;
  title: string;
  list: string[];
}

interface PartnershipImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  borderWidth?: number;
}

interface PartnershipFormatsProps {
  data: {
    title: string;
    firstRowFirstCard?: PartnershipCard;
    firstRowSecondCard?: PartnershipCard;
    firstRowImage?: PartnershipImage;
    secondRowImage?: PartnershipImage;
    secondRowFirstCard?: PartnershipCard;
    secondRowSecondCard?: PartnershipCard;
    descriptionText?: string;
    actionButtonText?: string;
    modalContent?: React.ReactNode;
  };
}

const PartnershipFormats: React.FC<PartnershipFormatsProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const renderCard = (card: PartnershipCard | undefined, additionalStyles?: object) => {
    if (!card) return null;

    const cardStyles = additionalStyles ? [styles.card, additionalStyles] : styles.card;

    return (
      <Box sx={cardStyles}>
        <CardWithText icon={card.icon} title={card.title} list={card.list} />
      </Box>
    );
  };

  const renderImage = (image: PartnershipImage | undefined, containerStyles: object, imageWrapperStyles: object) => {
    if (!image) return null;

    return (
      <Box sx={containerStyles}>
        <Box sx={imageWrapperStyles}>
          <ImageWithBorder image={image.src} alt={image.alt} borderWidth={8} />
        </Box>
      </Box>
    );
  };

  const mobileSlides = [
    data.firstRowFirstCard && { type: 'card' as const, card: data.firstRowFirstCard },
    data.firstRowImage && { type: 'image' as const, image: data.firstRowImage },
    data.firstRowSecondCard && { type: 'card' as const, card: data.firstRowSecondCard },
    data.secondRowImage && { type: 'image' as const, image: data.secondRowImage },
    data.secondRowFirstCard && { type: 'card' as const, card: data.secondRowFirstCard },
    data.secondRowSecondCard && { type: 'card' as const, card: data.secondRowSecondCard }
  ].filter(Boolean) as Array<{ type: 'card' | 'image'; card?: PartnershipCard; image?: PartnershipImage }>;

  return (
    <Box sx={styles.container}>
      <SectionTitle title={data.title} sx={styles.title} />

      <Box sx={styles.mobileSlider}>
        <PartnershipSlider slides={mobileSlides} />
      </Box>

      <Box sx={styles.firstRow}>
        {renderCard(data.firstRowFirstCard, styles.firstRowFirstCard)}
        <Box sx={styles.emptyColumn} />
        {renderCard(data.firstRowSecondCard, styles.firstRowSecondCard)}
        {renderImage(data.firstRowImage, styles.firstRowImageContainer, styles.firstRowImageWrapper)}
        {renderCard(data.secondRowFirstCard, styles.secondRowFirstCardLg)}
        <Box sx={styles.emptyColumnSecond} />
      </Box>

      <Box sx={styles.secondRow}>
        {renderImage(data.secondRowImage, styles.secondRowImageContainer, styles.secondRowImageWrapper)}
        {renderCard(data.secondRowFirstCard, styles.secondRowFirstCard)}
        {renderCard(data.secondRowSecondCard, { ...styles.secondRowSecondCard, ...styles.lastCardInRow })}
      </Box>

      {data.descriptionText && (
        <Box sx={styles.descriptionContainer}>
          <Box sx={styles.descriptionText}>
            <Typography variant="body1" sx={styles.descriptionTypography}>
              {data.descriptionText}
            </Typography>
          </Box>
        </Box>
      )}

      {data.actionButtonText && (
        <Box sx={styles.buttonContainer}>
          <Button
            variant="contained"
            size="medium"
            onClick={handleOpenModal}
            color="tertiary"
            endIcon={<Image src="/icons/arrow-up-right.svg" alt="" width={24} height={24} />}
          >
            {data.actionButtonText}
          </Button>
        </Box>
      )}

      <ModalComponent open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={styles.modalContent}>{data.modalContent || <Typography variant="h4">Modal Content</Typography>}</Box>
      </ModalComponent>
    </Box>
  );
};

export default PartnershipFormats;

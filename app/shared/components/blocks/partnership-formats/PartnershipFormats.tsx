'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

import OfferCollaborationForm from '~/components/forms/offer-collaboration-form/OfferCollaborationForm';
import ModalComponent from '~/components/modal-component/ModalComponent';
import SectionTitle from '~/components/section-title/SectionTitle';
import { SvgImage } from '~/components/svg-image/SvgImage';
import Button from '~/ds-components/button/Button';
import CardWithText from '~/ds-components/card-with-text/CardWithText';
import { IconButton } from '~/ds-components/icon-button/IconButton';
import ImageWithBorder from '~/ds-components/image-with-border/ImageWithBorder';

import { styles } from './PartnershipFormats.styles';
import PartnershipSlider from './PartnershipSlider';
import { IconButtonVariant } from '~/types/enums/common.enums';
import {
  PartnershipCard,
  PartnershipFormatsProps,
  PartnershipImage,
  PartnershipImageType
} from '~/types/page/cooperation.types';

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

  const renderImage = (image: PartnershipImage | undefined) => {
    if (!image) return null;

    const mapped = styles.imageByType[image.imageType as PartnershipImageType];
    if (!mapped) return null;

    return (
      <Box sx={mapped.container}>
        <Box sx={mapped.wrapper}>
          <ImageWithBorder image={image.src} alt={image.alt} borderWidth={mapped.borderWidth} />
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
      <SectionTitle
        icon={true}
        title={data.title}
        gridColumn={{ xs: '1/ -1', sm: '4/ -1', md: '6/-1' }}
        sx={styles.title}
        mb={43}
      />

      <Box sx={styles.mobileSlider}>
        <PartnershipSlider slides={mobileSlides} />
      </Box>

      <Box sx={styles.firstRow}>
        {renderCard(data.firstRowFirstCard, styles.firstRowFirstCard)}
        <Box sx={styles.emptyColumn} />
        {renderCard(data.firstRowSecondCard, styles.firstRowSecondCard)}
        {renderImage(data.firstRowImage)}
        {renderCard(data.secondRowFirstCard, styles.secondRowFirstCardLg)}
        <Box sx={styles.emptyColumnSecond} />
      </Box>

      <Box sx={styles.secondRow}>
        {renderImage(data.secondRowImage)}
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
          <Box sx={styles.button}>
            <Button
              variant="contained"
              size="medium"
              onClick={handleOpenModal}
              color="tertiary"
              endIcon={<Image src="/icons/arrow-up-right.svg" alt="" width={24} height={24} aria-hidden="true" />}
            >
              {data.actionButtonText}
            </Button>
          </Box>
        </Box>
      )}

      <ModalComponent
        open={isModalOpen}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflowY: {
            xs: 'auto',
            sm: 'hidden'
          }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton sx={styles.closeIcon} type={IconButtonVariant.icon} size="large" onClick={handleCloseModal}>
            <SvgImage src="/icons/x.svg" alt="Close" width={30} height={30} />
          </IconButton>
          <OfferCollaborationForm
            sx={styles.modalContent}
            formTitle={data.modalContent?.formTitle}
            formSubtitle={data.modalContent?.formSubtitle}
          />
        </Box>
      </ModalComponent>
    </Box>
  );
};

export default PartnershipFormats;

'use client';

import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';

import ModalComponent from '~/components/modal-component/ModalComponent';
import SectionTitle from '~/components/section-title/SectionTitle';
import Button from '~/ds-components/button/Button';
import CardWithText from '~/ds-components/card-with-text/CardWithText';
import ImageWithBorder from '~/ds-components/image-with-border/ImageWithBorder';

import { styles } from './PartnershipFormats.styles';

interface CardData {
  icon?: string;
  title: string;
  list: string[];
}

interface ImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
  borderWidth?: number;
}

interface PartnershipFormatsProps {
  data: {
    title: string;
    row1Card1?: CardData;
    row1Card2?: CardData;
    row1Image?: ImageData;
    row2Image?: ImageData;
    row2Card1?: CardData;
    row2Card2?: CardData;
    row3Text?: string;
    row4ButtonText?: string;
    modalContent?: React.ReactNode;
  };
}

const PartnershipFormats: React.FC<PartnershipFormatsProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Box sx={styles.mainContainer}>
      <SectionTitle title={data.title} sx={styles.title} />

      <Box sx={styles.row1}>
        {data.row1Card1 && (
          <Box sx={styles.card}>
            <CardWithText icon={data.row1Card1.icon} title={data.row1Card1.title} list={data.row1Card1.list} />
          </Box>
        )}
        <Box sx={styles.emptyColumn} />
        {data.row1Card2 && (
          <Box sx={styles.card}>
            <CardWithText icon={data.row1Card2.icon} title={data.row1Card2.title} list={data.row1Card2.list} />
          </Box>
        )}
        {data.row1Image && (
          <Box sx={styles.card}>
            <ImageWithBorder
              image={data.row1Image.src}
              alt={data.row1Image.alt}
              width={data.row1Image.width}
              height={data.row1Image.height}
              borderWidth={data.row1Image.borderWidth}
            />
          </Box>
        )}
      </Box>

      <Box sx={styles.row}>
        {data.row2Image && (
          <Box sx={styles.row2Image}>
            <ImageWithBorder
              image={data.row2Image.src}
              alt={data.row2Image.alt}
              width={data.row2Image.width}
              height={data.row2Image.height}
              borderWidth={data.row2Image.borderWidth}
            />
          </Box>
        )}
        {data.row2Card1 && (
          <Box sx={styles.card}>
            <CardWithText icon={data.row2Card1.icon} title={data.row2Card1.title} list={data.row2Card1.list} />
          </Box>
        )}
        {data.row2Card2 && (
          <Box sx={styles.card}>
            <CardWithText icon={data.row2Card2.icon} title={data.row2Card2.title} list={data.row2Card2.list} />
          </Box>
        )}
      </Box>

      {data.row3Text && (
        <Box sx={styles.row3Container}>
          <Box sx={styles.row3Text}>
            <Typography variant="body1">{data.row3Text}</Typography>
          </Box>
        </Box>
      )}

      {data.row4ButtonText && (
        <Box sx={styles.row4Container}>
          <Button variant="contained" size="large" onClick={handleOpenModal}>
            {data.row4ButtonText}
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

'use client';

import 'swiper/css';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

import SectionTitle from '~/components/section-title/SectionTitle';
import TipTapContent from '~/components/tip-tap-content/TipTapContent';
import ButtonCard from '~/ds-components/button-card/ButtonCard';
import TextCard from '~/ds-components/text-card/TextCard';

import { styles } from './ActionsHelp.styles';
import { TipTapDoc } from '~/types/types/tiptap.types';

interface ActionsHelpProps {
  title: string;
  subtitle: TipTapDoc;
  paperItems: {
    title: string;
    description: string;
  }[];
  paperButton: {
    text: string;
    link: string;
  };
}

const ActionsHelp = ({ data }: { readonly data: Readonly<ActionsHelpProps> }) => {
  const { title, subtitle, paperItems, paperButton } = data;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const renderSubtitle = (children: React.ReactNode) => (
    <Typography variant="body2" sx={styles.typography} data-testid="ActionsHelp-subtitle">
      {children}
    </Typography>
  );

  const renderCards = () => {
    const cards = [
      ...paperItems.map((paper, index) => (
        <TextCard
          sx={styles.paper(isMobile ? 0 : index)}
          key={paper.title}
          title={paper.title}
          description={paper.description}
        />
      )),
      <ButtonCard
        key="button-card"
        sx={styles.paper(isMobile ? 0 : paperItems.length)}
        text={paperButton.text}
        link={paperButton.link}
        dataTestId="ActionsHelp-buttonCard"
      />
    ];

    if (isMobile) {
      return (
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={16}
          centeredSlides={false}
          watchSlidesProgress={true}
          slidesOffsetAfter={16}
          style={{ width: '100%', height: '100%' }}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index} style={{ width: 'auto' }}>
              {card}
            </SwiperSlide>
          ))}
        </Swiper>
      );
    }

    return cards;
  };

  return (
    <Box sx={styles.gridContainer} data-testid="ActionsHelp">
      <SectionTitle
        sx={{
          gridTemplateColumns: {
            xs: 'repeat(4, 1fr)',
            sm: 'repeat(8, 1fr)',
            md: 'repeat(12, 1fr)'
          }
        }}
        title={title}
        mb={52}
        gridColumn={{ xs: '2/4 ', sm: '4 / -1', md: '6 / -1' }}
        dataTestId="ActionsHelp-titleContainer"
      />
      <TipTapContent
        data={subtitle}
        nodeRenderers={{
          paragraph: renderSubtitle
        }}
      />
      <Box
        sx={isMobile ? styles.mobileSwiperContainer : styles.papersContainer}
        data-testid="ActionsHelp-papersContainer"
      >
        {renderCards()}
      </Box>
    </Box>
  );
};

export default ActionsHelp;

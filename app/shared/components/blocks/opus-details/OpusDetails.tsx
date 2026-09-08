import { Box, Typography } from '@mui/material';

import BackLink from '~/components/blocks/archive-case-details/back-link/BackLink';

import Compositions from './compositions/Compositions';
import DescriptionPlaceholder from './description/DescriptionPlaceholder';
import Meta from './meta/Meta';
import { styles } from './OpusDetails.styles';
import type { OpusDetailsProps } from './opusDetails.types';
import VideoGallery from './videos/VideoGallery';

import ImageCarouselSection from '~/shared/components/blocks/image-carousel-section/ImageCarouselSection';
import ContentBlock from '~/shared/components/design-system/all-components/content-block/ContentBlock';

const OpusDetails = ({
  name,
  number,
  year,
  genre,
  movements,
  sheetMusic,
  introDescription,
  compositions,
  videos,
  gallery,
  backHref,
  labels
}: Readonly<OpusDetailsProps>) => {
  return (
    <Box sx={styles.gridContainer} data-testid="OpusDetails">
      <BackLink href={backHref} label={labels.back} dataTestId="OpusDetails-back" />

      <Typography variant="h2" sx={styles.sectionTitle} data-testid="OpusDetails-title">
        {name}
      </Typography>

      <Box sx={styles.contentGrid}>
        <Meta
          number={number}
          year={year}
          genre={genre}
          movements={movements}
          sheetMusic={sheetMusic}
          labels={{
            number: labels.metaNumber,
            date: labels.metaDate,
            genre: labels.metaGenre,
            viewSheetMusic: labels.viewSheetMusic
          }}
        />

        <Box sx={styles.rightColumn}>
          {introDescription ? (
            <ContentBlock
              dataTestId="OpusDetails-description"
              description={introDescription}
              textSx={styles.descriptionText}
            />
          ) : (
            <DescriptionPlaceholder
              title={labels.placeholderTitle}
              subtitle={labels.placeholderSubtitle}
              imageAlt={labels.placeholderImageAlt}
            />
          )}
        </Box>
      </Box>

      {gallery && gallery.length > 0 && (
        <Box sx={{ gridColumn: '1 / -1', mt: 6 }}>
          <ImageCarouselSection data={{ images: gallery }} />
        </Box>
      )}

      {compositions && compositions.length > 0 && (
        <Compositions
          heading={labels.compositionsTitle}
          compositions={compositions}
          viewSheetMusicLabel={labels.viewSheetMusic}
        />
      )}

      {videos && videos.length > 0 && (
        <VideoGallery heading={labels.videosTitle} videos={videos} videoTitleFallback={labels.videoTitleFallback} />
      )}
    </Box>
  );
};

export default OpusDetails;

import { Box } from '@mui/material';

import type { OpusVideo } from '../opusDetails.types';
import Section from '../section/Section';
import VideoCard from './VideoCard';
import { styles } from './VideoGallery.styles';

export type VideoGalleryProps = {
  heading: string;
  videos: OpusVideo[];
  videoTitleFallback: string;
};

const VideoGallery = ({ heading, videos, videoTitleFallback }: Readonly<VideoGalleryProps>) => {
  return (
    <Section heading={heading} dataTestId="OpusDetails-videos" rootSx={styles.spacing}>
      <Box sx={styles.grid} data-testid="OpusDetails-videosGrid">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} titleFallback={videoTitleFallback} />
        ))}
      </Box>
    </Section>
  );
};

export default VideoGallery;

import { Box } from '@mui/material';

import type { OpusVideo } from '../opusDetails.types';
import { styles } from './VideoCard.styles';

export type VideoCardProps = {
  video: OpusVideo;
  titleFallback: string;
};

const buildEmbedUrl = (youTubeId: string): string => {
  return `https://www.youtube.com/embed/${youTubeId}`;
};

const VideoCard = ({ video, titleFallback }: Readonly<VideoCardProps>) => {
  const title = video.title ?? titleFallback;

  return (
    <Box sx={styles.root} data-testid={`OpusDetails-video-${video.id}`}>
      <Box
        component="iframe"
        sx={styles.iframe}
        src={buildEmbedUrl(video.youTubeId)}
        title={title}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </Box>
  );
};

export default VideoCard;

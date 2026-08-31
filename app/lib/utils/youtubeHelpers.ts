const YOUTUBE_ID_REGEX = /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([A-Za-z0-9_-]{11})/;

export function extractYouTubeId(url: string): string | null {
  const match = YOUTUBE_ID_REGEX.exec(url);

  return match ? match[1] : null;
}

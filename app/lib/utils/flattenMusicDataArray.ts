import { Music } from '~/types/types/enhancedTable';

export type flattenedMusicDataArrayType = {
  name: string;
};
export const flattenMusicDataArray = (musicData: Music[]) => {
  const names = musicData.flatMap((music) => (music.opusTitle ? [music.opusTitle, music.name] : [music.name]));
  const uniqueNamesSet = new Set(names);
  const uniqueNamesArray = Array.from(uniqueNamesSet);
  return uniqueNamesArray.map((name) => ({ name }));
};

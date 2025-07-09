type MusicPiece = {
  id: number;
  name: string;
  year: number;
  genre: string;
  opus?: string;
  opusTitle?: string;
};
export type flattenedMusicDataArrayType = {
  name: string;
};
export const flattenMusicDataArray = (musicData: MusicPiece[]) => {
  const names = musicData.flatMap((music) => (music.opusTitle ? [music.opusTitle, music.name] : [music.name]));
  const uniqueNamesSet = new Set(names);
  const uniqueNamesArray = Array.from(uniqueNamesSet);
  return uniqueNamesArray.map((name) => ({ name }));
};

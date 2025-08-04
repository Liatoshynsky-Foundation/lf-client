import SheetMusicTableItem from './sheet-music-table-item/SheetMusicTableItem';
import { MusicSheet } from '~/types/types/composition.types';

interface SheetMusicTable {
  data: MusicSheet[];
  changeContent: () => void;
}

const SheetMusicTable: React.FC<SheetMusicTable> = ({ data, changeContent }) => {
  const onCLick = (isFree: boolean) => (isFree ? console.log('view notes') : changeContent());

  return data.map((item, index) => (
    <SheetMusicTableItem key={index} item={item} onClick={() => onCLick(item.isFree)} />
  ));
};

export default SheetMusicTable;

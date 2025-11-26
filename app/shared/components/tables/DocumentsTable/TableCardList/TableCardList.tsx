import { Box } from '@mui/material';

import { ArchiveRecord } from '~/shared/components/tables/DocumentsTable/documents.conts';
import TableCard from '~/shared/components/tables/DocumentsTable/TableCard/TableCard';

interface TableCardListProps {
  paginatedData: ReadonlyArray<Readonly<ArchiveRecord>>;
  tableRef: React.RefObject<HTMLDivElement | null>;
}

export default function TableCardList({ paginatedData, tableRef }: TableCardListProps) {
  return (
    <Box
      ref={tableRef}
      sx={{
        display: 'grid',
        height: 'fit-content',
        mt: { xs: '8px', sm: '16px' },
        gap: { xs: '32px', sm: '40px' },
        gridColumn: '1 / -1',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)'
        }
      }}
    >
      {paginatedData.map((item) => (
        <TableCard key={item.id} {...item} />
      ))}
    </Box>
  );
}

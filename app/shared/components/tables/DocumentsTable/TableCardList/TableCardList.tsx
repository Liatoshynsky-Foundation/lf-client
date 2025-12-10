import { Box } from '@mui/material';

import { DocumentRecord } from '~/types/types/document.types';

import TableCard from '~/shared/components/tables/DocumentsTable/TableCard/TableCard';

interface TableCardListProps {
  paginatedData: ReadonlyArray<Readonly<DocumentRecord>>;
  tableRef: React.RefObject<HTMLDivElement | null>;
}

export default function TableCardList({ paginatedData, tableRef }: Readonly<TableCardListProps>) {
  return (
    <Box
      data-testid="tableCardList"
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

import type { CellContext } from '@tanstack/react-table';
import { render, screen } from '@testing-library/react';

import { workTableMock } from './WorkTable.constants';
import WorkTableSection from './WorkTableSelection';
import type { WorkTable } from '~/types/types/enhancedTable';

interface EnhancedTableProps {
  data: WorkTable[];
  tableName: string;
}

type CellInfo = CellContext<WorkTable, unknown>;

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>
}));

jest.mock('~/shared/components/enhanced-table/EnhancedTable', () => {
  return function EnhancedTable({ data, tableName }: EnhancedTableProps) {
    return (
      <div data-testid="enhanced-table">
        <div data-testid="table-name">{tableName}</div>
        {data.map((item) => (
          <div key={item.id} data-testid="row">
            {item.name}
            {item.actionType === 'pdf' && <button>Preview</button>}
            {item.actionType === 'link' && item.link && <a href={item.link}>Visit</a>}
          </div>
        ))}
        <button aria-label="Go to next page">Next</button>
      </div>
    );
  };
});

jest.mock('./WorkTableCells', () => ({
  RenderActionCell: ({ row }: CellInfo) => {
    const { actionType, link } = row.original;
    if (actionType === 'pdf') return <button>Preview</button>;
    if (actionType === 'link' && link) return <a href={link}>Visit</a>;
    return null;
  }
}));

describe('WorkTableSection', () => {
  it('should render correct number of rows', () => {
    render(<WorkTableSection data={workTableMock} />);
    expect(screen.getAllByTestId('row').length).toBe(workTableMock.length);
  });

  it('should render pagination button', () => {
    render(<WorkTableSection data={workTableMock} />);
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
  });

  it('should render action buttons correctly', () => {
    render(<WorkTableSection data={workTableMock} />);
    expect(screen.getAllByText('Preview').length).toBeGreaterThan(0);
    expect(screen.getByText('Visit').closest('a')).toHaveAttribute('href', '/works/5');
  });
});

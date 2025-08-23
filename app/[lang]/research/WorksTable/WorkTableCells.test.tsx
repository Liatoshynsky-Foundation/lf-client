import type { CellContext } from '@tanstack/react-table';
import { render, screen } from '@testing-library/react';

import {
  RenderActionCell,
  renderAuthorCell,
  RenderAuthorHeader,
  renderNameCell,
  RenderNameHeader,
  renderYearCell,
  RenderYearHeader
} from './WorkTableCells';
import type { WorkTable } from '~/types/types/enhancedTable';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/ds-components/button/Button');

jest.mock('public/icons/eye.svg', () => {
  return function EyeIcon() {
    return <span data-testid="eye-icon">eye</span>;
  };
});
jest.mock('public/icons/log-out.svg', () => {
  return function LogOutIcon() {
    return <span data-testid="log-out-icon">log-out</span>;
  };
});

describe('WorkTable Components', () => {
  describe('Header Components', () => {
    it('should render name header with correct text', () => {
      render(<RenderNameHeader />);

      const nameHeader = screen.getByText('name');
      expect(nameHeader).toBeInTheDocument();
    });

    it('should render author header with correct text', () => {
      render(<RenderAuthorHeader />);

      const authorHeader = screen.getByText('author');
      expect(authorHeader).toBeInTheDocument();
    });

    it('should render year header with correct text', () => {
      render(<RenderYearHeader />);

      const yearHeader = screen.getByText('year');
      expect(yearHeader).toBeInTheDocument();
    });
  });

  describe('Cell Renderers', () => {
    const createMockCellContext = <T,>(value: T): CellContext<WorkTable, unknown> =>
      ({
        getValue: jest.fn().mockReturnValue(value),
        row: {
          original: {} as WorkTable
        }
      }) as any;

    it('should render name cell with correct value and max width', () => {
      const mockInfo = createMockCellContext('Sample Work Title');

      render(renderNameCell(mockInfo));

      const nameCell = screen.getByText('Sample Work Title');
      expect(nameCell).toBeInTheDocument();
      expect(nameCell).toHaveStyle({ maxWidth: '738px' });
    });

    it('should render author cell with correct value and max width', () => {
      const mockInfo = createMockCellContext('John Doe');

      render(renderAuthorCell(mockInfo));

      const authorCell = screen.getByText('John Doe');
      expect(authorCell).toBeInTheDocument();
      expect(authorCell).toHaveStyle({ maxWidth: '192px' });
    });

    it('should render year cell with correct value and max width', () => {
      const mockInfo = createMockCellContext(2023);

      render(renderYearCell(mockInfo));

      const yearCell = screen.getByText('2023');
      expect(yearCell).toBeInTheDocument();
      expect(yearCell).toHaveStyle({ maxWidth: '85px' });
    });
  });

  describe('RenderActionCell', () => {
    const createMockActionCellContext = (original: Partial<WorkTable>): CellContext<WorkTable, unknown> =>
      ({
        getValue: jest.fn(),
        row: {
          original: original as WorkTable
        }
      }) as any;

    it('should render PDF view button when actionType is pdf', () => {
      const mockInfo = createMockActionCellContext({
        actionType: 'pdf'
      });

      render(<RenderActionCell {...mockInfo} />);

      const viewButton = screen.getByText('view');
      expect(viewButton).toBeInTheDocument();
      expect(viewButton.closest('button')).toBeInTheDocument();
    });

    it('should render link button when actionType is link and link exists', () => {
      const mockInfo = createMockActionCellContext({
        actionType: 'link',
        link: 'https://example.com'
      });

      render(<RenderActionCell {...mockInfo} />);

      const gotoButton = screen.getByText('goto');
      expect(gotoButton).toBeInTheDocument();
      expect(gotoButton.closest('a')).toHaveAttribute('href', 'https://example.com');
      expect(screen.getByTestId('log-out-icon')).toBeInTheDocument();
    });

    it('should render nothing when actionType is link but no link provided', () => {
      const mockInfo = createMockActionCellContext({
        actionType: 'link',
        link: undefined
      });

      const { container } = render(<RenderActionCell {...mockInfo} />);

      expect(container.firstChild).toBeNull();
    });
  });
});

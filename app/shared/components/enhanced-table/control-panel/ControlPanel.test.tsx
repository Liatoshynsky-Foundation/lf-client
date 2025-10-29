import { useMediaQuery } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';

import ControlPanel from './ControlPanel';

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(() => false)
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/public/icons/filter.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="filter-icon" />
}));
jest.mock('~/public/icons/search.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="search-icon" />
}));

jest.mock('~/components/colored-svg/ColoredSvg', () => ({
  Svg: ({ Component }: any) => {
    return <Component />;
  }
}));

jest.mock('~/ds-components/button/Button', () => ({
  __esModule: true,
  default: ({ children, onClick, startIcon: _startIcon, ...rest }: any) => (
    <button onClick={onClick} {...rest}>
      {children}
    </button>
  )
}));
jest.mock('~/ds-components/icon-button/IconButton', () => ({
  IconButton: ({ children, onClick, customStyles: _customStyles, type: _type, variant: _variant, ...rest }: any) => (
    <button onClick={onClick} {...rest}>
      {children}
    </button>
  )
}));

const MockSearch = () => <div data-testid="search-component">Search Component</div>;
const MockFilters = () => <div data-testid="filters-component">Filters Component</div>;
const mockedUseMediaQuery = useMediaQuery as jest.Mock;
const tableName = 'Test Table';
const activeFiltersCount = 3;

const defaultProps = {
  tableName: tableName,
  activeFiltersCount: activeFiltersCount,
  Search: <MockSearch />,
  Filters: <MockFilters />
};

describe('ControlPanel', () => {
  beforeEach(() => {
    mockedUseMediaQuery.mockReturnValue(false);
  });

  describe('Desktop View', () => {
    it('should render correctly in desktop mode with active filters', () => {
      render(<ControlPanel {...defaultProps} />);

      expect(screen.getByText(tableName)).toBeInTheDocument();

      expect(screen.getByTestId('search-component')).toBeInTheDocument();
      expect(screen.getByText('Search Component')).toBeInTheDocument();
      expect(screen.getByText('controls.filters')).toBeInTheDocument();

      expect(screen.getByText(activeFiltersCount.toString())).toBeInTheDocument();

      expect(screen.queryByTestId('filters-component')).not.toBeInTheDocument();
    });

    it('should toggle filters visibility on desktop button click', () => {
      render(<ControlPanel {...defaultProps} />);

      expect(screen.queryByTestId('filters-component')).not.toBeInTheDocument();

      const filtersButton = screen.getByText('controls.filters');
      fireEvent.click(filtersButton);

      expect(screen.getByTestId('filters-component')).toBeInTheDocument();

      fireEvent.click(filtersButton);

      expect(screen.queryByTestId('filters-component')).not.toBeInTheDocument();
    });

    it('should not display the badge count when activeFiltersCount is 0 (desktop)', () => {
      render(<ControlPanel {...defaultProps} activeFiltersCount={0} />);

      expect(screen.getByText('controls.filters')).toBeInTheDocument();
      expect(screen.queryByTestId('filters-component')).not.toBeInTheDocument();
      expect(screen.queryByText('0')).not.toBeInTheDocument();
    });
  });

  describe('Mobile View', () => {
    beforeEach(() => {
      mockedUseMediaQuery.mockReturnValue(true);
    });

    it('should toggle filters visibility on mobile button click', () => {
      render(<ControlPanel {...defaultProps} />);

      const filtersButton = screen.getByRole('button', { name: 'controls.filters' });
      expect(filtersButton).toBeInTheDocument();

      expect(screen.queryByTestId('filters-component')).not.toBeInTheDocument();

      fireEvent.click(filtersButton);
      expect(screen.getByTestId('filters-component')).toBeInTheDocument();

      fireEvent.click(filtersButton);
      expect(screen.queryByTestId('filters-component')).not.toBeInTheDocument();
    });

    it('should toggle search visibility on mobile button click', () => {
      render(<ControlPanel {...defaultProps} />);

      const allButtons = screen.getAllByRole('button');

      const searchButton = allButtons.find((button) => button.closest('span.MuiBadge-root') === null);

      expect(searchButton).toBeInTheDocument();

      if (!searchButton) {
        throw new Error('Search button on Control panel not found');
      }

      expect(screen.queryByTestId('search-component')).not.toBeInTheDocument();

      fireEvent.click(searchButton);
      expect(screen.getByTestId('search-component')).toBeInTheDocument();

      fireEvent.click(searchButton);
      expect(screen.queryByTestId('search-component')).not.toBeInTheDocument();
    });
  });
});

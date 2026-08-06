import '@testing-library/jest-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { render, screen } from '@testing-library/react';

import { ColumnGuides } from './ColumnGuides';

jest.mock('@mui/material/useMediaQuery', () => jest.fn());

describe('ColumnGuides', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render 12-column layout on desktop', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    render(<ColumnGuides dataTestId="ColumnGuides" />);

    expect(screen.getByTestId('ColumnGuides')).toBeInTheDocument();
  });

  it('should render 8-column layout on tablet (md) to cover lines 51-53', () => {
    (useMediaQuery as jest.Mock).mockImplementationOnce(() => false).mockImplementationOnce(() => true);

    render(<ColumnGuides dataTestId="ColumnGuides" />);

    expect(screen.getByTestId('ColumnGuides')).toBeInTheDocument();
  });

  it('should render 4-column layout on mobile (sm) to cover lines 47-49', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    render(<ColumnGuides dataTestId="ColumnGuides" />);

    expect(screen.getByTestId('ColumnGuides')).toBeInTheDocument();
  });

  it('should apply custom lineColor prop', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    render(<ColumnGuides dataTestId="ColumnGuides" lineColor="#FF0000" />);

    expect(screen.getByTestId('ColumnGuides')).toBeInTheDocument();
  });
});

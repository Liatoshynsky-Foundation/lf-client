import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import News from './page';

// mocks
jest.mock('~/utils/isProductionMode', () => ({
  isProductionMode: jest.fn()
}));

jest.mock('~/components/under-development/UnderDevelopment', () => ({
  __esModule: true,
  default: () => <div data-testid="UnderDevelopment" />
}));

jest.mock('~/layouts/main-layout/MainLayout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="MainLayout">{children}</div>
}));

jest.mock('./MediaIntroSection/MediaIntroSection', () => ({
  __esModule: true,
  default: () => <div data-testid="MediaIntroSection" />
}));

jest.mock('~/shared/components/blocks/media-center/MediaCenter', () => ({
  __esModule: true,
  default: () => <div data-testid="MediaCenter" />
}));

import { isProductionMode } from '~/utils/isProductionMode';

describe('News page', () => {
  it('should render UnderDevelopment when production mode is enabled', () => {
    (isProductionMode as jest.Mock).mockReturnValue(true);

    render(<News />);

    expect(screen.getByTestId('UnderDevelopment')).toBeInTheDocument();
    expect(screen.queryByTestId('MainLayout')).not.toBeInTheDocument();
  });

  it('should render MainLayout with MediaIntroSection and MediaCenter when production mode is disabled', () => {
    (isProductionMode as jest.Mock).mockReturnValue(false);

    render(<News />);

    expect(screen.getByTestId('MainLayout')).toBeInTheDocument();
    expect(screen.getByTestId('MediaIntroSection')).toBeInTheDocument();
    expect(screen.getByTestId('MediaCenter')).toBeInTheDocument();

    expect(screen.queryByTestId('UnderDevelopment')).not.toBeInTheDocument();
  });
});

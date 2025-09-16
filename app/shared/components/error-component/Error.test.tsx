import { render, screen } from '@testing-library/react';

import ErrorComponent from './Error';

jest.mock('next/image', () => {
  const MockImage = (props: any) => <img {...props} />;
  MockImage.displayName = 'MockImage';
  return MockImage;
});
jest.mock('~/public/images/OoPs.svg', () => {
  const MockOopsIcon = (props: any) => <svg data-testid="oops-icon" {...props} />;
  MockOopsIcon.displayName = 'MockOopsIcon';
  return MockOopsIcon;
});
jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => jest.fn(() => ({ isMobile: false })));

describe('ErrorComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<ErrorComponent />);
  });

  it('should render the OoPs icon', () => {
    expect(screen.getByTestId('oops-icon')).toBeInTheDocument();
  });

  it('should render the cat image', () => {
    const image = screen.getByAltText('kotyk');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/kotyk.png');
  });

  it('should render the main error message', () => {
    expect(screen.getByText('ЩоСь піШлО нЕ ТаК')).toBeInTheDocument();
  });

  it('should render the subtext message', () => {
    expect(screen.getByText('Спробуйте ще раз скористатися навігацією')).toBeInTheDocument();
  });
});

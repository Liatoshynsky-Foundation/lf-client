import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import DesktopNav from './DesktopNav';
import { ROUTES } from '~/constants/routes';

jest.mock('~/i18n/navigation', () => ({
  usePathname: jest.fn(() => '/')
}));

interface SvgImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  color: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

jest.mock('~/shared/components/colored-svg/ColoredSvg.tsx', () => ({
  Svg: (props: SvgImageProps) => <img {...props} alt="img" />
}));

jest.mock('~/public/icons/chevron-down.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="chevron-down-icon" />
}));

jest.mock('~/public/icons/chevron-up.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="chevron-up-icon" />
}));

class ResizeObserver {
  observe() {
    return;
  }
  unobserve() {
    return;
  }
  disconnect() {
    return;
  }
}
global.ResizeObserver = ResizeObserver;

describe('DesktopNav', () => {
  it('should render all main navigation buttons', () => {
    render(<DesktopNav />);

    expect(screen.getByText('Борис Лятошинський')).toBeInTheDocument();
    expect(screen.getByText('Фундація')).toBeInTheDocument();
    expect(screen.getByText('Кабінет-Архів')).toBeInTheDocument();
    expect(screen.getByText('Співпраця')).toBeInTheDocument();
  });

  it('should openn and close dropdown menu on click', async () => {
    render(<DesktopNav />);

    const dropdownTrigger = screen.getByText('Борис Лятошинський');
    fireEvent.click(dropdownTrigger);

    expect(screen.getByText('Життєпис')).toBeInTheDocument();
    expect(screen.getByText('Творчість')).toBeInTheDocument();
    expect(screen.getByText('Дослідження та наукові роботи')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Життєпис'));

    await waitFor(() => {
      expect(screen.queryByText('Життєпис')).not.toBeInTheDocument();
    });
  });

  it('should have correct href attributes for buttons and dropdown items', () => {
    render(<DesktopNav />);

    const link = screen.getByText('Кабінет-Архів').closest('a');
    expect(link).toHaveAttribute('href', ROUTES.ARCHIVE);

    fireEvent.click(screen.getByText('Фундація'));

    const dropdownLink = screen.getByText('Новини').closest('a');
    expect(dropdownLink).toHaveAttribute('href', ROUTES.NEWS);
  });
});

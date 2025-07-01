import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import DesktopNav from './DesktopNav';
import { ROUTES } from '~/constants/routes';

jest.mock('~/i18n/navigation', () => ({
  usePathname: jest.fn(() => '/')
}));

interface SvgImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

jest.mock('~/shared/components/svg-image/SvgImage', () => ({
  SvgImage: (props: SvgImageProps) => <img {...props} alt="img" />
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

  it('should open and close dropdown menu on click', () => {
    render(<DesktopNav />);

    const dropdownButton = screen.getByText('Борис Лятошинський');
    fireEvent.click(dropdownButton);

    expect(screen.getByText('Життєпис')).toBeInTheDocument();
    expect(screen.getByText('Творчість')).toBeInTheDocument();
    expect(screen.getByText('Дослідження та наукові роботи')).toBeInTheDocument();

    const menuItem = screen.getByText('Життєпис');
    fireEvent.click(menuItem);

    expect(screen.queryByText('Життєпис')).not.toBeInTheDocument();
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

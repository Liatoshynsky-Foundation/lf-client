import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import DesktopNav from './DesktopNav';
import { ROUTES } from '~/constants/routes';

jest.mock('~/i18n/navigation', () => ({
  usePathname: jest.fn(() => '/')
}));

jest.mock('~/shared/components/colored-svg/ColoredSvg.tsx', () => ({
  Svg: (props: any) => <svg data-testid="svg-icon" {...props} />
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

const navLabels = {
  liatoshynsky: 'Борис Лятошинський',
  biography: 'Життєпис',
  artistry: 'Творчість',
  research: 'Дослідження та наукові роботи',
  foundation: 'Фундація',
  about: 'Про Фундацію',
  news: 'Новини',
  media: 'Медіа про нас',
  archive: 'Кабінет-Архів',
  collaboration: 'Співпраця'
};

describe('DesktopNav', () => {
  it('should render all main navigation buttons', () => {
    render(<DesktopNav navLabels={navLabels} />);

    expect(screen.getByText(navLabels.liatoshynsky)).toBeInTheDocument();
    expect(screen.getByText(navLabels.foundation)).toBeInTheDocument();
    expect(screen.getByText(navLabels.archive)).toBeInTheDocument();
    expect(screen.getByText(navLabels.collaboration)).toBeInTheDocument();
  });

  it('should open and close dropdown menu on click', async () => {
    render(<DesktopNav navLabels={navLabels} />);

    fireEvent.click(screen.getByText(navLabels.liatoshynsky));

    expect(screen.getByText(navLabels.biography)).toBeInTheDocument();
    expect(screen.getByText(navLabels.artistry)).toBeInTheDocument();
    expect(screen.getByText(navLabels.research)).toBeInTheDocument();

    fireEvent.click(screen.getByText(navLabels.biography));

    await waitFor(() => {
      expect(screen.queryByText(navLabels.biography)).not.toBeInTheDocument();
    });
  });

  it('should assign correct hrefs to links and dropdowns', async () => {
    render(<DesktopNav navLabels={navLabels} />);

    const link = screen.getByText(navLabels.archive).closest('a');
    expect(link).toHaveAttribute('href', ROUTES.ARCHIVE);

    fireEvent.click(screen.getByText(navLabels.foundation));

    const newsLink = screen.getByText(navLabels.news).closest('a');
    expect(newsLink).toHaveAttribute('href', ROUTES.NEWS);
  });
});

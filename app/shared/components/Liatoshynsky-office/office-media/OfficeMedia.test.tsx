import { render, screen } from '@testing-library/react';

import OfficeMedia from './OfficeMedia';
import { OfficeMediaProps } from '~/types/types/officeMedia';

jest.mock('~/shared/components/design-system/all-components/logo/Logo', () => ({
  __esModule: true,
  default: ({ color, variant }: { color: string; variant: string }) => (
    <div data-testid="logo" data-color={color} data-variant={variant}>
      Logo
    </div>
  )
}));

const mockImages: OfficeMediaProps['images'] = [
  { src: '/images/lf-office2.png', alt: 'Фото 1', styleKey: 'photo1' },
  { src: '/images/lf-office1.png', alt: 'Фото 2', styleKey: 'photo2' },
  { src: '/images/lf-office3.png', alt: 'Фото 3', styleKey: 'photo3' }
];

describe('OfficeMedia component', () => {
  it('should render all photos without crashing', () => {
    render(<OfficeMedia images={mockImages} />);
    expect(screen.getAllByRole('img')).toHaveLength(mockImages.length);
  });

  it('should render logo with correct props', () => {
    render(<OfficeMedia images={mockImages} />);
    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('data-color', 'white');
    expect(logo).toHaveAttribute('data-variant', 'office');
  });
});

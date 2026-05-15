import { render, screen } from '@testing-library/react';
import { useLocale } from 'next-intl';

import SectionTitle from './SectionTitle';

jest.mock('next/image');

jest.mock('next-intl', () => ({
  useLocale: jest.fn()
}));

(useLocale as jest.Mock).mockReturnValue('en');

describe('SectionTitle', () => {
  it('should render title with icon', () => {
    render(<SectionTitle title={{ uk: 'Test title', en: 'Test title' }} />);

    const title = screen.getByText('Test title');
    const icon = screen.getByAltText('ellipse');
    expect(title).toBeInTheDocument();

    expect(icon).toBeInTheDocument();
  });

  it('should render title without icon', () => {
    render(<SectionTitle icon={false} title={{ uk: 'Test title', en: 'Test title' }} />);

    const title = screen.getByText('Test title');
    const icon = screen.queryByAltText('ellipse');
    expect(title).toBeInTheDocument();
    expect(icon).not.toBeInTheDocument();
  });
});

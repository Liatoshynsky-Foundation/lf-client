import { render, screen } from '@testing-library/react';

import SectionTitle from './SectionTitle';

describe('SectionTitle', () => {
  it('should render title with icon', () => {
    render(<SectionTitle title="Test title" />);

    const title = screen.getByText('Test title');
    const icon = screen.getByAltText('ellipse');
    expect(title).toBeInTheDocument();

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle('width: 100%');
    expect(icon).toHaveStyle('height: 100%');
  });

  it('should render title without icon', () => {
    render(<SectionTitle icon={false} title="Test title" />);

    const title = screen.getByText('Test title');
    const icon = screen.queryByAltText('ellipse');
    expect(title).toBeInTheDocument();
    expect(icon).not.toBeInTheDocument();
  });
});

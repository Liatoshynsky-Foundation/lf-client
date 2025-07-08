import { render, screen } from '@testing-library/react';

import TextCard from './TextCard';

describe('TextCard', () => {
  it('should render the title and description correctly', () => {
    const title = 'Card Title';
    const description = 'This is the card description';

    render(<TextCard title={title} description={description} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('should render title and description in correct order', () => {
    const title = 'Another Title';
    const description = 'Another description';

    render(<TextCard title={title} description={description} />);

    const allTextElements = screen.getAllByText(/Another/);

    expect(allTextElements[0]).toHaveTextContent('Another description');
    expect(allTextElements[1]).toHaveTextContent('Another Title');
  });
});

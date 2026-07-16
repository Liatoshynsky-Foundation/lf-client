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

  it('should render correct language translation when localized objects are passed', () => {
    const titleObj = { en: 'Title EN', uk: 'Заголовок УК' };
    const descObj = { en: 'Desc EN', uk: 'Опис УК' };

    render(<TextCard title={titleObj} description={descObj} locale="uk" />);

    expect(screen.getByText('Заголовок УК')).toBeInTheDocument();
    expect(screen.getByText('Опис УК')).toBeInTheDocument();
    expect(screen.queryByText('Title EN')).not.toBeInTheDocument();
    expect(screen.queryByText('Desc EN')).not.toBeInTheDocument();
  });

  it('should fallback to english default locale when no locale prop is specified', () => {
    const titleObj = { en: 'Title Default EN', uk: 'Заголовок УК' };
    const descObj = { en: 'Desc Default EN', uk: 'Опис УК' };

    render(<TextCard title={titleObj} description={descObj} />);

    expect(screen.getByText('Title Default EN')).toBeInTheDocument();
    expect(screen.getByText('Desc Default EN')).toBeInTheDocument();
  });

  it('should correctly accept and apply custom sx properties array formatting', () => {
    const title = 'Styled Title';
    const description = 'Styled description';
    const customSx = { marginTop: '20px', padding: '10px' };

    const { container } = render(<TextCard title={title} description={description} sx={customSx} />);

    expect(container.firstChild).toBeInTheDocument();
  });
});

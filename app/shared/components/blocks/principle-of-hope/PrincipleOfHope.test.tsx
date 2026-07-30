import { render, screen } from '@testing-library/react';
import React from 'react';

import PrincipleOfHope from './PrincipleOfHope';

jest.mock('~/ds-components/bullet-text-with-links/BulletTextWithLinks', () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="bullet-text-with-links">
      <span data-testid="button-text">{props.buttonText}</span>
      <span data-testid="button-link">{props.buttonLink}</span>
      {props.buttons.map((btn: any, i: number) => (
        <div key={i} data-testid="button">
          <span data-testid="nested-link">{btn.link}</span>
        </div>
      ))}
    </div>
  )
}));

describe('PrincipleOfHope', () => {
  it('should render nothing when no data is provided', () => {
    const { container } = render(<PrincipleOfHope />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render BulletTextWithLinks with the provided data', () => {
    const data = {
      buttonText: 'Read more',
      buttonLink: '/hope',
      description: 'Principle of hope description',
      buttons: [{ shortText: 'Short', fullText: 'Full', link: '/btn-1' }]
    };

    render(<PrincipleOfHope data={data} />);

    expect(screen.getByTestId('button-text')).toHaveTextContent('Read more');
    expect(screen.getByTestId('button-link')).toHaveTextContent('/hope');
    expect(screen.getAllByTestId('button')).toHaveLength(1);
  });

  it('should default a missing button link to an empty string', () => {
    const data = {
      buttonText: 'Read more',
      description: 'Principle of hope description',
      buttons: [{ shortText: 'Short', fullText: 'Full' }]
    };

    render(<PrincipleOfHope data={data} />);

    expect(screen.getByTestId('nested-link')).toHaveTextContent('');
  });

  it('should render with no buttons provided', () => {
    const data = { buttonText: 'Read more', description: 'Principle of hope description' };
    render(<PrincipleOfHope data={data} />);

    expect(screen.queryByTestId('button')).not.toBeInTheDocument();
  });
});

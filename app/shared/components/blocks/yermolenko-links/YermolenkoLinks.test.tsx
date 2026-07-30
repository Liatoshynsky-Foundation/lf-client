import { render, screen } from '@testing-library/react';
import React from 'react';

import YermolenkoLinks from './YermolenkoLinks';

jest.mock('~/ds-components/bullet-text-with-links/BulletTextWithLinks', () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="bullet-text-with-links">
      <span data-testid="button-text">{props.buttonText}</span>
      <span data-testid="show-main-button">{String(props.showMainButton)}</span>
      <span data-testid="show-short-buttons-text">{String(props.showShortButtonsText)}</span>
      {props.buttons.map((btn: any, i: number) => (
        <div key={i} data-testid="button">
          <span data-testid="button-link">{btn.link}</span>
          <span>{btn.shortText.en}</span>
          <span>{btn.fullText.en}</span>
        </div>
      ))}
    </div>
  )
}));

describe('YermolenkoLinks', () => {
  it('should render nothing when no data is provided', () => {
    const { container } = render(<YermolenkoLinks />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render BulletTextWithLinks with mapped buttons and fixed display props', () => {
    const data = {
      buttonText: 'Learn more',
      description: 'Some description',
      buttons: [
        { shortText: 'Short', fullText: 'Full text', link: '/link-1' },
        { shortText: 'Short 2', fullText: 'Full text 2', link: '/link-2' }
      ]
    };

    render(<YermolenkoLinks data={data} />);

    expect(screen.getByTestId('button-text')).toHaveTextContent('Learn more');
    expect(screen.getByTestId('show-main-button')).toHaveTextContent('true');
    expect(screen.getByTestId('show-short-buttons-text')).toHaveTextContent('false');

    const buttons = screen.getAllByTestId('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[1]).toHaveTextContent('Short 2');
  });

  it('should default a missing button link to an empty string', () => {
    const data = {
      buttonText: 'Learn more',
      description: 'Some description',
      buttons: [{ shortText: 'Short', fullText: 'Full text' }]
    };

    render(<YermolenkoLinks data={data} />);

    expect(screen.getByTestId('button-link')).toHaveTextContent('');
  });

  it('should render with no buttons provided', () => {
    const data = { buttonText: 'Learn more', description: 'Some description' };
    render(<YermolenkoLinks data={data} />);

    expect(screen.queryByTestId('button')).not.toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';

import { getBold, getItalic, getLink, getUnderline } from '../marks';
import { TipTapMarkType } from '~/types/enums/common.enums';

describe('marks', () => {
  it('should render bold mark', () => {
    render(
      <>
        {getBold('Bold text', {
          type: TipTapMarkType.bold
        })}
      </>
    );

    expect(screen.getByText('Bold text').tagName).toBe('STRONG');
  });

  it('should render italic mark', () => {
    render(
      <>
        {getItalic('Italic text', {
          type: TipTapMarkType.italic
        })}
      </>
    );

    expect(screen.getByText('Italic text').tagName).toBe('EM');
  });

  it('should render underline mark', () => {
    render(
      <>
        {getUnderline('Underline text', {
          type: TipTapMarkType.underline
        })}
      </>
    );

    expect(screen.getByText('Underline text').tagName).toBe('U');
  });

  it('should render link with href', () => {
    render(
      <>
        {getLink('Google', {
          type: TipTapMarkType.link,
          attrs: {
            href: 'https://google.com'
          }
        })}
      </>
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://google.com');
  });

  it('should render link with default href', () => {
    render(
      <>
        {getLink('Default', {
          type: TipTapMarkType.link
        })}
      </>
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '#');
  });
});

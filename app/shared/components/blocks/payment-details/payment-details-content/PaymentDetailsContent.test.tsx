import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import type { JSONContent } from '@tiptap/react';
import React from 'react';

import PaymentDetailsContent from './PaymentDetailsContent';

jest.mock('~/ds-components/copy-link/CopyLink', () => ({
  __esModule: true,
  default: ({ value }: { value: string }) => (
    <button type="button" data-testid="copy-link" data-copy-value={value}>
      {value}
    </button>
  )
}));

const paragraph = (content: JSONContent[]) => ({ type: 'paragraph', content });
const text = (value: string, marks: { type: string; attrs?: Record<string, unknown> }[] = []) => ({
  type: 'text',
  text: value,
  marks
});

describe('PaymentDetailsContent', () => {
  it('renders paragraphs with bold, italic and underline formatting', () => {
    render(
      <PaymentDetailsContent
        content={{
          type: 'doc',
          content: [
            paragraph([
              text('Bold', [{ type: 'bold' }]),
              text(' Italic', [{ type: 'italic' }]),
              text(' Underline', [{ type: 'underline' }])
            ])
          ]
        }}
      />
    );

    expect(screen.getByText('Bold').tagName).toBe('STRONG');
    expect(screen.getByText('Italic').tagName).toBe('EM');
    expect(screen.getByText('Underline').tagName).toBe('U');
  });

  it('renders a two-column table with label and value cells', () => {
    render(
      <PaymentDetailsContent
        content={{
          type: 'doc',
          content: [
            {
              type: 'table',
              content: [
                {
                  type: 'tableRow',
                  content: [
                    { type: 'tableHeader', content: [paragraph([text('IBAN')])] },
                    { type: 'tableCell', content: [paragraph([text('UA213223130000026007233566001')])] }
                  ]
                }
              ]
            }
          ]
        }}
      />
    );

    expect(screen.getByRole('rowheader', { name: 'IBAN' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'UA213223130000026007233566001' })).toBeInTheDocument();
  });

  it('adds a copy button with the plain value to every filled value cell', () => {
    render(
      <PaymentDetailsContent
        content={{
          type: 'doc',
          content: [
            {
              type: 'table',
              content: [
                {
                  type: 'tableRow',
                  content: [
                    { type: 'tableHeader', content: [paragraph([text('IBAN')])] },
                    { type: 'tableCell', content: [paragraph([text('  UA2132 ', [{ type: 'bold' }])])] }
                  ]
                },
                {
                  type: 'tableRow',
                  content: [
                    { type: 'tableHeader', content: [paragraph([text('Note')])] },
                    { type: 'tableCell', content: [paragraph([])] }
                  ]
                }
              ]
            }
          ]
        }}
      />
    );

    const copyButtons = screen.getAllByTestId('copy-link');

    expect(copyButtons).toHaveLength(1);
    expect(copyButtons[0]).toHaveAttribute('data-copy-value', 'UA2132');
  });

  it('renders safe links and drops unsafe ones', () => {
    render(
      <PaymentDetailsContent
        content={{
          type: 'doc',
          content: [
            paragraph([
              text('Safe', [{ type: 'link', attrs: { href: 'https://example.com' } }]),
              text(' Unsafe', [{ type: 'link', attrs: { href: 'javascript:alert(1)' } }])
            ])
          ]
        }}
      />
    );

    expect(screen.getByRole('link', { name: 'Safe' })).toHaveAttribute('href', 'https://example.com');
    expect(screen.queryByRole('link', { name: 'Unsafe' })).not.toBeInTheDocument();
    expect(screen.getByText('Unsafe', { exact: false })).toBeInTheDocument();
  });

  it('renders the content of unknown nodes without crashing', () => {
    render(
      <PaymentDetailsContent content={{ type: 'doc', content: [{ type: 'unknown', content: [text('Fallback')] }] }} />
    );

    expect(screen.getByText('Fallback')).toBeInTheDocument();
  });
});

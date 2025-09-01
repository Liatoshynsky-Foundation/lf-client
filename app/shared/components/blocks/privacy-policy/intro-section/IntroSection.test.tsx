import '@testing-library/jest-dom';
import { queryAllByTestId, render, screen } from '@testing-library/react';
import React from 'react';

import IntroSection from './IntroSection';
import type { TipTapDoc } from '~/types/types/common.types';

const makeTextNode = (text: string) => ({ type: 'text', text });
const makeParagraph = (text: string) => ({ type: 'paragraph', content: [makeTextNode(text)] });
const makeDoc = (text: string): TipTapDoc => ({ type: 'doc', content: [makeParagraph(text)] }) as TipTapDoc;

jest.mock('~/shared/components/blocks/privacy-policy/PolicyContent', () => ({
  PolicyContent: ({ doc }: { doc: TipTapDoc }) => <div data-testid="policy-content">{JSON.stringify(doc)}</div>
}));

describe('IntroSection', () => {
  it('should render title', () => {
    render(<IntroSection title="Privacy Policy Introduction" />);
    expect(screen.getByText('Privacy Policy Introduction')).toBeInTheDocument();
  });

  it('should not render policy content grid when no documents provided', () => {
    const { container } = render(<IntroSection title="Title Only" />);
    expect(queryAllByTestId(container, 'policy-content')).toHaveLength(0);
  });

  it('should render trust and security only', () => {
    const trustAndSecurity = makeDoc('Trust and security information');
    render(<IntroSection title="Intro" trustAndSecurity={trustAndSecurity} />);
    const pcs = screen.getAllByTestId('policy-content');
    expect(pcs).toHaveLength(1);
    expect(pcs[0]).toHaveTextContent('Trust and security information');
  });

  it('should render agreement only', () => {
    const agreement = makeDoc('Agreement terms and conditions');
    render(<IntroSection title="Intro" agreement={agreement} />);
    const pcs = screen.getAllByTestId('policy-content');
    expect(pcs).toHaveLength(1);
    expect(pcs[0]).toHaveTextContent('Agreement terms and conditions');
  });

  it('should render both trust and security and agreement', () => {
    const trustAndSecurity = makeDoc('Trust and security information');
    const agreement = makeDoc('Agreement terms and conditions');
    render(<IntroSection title="Intro" trustAndSecurity={trustAndSecurity} agreement={agreement} />);
    const pcs = screen.getAllByTestId('policy-content');
    expect(pcs).toHaveLength(2);
    expect(pcs[0]).toHaveTextContent('Trust and security information');
    expect(pcs[1]).toHaveTextContent('Agreement terms and conditions');
  });
});

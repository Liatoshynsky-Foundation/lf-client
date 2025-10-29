import { render, screen } from '@testing-library/react';

import Collaboration from './page';

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn()
}));

jest.mock('~/shared/components/blocks/collaboration/collaboration-intro/CollaborationIntro', () => {
  const MockCollaborationIntro = () => <div>Collaboration Intro</div>;
  MockCollaborationIntro.displayName = 'MockCollaborationIntro';
  return MockCollaborationIntro;
});

describe('Collaboration component', () => {
  it('should render CollaborationIntro component correctly', async () => {
    render(await Collaboration({ params: Promise.resolve({ lang: 'en' }) }));
    expect(screen.getByText(/Collaboration Intro/i)).toBeInTheDocument();
  });
});

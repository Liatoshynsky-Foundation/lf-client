import { render, screen } from '@testing-library/react';

import Home from './page';

jest.mock('~/components/Liatoshynsky-office/LiatoshynskyOffice', () => {
  const MockLiatoshynskyOffice = () => <div>Liatoshynsky office</div>;
  MockLiatoshynskyOffice.displayName = 'MockLiatoshynskyOffice';
  return MockLiatoshynskyOffice;
});

jest.mock('~/components/FoundationFounders/FoundationFounders', () => {
  const MockFoundationFounders = () => <div>Foundation founders</div>;
  MockFoundationFounders.displayName = 'MockFoundationFounders';
  return MockFoundationFounders;
});

jest.mock('~/components/our-mission/OurMission', () => {
  const MockOurMission = () => <div>Our mission</div>;
  MockOurMission.displayName = 'MockOurMission';
  return MockOurMission;
});

jest.mock('~/components/main-page-sections/about-foundation/AboutFoundation', () => {
  const MockAboutFoundation = () => <div>About foundation</div>;
  MockAboutFoundation.displayName = 'MockAboutFoundation';
  return MockAboutFoundation;
});

describe('Home component', () => {
  it('should render Home component correctly', async () => {
    render(await Home());

    expect(screen.getByText(/Our mission/i)).toBeInTheDocument();
    expect(screen.getByText(/Liatoshynsky office/i)).toBeInTheDocument();
    expect(screen.getByText(/Foundation founders/i)).toBeInTheDocument();
    expect(screen.getByText(/About foundation/i)).toBeInTheDocument();
  });
});

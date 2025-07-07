import { render, screen } from '@testing-library/react';

import Home from './page';

jest.mock('~/components/blocks/Liatoshynsky-office/LiatoshynskyOffice', () => {
  const MockLiatoshynskyOffice = () => <div>Liatoshynsky office</div>;
  MockLiatoshynskyOffice.displayName = 'MockLiatoshynskyOffice';
  return MockLiatoshynskyOffice;
});

jest.mock('~/components/blocks/FoundationFounders/FoundationFounders', () => {
  const MockFoundationFounders = () => <div>Foundation founders</div>;
  MockFoundationFounders.displayName = 'MockFoundationFounders';
  return MockFoundationFounders;
});

jest.mock('~/components/blocks/our-mission/OurMission', () => {
  const MockOurMission = () => <div>Our mission</div>;
  MockOurMission.displayName = 'MockOurMission';
  return MockOurMission;
});

jest.mock('~/components/blocks/about-foundation/AboutFoundation', () => {
  const MockAboutFoundation = () => <div>About foundation</div>;
  MockAboutFoundation.displayName = 'MockAboutFoundation';
  return MockAboutFoundation;
});

jest.mock('~/components/blocks/our-goals/OurGoals', () => {
  const MockOurGoals = () => <div>Our goals</div>;
  MockOurGoals.displayName = 'MockOurGoals';
  return MockOurGoals;
});

jest.mock('~/components/blocks/what-we-do/WhatWeDo', () => {
  const MockWhatWeDo = () => <div>What we do</div>;
  MockWhatWeDo.displayName = 'MockWhatWeDo';
  return MockWhatWeDo;
});

describe('Home component', () => {
  it('should render Home component correctly', async () => {
    render(await Home());

    expect(screen.getByText(/Our mission/i)).toBeInTheDocument();
    expect(screen.getByText(/Liatoshynsky office/i)).toBeInTheDocument();
    expect(screen.getByText(/Foundation founders/i)).toBeInTheDocument();
    expect(screen.getByText(/About foundation/i)).toBeInTheDocument();
    expect(screen.getByText(/Our goals/i)).toBeInTheDocument();
    expect(screen.getByText(/What we do/i)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';

import Research from './page';

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn()
}));

jest.mock('~/components/research-and-scientific-work/ResearchAndScientificWork', () => {
  const MockResearchAndScientificWork = () => <div>Research and scientific work</div>;
  MockResearchAndScientificWork.displayName = 'MockResearchAndScientificWork';
  return MockResearchAndScientificWork;
});

jest.mock('./WorksTable/WorkTableSelection.tsx', () => {
  const MockWorkTableSelection = () => <div>Work table</div>;
  MockWorkTableSelection.displayName = 'MockWorkTable';
  return MockWorkTableSelection;
});

describe('Research Page', () => {
  it('should render Research page correctly', async () => {
    render(await Research({ params: Promise.resolve({ lang: 'en' }) }));

    expect(screen.getByText(/Research and scientific work/i)).toBeInTheDocument();
    expect(screen.getByText(/Work table/i)).toBeInTheDocument();
  });
});

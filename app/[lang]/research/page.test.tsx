import { render, screen } from '@testing-library/react';

import Research from './page';

jest.mock('~/components/research-and-scientific-work/ResearchAndScientificWork', () => {
  const MockResearchAndScientificWork = () => <div>Research and scientific work</div>;
  MockResearchAndScientificWork.displayName = 'MockResearchAndScientificWork';
  return MockResearchAndScientificWork;
});

describe('Research Page', () => {
  it('should render Research page correctly', async () => {
    render(await Research());

    expect(screen.getByText(/Research and scientific work/i)).toBeInTheDocument();
  });
});

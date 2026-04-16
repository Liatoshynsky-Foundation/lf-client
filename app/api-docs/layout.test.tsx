import { render, screen } from '@testing-library/react';

import ApiDocsLayout from './layout';

describe('ApiDocsLayout', () => {
  it('should render children inside html and body tags', () => {
    render(
      <ApiDocsLayout>
        <div data-testid="child">Test Child</div>
      </ApiDocsLayout>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});

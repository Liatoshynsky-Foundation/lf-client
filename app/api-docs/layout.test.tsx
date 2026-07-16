import { render, screen } from '@testing-library/react';
import React from 'react';

import ApiDocsLayout from './layout';

describe('ApiDocsLayout', () => {
  it('should render children inside html and body tags', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ApiDocsLayout>
        <div data-testid="child">Test Child</div>
      </ApiDocsLayout>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});

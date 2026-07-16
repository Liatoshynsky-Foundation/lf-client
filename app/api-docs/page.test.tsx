import { render, screen } from '@testing-library/react';
import React, { ComponentType } from 'react';
import { RedocStandalone } from 'redoc';

import ApiDocs from './page';

jest.mock('redoc', () => ({
  RedocStandalone: ({ specUrl }: { specUrl: string }) => <div data-testid="redoc">{specUrl}</div>
}));

jest.mock('next/dynamic', () => {
  return (
    loader: () => Promise<{
      RedocStandalone: ComponentType<{ specUrl: string }>;
    }>
  ) => {
    void loader();

    const Component = (props: { specUrl: string }) => {
      return <RedocStandalone {...props} />;
    };

    Component.displayName = 'DynamicRedoc';

    return Component;
  };
});

describe('ApiDocs Page', () => {
  it('should render RedocStandalone with correct specUrl', () => {
    render(<ApiDocs />);

    expect(screen.getByTestId('redoc')).toBeInTheDocument();
    expect(screen.getByText('/api/docs')).toBeInTheDocument();
  });
});

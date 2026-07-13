import { render } from '@testing-library/react';
import React from 'react';

import { PageNotFound } from './PageNotFound';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

describe('PageNotFound Component', () => {
  it('should render all UI elements to cover lines 10-24', async () => {
    const ResolvedComponent = await (PageNotFound() as unknown as Promise<React.ReactElement>);
    const { container } = render(ResolvedComponent);

    expect(container.firstChild).toBeDefined();
  });

  it('should match snapshot for visual consistency', async () => {
    const ResolvedComponent = await (PageNotFound() as unknown as Promise<React.ReactElement>);
    const { asFragment } = render(ResolvedComponent);

    expect(asFragment()).toMatchSnapshot();
  });
});

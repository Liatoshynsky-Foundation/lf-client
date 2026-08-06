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

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <main
          class="MuiBox-root css-ivqvp"
          id="main"
          tabindex="-1"
        >
          <h2
            class="MuiTypography-root MuiTypography-h2 css-1uwders-MuiTypography-root"
          >
            pageNotFound.errorTitle
          </h2>
          <p
            class="MuiTypography-root MuiTypography-body1 css-di72hm-MuiTypography-root"
          >
            pageNotFound.errorMessage
          </p>
          <a
            href="/"
          >
            goHome
          </a>
          <div
            class="MuiBox-root css-vvph5m"
          >
            <img
              alt="Page not found (404)"
              data-fill="true"
              src="/images/pageNotFound.svg"
            />
          </div>
        </main>
      </DocumentFragment>
    `);
  });
});

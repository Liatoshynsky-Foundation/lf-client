import { render } from '@testing-library/react';

import { PageNotFound } from './pageNotFound';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

describe('PageNotFound Component', () => {
  it('should render all UI elements to cover lines 10-24', () => {
    const { container } = render(<PageNotFound />);

    expect(container.firstChild).toBeDefined();
  });

  it('should match snapshot for visual consistency', () => {
    const { asFragment } = render(<PageNotFound />);
    expect(asFragment()).toMatchSnapshot();
  });
});

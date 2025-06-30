import { render, screen } from '@testing-library/react';

import WhatWeDo from './WhatWeDo';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => {
    return key;
  })
}));

describe('WhatWeDo component', () => {
  it('should renders the section title and all goal items', async () => {
    render(await WhatWeDo());

    expect(await screen.findByText('mainTitle')).toBeInTheDocument();

    expect(screen.getByText('titlesList.title1')).toBeInTheDocument();
    expect(screen.getByText('titlesList.title2')).toBeInTheDocument();
    expect(screen.getByText('titlesList.title3')).toBeInTheDocument();
    expect(screen.getByText('titlesList.title4')).toBeInTheDocument();
    expect(screen.getByText('titlesList.title5')).toBeInTheDocument();
  });
});

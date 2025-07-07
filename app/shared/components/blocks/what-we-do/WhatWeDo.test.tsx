import { render, screen } from '@testing-library/react';

import WhatWeDo from './WhatWeDo';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => {
    return key;
  })
}));

const testData = {
  mainTitle: 'main Title',
  items: [
    { title: 'titlesList.title1', description: 'description1' },
    { title: 'titlesList.title2', description: 'description2' },
    { title: 'titlesList.title3', description: 'description3' },
    { title: 'titlesList.title4', description: 'description4' },
    { title: 'titlesList.title5', description: 'description5' }
  ]
};
describe('WhatWeDo component', () => {
  it('should renders the section title and all goal items', () => {
    render(WhatWeDo({ data: testData }));

    expect(screen.getByText('main Title')).toBeInTheDocument();

    expect(screen.getByText('titlesList.title1')).toBeInTheDocument();
    expect(screen.getByText('titlesList.title2')).toBeInTheDocument();
    expect(screen.getByText('titlesList.title3')).toBeInTheDocument();
    expect(screen.getByText('titlesList.title4')).toBeInTheDocument();
    expect(screen.getByText('titlesList.title5')).toBeInTheDocument();
  });
});

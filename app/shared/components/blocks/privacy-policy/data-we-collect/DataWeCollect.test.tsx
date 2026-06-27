import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import DataWeCollect from './DataWeCollect';

jest.mock('../policy-section/PolicySection');

describe('DataWeCollect block', () => {
  it('should render PolicySection with correct props', () => {
    const mockData = {
      title: 'Mock Title',
      description: {} as any,
      sections: [],
      note: {} as any
    };

    render(<DataWeCollect data={mockData} />);
    expect(screen.getByTestId('PrivacyPolicy-dataWeCollect')).toHaveTextContent('Mock Title');
  });
});

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import Cookies from './Cookies';

jest.mock('../policy-section/PolicySection');

describe('Cookies block', () => {
  it('should render PolicySection with correct props', () => {
    const mockData = {
      title: 'Mock Title',
      description: {} as any,
      list: [],
      note: {} as any
    };

    render(<Cookies data={mockData} />);
    expect(screen.getByTestId('PrivacyPolicy-cookies')).toHaveTextContent('Mock Title');
  });
});

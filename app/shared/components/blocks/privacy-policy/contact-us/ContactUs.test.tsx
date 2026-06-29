import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import ContactUs from './ContactUs';
import type { ContactUsProps } from '~/types/page/privacy-policy.types';

jest.mock('../policy-section/PolicySection');

describe('ContactUs block', () => {
  it('should render PolicySection with correct props', () => {
    const mockData: ContactUsProps['data'] = {
      title: 'Mock Title',
      description: {} as any
    };

    render(<ContactUs data={mockData} />);
    expect(screen.getByTestId('PrivacyPolicy-contactUs')).toHaveTextContent('Mock Title');
  });
});

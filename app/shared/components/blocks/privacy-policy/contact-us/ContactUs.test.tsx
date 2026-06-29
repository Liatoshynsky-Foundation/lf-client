import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import ContactUs from './ContactUs';
import type { ContactUsProps } from '~/types/page/privacy-policy.types';

import { mockLocalizedTipTapDoc } from '~/shared/components/blocks/privacy-policy/__mocks__/utils';

jest.mock('../policy-section/PolicySection');

describe('ContactUs block', () => {
  it('should render PolicySection with correct props', () => {
    const mockData: ContactUsProps['data'] = {
      title: 'Mock Title',
      description: mockLocalizedTipTapDoc('Mock Description')
    };

    render(<ContactUs data={mockData} />);
    expect(screen.getByTestId('mock-title')).toHaveTextContent('Mock Title');
    expect(screen.getByTestId('mock-description')).toHaveTextContent(JSON.stringify(mockData.description));
  });
});

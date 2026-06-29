import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import GoogleAuth from './GoogleAuth';
import type { GoogleAuthProps } from '~/types/page/privacy-policy.types';

jest.mock('../policy-section/PolicySection');

describe('GoogleAuth block', () => {
  it('should render PolicySection with correct props', () => {
    const mockData: GoogleAuthProps['data'] = {
      title: 'Mock Title',
      description: {} as any,
      list: [],
      note: {} as any
    };

    render(<GoogleAuth data={mockData} />);
    expect(screen.getByTestId('PrivacyPolicy-googleAuth')).toHaveTextContent('Mock Title');
  });
});

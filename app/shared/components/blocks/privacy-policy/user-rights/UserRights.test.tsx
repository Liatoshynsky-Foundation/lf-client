import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import UserRights from './UserRights';

jest.mock('../policy-section/PolicySection');

describe('UserRights block', () => {
  it('should render PolicySection with correct props', () => {
    const mockData = {
      title: 'Mock Title',
      description: {} as any,
      list: [],
      note: {} as any
    };

    render(<UserRights data={mockData} />);
    expect(screen.getByTestId('PrivacyPolicy-userRights')).toHaveTextContent('Mock Title');
  });
});

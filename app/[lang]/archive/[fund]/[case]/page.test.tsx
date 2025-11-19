import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import ArchiveCasePage from './page';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => key),
  setRequestLocale: jest.fn()
}));

jest.mock('~/layouts/main-layout/MainLayout', () => {
  const MockMainLayout = ({ children }: { children: ReactNode }) => (
    <div data-testid="ArchiveCasePage-MainLayout">{children}</div>
  );
  MockMainLayout.displayName = 'MockMainLayout';
  return MockMainLayout;
});

jest.mock('~/shared/components/blocks/archive-case-details/ArchiveCaseDetails', () => {
  const MockArchiveCaseDetails = () => <div data-testid="ArchiveCaseDetailsMock">Archive case details</div>;
  MockArchiveCaseDetails.displayName = 'MockArchiveCaseDetails';
  return MockArchiveCaseDetails;
});

describe('ArchiveCasePage', () => {
  it('renders archive case details inside main layout', async () => {
    render(
      await ArchiveCasePage({
        params: Promise.resolve({ lang: 'en', fund: '2', case: 'op1-spr3' })
      })
    );

    expect(screen.getByTestId('ArchiveCasePage-MainLayout')).toBeInTheDocument();
    expect(screen.getByTestId('ArchiveCaseDetailsMock')).toBeInTheDocument();
  });
});

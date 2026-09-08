import { render, screen } from '@testing-library/react';
import React from 'react';

import OpusPage, { generateMetadata } from './page';

import { createRequestContainer } from '~/di/container';
import type { OpusDetailsDTO } from '~/domain/dto/composition.dto';
import type { OpusDetailsProps } from '~/shared/components/blocks/opus-details/opusDetails.types';

jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn()
}));

jest.mock('next/navigation', () => ({
  notFound: jest.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  })
}));

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => key),
  setRequestLocale: jest.fn()
}));

jest.mock('~/layouts/main-layout/MainLayout', () => {
  const MockLayout = ({ children }: { children: React.ReactNode }) => <div data-testid="main-layout">{children}</div>;
  MockLayout.displayName = 'MainLayout';
  return { __esModule: true, default: MockLayout };
});

jest.mock('~/shared/components/blocks/opus-details/OpusDetails', () => {
  const MockOpusDetails = ({ name, compositions, videos, backHref }: OpusDetailsProps) => (
    <div data-testid="opus-details" data-backhref={backHref}>
      {`${name}|${compositions?.length ?? 0}|${videos?.length ?? 0}`}
    </div>
  );
  MockOpusDetails.displayName = 'OpusDetails';
  return { __esModule: true, default: MockOpusDetails };
});

const getOpusDetailsBySlug = jest.fn();

const mockDto: OpusDetailsDTO = {
  _id: 'opus-id',
  slug: 'ukrainskyi-kvintet',
  name: 'Український квінтет',
  title: 'Український квінтет',
  number: 'sine op. 16',
  year: '1929',
  genre: 'Фортепіанний квінтет',
  description: null,
  compositions: [{ _id: 'c1', name: 'Після бою', sheetAvailable: false }],
  videos: [{ _id: 'v1', youTubeId: 'abc123', title: 'Виконання 1' }]
};

describe('OpusPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (createRequestContainer as jest.Mock).mockReturnValue({
      resolve: () => ({ getOpusDetailsBySlug })
    });
  });

  type OpusPageProps = Parameters<typeof OpusPage>[0];
  const props: OpusPageProps = {
    params: Promise.resolve({ lang: 'uk', slug: 'ukrainskyi-kvintet' })
  };

  it('generates metadata from the opus details', async () => {
    getOpusDetailsBySlug.mockResolvedValue(mockDto);

    const metadata = await generateMetadata(props);

    expect(metadata.title).toBe('Український квінтет');
  });

  it('generates a not-found metadata when the opus is missing', async () => {
    getOpusDetailsBySlug.mockResolvedValue(null);

    const metadata = await generateMetadata(props);

    expect(metadata.title).toBe('Опус не знайдено');
  });

  it('renders the opus details with mapped compositions and videos', async () => {
    getOpusDetailsBySlug.mockResolvedValue(mockDto);

    const ui = await OpusPage(props);
    render(ui);

    const block = screen.getByTestId('opus-details');
    expect(block).toHaveTextContent('Український квінтет|1|1');
    expect(block).toHaveAttribute('data-backhref', '/uk/artistry');
  });

  it('calls notFound when the opus does not exist', async () => {
    getOpusDetailsBySlug.mockResolvedValue(null);

    await expect(OpusPage(props)).rejects.toThrow('NEXT_NOT_FOUND');
  });
});

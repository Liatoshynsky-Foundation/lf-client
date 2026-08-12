import { render, screen } from '@testing-library/react';
import React from 'react';

import OpusPage, { generateMetadata } from './page';

import { createRequestContainer } from '~/di/container';
import type { OpusDetailsDTO } from '~/domain/dto/composition.dto';

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
  type MockProps = { title: string; compositions: unknown[]; videos: unknown[]; backHref: string };
  const MockOpusDetails = ({ title, compositions, videos, backHref }: MockProps) => (
    <div data-testid="opus-details" data-backhref={backHref}>
      {`${title}|${compositions.length}|${videos.length}`}
    </div>
  );
  MockOpusDetails.displayName = 'OpusDetails';
  return { __esModule: true, default: MockOpusDetails };
});

const getOpusDetailsById = jest.fn();

const mockDto: OpusDetailsDTO = {
  _id: 'opus-id',
  number: 'bo.16',
  title: 'Український квінтет',
  creationDate: '1929',
  genre: 'Фортепіанний квінтет',
  description: null,
  compositions: [{ _id: 'c1', index: 1, title: 'Після бою', sheetMusicUrl: 'https://example.com/c1.pdf' }],
  videos: [{ _id: 'v1', youTubeId: 'abc123', title: 'Виконання 1' }]
};

describe('OpusPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (createRequestContainer as jest.Mock).mockReturnValue({
      resolve: () => ({ getOpusDetailsById })
    });
  });

  const params = Promise.resolve({ lang: 'uk' as const, opus: 'opus-id' });

  it('generates metadata from the opus details', async () => {
    getOpusDetailsById.mockResolvedValue(mockDto);

    const metadata = await generateMetadata({ params });

    expect(metadata.title).toBe('bo.16 — Український квінтет');
  });

  it('generates a not-found metadata when the opus is missing', async () => {
    getOpusDetailsById.mockResolvedValue(null);

    const metadata = await generateMetadata({ params });

    expect(metadata.title).toBe('Опус не знайдено');
  });

  it('renders the opus details with mapped compositions and videos', async () => {
    getOpusDetailsById.mockResolvedValue(mockDto);

    const ui = await OpusPage({ params });
    render(ui);

    const block = screen.getByTestId('opus-details');
    expect(block).toHaveTextContent('Український квінтет|1|1');
    expect(block).toHaveAttribute('data-backhref', '/uk/artistry');
  });

  it('calls notFound when the opus does not exist', async () => {
    getOpusDetailsById.mockResolvedValue(null);

    await expect(OpusPage({ params })).rejects.toThrow('NEXT_NOT_FOUND');
  });
});
